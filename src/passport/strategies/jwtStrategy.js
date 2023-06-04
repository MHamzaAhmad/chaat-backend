import { Strategy, ExtractJwt } from "passport-jwt";
import User from "../../models/user.js";

const jwtStrategy = new Strategy(
  {
    secretOrKey: process.env.JWT_ACCESS_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    passReqToCallback: true,
  },
  async (req, payload, done) => {
    try {
      const user = await User.findById(payload._id);
      if (!user) return done(null, false, { message: "User does not exist" });

      req.user = user;
      done(null, user, { message: "User is authenticated successfully" });
    } catch (error) {
      return done(error, false, { message: "Something went wrong" });
    }
  }
);

export default jwtStrategy;
