/* global _, uhdata, totalDegrees, isHawaiian */
describe("TotalDegrees", function() {
  var testdata = uhdata.slice(0,2).concat(_.find(uhdata,isHawaiian));

  it("should compute the total number of awards for correctly specified sample data", function() {
    expect(totalDegrees(testdata)).toEqual(403);
  });

  var noAwardsField = testdata.concat({foo:"bar"});

  it("should throw an error when record does not have the AWARDS field", function() {
    expect(function(){totalDegrees(noAwardsField);}).toThrowError("No AWARDS field.");
  });

  var nonNumericaAwards = testdata.concat({"AWARDS":"bar"});

  it("should throw an error when record has a non-numeric AWARDS field", function() {
    expect(function(){totalDegrees(nonNumericaAwards);}).toThrowError("Non-numeric AWARDS.");
  });
});
