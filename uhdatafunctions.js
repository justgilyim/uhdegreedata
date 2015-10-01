/** Created by Gilbert on 9/30/2015. */
/**
 *  This file contains functions that deal with the University of Hawaii Degrees Awarded data set.
 */
/*globals _, uhdata */
/*exported add, totalDegrees, isHawaiian, hawaiianLegacy, totalHawaiians, percentageHawaiian, checkYear, yearData, totalDegreesByYear */
/*exported listCampuses, campusGroup, listCampusDegrees, yearGroup, maxDegrees, isDoctoral, doctoral, doctoralDegreePrograms */
/**
 * Adds up the amount of degrees awarded
 * @param memo
 * @param record
 * @returns total awards
 */
var add = function(memo, record){
  return memo + record["AWARDS"];
};

/**
 * Calculates the total number of degrees awarded
 * @param uhdata
 * @returns total number of degrees awarded in the data set
 */
var totalDegrees = function(data){
  return _.reduce(data, add, 0);
};

/**
 * Determines if the awarded person is Hawaiian or not
 * @param record
 * @returns is Hawaiian or not
 */
var isHawaiian = function(record) {
  return record["HAWAIIAN_LEGACY"] === "HAWAIIAN";
};

/**
 * Sorts the data set into Hawaiian only
 * @param data
 * @returns an array that contains all people of Hawaiian heritage
 */
var hawaiianLegacy = function(data){
  return _.filter(data, isHawaiian);
};

/**
 * Calculates the total amount of Hawaiian awardees
 * @param data
 * @returns Total amount of Hawaiian awardees
 */
var totalHawaiians = function(data){
  return _.reduce(hawaiianLegacy(data), add ,0);
};

/**
 * Calculates the percentage of awarded degrees are Hawaiian
 * @param data
 * @returns the percentage of awarded degrees that are Hawaiian.
 */
var percentageHawaiian = function(data){
  return (totalHawaiians(data) / totalDegrees(data))*100;
};

/**
 * Checks the fiscal year when the degrees are awarded
 * @param year
 * @returns if a degree was awarded the same year or not
 */
var checkYear = function(year){
  return function(record){
    return record["FISCAL_YEAR"] === year;
  };
};

/**
 * Sorts the uhdata set into the provided fiscal year only
 * @param data
 * @param year
 * @returns an array containing all awarded degrees in the provided year
 */
var yearData = function(data, year){
  return _.filter(data, checkYear(year));
};

/**
 * Calculates the total amount of degrees awarded in the provided fiscal year
 * @param data
 * @param year
 * @returns the total amount of degrees awarded that year
 */
var totalDegreesByYear= function(data, year){
  return _.reduce(yearData(data, year), add, 0);
};

/**
 * List all the unique campuses in the University of Hawaii system
 * @param data
 * @returns a list of all the unique campuses in the UH system
 */
var listCampuses = function(data){
  return _.unique(_.pluck(data, "CAMPUS"));
};

/**
 * Sorts the uhdataset by the different campuses in the UH system
 * @param data
 * @returns a dataset sorted into the different campuses in the UH system
 */
var campusGroup = function(data){
  return _.groupBy(data, "CAMPUS");
};

/**
 * Calculates the total awarded degrees of each UH campus
 * @param data
 * @returns total awarded degree of each UH campus
 */
var listCampusDegrees = function(data){
  return _.mapObject(campusGroup(data), function(value){
    return _.reduce(value, add, 0);
  });
};

/**
 * Sorts the uhdataset by each fiscal year
 * @param data
 * @returns a dataset sorted into each fiscal year
 */
var yearGroup = function(data){
  return _.groupBy(data, "FISCAL_YEAR");
};

/**
 * Determines the highest amount of awarded degrees of all the fiscal years
 * @param data
 * @returns the highest amount of awarded degrees of all fiscal years
 */
var maxDegrees = function(data){
  return _.max(_.mapObject(yearGroup(data), function(value){
    return _.reduce(value, add, 0);
  }));
};

/**
 * Determines if the degree in the uhdataset is a doctorate degree or not
 * @param record
 * @returns if the it is a doctorate degree or not
 */
var isDoctoral = function(record){
  return record["OUTCOME"] === "Doctoral Degrees";
};

/**
 * Sorts uhdata set into doctorate degrees only
 * @param data
 * @returns an array that contains only doctorate degrees
 */
var doctoral = function(data){
  return _.filter(data, isDoctoral);
};

/**
 * Returns all the unique doctorate degrees
 * @param data
 * @returns a list of all the unique doctorage degrees found in the uhdataset
 */
var doctoralDegreePrograms = function(data){
  return _.unique(_.pluck(doctoral(data), "CIP_DESC"));
};

console.log(totalDegrees(uhdata));
console.log(percentageHawaiian(uhdata));
console.log(totalDegreesByYear(uhdata, 2010));
console.log(listCampuses(uhdata));
console.log(listCampusDegrees(uhdata));
console.log(maxDegrees(uhdata));
console.log(doctoralDegreePrograms(uhdata));