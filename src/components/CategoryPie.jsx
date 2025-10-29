import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "دیجیتال", value: 45 },
  { name: "پوشاک", value: 25 },
  { name: "خوراکی", value: 15 },
  { name: "خانه و آشپزخانه", value: 15 },
];

const COLORS = ["#16a34a", "#3b82f6", "#f59e0b", "#8b5cf6"];

export default function CategoryPie() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
      <h3 className="text-gray-800 dark:text-gray-100 font-bold mb-4 text-lg">درصد فروش بر اساس دسته‌بندی</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
