import FilterPills from "@/components/Dashboard/FilterPills";
import Header from "@/components/Dashboard/Header/Header";
import MenuLaterale from "@/components/Dashboard/MenuLaterale/MenuLaterale";
import DashboardLayout from "@/components/DashboardLayout";
import LoadingSpinner from "@/components/LoadingSpinner";
import Tabella from "@/components/Tabella/Tabella";
import TabellaBody from "@/components/Tabella/TabellaBody";
import { getDataV2 } from "@/services/data.service";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  let isLoading = false;

  // await loginV2();
  const res: any = await getDataV2("all");
  let data: any[] = res._template || [];

  return (
    <main>
      <section
        className="grid grid-cols-2 grid-rows-2 max-h-screen"
        style={{
          gridTemplateColumns: "150px 1fr",
          gridTemplateRows: "70px 1fr",
        }}
      >
        {/* Occupa 2 colonne */}
        <Header isLoading={isLoading}>
          <FilterPills />
        </Header>
        {/* Fine occupa 2 colonne */}

        <MenuLaterale />

        <section className="w-full p-4 rounded-lg overflow-x-auto h-full">
          {!isLoading && (
            <Tabella>
              <TabellaBody data={data} />
            </Tabella>
          )}
          {isLoading && <LoadingSpinner />}
        </section>
      </section>
    </main>
  );
}
