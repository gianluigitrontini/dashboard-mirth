import { BASE_URL } from "@/services/rest.service";

const LoginForm = () => {
  const auth = async (e: any) => {
    try {
      await fetch(`${BASE_URL}/api/v2/login`, {
        method: "POST",
      });
    } catch (error: any) {
      console.log(error);
      return { msg: error.msg, status: error.status };
    }
  };

  return (
    <form onClick={auth}>
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
