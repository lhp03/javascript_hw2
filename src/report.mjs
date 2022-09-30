import * as sfmovie from "./sfmovie.mjs";
import * as drawing from "./drawing.mjs";

const csvFileName = process.argv[2];

const file = await sfmovie.readData(csvFileName);
const data = await sfmovie.parseData(file);

//report
const longestFunFact = sfmovie.longestFunFact(data);
const movie2021 = sfmovie.getMovies2021(data);
const productionCompany = sfmovie.getProductionCompany(data);

console.log(
  `* The moive ${longestFunFact["Title"]} has the longest fun facts, it was filmed in ${longestFunFact["Release Year"]}`
);
console.log(`* The movies filmed in 2021 are ${movie2021.toString()}.`);
console.log(
  `* Three of production Companies are: ${productionCompany[0]}, ${productionCompany[1]}, ${productionCompany[2]}`
);

//draw SVG
const root = new drawing.RootElement();
const width = 120;
let height = 200;
let x = 0;

const popularActors = sfmovie.mostPopularActors(data);
const color = ["blue", "yellow", "black"];

popularActors.map((actor, index) => {
  const rect = new drawing.RectangleElement(x, 0, width, height, color[index]);
  const t = new drawing.TextElement(
    x,
    250,
    15,
    "black",
    `${actor[0]}, ${actor[1]}`
  );

  root.addChild(rect);
  root.addChild(t);

  x += 200;
  height -= 30;
});
root.write("actors.svg", () => console.log("create actor.svg!"));
