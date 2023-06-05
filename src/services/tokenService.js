import jwt from "jsonwebtoken";

const generateTokens = (req, res, next) => {
  try {
    const { name, email, role, provider } = req.user;
    const payload = {
      name,
      email,
      role,
      provider,
    };
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_RFRESH_SECRET, {
      expiresIn: "30d",
    });
    return res.status(200).send({ accessToken, refreshToken });
  } catch (error) {
    return next(error);
  }
};

export { generateTokens };
