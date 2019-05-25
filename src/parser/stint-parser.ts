import { Season } from "../data/seasons";

/**
 * Converts a string representing a tyre stint into HTML markup for rendering.
 * @param stintString
 * @param season
 */
export function stintToMarkup(stintString: string, season: Season): string {
  const availableTyres = season.tyres.map((tyre: string) => tyre.toUpperCase());

  return stintString
    .trim()
    .split(season.spacesOptionalForTyres ? /[ \t]*/g : /[ \t]+/g)
    .map((tyreCode: string) => tyreCode.toUpperCase())
    .map((tyreCode) => {
      if (availableTyres.includes(tyreCode)) {
        // Expected tyre classes follow the format [code][year]
        return '<span class="tyre"><img src="images/tyre.png" class="'
          + tyreCode + season.year + '" />' + tyreCode + "</span>";
      } else {
        return "";
      }
    })
    .join("");
}
