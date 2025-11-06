import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Trash2, PlusCircle, Search, Shield } from "lucide-react";
import UserModal from "../components/UserModal";

const initialUsers = [
  { id: 1, name: "علی رضایی", email: "ali@gmail.com", role: "مدیر", status: "فعال" },
  { id: 2, name: "مریم احمدی", email: "maryam@gmail.com", role: "کاربر", status: "غیرفعال" },
  { id: 3, name: "زهرا حسینی", email: "zahra@gmail.com", role: "پشتیبان", status: "فعال" },
];

export default function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const handleSave = (user) => {
    if (editUser) setUsers(users.map((u) => (u.id === user.id ? user : u)));
    else setUsers([...users, { ...user, id: Date.now(), status: "فعال" }]);
    setEditUser(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("آیا از حذف این کاربر مطمئن هستید؟"))
      setUsers(users.filter((u) => u.id !== id));
  };

  const toggleStatus = (id) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "فعال" ? "غیرفعال" : "فعال" }
          : u
      )
    );
  };

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.includes(search) || u.email.includes(search);
      const matchesRole = filterRole === "all" || u.role === filterRole;
      return matchesSearch && matchesRole;
    });
  }, [users, search, filterRole]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            مدیریت کاربران
          </h2>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute right-2 top-2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="جست‌وجو..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pr-8 pl-2 py-1 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="text-sm rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-1 px-2 focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="all">همه نقش‌ها</option>
              <option value="مدیر">مدیر</option>
              <option value="کاربر">کاربر</option>
              <option value="پشتیبان">پشتیبان</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-700">
          <table className="w-full text-sm text-right">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="py-3 px-4">نام</th>
                <th className="py-3 px-4">ایمیل</th>
                <th className="py-3 px-4">نقش</th>
                <th className="py-3 px-4">وضعیت</th>
                <th className="py-3 px-4 text-center">عملیات</th>
              </tr>
            </thead>
            <AnimatePresence>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition"
                    >
                      <td className="py-3 px-4 font-medium">{user.name}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4 flex items-center gap-2">
                        {user.role === "مدیر" && (
                          <Shield className="text-yellow-500 w-4 h-4" />
                        )}
                        {user.role}
                      </td>
                      <td
                        onClick={() => toggleStatus(user.id)}
                        className={`py-3 px-4 cursor-pointer font-medium ${
                          user.status === "فعال"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {user.status}
                      </td>
                      <td className="py-3 px-4 flex justify-center gap-2">
                        <button
                          onClick={() => {
                            setEditUser(user);
                            setModalOpen(true);
                          }}
                          className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-6 text-gray-500 dark:text-gray-400"
                    >
                      کاربری یافت نشد 🙁
                    </td>
                  </tr>
                )}
              </tbody>
            </AnimatePresence>
          </table>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              setEditUser(null);
              setModalOpen(true);
            }}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg"
          >
            <PlusCircle size={18} /> افزودن کاربر
          </button>
        </div>

        <UserModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          editUser={editUser}
        />
      </div>
    </motion.div>
  );
}
