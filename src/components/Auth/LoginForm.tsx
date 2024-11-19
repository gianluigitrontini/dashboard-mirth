import { serverAuth } from "@/actions/authActions";

const LoginForm = async () => {
  return (
    <form action={serverAuth}>
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
          defaultValue="admin"
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
          placeholder="Inserisci la password"
          className="w-full p-2 border border-gray-300 rounded-lg"
          defaultValue="nbs2004!"
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
