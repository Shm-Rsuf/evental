import { eventModel } from "@/models/event-model";
import { userModel } from "@/models/user-mode";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-utils";

async function getAllEvents() {
  const allEvents = await eventModel.find().lean();
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
  const user = await userModel.findOne(credential);

  return user;
}

export { createUser, foundUserByCredential, getAllEvents, getSingleEvent };
