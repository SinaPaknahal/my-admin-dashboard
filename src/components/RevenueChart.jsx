import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const data = [
  { name: "شنبه", income: 4.2 },
  { name: "یکشنبه", income: 5.6 },
  { name: "دوشنبه", income: 3.8 },
  { name: "سه‌شنبه", income: 6.1 },
  { name: "چهارشنبه", income: 5.3 },
  { name: "پنج‌شنبه", income: 7.2 },
  { name: "جمعه", income: 4.9 },
];

export default function RevenueChart() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
      <h3 className="text-gray-800 dark:text-gray-100 font-bold mb-4 text-lg">درآمد هفتگی (میلیون تومان)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip />
          <Bar dataKey="income" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
