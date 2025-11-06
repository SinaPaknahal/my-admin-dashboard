import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ShoppingCart, User, RefreshCcw, Search, X } from "lucide-react";

const allActivities = [
  {
    id: 1,
    user: "علی رضایی",
    action: "سفارش جدید ثبت شد",
    time: "۲ ساعت پیش",
    type: "order",
    details: "سفارش شامل ۳ کالا با مجموع مبلغ ۲.۴۵۰.۰۰۰ تومان بوده است.",
  },
  {
    id: 2,
    user: "مریم احمدی",
    action: "وضعیت سفارش تغییر کرد",
    time: "۴ ساعت پیش",
    type: "status",
    details: "سفارش شماره ۱۲۴۵ از 'در حال پردازش' به 'ارسال شده' تغییر یافت.",
  },
  {
    id: 3,
    user: "زهرا حسینی",
    action: "پروفایل به‌روزرسانی شد",
    time: "۱ روز پیش",
    type: "profile",
    details: "اطلاعات آدرس و شماره تماس کاربر بروزرسانی شد.",
  },
  {
    id: 4,
    user: "احمد کریمی",
    action: "ثبت سفارش جدید",
    time: "۲ روز پیش",
    type: "order",
    details: "سفارش شامل ۱ لپ‌تاپ و ۲ عدد لوازم جانبی بوده است.",
  },
  {
    id: 5,
    user: "نوید اسماعیلی",
    action: "رمز عبور تغییر کرد",
    time: "۳ روز پیش",
    type: "profile",
    details: "کاربر رمز عبور خود را با موفقیت تغییر داد.",
  },
];

const filters = [
  { key: "all", label: "همه" },
  { key: "order", label: "سفارش‌ها" },
  { key: "status", label: "وضعیت‌ها" },
  { key: "profile", label: "پروفایل‌ها" },
];

export default function RecentActivity() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const filteredActivities = useMemo(() => {
    let data = allActivities;
    if (filter !== "all") data = data.filter((a) => a.type === filter);
    if (search.trim()) {
      data = data.filter(
        (a) =>
          a.user.includes(search) ||
          a.action.includes(search) ||
          a.time.includes(search)
      );
    }
    return data.slice(0, visibleCount);
  }, [filter, search, visibleCount]);

  const getIcon = (type) => {
    switch (type) {
      case "order":
        return <ShoppingCart className="w-5 h-5 text-green-500" />;
      case "profile":
        return <User className="w-5 h-5 text-blue-500" />;
      case "status":
        return <RefreshCcw className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-5">
        <div className="flex items-center gap-2">
          <h3 className="text-gray-800 dark:text-gray-100 font-bold text-lg">
            فعالیت‌های اخیر
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({filteredActivities.length})
          </span>
        </div>

        {/* Search box */}
        <div className="relative w-full sm:w-52">
          <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 dark:text-gray-300" />
          <input
            type="text"
            placeholder="جستجو..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg py-2 pr-9 pl-3 text-sm text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filters.map((f) => (
          <motion.button
            key={f.key}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setFilter(f.key);
              setVisibleCount(4);
            }}
            className={`px-3 py-1 text-sm rounded-full transition-all ${
              filter === f.key
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {f.label}
          </motion.button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <ul className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <li
              key={i}
              className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl flex justify-between items-center animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full" />
                <div className="flex flex-col gap-2">
                  <div className="w-24 h-3 bg-gray-300 dark:bg-gray-600 rounded" />
                  <div className="w-16 h-3 bg-gray-300 dark:bg-gray-600 rounded" />
                </div>
              </div>
              <div className="w-10 h-3 bg-gray-300 dark:bg-gray-600 rounded" />
            </li>
          ))}
        </ul>
      ) : filteredActivities.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-10">
          هیچ فعالیتی یافت نشد 😴
        </div>
      ) : (
        <>
          <ul className="space-y-3 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
            <AnimatePresence>
              {filteredActivities.map((act, i) => (
                <motion.li
                  key={act.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelected(act)}
                  className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl flex justify-between items-center shadow-sm hover:shadow-md transition cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-inner shrink-0">
                      {getIcon(act.type)}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:gap-2">
                      <span className="text-gray-800 dark:text-gray-100 font-semibold text-sm truncate max-w-[120px] sm:max-w-none">
                        {act.user}
                      </span>
                      <span className="text-gray-500 dark:text-gray-300 text-xs truncate max-w-[140px] sm:max-w-none">
                        {act.action}
                      </span>
                    </div>
                  </div>
                  <span className="text-gray-400 dark:text-gray-300 text-xs whitespace-nowrap">
                    {act.time}
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          {filteredActivities.length < allActivities.filter(a => filter === "all" || a.type === filter).length && (
            <button
              onClick={() => setVisibleCount(c => c + 3)}
              className="mt-4 w-full text-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              نمایش بیشتر
            </button>
          )}
        </>
      )}

      {/* جزئیات فعالیت */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-11/12 sm:w-96 shadow-xl relative"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 left-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full">
                  {getIcon(selected.type)}
                </div>
                <div>
                  <h4 className="text-gray-800 dark:text-gray-100 font-bold text-base">
                    {selected.user}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-300 text-sm">{selected.time}</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
                {selected.details}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
