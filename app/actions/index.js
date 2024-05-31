"use server";

import EmailTemplate from "@/components/payments/EmailTemplate";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const {
  createUser,
  foundUserByCredential,
  updateInterested,
  updateGoing,
  getSingleEvent,
} = require("@/db/queries");
const { redirect } = require("next/navigation");

async function registerUser(formUser) {
  const user = Object.fromEntries(formUser);
  const created = await createUser(user);

  redirect("/login");
}

async function perfromLogin(formData) {
  try {
    const credential = {};
    credential.email = formData.get("email");
    credential.password = formData.get("password");
    const found = await foundUserByCredential(credential);
    return found;
  } catch (error) {
    throw error;
  }
}

async function addInterested(eventId, authId) {
  try {
    await updateInterested(eventId, authId);
  } catch (error) {
    throw error;
  }

  revalidatePath("/");
}

async function addGoingEvent(eventId, user) {
  try {
    await updateGoing(eventId, user?.id);
    await sendEmail(eventId, user);
  } catch (error) {
    throw error;
  }
  revalidatePath("/");
  redirect("/");
}

async function sendEmail(eventId, user) {
  const event = await getSingleEvent(eventId);
  const resend = new Resend(process.env.RESEND_API_KEY);
  const message = `Dear ${user?.name}, 
  you have been successfully registered for the event, ${event?.name}. Please carry this email and your official id to the venue. We are excited to have you here.`;

  const sent = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: user.email,
    subject: "Successfully registered for the event",
    react: EmailTemplate({ message }),
  });
}

export { addGoingEvent, addInterested, perfromLogin, registerUser };
