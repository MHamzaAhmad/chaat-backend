import { Strategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import User from "../../models/user.js";

const jwtStrategy = new Strategy(
  {
    secretOrKey: process.env.JWT_ACCESS_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    passReqToCallback: true,
  },
  async (req, payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (!user)
        return done(null, false, {
          message: "User does not exist",
          status: 404,
        });

      done(null, user, {
        message: "User is authenticated successfully",
        status: 200,
      });
    } catch (error) {
      return done(error, false, {
        message: "Something went wrong",
        status: 401,
      });
    }
  }
);

export const jwtAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    try {
      if (!user)
        return res.status(info.status ?? 401).send({ msg: info.message });
      req.user = user;
      next();
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

export default jwtStrategy;
