const practice = `Pos 	No 	Driver 	Car 	Time 	Gap 	Laps
1 	44 	Lewis Hamilton 	Mercedes 	1:47.502 		6
2 	77 	Valtteri Bottas 	Mercedes 	1:48.806 	+1.304s 	7
3 	33 	Max Verstappen 	Red Bull Racing TAG Heuer 	1:48.847 	+1.345s 	9
4 	3 	Daniel Ricciardo 	Red Bull Racing TAG Heuer 	1:49.326 	+1.824s 	9
5 	5 	Sebastian Vettel 	Ferrari 	1:49.489 	+1.987s 	18
6 	7 	Kimi Räikkönen 	Ferrari 	1:49.928 	+2.426s 	20
7 	55 	Carlos Sainz 	Renault 	1:50.665 	+3.163s 	8
8 	8 	Romain Grosjean 	Haas Ferrari 	1:50.821 	+3.319s 	10
9 	16 	Charles Leclerc 	Sauber Ferrari 	1:50.961 	+3.459s 	14
10 	9 	Marcus Ericsson 	Sauber Ferrari 	1:51.016 	+3.514s 	14
11 	14 	Fernando Alonso 	McLaren Renault 	1:51.036 	+3.534s 	9
12 	47 	Lando Norris 	McLaren Renault 	1:51.232 	+3.730s 	9
13 	10 	Pierre Gasly 	Scuderia Toro Rosso Honda 	1:51.234 	+3.732s 	19
14 	11 	Sergio Perez 	Force India Mercedes 	1:51.459 	+3.957s 	18
15 	35 	Sergey Sirotkin 	Williams Mercedes 	1:51.589 	+4.087s 	14
16 	20 	Kevin Magnussen 	Haas Ferrari 	1:51.614 	+4.112s 	15
17 	31 	Esteban Ocon 	Force India Mercedes 	1:51.655 	+4.153s 	17
18 	27 	Nico Hulkenberg 	Renault 	1:51.717 	+4.215s 	7
19 	18 	Lance Stroll 	Williams Mercedes 	1:51.896 	+4.394s 	14
20 	38 	Sean Gelael 	Scuderia Toro Rosso Honda 	1:52.625 	+5.123s 	21`

const qualifying = `Pos 	No 	Driver 	Car 	Q1 	Q2 	Q3 	Laps
1 	44 	Lewis Hamilton 	Mercedes 	1:22.824 	1:22.051 	1:21.164 	20
2 	7 	Kimi Räikkönen 	Ferrari 	1:23.096 	1:22.507 	1:21.828 	17
3 	5 	Sebastian Vettel 	Ferrari 	1:23.348 	1:21.944 	1:21.838 	20
4 	33 	Max Verstappen 	Red Bull Racing TAG Heuer 	1:23.483 	1:22.416 	1:21.879 	18
5 	3 	Daniel Ricciardo 	Red Bull Racing TAG Heuer 	1:23.494 	1:22.897 	1:22.152 	17
6 	20 	Kevin Magnussen 	Haas Ferrari 	1:23.909 	1:23.300 	1:23.187 	17
7 	8 	Romain Grosjean 	Haas Ferrari 	1:23.671 	1:23.468 	1:23.339 	17
8 	27 	Nico Hulkenberg 	Renault 	1:23.782 	1:23.544 	1:23.532 	16
9 	55 	Carlos Sainz 	Renault 	1:23.529 	1:23.061 	1:23.577 	17
10 	77 	Valtteri Bottas 	Mercedes 	1:23.686 	1:22.089 	DNF 	16
11 	14 	Fernando Alonso 	McLaren Renault 	1:23.597 	1:23.692 		14
12 	2 	Stoffel Vandoorne 	McLaren Renault 	1:24.073 	1:23.853 		14
13 	11 	Sergio Perez 	Force India Mercedes 	1:24.344 	1:24.005 		14
14 	18 	Lance Stroll 	Williams Mercedes 	1:24.464 	1:24.230 		13
15 	31 	Esteban Ocon 	Force India Mercedes 	1:24.503 	1:24.786 		16
16 	28 	Brendon Hartley 	Scuderia Toro Rosso Honda 	1:24.532 			8
17 	9 	Marcus Ericsson 	Sauber Ferrari 	1:24.556 			9
18 	16 	Charles Leclerc 	Sauber Ferrari 	1:24.636 			9
19 	35 	Sergey Sirotkin 	Williams Mercedes 	1:24.922 			8
20 	10 	Pierre Gasly 	Scuderia Toro Rosso Honda 	1:25.295 			7`

