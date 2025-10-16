import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import DashboardCards from "./components/DashboardCards";
import "./App.css";

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // بعد از mount، کلاس dark رو روی html اعمال می‌کنیم
  useEffect(() => {
    const html = document.documentElement;

    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            collapsed ? "md:mr-[80px]" : "md:mr-[240px]"
          }`}
        >
          <Topbar
            isDark={isDark}
            setIsDark={setIsDark}
            setMobileOpen={setMobileOpen}
          />

          <main className="p-6 text-gray-800 dark:text-gray-200 transition-colors duration-300">
            <h2 className="text-2xl font-bold mb-4">خلاصه عملکرد</h2>
            <DashboardCards />
          </main>
        </div>
      </div>
    </div>
  );
}
