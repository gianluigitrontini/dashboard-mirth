import { getDataV2 } from "@/services/data.service";
import Header from "./Dashboard/Header/Header";
import MenuLaterale from "./Dashboard/MenuLaterale/MenuLaterale";
import LoadingSpinner from "./LoadingSpinner";
import Tabella from "./Tabella/Tabella";
import TabellaBody from "./Tabella/TabellaBody";
import BottoneMenu from "./Dashboard/MenuLaterale/BottoneMenu";
import { refreshData } from "@/actions/fetchData";
import FilterPills from "./Dashboard/FilterPills";

const DashboardLayout = async () => {
  let isLoading = false;

  // await loginV2();
  const res: any = await getDataV2("all");
  let data: any[] = res._template || [];

  return (
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
  );
};

export default DashboardLayout;
