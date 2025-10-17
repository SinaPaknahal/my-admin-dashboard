import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function UserModal({ open, onClose, onSave, editUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("کاربر");

  useEffect(() => {
    if (editUser) {
      setName(editUser.name);
      setEmail(editUser.email);
      setRole(editUser.role);
    } else {
      setName("");
      setEmail("");
      setRole("کاربر");
    }
  }, [editUser, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert("لطفاً نام و ایمیل را وارد کنید.");
      return;
    }
    onSave({ id: editUser ? editUser.id : Date.now(), name, email, role });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-96 max-w-full"
      >
        <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">
          {editUser ? "ویرایش کاربر" : "افزودن کاربر جدید"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200">نام</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200">ایمیل</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200">نقش</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="کاربر">کاربر</option>
              <option value="مدیر">مدیر</option>
              <option value="پشتیبان">پشتیبان</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
            >
              ذخیره
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
