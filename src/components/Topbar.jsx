import { Menu, Sun, Moon, Bell, UserCircle, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Topbar({ isDark, setIsDark, setMobileOpen }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-30 transition-colors duration-300">
      <button
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={() => setMobileOpen(true)}
      >
        <Menu />
      </button>

      <div className="flex items-center gap-3 ms-auto">
        {/* دارک/لایت مود */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* نوتیفیکیشن */}
        <div className="relative">
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative transition-colors duration-300">
            <Bell size={20} />
            <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full">
              3
            </span>
          </button>
        </div>

        {/* پروفایل */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            <UserCircle size={26} />
            <span className="hidden sm:inline text-sm font-medium">مدیر</span>
          </button>

          {profileOpen && (
            <div className="absolute left-0 mt-2 w-44 bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 animate-fadeIn transition-colors duration-300">
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                <p className="text-sm font-semibold">سینا پاکنهال</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">مدیر سیستم</p>
              </div>
              <ul className="text-sm">
                <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  پروفایل
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  تنظیمات
                </li>
                <li className="px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2">
                  <LogOut size={16} />
                  خروج
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
