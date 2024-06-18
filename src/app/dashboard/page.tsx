import DashboardLayout from "@/components/DashboardLayout";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const loggedIn = true;

  // if (!loggedIn) {
  //   redirect("/");
  // }

  return (
    <main>
      <DashboardLayout></DashboardLayout>
    </main>
  );
}
