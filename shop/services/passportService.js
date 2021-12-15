var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const GoogleStrategy = require('passport-google-oauth20').Strategy;

require('dotenv').config();

const userService = require('./user');

passport.serializeUser((user, done) => done(null, user.id));   //this will add id to req.user object
passport.deserializeUser(async(id, done) => {
  done(null, { id })
});

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await userService.login({username, password});  // custom function that checks user and validates password
      return done(null,user);
    } catch(error) {
      return done(error)
    }
  }
));


passport.use(new GoogleStrategy({
  // Options object
  callbackURL: '/google/callback', // this is given on Google Console as Authorized Redirect URI 
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,   
}, async(accessToken, refreshToken, profile, done) => {
  try {
      const user = await userService.loginGoogle(profile.displayName, profile.emails[0].value, profile.id);
      return done(null,user); 
  } catch(error) {
      return done(error);
  }
})
)