import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

const initialOrders = [
  { id: 1, customer: "علی رضایی", total: "۳۲۰,۰۰۰ تومان", status: "در انتظار" },
  { id: 2, customer: "مریم احمدی", total: "۵۰۰,۰۰۰ تومان", status: "پرداخت شده" },
  { id: 3, customer: "زهرا حسینی", total: "۱,۲۰۰,۰۰۰ تومان", status: "لغو شده" },
];

export default function Orders() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <ShoppingBag size={22} />
          مدیریت سفارش‌ها
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <th className="py-3 px-4">شماره</th>
              <th className="py-3 px-4">مشتری</th>
              <th className="py-3 px-4">مبلغ</th>
              <th className="py-3 px-4">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {initialOrders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/40">
                <td className="py-3 px-4">{order.id}</td>
                <td className="py-3 px-4">{order.customer}</td>
                <td className="py-3 px-4">{order.total}</td>
                <td className="py-3 px-4">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
