import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import SettingsPage from "./pages/Settings";

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) html.classList.add("dark");
    else html.classList.remove("dark");
  }, [isDark]);

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        <div className={`flex-1 flex flex-col transition-all duration-300 ${collapsed ? "md:mr-[80px]" : "md:mr-[240px]"}`}>
          <Topbar isDark={isDark} setIsDark={setIsDark} setMobileOpen={setMobileOpen} />

          <main className="p-6 text-gray-800 dark:text-gray-200 transition-colors duration-300">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<SettingsPage />} />

            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
