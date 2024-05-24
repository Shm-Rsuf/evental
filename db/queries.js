import { eventModel } from "@/models/event-model";
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

export { getAllEvents, getSingleEvent };
