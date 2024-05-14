import Dashboard from "@/components/Dashboard";
import { login } from "@/services/login.service";

export default async function Home() {
  await login();

  return (
    <main className="min-h-screen flex flex-col">
      <Dashboard></Dashboard>
    </main>
  );
}
