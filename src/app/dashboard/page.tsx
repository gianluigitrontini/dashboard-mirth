"use client";
import FilterPills from "@/components/Dashboard/FilterPills";
import Header from "@/components/Dashboard/Header/Header";
import MenuLaterale from "@/components/Dashboard/MenuLaterale/MenuLaterale";
import LoadingSpinner from "@/components/LoadingSpinner";
import Tabella from "@/components/Tabella/Tabella";
import TabellaBody from "@/components/Tabella/TabellaBody";
import { useDashboardTemplate } from "@/services/fetch.service";

export default function Dashboard() {
  const { data, error, isLoading } = useDashboardTemplate();

  return (
    <main>
      <section
        className="grid grid-cols-2 grid-rows-2 max-h-screen"
        style={{
          gridTemplateColumns: "150px 1fr",
          gridTemplateRows: "auto 1fr",
        }}
      >
        {/* Occupa 2 colonne */}
        <Header isLoading={isLoading}>
          <FilterPills />
        </Header>
        {/* Fine occupa 2 colonne */}

        <MenuLaterale />

        <section className="p-2 bg-transparent w-full overflow-x-auto h-full">
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
