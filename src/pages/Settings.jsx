import { useState } from "react";
import { motion } from "framer-motion";

export default function Settings() {
  const [username, setUsername] = useState("مدیر سیستم");
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm transition-all"
    >
      <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100">تنظیمات کاربری</h2>

      <form onSubmit={handleSave} className="flex flex-col gap-4 w-full max-w-md">
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200">نام کاربری</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200">ایمیل</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200">رمز عبور جدید</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="حداقل ۶ کاراکتر"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200">تکرار رمز عبور</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            ذخیره تغییرات
          </button>
        </div>
      </form>
    </motion.div>
  );
}
