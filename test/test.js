//-------------------------------------------------------------------
// Dependencies
//-------------------------------------------------------------------

var webdriver = require('wd');
var expect = require('expect.js');
var connect = require('connect');
//var request = require('request');

//-------------------------------------------------------------------
// Tests
//-------------------------------------------------------------------

describe('jquery-caret', function () {
  var browser = this.browser;

  before(function(done) {
    var port = 8888;

    connect.createServer(connect().use(connect.static('test/html'))).listen(port);
    
    this.browser.get('http://localhost:' + port + '/test.html', function(err) {
      if(err) throw err;

      done();
    });
  });

  describe('.caret()', function() {
    var browser = this.browser;

    it('should be a function', function(done) {
      this.browser.execute('return typeof $().caret;', function(err, result) {
        if(err) throw err;

        expect(result).to.equal('function');
        done();
      });
    });

    it('should return right index of empty focused input', function(done) {
      getFocusCaret(this.browser, '#text1', 0, done);
    });

    it('should return right index of focused input containging text', function(done) {
      getFocusCaret(this.browser, '#text2', 0, done);
    });

    it('should return right index of focused input containging text with spaces', function(done) {
      getFocusCaret(this.browser, '#text3', 0, done);
    });
  });

  after(function(done) {
    this.browser.quit(function() {
      done();
    });
  });
});

//-------------------------------------------------------------------
// Private functions
//-------------------------------------------------------------------

function getFocusCaret(browser, selector, expected, done) {
  browser.execute('return $("' + selector + '").focus().caret();', function(err, result) {
    if(err) throw err;

    expect(result).to.equal(expected);
    done();
  });
}

/*
function jobPassed(jobId, username, key, done) {
  var httpOpts = {
    url: 'http://' + username + ':' + key + '@saucelabs.com/rest/v1/' + username + '/jobs/' + jobId,
    method: 'PUT',
    headers: {
      'Content-Type': 'text/json'
    },
    body: JSON.stringify({
          passed: true,
          'public': true,
          build: process.env.TRAVIS_JOB_ID || Math.round(new Date().getTime() / (1000*60))
        }),
    jar: false //disable cookies: avoids CSRF issues
  };

  request(httpOpts, function(err, res) {
    done(err);
  });
};
/*
function jobUpdate(jobId, name, tags, username, key, done) {
  var httpOpts = {
    url: 'http://' + username + ':' + key + '@saucelabs.com/rest/v1/' + username + '/jobs/' + jobId,
    method: 'PUT',
    headers: {
      'Content-Type': 'text/json'
    },
    body: JSON.stringify({
          name: name,
          tags: tags,
          "record-video": false
        }),
    jar: false // disable cookies: avoids CSRF issues
  };

  request(httpOpts, function(err, res) {
    done(err);
  });
};*/