# Earthquakes Dataset

Dataset (kandilli.csv) has been acquired manually from [Bogazici Uni. Kandilli RETMC](http://www.koeri.boun.edu.tr/sismo/2/earthquake-catalog/) by [A. Kursat Unver](https://github.com/alpeer) and covers earthquakes that has following criteria:

| feature | from | to |
|-|-|-|
| date | 20.09.1900 | 30.11.2021 |
| magnitude | 3.0 | 9.0 |
| latitude  | 35.0 | 42.0 |
| longitude  | 26.0 | 45.0 |

Dataset has 58813 records and converted to geojson by eliminating columns other than `magnitude`, `lat`, `lng`, `date`, `depth`, `type`
