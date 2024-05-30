"use client";

import { perfromLogin } from "@/app/actions";
import useAuth from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { setAuth } = useAuth();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const formData = new FormData(evt.currentTarget);
      const found = await perfromLogin(formData);
      if (found) {
        setAuth(found);
        router.push("/");
      } else {
        setError("please provide a valid credentials");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <div className='my-2 text-red-500'>{error}</div>
      <form className='login-form' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email Address</label>
          <input type='email' name='email' id='email' />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' />
        </div>

        <button
          type='submit'
          className='btn-primary w-full mt-4 bg-indigo-600 hover:bg-indigo-800'
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
