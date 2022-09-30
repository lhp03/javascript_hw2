import { readFile } from "fs";
import { parse } from "csv-parse";

const readData = async (fileName) => {
  const file = await new Promise((resolve, reject) => {
    return readFile(fileName, "utf-8", (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
  return file;
};

const parseData = async (file) => {
  const data = await new Promise((resolve, reject) => {
    return parse(file, (err, records) => {
      if (err) return reject(err);
      else {
        let data = [];
        let head = records.shift();

        records.map((record) => {
          let obj = {};
          obj[head[0]] = record[0];
          obj[head[1]] = record[1];
          obj[head[2]] = record[2];
          obj[head[3]] = record[3];
          obj[head[4]] = record[4];
          obj[head[5]] = record[5];
          obj[head[6]] = record[6];
          obj[head[7]] = record[7];
          obj[head[8]] = record[8];
          obj[head[9]] = record[9];
          obj[head[10]] = record[10];

          data.push(obj);
        });

        return resolve(data);
      }
    });
  });

  return data;
};

/**
 * gives back the whole object which has the longest fun fact. (you can just
    count length of the string in Fun Facts column) If there's a tie, return any of them.
 */
const longestFunFact = (data) => {
  let funniestIndex = 0;
  let funniestLength = 0;

  data.map((elem, index) => {
    if (funniestLength < elem["Fun Facts"].length) {
      funniestIndex = index;
      funniestLength = elem["Fun Facts"].length;
    }
  });

  return data[funniestIndex];
};

/**
 *  gives back an array of UNIQUE movie names in 2021
 */
const getMovies2021 = (data) => {
  let movies = [];

  data.map((elem) => {
    if (elem["Release Year"] === "2021" && !movies.includes(elem["Title"])) {
      movies.push(elem["Title"]);
    }
  });

  return movies;
};

/**
 * gives back an array of UNIQUE production companies
 */
const getProductionCompany = (data) => {
  let companies = [];

  data.map((elem) => {
    if (!companies.includes(elem["Production Company"])) {
      companies.push(elem["Production Company"]);
    }
  });

  return companies;
};

/**
 * gives back an Array containing the top three actor names, together with
    most occurrences in the movies (you can either return an object or a nested array, as long as it contains
    both the actor name and the corresponding occurrence, you should be good). The occurrence should
    be counted from all three columns "Actor 1", "Actor 2", and "Actor 3". (When counting values in these
    columns, ignore empty string and undefined values). Okay to count actor if movie appears more than
 */
const mostPopularActors = (data) => {
  let occurActor = {};

  data.map((elem) => {
    let col = ["Actor 1", "Actor 2", "Actor 3"];
    col.map((c) => {
      if (elem[c] === "") {
        return;
      } else if (
        occurActor[elem[c]] === undefined ||
        occurActor[elem[c]] === null
      ) {
        occurActor[elem[c]] = 1;
      } else {
        occurActor[elem[c]] += 1;
      }
    });
  });

  const sortActor = Object.keys(occurActor).sort((a, b) => {
    return occurActor[b] - occurActor[a];
  });

  return [
    [sortActor[0], occurActor[sortActor[0]]],
    [sortActor[1], occurActor[sortActor[1]]],
    [sortActor[2], occurActor[sortActor[2]]],
  ];
};

/*
const file = await readData("./data/Film_Locations_in_San_Francisco.csv");
const data = await parseData(file);

console.log(longestFunFact(data));
console.log(getMovies2021(data));
console.log(getProductionCompany(data));
console.log(mostPopularActors(data));
*/

export {
  readData,
  parseData,
  longestFunFact,
  getMovies2021,
  getProductionCompany,
  mostPopularActors,
};
