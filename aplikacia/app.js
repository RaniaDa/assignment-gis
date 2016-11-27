$(document).ready(function(){

	$("#l").click(function(){
		
	
		$.ajax({type: "GET", url: "http://localhost:3000/les", datatype: "json"}).done(function(result){
			
			for (i = 0; i < result.length; i++) { 
			    var name = "route" + i;
			    var colour = "#000000";
			    addFeatureToMap(JSON.parse(result[i]["st_asgeojson"]), name, colour);
			}

		});
	});
	
    $("#o").click(function(){
		$.ajax({type: "GET",url: "http://localhost:3000/obcerstvenie", datatype: "json"}).done(function(result){
			
			for (i = 0; i < result.length; i++) { 
			    var name = "route" + 100 + i;
			    var colour = "#efcc00";
			    addFeatureToMap(JSON.parse(result[i]["st_asgeojson"]), name, colour);
			}

		});
	});
	
	$("#v").click(function(){
		$.ajax({type: "GET",url: "http://localhost:3000/vodne_zdroje", datatype: "json"}).done(function(result){
			
			for (i = 0; i < result.length; i++) { 
			    var name = "route" + 200 + i;
			    var colour = "#ff0000";
			    addFeatureToMap(JSON.parse(result[i]["st_asgeojson"]), name, colour);
			}

		});
	});

});



mapboxgl.accessToken = 'pk.eyJ1IjoicmFuaTI1OTQiLCJhIjoiY2l1djh4YTJpMDAxaDJ0dDltaHc3YThzcCJ9.-4jB3pbCT4sRJQz3fOE0cQ';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [17.5,48.15],
    zoom: 10
});


function addFeatureToMap(geometry, name, colour) {
	
	map.addSource(name, {
        "type": "geojson",
        "data": {
            "type": "Feature",
            "properties": {},
            "geometry": geometry
		}
        });



	  map.addLayer({
		"id": name,
		"type": "line",
		"source": name,
		"layout": {
		    "line-join": "round",
		    "line-cap": "round"
		},
		"paint": {
		    "line-color": colour,
		    "line-width": 8
		}
	    });

}