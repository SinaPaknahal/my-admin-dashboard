import { motion } from "framer-motion";
import { Users, ShoppingBag, DollarSign, Eye } from "lucide-react";

const cards = [
  { title: "کاربران", value: "۱,۲۴۵", icon: Users, color: "bg-blue-500" },
  { title: "سفارش‌ها", value: "۳۲۰", icon: ShoppingBag, color: "bg-green-500" },
  { title: "درآمد", value: "۴۵,۰۰۰,۰۰۰ تومان", icon: DollarSign, color: "bg-yellow-500" },
  { title: "بازدیدها", value: "۸,۴۰۰", icon: Eye, color: "bg-pink-500" },
];

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map(({ title, value, icon: Icon, color }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          whileHover={{ scale: 1.03, boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}
          className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-2xl shadow p-5 transition-all"
        >
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-1">{value}</h3>
          </div>
          <div className={`${color} text-white p-3 rounded-xl`}>
            <Icon size={24} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
