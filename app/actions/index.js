"use server";

const { createUser, foundUserByCredential } = require("@/db/queries");
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

export { perfromLogin, registerUser };
