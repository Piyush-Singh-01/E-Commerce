import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./AdminSidebar";
import Navbar from "./AdminNavbar";

function AdminLayout() {

  const [isMenu, setIsMenu] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-100">

      <Sidebar isMenu={isMenu} setIsMenu={setIsMenu} />

      <div className="flex min-w-0 flex-1 flex-col">

        <Navbar setIsMenu={setIsMenu} />

        <main className="min-h-0 flex-1 overflow-y-auto bg-slate-100 p-6">

          <Outlet />

        </main>

      </div>

    </div>
  );
}

export default AdminLayout;