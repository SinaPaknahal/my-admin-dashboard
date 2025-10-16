import { ShoppingBag, Users, DollarSign, BarChart3 } from "lucide-react";

export default function DashboardCards() {
  const stats = [
    {
      title: "سفارش‌ها",
      value: "۱,۲۵۰",
      icon: <ShoppingBag size={24} />,
      color: "bg-green-500",
    },
    {
      title: "کاربران",
      value: "۸۹۰",
      icon: <Users size={24} />,
      color: "bg-blue-500",
    },
    {
      title: "درآمد",
      value: "۴۵,۰۰۰,۰۰۰ تومان",
      icon: <DollarSign size={24} />,
      color: "bg-yellow-500",
    },
    {
      title: "بازدیدها",
      value: "۱۲,۳۰۰",
      icon: <BarChart3 size={24} />,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {stats.map((item, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {item.title}
              </p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1">
                {item.value}
              </h3>
            </div>
            <div
              className={`${item.color} text-white p-3 rounded-xl flex items-center justify-center`}
            >
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
