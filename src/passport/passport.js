import passport from "passport";
import localStrategy from "./strategies/localAuth.js";
import jwtStrategy from "./strategies/jwtStrategy.js";

passport.use("auth", localStrategy);
passport.use("jwt", jwtStrategy);

export default passport;
