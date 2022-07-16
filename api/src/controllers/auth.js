import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    const user = await newUser.save();
    res.status(201).json("user created successfully");
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await newUser.findOne({ name: req.body.name });
    if (!user) return next(createError("User not found", 404));

    // bcrypt compare password
    const isValid = bcrypt.compare(req.body.password, user.password);
    if (!isValid) return next(createError("Invalid credentials", 401));

    // create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  } catch (err) {
    next(err);
  }
};
