import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { motion } from "framer-motion";

const data = [
  { name: "فروردین", sales: 12000000 },
  { name: "اردیبهشت", sales: 15000000 },
  { name: "خرداد", sales: 10000000 },
  { name: "تیر", sales: 18000000 },
];

export default function SalesChart() {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-gray-700 dark:text-gray-200 font-bold mb-4">نمودار فروش</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis stroke="#8884d8" />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="#4ade80" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
