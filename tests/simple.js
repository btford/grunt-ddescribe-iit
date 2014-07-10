'use strict';

var should = require('should');

var checkFile = require('../tasks/lib/check-file');

describe('check-file', function () {
  var defaultDisallowed = ["iit", "xit", "ddescribe", "xdescribe"];

  it('should return undefined if there are no problems', function () {
    should.not.exist(checkFile("it('is a-ok')", defaultDisallowed));
  });

  it('should return an array if there is `iit`', function () {
    should.exist(checkFile("iit('is not a-ok')", defaultDisallowed));
  });

  it('should return an array if there is `ddescribe`', function () {
    should.exist(checkFile("ddescribe('is not a-ok')", defaultDisallowed));
  });

  it('should return an array if there is `xit`', function () {
    should.exist(checkFile("xit('is not a-ok')", defaultDisallowed));
  });

  it('should return an array if there is `xit` after `exit`', function () {
    should.exist(checkFile("exit(0);xit('is not a-ok')", defaultDisallowed));
    should.exist(checkFile("it('is a-ok');exit(0);xit('is not a-ok')", defaultDisallowed));
  });

  it('should return an array if there is `xdescribe`', function () {
    should.exist(checkFile("xdescribe('is not a-ok')", defaultDisallowed));
  });

  it('should give the line number of the problem', function () {
    var problems = checkFile("ddescribe('is not a-ok')", defaultDisallowed);
    problems.length.should.equal(1);
    should.equal(problems[0].line, 1);

    problems = checkFile("\n\niit('is not a-ok')", defaultDisallowed);
    problems.length.should.equal(1);
    should.equal(problems[0].line, 3);

    problems = checkFile("\n\n\n\n\nxit('is not a-ok')", defaultDisallowed);
    problems.length.should.equal(1);
    should.equal(problems[0].line, 6);
  });

  it('should not treat `exit` as `xit`', function () {
    should.not.exist(checkFile("exit()"));
  });

  it('should allow cutom disallowed keywords', function () {
    should.not.exist(checkFile("xit('is a-ok to use custom disallowed keywords')", ["iit", "ddescribe"]));
  });

  it('should pass if there are no disallowed keywords', function () {
    should.not.exist(checkFile("xit('is a-ok to use custom disallowed keywords')"));
    should.not.exist(checkFile("xit('is a-ok to use custom disallowed keywords')", []));
    should.not.exist(checkFile("xit('is a-ok to use custom disallowed keywords')", {}));
    });

});
