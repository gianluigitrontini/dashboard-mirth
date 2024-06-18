import FilterPills from "./Dashboard/FilterPills";
import Header from "./Dashboard/Header/Header";
import MenuLaterale from "./Dashboard/MenuLaterale/MenuLaterale";
import LoadingSpinner from "./LoadingSpinner";
import Tabella from "./Tabella/Tabella";

const DashboardLayout = async () => {
  let isLoading = false;

  return (
    <section
      className="grid grid-cols-2 grid-rows-2 max-h-screen"
      style={{
        gridTemplateColumns: "150px 1fr",
        gridTemplateRows: "70px 1fr",
      }}
    >
      <Header isLoading={isLoading} />

      <MenuLaterale />

      <div className="w-full p-4 rounded-lg overflow-x-auto h-full">
        {!isLoading && <Tabella />}
        {isLoading && <LoadingSpinner />}
      </div>
    </section>
  );
};

export default DashboardLayout;
