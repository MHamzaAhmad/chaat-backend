import jwt from "jsonwebtoken";

const generateTokens = (req, res, next) => {
  try {
    const { _id, name, email, role, provider } = req.user;
    const payload = {
      id: _id,
      name,
      email,
      role,
      provider,
    };
    return res.status(200).send(getTokens(payload));
  } catch (error) {
    return next(error);
  }
};

const refreshToken = (req, res, next) => {
  try {
    const rt = req.headers["x-refresh-token"];
    if (!rt) {
      return res
        .status(401)
        .send({ msg: "Refresh token is missing in the request" });
    }
    jwt.verify(rt, process.env.JWT_RFRESH_SECRET, (err, decoded) => {
      if (err) return res.status(401).send({ msg: "Refresh token is expired" });

      const data = {
        accessToken: getNewAccessToken(decoded),
        refreshToken: rt,
      };

      return res.status(200).send(data);
    });
  } catch (error) {
    next(error);
  }
};

const getTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "1000",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_RFRESH_SECRET, {
    expiresIn: "30d",
  });
  return { accessToken, refreshToken };
};

const getNewAccessToken = (data) => {
  const { id, name, email, role, provider } = data;
  const payload = {
    id,
    name,
    email,
    role,
    provider,
  };
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "1h",
  });
};

export { generateTokens, refreshToken };
