// Include resources
var uuid            = require("uuid");
var session         = require("express-session");
var FileStore       = require("session-file-store")(session);
var passport        = require("passport");
var LocalStrategy   = require("passport-local").Strategy;
var cookieParser    = require('cookie-parser');


// CONTROLLER: Index
function Index(req, res, next) {
	passport.authenticate("local", (err, user, info) => {
		console.log('Cookies: ', req.cookies)
		return res.send({
			auth: req.isAuthenticated(),
			sid: req.sessionID,
			user: req.user,
			cookie: req.cookie
		});
	})(req, res, next);
}

function lockdown(req, res) {
	
	res.send({
		auth: req.isAuthenticated(),
		sid: req.sessionID,
		user: user
	});
}


function loginGet(req, res) {
	console.log(req.body);
    res.status(200).send(
    	{ 
    		message: "You got the login page. - uuid: " + req.sessionID, 
    		method: 'GET' 
    	}
    );
}

function authToken(req, res, next) {
	passport.authenticate("local", (err, user, info) => {
		req.login(user, (err) => {
			res.send({
				auth: req.isAuthenticated(),
				sid: req.sessionID,
				user: user
			});
		});
	})(req, res, next);
}


// CONTROLLER: getSingleUser
function getViro(req, res) {
  var users = [];
  var viro = req.params.viro;
  var page = req.params.page;
  
  if(!page) {
	  var page = '/';
  } else {
	  if(page == 'home') {
		  var page = '/';
	  } else {
		  var page = '/' + page;
	  }
  }
  
  if(viro) {
	  if(viro == 'dev1') {
		  var auth = 'qkn:apple@';
	  } else if (viro == 'stage') {
		  var auth = 'qkn:apple@'; 
	  } else {
		  var auth = '';
	  }
  } else {
	  var auth = '';
  }
  
  var url = 'https://' + auth + viro + '.quicken.com' + page;
  
  const request = require('request');

  request(url, function (error, response, body) {
	  if (!error) {
		  
		var version = body.split('\n')[0];
		  
		var viroReport = {
          status: response.statusCode,
          viro: viro,
		  url: url,
		  version: version,
		  headers: response.headers
	  };
        res.status(200).send(viroReport);
	  }
	})
    
  
 }

function logout(req, res) {
	req.logout();
	res.status().send({
		message: "You have been logged out",
		auth: req.isAuthenticated(),
		sid: req.sessionID,
		user: user
	});
}


// Export Controllers
module.exports.Index = Index;  
module.exports.getViro = getViro;  
module.exports.loginGet = loginGet;  
module.exports.authToken = authToken;  
module.exports.lockdown = lockdown;
module.exports.logout = logout;
