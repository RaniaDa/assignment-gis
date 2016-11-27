var http = require('http');
var pg = require('pg');
var express = require('express');
var url = require('url');
var app = express();
var cors = require('cors');
var fs = require("fs");
app.use(cors());

var conString = "postgres://postgres:postgres@localhost:5432/gis";


app.get('/les', function (req, res) {
	var les = [];
	
	var client = new pg.Client(conString);
	client.connect();


	var query = client.query(
		"with\
		forests as (\
		select way from public.planet_osm_polygon\
		where landuse = 'forest'\
		),\
		cycle_way as (\
			select way from public.planet_osm_line\
			where highway = 'cycleway'\
		)\
		select ST_AsGeoJSON(c.way) from cycle_way c, forests f\
		where st_intersects(c.way::geography, f.way::geography);"
	);

	query.on('row', function(row) {
	    les.push(row);
	});

	query.on('end', function() {
	    client.end();
	    return res.json(les);
	});  


});

app.get('/obcerstvenie', function (req, res) {
	
	var obcerstvenie = [];
	
	var client = new pg.Client(conString);
	client.connect();


	var query = client.query(
		"with\
		food_drinks as (\
			select name, way from public.planet_osm_polygon\
			where amenity in ('pub', 'restaurant', 'ice_cream', 'fast_food')\
			union\
			select name, way from public.planet_osm_point\
			where amenity in ('pub', 'restaurant', 'ice_cream', 'fast_food', 'bar', 'bar;cafe', 'drinking_water', 'food_court')\
		),\
		cycle_way as (\
			select way from public.planet_osm_line\
			where highway = 'cycleway'\
		)\
		select ST_AsGeoJSON(c.way) from cycle_way c, food_drinks fd\
		where st_dwithin(c.way::geography, fd.way::geography, 50)\
		group by c.way\
		order by count(fd.way) DESC\
		LIMIT 5;"
	);

	query.on('row', function(row) {
	    obcerstvenie.push(row);
	});

	query.on('end', function() {
	    client.end();
	    return res.json(obcerstvenie);
	});
});

app.get('/vodne_zdroje', function (req, res) {
	
	var voda = [];

	var client = new pg.Client(conString);
	client.connect();


	var query = client.query(
		"with\
		water_sources as (\
			select way, st_area(way::geography) as area from public.planet_osm_polygon\
			where water is not null or waterway is not null\
		),\
		cycle_way as (\
			select way from public.planet_osm_line\
			where highway = 'cycleway'\
		)\
		select ST_AsGeoJSON(c.way) from cycle_way c, water_sources ws\
		where st_dwithin(c.way::geography, ws.way::geography, 50)\
		group by c.way\
		order by sum(ws.area) DESC\
		LIMIT 5;"
	);

	query.on('row', function(row) {
	    voda.push(row);
	});

	query.on('end', function() {
	    client.end();
	    res.setHeader('Access-Control-Allow-Origin', '*');
	    return res.json(voda); 
	});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});