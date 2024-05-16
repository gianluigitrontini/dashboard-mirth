import Dashboard from "@/components/Dashboard";
import { login, loginV2 } from "@/services/login.service";

export default async function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Dashboard></Dashboard>
    </main>
  );
}
