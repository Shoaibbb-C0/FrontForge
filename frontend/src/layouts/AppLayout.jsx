import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AppLayout() {
  return (
    <div className="min-h-screen bg-forge-bg text-forge-text lg:flex">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <div className="mx-auto w-full max-w-[1600px] px-5 py-8 sm:px-7 lg:px-10 lg:py-10 xl:px-14">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;