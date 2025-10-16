import { Home, ShoppingBag, Users, Settings, ChevronRight, X } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const navigate = useNavigate();

  const menus = [
    { title: "داشبورد", icon: <Home size={20} />, path: "/" },
    { title: "سفارش‌ها", icon: <ShoppingBag size={20} />, path: "/orders" },
    { title: "کاربران", icon: <Users size={20} />, path: "/users" },
    { title: "تنظیمات", icon: <Settings size={20} />, path: "/settings" },
  ];

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full bg-white dark:bg-gray-800 shadow-sm z-40 transition-all duration-300
          ${collapsed ? "w-[80px]" : "w-[240px]"} 
          ${mobileOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700 md:border-none">
          {!collapsed && <h1 className="text-xl font-bold text-green-600 select-none">فروشگاه</h1>}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ChevronRight className={`transition-transform ${collapsed ? "rotate-180" : ""}`} />
            </button>

            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X />
            </button>
          </div>
        </div>

        <nav className="mt-4 space-y-1">
          {menus.map((menu, i) => (
            <div
              key={i}
              onClick={() => {
                navigate(menu.path);
                setMobileOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-xl transition"
            >
              {menu.icon}
              {!collapsed && <span>{menu.title}</span>}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
