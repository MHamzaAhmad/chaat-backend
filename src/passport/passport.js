import passport from "passport";
import localStrategy from "./strategies/localAuth.js";
import jwtStrategy from "./strategies/jwtStrategy.js";
import googleStrategy from "./strategies/googleStrategy.js";

passport.use("auth", localStrategy);
passport.use("jwt", jwtStrategy);
passport.use("google", googleStrategy);

export default passport;
