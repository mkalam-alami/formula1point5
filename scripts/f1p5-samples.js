const practice = `Pos 	No 	Driver 	Car 	Time 	Gap 	Laps
1 	44 	Lewis Hamilton 	Mercedes 	1:23.599 		26
2 	5 	Sebastian Vettel 	Ferrari 	1:23.637 	+0.038s 	18
3 	16 	Charles Leclerc 	Ferrari 	1:23.673 	+0.074s 	18
4 	33 	Max Verstappen 	Red Bull Racing Honda 	1:23.792 	+0.193s 	22
5 	77 	Valtteri Bottas 	Mercedes 	1:23.866 	+0.267s 	30
6 	7 	Kimi Räikkönen 	Alfa Romeo Racing Ferrari 	1:24.816 	+1.217s 	18
7 	26 	Daniil Kvyat 	Scuderia Toro Rosso Honda 	1:24.832 	+1.233s 	30
8 	10 	Pierre Gasly 	Red Bull Racing Honda 	1:24.932 	+1.333s 	23
9 	20 	Kevin Magnussen 	Haas Ferrari 	1:24.934 	+1.335s 	24
10 	27 	Nico Hulkenberg 	Renault 	1:25.015 	+1.416s 	11
11 	99 	Antonio Giovinazzi 	Alfa Romeo Racing Ferrari 	1:25.166 	+1.567s 	23
12 	8 	Romain Grosjean 	Haas Ferrari 	1:25.224 	+1.625s 	18
13 	23 	Alexander Albon 	Scuderia Toro Rosso Honda 	1:25.230 	+1.631s 	21
14 	55 	Carlos Sainz 	McLaren Renault 	1:25.285 	+1.686s 	19
15 	18 	Lance Stroll 	Racing Point BWT Mercedes 	1:25.288 	+1.689s 	26
16 	11 	Sergio Perez 	Racing Point BWT Mercedes 	1:25.498 	+1.899s 	21
17 	3 	Daniel Ricciardo 	Renault 	1:25.634 	+2.035s 	16
18 	4 	Lando Norris 	McLaren Renault 	1:25.966 	+2.367s 	31
19 	88 	Robert Kubica 	Williams Mercedes 	1:27.914 	+4.315s 	25
20 	63 	George Russell 	Williams Mercedes 	1:28.740 	+5.141s 	25`

const qualifying = `Pos 	No 	Driver 	Car 	Q1 	Q2 	Q3 	Laps
1 	44 	Lewis Hamilton 	Mercedes 	1:22.043 	1:21.014 	1:20.486 	18
2 	77 	Valtteri Bottas 	Mercedes 	1:22.367 	1:21.193 	1:20.598 	19
3 	5 	Sebastian Vettel 	Ferrari 	1:22.885 	1:21.912 	1:21.190 	16
4 	33 	Max Verstappen 	Red Bull Racing Honda 	1:22.876 	1:21.678 	1:21.320 	17
5 	16 	Charles Leclerc 	Ferrari 	1:22.017 	1:21.739 	1:21.442 	17
6 	8 	Romain Grosjean 	Haas Ferrari 	1:22.959 	1:21.870 	1:21.826 	17
7 	20 	Kevin Magnussen 	Haas Ferrari 	1:22.519 	1:22.221 	1:22.099 	18
8 	4 	Lando Norris 	McLaren Renault 	1:22.702 	1:22.423 	1:22.304 	21
9 	7 	Kimi Räikkönen 	Alfa Romeo Racing Ferrari 	1:22.966 	1:22.349 	1:22.314 	17
10 	11 	Sergio Perez 	Racing Point BWT Mercedes 	1:22.908 	1:22.532 	1:22.781 	15
11 	27 	Nico Hulkenberg 	Renault 	1:22.540 	1:22.562 		10
12 	3 	Daniel Ricciardo 	Renault 	1:22.921 	1:22.570 		12
13 	23 	Alexander Albon 	Scuderia Toro Rosso Honda 	1:22.757 	1:22.636 		14
14 	99 	Antonio Giovinazzi 	Alfa Romeo Racing Ferrari 	1:22.431 	1:22.714 		14
15 	26 	Daniil Kvyat 	Scuderia Toro Rosso Honda 	1:22.511 	1:22.774 		13
16 	18 	Lance Stroll 	Racing Point BWT Mercedes 	1:23.017 			6
17 	10 	Pierre Gasly 	Red Bull Racing Honda 	1:23.020 			6
18 	55 	Carlos Sainz 	McLaren Renault 	1:23.084 			6
19 	63 	George Russell 	Williams Mercedes 	1:24.360 			9
20 	88 	Robert Kubica 	Williams Mercedes 	1:26.067 			8`

