import { readFile, readFileSync } from "fs";
/**
 *
 * Goes through every string argument passed in and picks up the even index parameters (suppose the first parameter has index 0, second has index 1, and so on).
 * No error checking is required;
 * you can assume thatevery argument is a string or no arguments are passed in at all.
 * If there are no arguments passed in, return an empty array
 */
const getEvenParam = (...s) => {
  return [...s].filter((element, index) => {
    return index % 2 === 0;
  });
};

/**
 * maybe will take a function, fn and return an entirely new function that behaves mostly like the original function, fn passed in, but will return undefined if any null or undefined arguments are passed in to fn.
 * The new function will take the same arguments as the original function ( fn ).
 * Consequently when the new function is called, it will use the arguments passed to it and call the old function and return the value that's returned from the old function. However, if any of the arguments are undefined or null , the old function is not called, and undefined is returned instead.
 *  You can think of it as a way of calling the old function only if all of the arguments are not null or not undefined.
 */
const maybe = (fn) => {
  return (...args) => {
    if (args.includes(undefined) || args.includes(null)) {
      return undefined;
    } else {
      return fn(...args);
    }
  };
};

/**
 * This is different from regular filter. The regular version of filter immediately calls the callback function on every element in an Array to return a new Array of filtered elements.
 * filterWith , on the other hand, gives back a function rather than executing the callback immediately (think of the difference between bind and call/apply).
 * filterWith is basically a function that turns another function into a filtering function (a function that works on Arrays).
 */
const filterWith = (fn) => {
  const filterFn = (arr) => {
    return arr.filter(fn);
  };

  return filterFn;
};

/**
 * This function demonstrates using functions as an argument or arguments to another function. It calls function, fn , n times, passing in the argument, arg to each invocation / call.
 * It will ignore the return value of function calls. Note that it passes in only one arg.
 */
const repeatCall = (fn, n, arg) => {
  if (n == 0) {
    return;
  } else {
    fn(arg);
    repeatCall(fn, --n, arg);
  }
};

/**
 * This function is a decorator. See the slides on the decorator pattern (../slides/js/higher-order-functionscontinued.html) for background information.
 * It builds on top of the example in the slides by actually modifying the return value of the original function.
 * This function wraps the function fn and gn in another function so that operations can be performed before and after the original function fn and gn are called.
 * This can be used to modify incoming arguments, modify the return value, or do any other task before or after the function call. Again, we'll be modifying the return value in this case.
 */
const largerFn = (fn, gn) => {
  return (n1, n2) => {
    if (fn(n1) >= gn(n2)) return fn;
    else return gn;
  };
};

/**
 * that a function is called… and prevent the function from being called again if it goes over the max number of allowed function calls.
 */
const limitCallsDecorator = (fn, n) => {
  let call = 0;
  return (...args) => {
    if (call === undefined || call === null) {
      call = 0;
    }
    if (call < n) {
      call++;
      return fn(...args);
    } else {
      return undefined;
    }
  };
};

/**
 * This function gives us an alternative interface to fs.readFile . fs.readFile typically takes a single callback (after the file name) with two arguments: an error object and the data read from the file.
 * This function, instead, takes two callbacks as arguments (both after the file name) – one to be called on success and one to be called on failure.
 * Both callbacks only have one parameter (the data read from the file or an error object).
 * The actual implementation simply calls fs.readFile . Note that you can assume that file read in is text, so pass in a second argument to fs.readFile to read the data as utf-8: fs.readFile('filename.txt', 'utf-8', callback)
 */
const myReadFile = (fileName, successFn, errorFn) => {
  try {
    const data = readFileSync(fileName, "utf-8");
    successFn(data);
  } catch (err) {
    errorFn(err);
  }
};

/**
 * This converts a 2-d array of data.
 * The data should come in as an object where the headers an Array in the headers property of the object, and the data is the value in the rows property of the object
 */
const rowsToObjects = (data) => {
  let new_rows = [];
  data.rows.map((row) => {
    let new_obj = {};
    row.map((elem, index) => {
      new_obj[data.headers[index]] = elem;
    });
    new_rows.push(new_obj);
  });

  return new_rows;
};

export {
  getEvenParam,
  maybe,
  filterWith,
  repeatCall,
  largerFn,
  limitCallsDecorator,
  myReadFile,
  rowsToObjects,
};
