"use server";

const { createUser, foundUserByCredential } = require("@/db/queries");
const { redirect } = require("next/navigation");

async function registerUser(formUser) {
  const user = Object.fromEntries(formUser);
  const created = await createUser(user);

  redirect("/login");
}

async function perfromLogin(formData) {
  const credential = {};
  credential.email = formData.get("email");
  credential.password = formData.get("password");

  const found = await foundUserByCredential(credential);
  console.log("found =", found);
  if (found) {
    redirect("/");
  } else {
    throw new Error(`User with email ${formData.get("email")} not found`);
  }
}

export { perfromLogin, registerUser };
