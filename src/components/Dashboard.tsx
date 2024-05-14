import LoadingSpinner from "./LoadingSpinner";
import Tabella from "./Tabella/Tabella";

const Dashboard = async () => {
  let isLoading = false;

  const reload = async () => {};

  return (
    <>
      <header className="bg-gray-100 flex items-center justify-between h-[var(--header-size)]">
        <div className="p-2">MENU</div>
      </header>

      <div
        className="grid bg-gray-100 p-2 flex-1 h-full"
        style={{ gridTemplateColumns: "150px 1fr" }}
      >
        <div></div>

        {/* <div onClick={() => reload()}>Reload</div> */}

        <div className=" bg-white p-4 rounded-lg overflow-x-auto max-h-[93vh] h-full">
          {!isLoading && <Tabella />}
          {isLoading && <LoadingSpinner />}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
