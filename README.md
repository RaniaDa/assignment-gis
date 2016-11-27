# Dokumentácia k zadaniu z predmetu PDT

Vytvorili sme mapovú aplikáciu, ktorá umožňuje zobrazenie cyklotrás v Bratislave a jej okolí na základe viacerých kritérií. Vybrané kritéria sú nasledovné: 
- cyklo trasy prechádzajúce cez les (čierna farba)
- cyklo trasy, pri ktorých je najväčšia možnosť občerstvenia sa (žltá farba)
- cyklo trasy prechádzajúce popri najväčšej vodnej ploche (červená farba)

## Architektúra

Riešenie pozostáva z dvoch častí: aplikačnej a serverovej. 
Serverová časť je definovaná Node.js serverom, ktorý implementuje prístup k Postgres databáze rozšírenej o PostGIS a poskytuje dáta z databázy cez REST vo formáte geoJSON, ktoré sa využívajú na zobrazenie v aplikácií.  Implementácia Geo query dopytujúcich sa na databázu sa nachádza v súbore „server.js“.
Aplikačná časť využíva Mapbox API na zobrazenie mapy. Okrem toho sa cez Ajax dopytuje na server, ktorý vracia dáta vo formáte geoJSON, ktoré sa zobrazujú do mapy. Aplikačná časť pozostáva so súborov: „app.html“, „app.js“ a „app.css“.