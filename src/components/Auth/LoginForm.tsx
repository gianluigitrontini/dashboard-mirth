"use client";
import { loginV2 } from "@/services/login.service";
import { FormEvent } from "react";

const LoginForm = () => {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    await loginV2();

    // Handle response if necessary
    // const data = await response.json();
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-6">
        <label
          htmlFor="name"
          className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
        >
          Email o Username
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Inserisci lo username"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Inserisc la password"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-lg"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
