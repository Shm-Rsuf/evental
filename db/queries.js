import { eventModel } from "@/models/event-model";
import { userModel } from "@/models/user-mode";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-utils";
import mongoose from "mongoose";

async function getAllEvents(query) {
  let allEvents = [];
  if (!query) {
    allEvents = await eventModel.find().lean();
  } else {
    const regex = new RegExp(query, "i");
    allEvents = await eventModel.find({ name: { $regex: regex } }).lean();
  }
  return replaceMongoIdInArray(allEvents);
}

async function getSingleEvent(eventId) {
  const event = await eventModel.findById(eventId).lean();

  return replaceMongoIdInObject(event);
}

async function createUser(user) {
  return await userModel.create(user);
}

async function foundUserByCredential(credential) {
  const user = await userModel.findOne(credential).lean();
  if (user) {
    return replaceMongoIdInObject(user);
  }

  return null;
}

async function updateInterested(eventId, authId) {
  const event = await eventModel.findById(eventId);

  if (event) {
    const foundUsers = await event.interested_ids.find(
      (id) => id.toString() === authId
    );

    if (foundUsers) {
      event.interested_ids.pull(new mongoose.Types.ObjectId(authId));
    } else {
      event.interested_ids.push(new mongoose.Types.ObjectId(authId));
    }
    event.save();
  }
}

async function updateGoing(eventId, authId) {
  const event = await eventModel.findById(eventId);
  if (event) {
    event.going_ids.push(new mongoose.Types.ObjectId(authId));
  }
  event.save();
}

export {
  createUser,
  foundUserByCredential,
  getAllEvents,
  getSingleEvent,
  updateGoing,
  updateInterested,
};
