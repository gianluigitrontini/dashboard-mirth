import LoginForm from "@/components/Auth/LoginForm";

const LoginPage = async () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Login</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
