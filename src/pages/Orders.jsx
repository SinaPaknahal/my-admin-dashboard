import { motion } from "framer-motion";

const activities = [
  { id: 1, user: "علی رضایی", action: "سفارش جدید ثبت شد", time: "۲ ساعت پیش" },
  { id: 2, user: "مریم احمدی", action: "وضعیت سفارش تغییر کرد", time: "۴ ساعت پیش" },
  { id: 3, user: "زهرا حسینی", action: "پروفایل به‌روزرسانی شد", time: "۱ روز پیش" },
  { id: 4, user: "احمد کریمی", action: "ثبت سفارش جدید", time: "۲ روز پیش" },
];

export default function RecentActivity() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm transition-all">
      <h3 className="text-gray-800 dark:text-gray-100 font-bold mb-4 text-lg">فعالیت‌های اخیر</h3>
      <ul className="space-y-3 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
        {activities.map((act, i) => (
          <motion.li
            key={act.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg flex justify-between items-center shadow-sm hover:shadow-md transition"
          >
            <span className="text-gray-700 dark:text-gray-200 font-medium">{act.user}:</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">{act.action}</span>
            <span className="text-gray-400 dark:text-gray-300 text-xs">{act.time}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
