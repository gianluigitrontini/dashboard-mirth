import FilterPills from "@/components/Dashboard/FilterPills";
import Header from "@/components/Dashboard/Header/Header";
import MenuLaterale from "@/components/Dashboard/MenuLaterale/MenuLaterale";
import Tabella from "@/components/Tabella/Tabella";

export default function Dashboard() {
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
        <Header>
          <FilterPills />
        </Header>
        {/* Fine occupa 2 colonne */}

        <MenuLaterale />

        <section className="p-2 bg-transparent w-full overflow-x-auto h-full">
          <Tabella />
        </section>
      </section>
    </main>
  );
}
