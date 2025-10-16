import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function UserModal({ open, onClose, onSave, editUser }) {
  const [user, setUser] = useState({ name: "", email: "", role: "کاربر" });

  useEffect(() => {
    if (editUser) setUser(editUser);
    else setUser({ name: "", email: "", role: "کاربر" });
  }, [editUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.name || !user.email) {
      alert("لطفاً همه فیلدها را پر کنید.");
      return;
    }
    onSave(user);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal box */}
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-[90%] sm:w-[420px] p-6 relative"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 left-3 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
            >
              <X size={22} />
            </button>

            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
              {editUser ? "ویرایش کاربر" : "افزودن کاربر جدید"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                  نام
                </label>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                  ایمیل
                </label>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                  نقش
                </label>
                <select
                  value={user.role}
                  onChange={(e) => setUser({ ...user, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option>کاربر</option>
                  <option>مدیر</option>
                  <option>پشتیبان</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg mt-3 transition font-medium"
              >
                {editUser ? "ذخیره تغییرات" : "افزودن"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