const race = `Pos 	No 	Driver 	Car 	Laps 	Time/Retired 	PTS
1 	5 	Sebastian Vettel 	Ferrari 	58 	1:29:33.283 	25
2 	44 	Lewis Hamilton 	Mercedes 	58 	+5.036s 	18
3 	7 	Kimi Räikkönen 	Ferrari 	58 	+6.309s 	15
4 	3 	Daniel Ricciardo 	Red Bull Racing TAG Heuer 	58 	+7.069s 	12
5 	14 	Fernando Alonso 	McLaren Renault 	58 	+27.886s 	10
6 	33 	Max Verstappen 	Red Bull Racing TAG Heuer 	58 	+28.945s 	8
7 	27 	Nico Hulkenberg 	Renault 	58 	+32.671s 	6
8 	77 	Valtteri Bottas 	Mercedes 	58 	+34.339s 	4
9 	2 	Stoffel Vandoorne 	McLaren Renault 	58 	+34.921s 	2
10 	55 	Carlos Sainz 	Renault 	58 	+45.722s 	1
11 	11 	Sergio Perez 	Force India Mercedes 	58 	+46.817s 	0
12 	31 	Esteban Ocon 	Force India Mercedes 	58 	+60.278s 	0
13 	16 	Charles Leclerc 	Sauber Ferrari 	58 	+75.759s 	0
14 	18 	Lance Stroll 	Williams Mercedes 	58 	+78.288s 	0
15 	28 	Brendon Hartley 	Scuderia Toro Rosso Honda 	57 	+1 lap 	0
NC 	8 	Romain Grosjean 	Haas Ferrari 	24 	DNF 	0
NC 	20 	Kevin Magnussen 	Haas Ferrari 	22 	DNF 	0
NC 	10 	Pierre Gasly 	Scuderia Toro Rosso Honda 	13 	DNF 	0
NC 	9 	Marcus Ericsson 	Sauber Ferrari 	5 	DNF 	0
NC 	35 	Sergey Sirotkin 	Williams Mercedes 	4 	DNF 	0`

const racePits = `Stops 	No 	Driver 	Car 	Lap 	Time of day 	Time 	Total
1 	28 	Brendon Hartley 	Scuderia Toro Rosso Honda 	1 	16:15:04 	22.213 	22.213
1 	7 	Kimi Räikkönen 	Ferrari 	18 	16:40:07 	21.421 	21.421
1 	44 	Lewis Hamilton 	Mercedes 	19 	16:41:30 	21.821 	21.821
1 	16 	Charles Leclerc 	Sauber Ferrari 	20 	16:44:03 	22.242 	22.242
1 	33 	Max Verstappen 	Red Bull Racing TAG Heuer 	21 	16:45:06 	20.953 	20.953
1 	20 	Kevin Magnussen 	Haas Ferrari 	22 	16:46:31 	21.983 	21.983
1 	55 	Carlos Sainz 	Renault 	22 	16:46:46 	23.868 	23.868
2 	28 	Brendon Hartley 	Scuderia Toro Rosso Honda 	22 	16:47:37 	22.296 	44.509
1 	31 	Esteban Ocon 	Force India Mercedes 	23 	16:48:25 	21.854 	21.854
1 	8 	Romain Grosjean 	Haas Ferrari 	24 	16:49:31 	23.054 	23.054
1 	27 	Nico Hulkenberg 	Renault 	24 	16:49:35 	22.628 	22.628
1 	11 	Sergio Perez 	Force India Mercedes 	24 	16:49:51 	22.327 	22.327
1 	2 	Stoffel Vandoorne 	McLaren Renault 	25 	16:51:17 	22.474 	22.474
1 	77 	Valtteri Bottas 	Mercedes 	25 	16:51:21 	21.664 	21.664
1 	18 	Lance Stroll 	Williams Mercedes 	25 	16:51:46 	25.504 	25.504
1 	5 	Sebastian Vettel 	Ferrari 	26 	16:52:19 	21.787 	21.787
1 	3 	Daniel Ricciardo 	Red Bull Racing TAG Heuer 	26 	16:52:59 	21.440 	21.440
1 	14 	Fernando Alonso 	McLaren Renault 	26 	16:53:09 	22.573 	22.573
2 	16 	Charles Leclerc 	Sauber Ferrari 	27 	16:56:25 	22.836 	45.078
2 	18 	Lance Stroll 	Williams Mercedes 	29 	16:59:57 	21.397 	46.901`


// Exports

window.f1p5 = window.f1p5 || {}
window.f1p5.samples = {
  practice,
  qualifying,
  race,
  racePits
}