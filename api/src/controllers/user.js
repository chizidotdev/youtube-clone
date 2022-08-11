import User from "../models/User.js";
import { createError } from "../utils/error.js";

//update user
export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return next(createError("User not found", 404));

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError("Unauthorised action", 403));
  }
};

//delete user
export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted.");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError("You can delete only your account!", 403));
  }
};

//get a user
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError("User not found", 404));

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

//subscribe to a user
export const subscribeUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });

    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscription successful.");
  } catch (err) {
    next(err);
  }
};

//unsubscribe from a user
export const unsubscribeUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    if (!user) return next(createError("User not found", 404));

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json("Unsubscribed successfully", updatedUser);
  } catch (err) {
    next(err);
  }
};

//like a video
export const likeVideo = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError("User not found", 404));

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { likes: req.params.videoId } },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

//dislike a video
export const dislikeVideo = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError("User not found", 404));

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { dislikes: req.params.videoId } },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

//get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

//get all subscriptions
export const getAllSubscriptions = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError("User not found", 404));

    const subscriptions = await User.find({
      _id: { $in: user.subscriptions },
    });
    res.status(200).json(subscriptions);
  } catch (err) {
    next(err);
  }
};
