export default function RecentActivity() {
  const activities = [
    "سفارش جدید از کاربر محمد ثبت شد",
    "کاربر سارا حساب خود را ارتقا داد",
    "درآمد امروز ۲.۳ میلیون تومان افزایش یافت",
    "کاربر جدید: علی احمدی ثبت‌نام کرد",
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
      <h3 className="text-gray-800 dark:text-gray-100 font-bold mb-4 text-lg">فعالیت‌های اخیر</h3>
      <ul className="space-y-3">
        {activities.map((item, i) => (
          <li key={i} className="text-gray-700 dark:text-gray-300 text-sm border-b border-gray-200 dark:border-gray-700 pb-2">
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
