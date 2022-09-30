import { readFile } from "fs";
import { parse } from "csv-parse";

const readData = (fileName) => {
  readFile(fileName, "utf-8", (err, result) => {
    let content = [];
    if (err) throw err;
    parse(result, (err, records) => {
      if (err) throw err;
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
        //console.log(obj);
        content.push(obj);
      });
    });
    return content;
  });
};

/**
 * gives back the whole object which has the longest fun fact. (you can just
    count length of the string in Fun Facts column) If there's a tie, return any of them.
 */
const longestFunFact = (data) => {};

/**
 *  gives back an array of UNIQUE movie names in 2021
 */
const getMovies2021 = (data) => {};

/**
 * gives back an array of UNIQUE production companies
 */
const getProductionCompany = (data) => {};

/**
 * gives back an Array containing the top three actor names, together with
    most occurrences in the movies (you can either return an object or a nested array, as long as it contains
    both the actor name and the corresponding occurrence, you should be good). The occurrence should
    be counted from all three columns "Actor 1", "Actor 2", and "Actor 3". (When counting values in these
    columns, ignore empty string and undefined values). Okay to count actor if movie appears more than
 */
const mostPopularActors = (data) => {};

console.log(readData("./data/Film_Locations_in_San_Francisco.csv"));
