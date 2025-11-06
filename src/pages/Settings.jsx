import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Moon, Bell, ShieldCheck, User, Settings as Cog } from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("account");

  // حالت‌ها
  const [username, setUsername] = useState("مدیر سیستم");
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("/images/avatar-placeholder.png");
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("fa");
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("رمز عبور با تکرار آن مطابقت ندارد!");
      return;
    }
    alert("تنظیمات با موفقیت ذخیره شد!");
    setPassword("");
    setConfirmPassword("");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  const tabs = [
    { id: "account", label: "حساب کاربری", icon: <User size={16} /> },
    { id: "general", label: "تنظیمات عمومی", icon: <Cog size={16} /> },
    { id: "security", label: "امنیت", icon: <ShieldCheck size={16} /> },
  ];

  const fadeVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm transition-all"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        تنظیمات سیستم
      </h2>

      {/* تب‌بار */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-medium transition 
              ${
                activeTab === tab.id
                  ? "bg-green-500 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* محتوای تب‌ها */}
      <AnimatePresence mode="wait">
        {/* حساب کاربری */}
        {activeTab === "account" && (
          <motion.div
            key="account"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
              <div className="relative group">
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-28 h-28 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700 shadow-md group-hover:opacity-80 transition"
                />
                <label className="absolute bottom-1 right-1 bg-green-500 hover:bg-green-600 text-white p-2 rounded-full cursor-pointer shadow-md transition">
                  <Camera size={16} />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>

              <div className="text-center sm:text-right">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {username}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{email}</p>
                <p className="text-xs mt-1 text-gray-400">نقش: مدیر سیستم</p>
              </div>
            </div>

            <form
              onSubmit={handleSave}
              className="flex flex-col gap-4 w-full max-w-md"
            >
              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-200">
                  نام کاربری
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-200">
                  ایمیل
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <h4 className="mt-4 font-semibold text-gray-700 dark:text-gray-200">
                تغییر رمز عبور
              </h4>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="رمز عبور جدید"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="تکرار رمز عبور"
              />

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="px-5 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition"
                >
                  ذخیره تغییرات
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* تنظیمات عمومی */}
        {activeTab === "general" && (
          <motion.div
            key="general"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6 max-w-md"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <Moon size={18} />
                <span>فعال‌سازی حالت تاریک</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-green-400 rounded-full peer dark:bg-gray-600 peer-checked:bg-green-500 transition-all"></div>
                <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-5 transition-all"></span>
              </label>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-200">زبان سیستم</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="fa">فارسی</option>
                <option value="en">English</option>
              </select>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <Bell size={18} />
                <span>اعلان‌های سیستم</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-green-400 rounded-full peer dark:bg-gray-600 peer-checked:bg-green-500 transition-all"></div>
                <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-5 transition-all"></span>
              </label>
            </div>
          </motion.div>
        )}

        {/* امنیت */}
        {activeTab === "security" && (
          <motion.div
            key="security"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex justify-between items-center max-w-md"
          >
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
              <ShieldCheck size={20} />
              <span>ورود دو مرحله‌ای (Two-Factor Auth)</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={twoFactor}
                onChange={() => setTwoFactor(!twoFactor)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-green-400 rounded-full peer dark:bg-gray-600 peer-checked:bg-green-500 transition-all"></div>
              <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-5 transition-all"></span>
            </label>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
