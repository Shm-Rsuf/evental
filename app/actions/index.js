"use server";

import { revalidatePath } from "next/cache";

const {
  createUser,
  foundUserByCredential,
  updateInterested,
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

export { addInterested, perfromLogin, registerUser };
