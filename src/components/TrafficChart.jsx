import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "شنبه", visitors: 230 },
  { day: "یکشنبه", visitors: 320 },
  { day: "دوشنبه", visitors: 290 },
  { day: "سه‌شنبه", visitors: 410 },
  { day: "چهارشنبه", visitors: 380 },
  { day: "پنج‌شنبه", visitors: 450 },
  { day: "جمعه", visitors: 370 },
];

export default function TrafficChart() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
      <h3 className="text-gray-800 dark:text-gray-100 font-bold mb-4 text-lg">بازدید روزانه</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorV" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#16a34a" stopOpacity={0.4}/>
              <stop offset="90%" stopColor="#16a34a" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="day" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip />
          <Area type="monotone" dataKey="visitors" stroke="#16a34a" fillOpacity={1} fill="url(#colorV)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
