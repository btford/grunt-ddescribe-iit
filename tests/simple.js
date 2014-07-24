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

  it('should return an array if there is `xit` after `exit`', function () {
    should.exist(checkFile("exit(0);xit('is not a-ok')"));
    should.exist(checkFile("it('is a-ok');exit(0);xit('is not a-ok')"));
  });

  it('should return an array if there is `xdescribe`', function () {
    should.exist(checkFile("xdescribe('is not a-ok')"));
  });

  it('should give the line number of the problem', function () {
    var problems = checkFile("ddescribe('is not a-ok')");
    problems.length.should.equal(1);
    should.equal(problems[0].line, 1);

    problems = checkFile("\n\niit('is not a-ok')");
    problems.length.should.equal(1);
    should.equal(problems[0].line, 3);

    problems = checkFile("\n\n\n\n\nxit('is not a-ok')");
    problems.length.should.equal(1);
    should.equal(problems[0].line, 6);
  });

  it('should not treat `exit` as `xit`', function () {
    should.not.exist(checkFile("exit()"));
  });

  it("should still fail a check with exceptions given, but the exception not included", function () {
      should.exist(checkFile("xit('is not a-ok, still'); ddescribe('is a-ok, but only because of exceptions');", ["xdescribe", "iit", "ddescribe"]));
  });

  it("should allow a single exception to be passed in an array", function () {
      should.not.exist(checkFile("xdescribe('is a-ok in this case')", ["xdescribe"]));
  });

  it("should allow multiple exceptions to be passed in an array", function () {
      should.not.exist(checkFile("iit('is a-ok in this case'); ddescribe('is a-ok, but only because of exceptions');", ["xdescribe", "iit", "ddescribe"]));
  });

});
