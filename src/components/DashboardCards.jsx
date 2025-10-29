export default function DashboardCards() {
  const cards = [
    { title: "کل فروش", value: "۴۲,۵۰۰,۰۰۰ تومان", color: "bg-green-500" },
    { title: "کاربران جدید", value: "۱,۲۴۰ نفر", color: "bg-blue-500" },
    { title: "سفارشات امروز", value: "۲۳ عدد", color: "bg-yellow-500" },
    { title: "درآمد خالص", value: "۳۱,۲۰۰,۰۰۰ تومان", color: "bg-purple-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`p-5 rounded-2xl shadow-sm text-white ${card.color} dark:opacity-90`}
        >
          <p className="text-sm opacity-90">{card.title}</p>
          <h3 className="text-2xl font-bold mt-2">{card.value}</h3>
        </div>
      ))}
    </div>
  );
}
