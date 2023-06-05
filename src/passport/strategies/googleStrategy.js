import { Strategy } from "passport-google-oauth2";
import userModel from "../../models/user.js";
import passport from "passport";

const googleStrategy = new Strategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      const user = await userModel.findOne({ googleId: profile.id });
      if (user) {
        return done(null, user, {
          message: "User already exists",
          status: 409,
        });
      }
      const newUser = await userModel.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        provider: "google",
        googleId: profile.id,
      });
      done(null, newUser, {
        message: "User has been authenticated with google",
        status: 201,
      });
    } catch (error) {
      done(error, false, {
        message: "Something went wrong with google auth",
        status: 503,
      });
    }
  }
);

export const googleAuth = (req, res, next) => {
  passport.authenticate("google", { scope: ["email", "profile"] })(
    req,
    res,
    next
  );
};

export const googleAuthCallback = (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user, info) => {
    try {
      if (!user) return res.status(info.status).send({ msg: info.message });
      req.user = user;
      next();
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

export default googleStrategy;
