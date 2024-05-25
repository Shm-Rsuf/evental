"use server";

const { createUser, foundUserByCredential } = require("@/db/queries");
const { redirect } = require("next/navigation");

async function registerUser(formUser) {
  const user = Object.fromEntries(formUser);
  const created = await createUser(user);

  redirect("/login");
}

async function perfromLogin(formData) {
  console.log(formData);
  const credential = {};
  credential.email = formData.get("email");
  credential.password = formData.get("password");

  const found = await foundUserByCredential(credential);
  if (!found) {
    throw new Error(`User with email ${formData.get("email")} not found`);
  } else {
    redirect("/");
  }
}

export { perfromLogin, registerUser };
