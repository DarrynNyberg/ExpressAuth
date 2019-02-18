var express         = require("express");
var cookieParser    = require('cookie-parser');
var bodyParser      = require("body-parser");
var routes          = require("./routes/routes.js");
var uuid            = require("uuid");
var session         = require("express-session");
var FileStore       = require("session-file-store")(session);
var passport        = require("passport");
var LocalStrategy   = require("passport-local").Strategy;
var axios           = require("axios");
var cors            = require("cors");
var bcrypt          = require("bcrypt-nodejs");
var app             = express();


app.use(cookieParser())
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
	  axios.get(`http://localhost:5000/users?email=${email}`)
	    .then(res => {
	      var user = res.data[0]
	      if (!user) {
	        return done(null, false, { message: 'Invalid credentials.\n' });
	      }
	      if (!bcrypt.compareSync(password, user.password)) {
	        return done(null, false, { message: 'Invalid credentials.\n' });
	      }
	      return done(null, user);
	    })
	    .catch(error => done(error));
  }
));

passport.serializeUser((user, done) => {
		done(null, user.id);
	}
);

passport.deserializeUser((id, done) => {
  axios.get(`http://localhost:5000/users/${id}`)
  .then(res => done(null, res.data) )
  .catch(error => done(error, false))
});

app.use(session({
  genid: (req) => {
    return uuid() // use UUIDs for session IDs
  },
  store: new FileStore(),
  secret: "ping ping",
  resave: true,
  saveUninitialized: false
}))

app.use(cors())
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});
 