const race = `Pos 	No 	Driver 	Car 	Laps 	Time/Retired 	PTS
1 	77 	Valtteri Bottas 	Mercedes 	58 	1:25:27.325 	26
2 	44 	Lewis Hamilton 	Mercedes 	58 	+20.886s 	18
3 	33 	Max Verstappen 	Red Bull Racing Honda 	58 	+22.520s 	15
4 	5 	Sebastian Vettel 	Ferrari 	58 	+57.109s 	12
5 	16 	Charles Leclerc 	Ferrari 	58 	+58.230s 	10
6 	20 	Kevin Magnussen 	Haas Ferrari 	58 	+87.156s 	8
7 	27 	Nico Hulkenberg 	Renault 	57 	+1 lap 	6
8 	7 	Kimi Räikkönen 	Alfa Romeo Racing Ferrari 	57 	+1 lap 	4
9 	18 	Lance Stroll 	Racing Point BWT Mercedes 	57 	+1 lap 	2
10 	26 	Daniil Kvyat 	Scuderia Toro Rosso Honda 	57 	+1 lap 	1
11 	10 	Pierre Gasly 	Red Bull Racing Honda 	57 	+1 lap 	0
12 	4 	Lando Norris 	McLaren Renault 	57 	+1 lap 	0
13 	11 	Sergio Perez 	Racing Point BWT Mercedes 	57 	+1 lap 	0
14 	23 	Alexander Albon 	Scuderia Toro Rosso Honda 	57 	+1 lap 	0
15 	99 	Antonio Giovinazzi 	Alfa Romeo Racing Ferrari 	57 	+1 lap 	0
16 	63 	George Russell 	Williams Mercedes 	56 	+2 laps 	0
17 	88 	Robert Kubica 	Williams Mercedes 	55 	+3 laps 	0
NC 	8 	Romain Grosjean 	Haas Ferrari 	29 	DNF 	0
NC 	3 	Daniel Ricciardo 	Renault 	28 	DNF 	0
NC 	55 	Carlos Sainz 	McLaren Renault 	9 	DNF 	0`

const racePits = `Stops 	No 	Driver 	Car 	Lap 	Time of day 	Time 	Total
1 	88 	Robert Kubica 	Williams Mercedes 	1 	16:15:28 	32.997 	32.997
1 	3 	Daniel Ricciardo 	Renault 	1 	16:15:30 	33.027 	33.027
1 	7 	Kimi Räikkönen 	Alfa Romeo Racing Ferrari 	12 	16:31:50 	23.299 	23.299
1 	27 	Nico Hulkenberg 	Renault 	13 	16:33:19 	21.588 	21.588
1 	11 	Sergio Perez 	Racing Point BWT Mercedes 	13 	16:33:28 	23.234 	23.234
1 	5 	Sebastian Vettel 	Ferrari 	14 	16:34:28 	21.995 	21.995
1 	20 	Kevin Magnussen 	Haas Ferrari 	14 	16:34:47 	22.388 	22.388
1 	23 	Alexander Albon 	Scuderia Toro Rosso Honda 	14 	16:34:57 	21.780 	21.780
1 	44 	Lewis Hamilton 	Mercedes 	15 	16:35:52 	21.515 	21.515
1 	8 	Romain Grosjean 	Haas Ferrari 	15 	16:36:19 	29.981 	29.981
1 	4 	Lando Norris 	McLaren Renault 	15 	16:36:25 	21.627 	21.627
1 	77 	Valtteri Bottas 	Mercedes 	23 	16:47:33 	22.014 	22.014
1 	33 	Max Verstappen 	Red Bull Racing Honda 	25 	16:50:47 	21.157 	21.157
1 	26 	Daniil Kvyat 	Scuderia Toro Rosso Honda 	26 	16:52:54 	22.086 	22.086
1 	63 	George Russell 	Williams Mercedes 	26 	16:53:46 	21.689 	21.689
1 	18 	Lance Stroll 	Racing Point BWT Mercedes 	27 	16:54:21 	22.471 	22.471
1 	99 	Antonio Giovinazzi 	Alfa Romeo Racing Ferrari 	27 	16:54:58 	27.172 	27.172
1 	16 	Charles Leclerc 	Ferrari 	28 	16:55:26 	22.306 	22.306
2 	88 	Robert Kubica 	Williams Mercedes 	28 	16:58:10 	22.343 	55.340
1 	10 	Pierre Gasly 	Red Bull Racing Honda 	37 	17:09:14 	21.269 	21.269
2 	63 	George Russell 	Williams Mercedes 	42 	17:18:18 	21.543 	43.232
3 	88 	Robert Kubica 	Williams Mercedes 	44 	17:22:42 	21.889 	1:17.229`


// Exports

window.f1p5 = window.f1p5 || {}
window.f1p5.samples = {
  practice,
  qualifying,
  race,
  racePits
}