import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Edit, Trash2, PlusCircle } from "lucide-react";
import UserModal from "../components/UserModal";

const initialUsers = [
  { id: 1, name: "علی رضایی", email: "ali@gmail.com", role: "مدیر" },
  { id: 2, name: "مریم احمدی", email: "maryam@gmail.com", role: "کاربر" },
  { id: 3, name: "زهرا حسینی", email: "zahra@gmail.com", role: "پشتیبان" },
];

export default function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const filteredUsers = users.filter(
    (u) =>
      u.name.includes(search) ||
      u.email.includes(search) ||
      u.role.includes(search)
  );

  const handleSave = (user) => {
    if (editUser) {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      setUsers([...users, { ...user, id: Date.now() }]);
    }
    setEditUser(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("حذف شود؟")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
    >
      {/* عنوان و جستجو */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          مدیریت کاربران
        </h2>

        <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 w-full sm:w-72">
          <Search size={18} className="text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="جستجو کاربر..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm w-full px-2 outline-none text-gray-700 dark:text-gray-200"
          />
        </div>
      </div>

      {/* جدول کاربران */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <th className="py-3 px-4">نام</th>
              <th className="py-3 px-4">ایمیل</th>
              <th className="py-3 px-4">نقش</th>
              <th className="py-3 px-4 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <motion.tr
                key={user.id}
                whileHover={{ scale: 1.01 }}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/40"
              >
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.role}</td>
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setEditUser(user);
                        setModalOpen(true);
                      }}
                      className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center text-gray-500 dark:text-gray-400 py-6"
                >
                  هیچ کاربری پیدا نشد 😕
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* دکمه افزودن */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => {
          setEditUser(null);
          setModalOpen(true);
        }}
        className="flex items-center gap-2 mt-6 bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg"
      >
        <PlusCircle size={18} />
        افزودن کاربر جدید
      </motion.button>

      {/* مودال */}
      <UserModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editUser={editUser}
      />
    </motion.div>
  );
}
