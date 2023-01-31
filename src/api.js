/**
 * 
 * @param {*} events:
 * the following function should be in the "api.js" file.
 * this function takes an events array, then uses map to create a new array with only locations.
 * it will also remove all duplicates by createing another new arry using the spread operator and spreading a set.
 * the set will remove all duplicates from the array.
 */

export const extractLocations = (event) => {
  let extractLocations = event.map((event) => event.location);
  let locations = [...new Set(extractLocations)];
  return locations;
};