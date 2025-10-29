import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const data = [
  { month: "فروردین", users: 120 },
  { month: "اردیبهشت", users: 200 },
  { month: "خرداد", users: 180 },
  { month: "تیر", users: 220 },
  { month: "مرداد", users: 160 },
  { month: "شهریور", users: 240 },
];

export default function UsersBarChart() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
      <h3 className="text-gray-800 dark:text-gray-100 font-bold mb-4 text-lg">کاربران جدید</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{ backgroundColor: '#f9fafb', borderRadius: '8px', border: 'none' }}
            itemStyle={{ color: '#111827' }}
          />
          <Bar dataKey="users" fill="#16a34a" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
