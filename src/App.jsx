import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import SettingsPage from "./pages/Settings";
import Products from "./pages/Products";
import Login from "./pages/Login";

// مسیرهای محافظت‌شده
function ProtectedRoute({ loggedIn, children }) {
  if (!loggedIn) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // دارک مود
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) html.classList.add("dark");
    else html.classList.remove("dark");
  }, [isDark]);

  return (
    <Router>
      <Routes>
        {/* صفحه لاگین */}
        <Route
          path="/login"
          element={<Login onLogin={() => setLoggedIn(true)} />}
        />

        {/* مسیرهای محافظت‌شده */}
        <Route
          path="/*"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
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
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/users" element={<Users />} />
                      <Route path="/settings" element={<SettingsPage />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
