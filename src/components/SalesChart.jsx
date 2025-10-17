import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { month: "فروردین", sales: 12000000 },
  { month: "اردیبهشت", sales: 15000000 },
  { month: "خرداد", sales: 17000000 },
  { month: "تیر", sales: 14000000 },
];

export default function SalesChart() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm transition-all">
      <h3 className="text-gray-800 dark:text-gray-100 font-bold mb-4 text-lg">نمودار فروش ماهانه</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{ backgroundColor: '#f9fafb', borderRadius: '8px', border: 'none' }}
            itemStyle={{ color: '#111827' }}
          />
          <Line type="monotone" dataKey="sales" stroke="#16a34a" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
