'use strict';

var should = require('should');

var checkFile = require('../tasks/lib/check-file');

describe('check-file', function () {

  it('should return undefined if there are no problems', function () {
    should.not.exist(checkFile("it('is a-ok')"));
  });

  it('should return an array if there is `iit`', function () {
    should.exist(checkFile("iit('is not a-ok')"));
  });

  it('should return an array if there is `ddescribe`', function () {
    should.exist(checkFile("ddescribe('is not a-ok')"));
  });

  it('should return an array if there is `xit`', function () {
    should.exist(checkFile("xit('is not a-ok')"));
  });

  it('should return an array if there is `xdescribe`', function () {
    should.exist(checkFile("xdescribe('is not a-ok')"));
  });

  it('should give the line number of the problem', function () {
    var problems = checkFile("\n\niit('is not a-ok')");
    problems.length.should.equal(1);
    should.equal(problems[0].line, 3);
  });

});
