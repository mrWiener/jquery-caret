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

  it('performs as expected', function (done) {
    this.browser.title(function(err, title) {
      if(err) throw err;

      expect(title).to.equal('test');
      done();
    });
  });

  describe('text input: empty', function() {
    it('should return right caret index when not focused', function(done) {
      var browser = this.browser;

      browser.elementById('text1', function(err, element) {
        if(err) throw err;

        browser.click(element, function(err) {
          if(err) throw err;

          browser.execute('return $("#text1").caret();',
          function(err, result) {
            if(err) throw err;

            expect(result).to.equal(0);
            done();
          });
        });
      });
    });

    it('should return right caret index when focused', function(done) {
      var browser = this.browser;

      browser.elementById('text1', function(err, element) {
        if(err) throw err;

        browser.click(element, function(err) {
          if(err) throw err;

          browser.execute('return $("#text1").focus().caret();',
          function(err, result) {
            if(err) throw err;

            expect(result).to.equal(0);
            done();
          });
        });
      });
    });
  });

  after(function(done) {
    this.browser.quit(function() {
      done();
    });
  });
});

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