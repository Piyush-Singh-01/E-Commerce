import { useLocation, useNavigate } from "react-router-dom";

import { RxDashboard } from "react-icons/rx";
import { HiOutlineUsers } from "react-icons/hi";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { FaBorderNone } from "react-icons/fa";
import { GoCodeReview } from "react-icons/go";
import { TbMessageReport } from "react-icons/tb";
import { MdOutlineInventory } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

import { AiOutlineMenu } from "react-icons/ai";
import { FiX } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

function Sidebar({isMenu, setIsMenu}) {

  const navigate = useNavigate();
  const location = useLocation();


  const menuItems = [
    {
      name: "Dashboard",
      icon: RxDashboard,
      path: "/admin",
    },
    {
      name: "Users",
      icon: HiOutlineUsers,
      path: "/admin/user",
    },
    {
      name: "Products",
      icon: MdProductionQuantityLimits,
      path: "/admin/products",
    },
    {
      name: "Inventory",
      icon: MdOutlineInventory,
      path: "/admin/inventory",
    },
    // {
    //   name: "Categories",
    //   icon: BiCategory,
    //   path: "/admin/category",
    // },
    {
      name: "Orders",
      icon: FaBorderNone,
      path: "/admin/orders",
    },
    // {
    //   name: "Reviews",
    //   icon: GoCodeReview,
    //   path: "/admin/review",
    // },
    // {
    //   name: "Reports",
    //   icon: TbMessageReport,
    //   path: "/admin/report",
    // },
  ];
  
  const {logout, user} = useAuth();


  const isActive = (path) => {
    if (path === "/admin") { 
      return location.pathname === "/admin";
    }

    return location.pathname.startsWith(path);
  };

  const handleNavigation = (path)=>{
       navigate(path);
       setIsMenu(false);
  }

  
  return (
   <>
   {/* Mobile / Tablet Overlay */}
    {isMenu && (
      <div 
         onClick={()=> setIsMenu(false)}
         className="fixed inset-0 z-40 bg-black/20 lg:hidden"
      >

      </div>
    )}
     <aside 
       className={`
       fixed inset-y-0 left-0 z-50 flex h-screen w-64   
       shrink-0 flex-col bg-[#111827] text-white 
       shadow-xl transition-transform duration-300
       ease-in-out lg:static lg:z-auto lg:translate-x-0
       lg:shadow-none 
       ${ isMenu ? "translate-x-0" : "-translate-x-full" }
      `}>
    
       {/* LOGO   */}
      <div className="relative flex h-16 shrink-0 items-center border-b border-white/10 px-6">


        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-600/20">

            <span className="text-sm font-bold text-white">C</span>

          </div>

          <div>

            <h1 className="text-[20px] font-bold tracking-wide bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 bg-clip-text text-transparent">
              Cartify
            </h1>

            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
              Admin Panel
            </p>
          </div>

        </div>
        
        <button
           onClick={() => setIsMenu(false)} 
           className="absolute right-4 cursor-pointer flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white lg:hidden"
         >
           <FiX className="text-xl " />

         </button>

      </div>

      {/*  NAVIGATION  */}
      <nav className="flex-1 overflow-y-auto px-3 py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Main Menu
        </p>

        {/* Menu Items */}
        <div className="space-y-1">

          {menuItems.map((item) => {

            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.name}
                onClick={()=> handleNavigation(item.path)}
                className={`group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >

                <Icon
                  className={`shrink-0 text-[20px] transition-colors ${
                    active
                      ? "text-white"
                      : "text-slate-500 group-hover:text-slate-300"
                  }`}
                />

                <span className="truncate"> {item.name} </span>

                {active && (
                  <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                )}

              </button>
            );
          })}

        </div>

      </nav>

      {/*  BOTTOM SECTION  */}
      <div className="shrink-0 border-t border-white/10 p-3">

        {/* Admin Profile */}
        <div className="mb-2 flex items-center gap-3 rounded-xl bg-white/5 p-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600 shadow-sm">

            <span className="text-sm font-semibold text-white">P</span>

          </div>


          {/* User Information */}
          <div className="min-w-0 flex-1">

            <p className="truncate text-sm font-semibold text-white">{user?.username}</p>

            <p className="truncate text-xs text-slate-500">Administrator</p>

          </div>

        </div>

        {/* Logout */}
        <button
          onClick={()=> logout() }
          className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium cursor-pointer text-slate-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400"
        >

          <FiLogOut className="text-lg transition-transform group-hover:translate-x-0.5" />

          <span>Logout </span>

        </button>

      </div>

    </aside>

   </> 
  );
}

export default Sidebar;
