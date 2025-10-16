import { motion } from "framer-motion";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-4">
        <Settings size={22} />
        تنظیمات سیستم
      </h2>

      <div className="space-y-4">
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200">تنظیمات پروفایل</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">مدیریت اطلاعات کاربری و امنیت.</p>
        </div>

        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200">تنظیمات داشبورد</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">شخصی‌سازی نمایش داشبورد و اعلان‌ها.</p>
        </div>
      </div>
    </motion.div>
  );
}
