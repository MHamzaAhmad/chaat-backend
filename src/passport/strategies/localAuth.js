import { Strategy } from "passport-local";
import User from "../../models/user.js";
import passport from "passport";

const localStrategy = new Strategy(
  {
    usernameField: "email",
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email }).select("+password");
      if (!user)
        return done(null, false, {
          message: "User does not exist",
          status: 404,
        });
      const isValid = await user.validatePassword(password);
      if (!isValid)
        return done(null, false, {
          message: "Password is not valid",
          status: 409,
        });

      delete user._doc.password;

      done(null, user._doc, { message: "User is authenticated", status: 200 });
    } catch (error) {
      return done(error, false, {
        message: "You are not authorized",
        status: 401,
      });
    }
  }
);

export const localAuth = (req, res, next) => {
  passport.authenticate("auth", { session: false }, (err, user, info) => {
    try {
      if (!user) {
        return res.status(info.status).send({ msg: info.message });
      }
      req.user = user;
      next();
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

export default localStrategy;
