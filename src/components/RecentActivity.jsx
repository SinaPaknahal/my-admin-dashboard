import { motion } from "framer-motion";

const activities = [
  { id: 1, text: "سفارش جدید ثبت شد", time: "۱ ساعت پیش" },
  { id: 2, text: "کاربر جدید ثبت نام کرد", time: "۲ ساعت پیش" },
  { id: 3, text: "پرداخت موفق", time: "۳ ساعت پیش" },
];

export default function RecentActivity() {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-gray-700 dark:text-gray-200 font-bold mb-4">فعالیت‌های اخیر</h3>
      <ul className="space-y-3">
        {activities.map(a => (
          <li key={a.id} className="text-gray-600 dark:text-gray-300 text-sm">
            {a.text} - <span className="text-gray-400 dark:text-gray-400">{a.time}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
