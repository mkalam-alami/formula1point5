export interface ITeam {
  shortName: string;
  color: string;
  carPicture: string;
}

export interface ITeams {[key: string]: ITeam; }

export class Season {

  public tyres: string[];
  public teams: ITeams;
  public teamsThatDontExist: string[];

  constructor({tyres, teams, teamsThatDontExist}:
    {
      tyres: string[],
      teams: ITeams,
      teamsThatDontExist: string[],
    }) {
      this.tyres = tyres;
      this.teams = teams;
      this.teamsThatDontExist = teamsThatDontExist;
  }

  get caseSensitiveTyres(): boolean {
    const tyreString = this.tyres.join(" ");
    return tyreString.toLowerCase() === tyreString
      || tyreString.toUpperCase() === tyreString;
  }

  get spacesOptionalForTyres(): boolean {
    return this.tyres.find((s) => s.length > 1) === undefined;
  }

}

export const season2019 = new Season({
  tyres: ["H", "M", "S"],
  teams: {
    "alfa romeo racing ferrari": { shortName: "Alfa Romeo", color: "#920209", carPicture: "car-sauber.jpg" },
    "haas ferrari": { shortName: "Haas", color: "#535459", carPicture: "car-haas.jpg" },
    "mclaren renault": { shortName: "McLaren", color: "#e58a17", carPicture: "car-mclaren.jpg" },
    "racing point bwt mercedes": { shortName: "Racing Point", color: "#eb9ac3", carPicture: "car-forceindia.jpg" },
    "renault": { shortName: "Renault", color: "#f7f31c", carPicture: "car-renault.jpg" },
    "scuderia toro rosso honda": { shortName: "Toro Rosso", color: "#3362bd", carPicture: "car-tororosso.jpg" },
    "williams mercedes": { shortName: "Williams", color: "#eff0f4", carPicture: "car-williams.jpg" },
  },
  teamsThatDontExist: [
    "mercedes",
    "ferrari",
    "red bull racing honda",
  ],
});

export const season2018 = new Season({
  tyres: [ "HS", "US", "SS", "S", "M", "H", "SH", "I", "W"],
  teams: {
    "force india mercedes": { shortName: "Force India", color: "#eb9ac3", carPicture: "car-forceindia.jpg" },
    "haas ferrari": { shortName: "Haas", color: "#535459", carPicture: "car-haas.jpg" },
    "mclaren renault": { shortName: "McLaren", color: "#e58a17", carPicture: "car-mclaren.jpg" },
    "renault": { shortName: "Renault", color: "#f7f31c", carPicture: "car-renault.jpg" },
    "sauber ferrari": { shortName: "Sauber", color: "#920209", carPicture: "car-sauber.jpg" },
    "scuderia toro rosso honda": { shortName: "Toro Rosso", color: "#3362bd", carPicture: "car-tororosso.jpg" },
    "williams mercedes": { shortName: "Williams", color: "#eff0f4", carPicture: "car-williams.jpg" },
  },
  teamsThatDontExist: [
    "mercedes",
    "ferrari",
    "red bull racing tag heuer",
  ],
});
