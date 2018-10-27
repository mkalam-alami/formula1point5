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

const qualifying = `POS	NO	DRIVER	CAR	Q1	Q2	Q3	LAPS
1	3	Daniel Ricciardo	RED BULL RACING TAG HEUER	1:15.866	1:15.845	1:14.759	16
2	33	Max Verstappen	RED BULL RACING TAG HEUER	1:15.756	1:15.640	1:14.785	15
3	44	Lewis Hamilton	MERCEDES	1:15.673	1:15.644	1:14.894	20
4	5	Sebastian Vettel	FERRARI	1:16.089	1:15.715	1:14.970	16
5	77	Valtteri Bottas	MERCEDES	1:15.580	1:15.923	1:15.160	22
6	7	Kimi Räikkönen	FERRARI	1:16.446	1:15.996	1:15.330	20
7	27	Nico Hulkenberg	RENAULT	1:16.498	1:16.126	1:15.827	18
8	55	Carlos Sainz	RENAULT	1:16.813	1:16.188	1:16.084	18
9	16	Charles Leclerc	SAUBER FERRARI	1:16.862	1:16.320	1:16.189	20
10	9	Marcus Ericsson	SAUBER FERRARI	1:16.701	1:16.633	1:16.513	20
11	31	Esteban Ocon	FORCE INDIA MERCEDES	1:16.252	1:16.844		16
12	14	Fernando Alonso	MCLAREN RENAULT	1:16.857	1:16.871		12
13	11	Sergio Perez	FORCE INDIA MERCEDES	1:16.242	1:17.167		16
14	28	Brendon Hartley	SCUDERIA TORO ROSSO HONDA	1:16.682	1:17.184		12
15	10	Pierre Gasly	SCUDERIA TORO ROSSO HONDA	1:16.828			11
16	8	Romain Grosjean	HAAS FERRARI	1:16.911			9
17	2	Stoffel Vandoorne	MCLAREN RENAULT	1:16.966			6
18	20	Kevin Magnussen	HAAS FERRARI	1:17.599			9
19	18	Lance Stroll	WILLIAMS MERCEDES	1:17.689			5
20	35	Sergey Sirotkin	WILLIAMS MERCEDES	1:17.886			6`

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