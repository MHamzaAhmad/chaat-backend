import { Strategy } from "passport-local";
import User from "../../models/user.js";

const localStrategy = new Strategy(
  {
    usernameField: "email",
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) return done(null, false, { message: "User does not exist" });
      const isValid = await User.validatePassword(password);
      if (!isValid)
        return done(null, false, { message: "Password is not valid" });

      done(null, user, { message: "User is authenticated" });
    } catch (error) {
      return done(error, false, { message: "You are not authorized" });
    }
  }
);

export default localStrategy;
