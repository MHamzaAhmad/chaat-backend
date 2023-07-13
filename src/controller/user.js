import userModel from "../models/user.js";
import _ from "lodash";

export const create = async (req, res, next) => {
  try {
    const oldUser = await userModel.findOne({ email: req.body.email });
    if (oldUser) return res.status(409).send({ msg: "User already exists" });
    const user = await userModel.create(req.body);
    delete user._doc.password;
    req.user = user._doc;
    next();
  } catch (error) {
    return next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await userModel.find();
    if (_.isEmpty(users))
      return res.status(404).send({ msg: "No users found in the database" });
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    return res.status(200).send({ user: req.user });
  } catch (error) {
    return next(error);
  }
};
