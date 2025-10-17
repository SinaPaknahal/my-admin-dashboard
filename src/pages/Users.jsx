import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Trash2, PlusCircle } from "lucide-react";
import UserModal from "../components/UserModal";

const initialUsers = [
  { id: 1, name: "علی رضایی", email: "ali@gmail.com", role: "مدیر" },
  { id: 2, name: "مریم احمدی", email: "maryam@gmail.com", role: "کاربر" },
  { id: 3, name: "زهرا حسینی", email: "zahra@gmail.com", role: "پشتیبان" },
];

export default function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const handleSave = (user) => {
    if (editUser) setUsers(users.map((u) => (u.id === user.id ? user : u)));
    else setUsers([...users, { ...user, id: Date.now() }]);
    setEditUser(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("حذف شود؟")) setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm transition-all">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">مدیریت کاربران</h2>

        <table className="w-full text-sm text-right mb-4">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="py-3 px-4">نام</th>
              <th className="py-3 px-4">ایمیل</th>
              <th className="py-3 px-4">نقش</th>
              <th className="py-3 px-4 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition">
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.role}</td>
                <td className="py-3 px-4 text-center flex justify-center gap-2">
                  <button onClick={() => { setEditUser(user); setModalOpen(true); }} className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"><Edit size={16} /></button>
                  <button onClick={() => handleDelete(user.id)} className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={() => { setEditUser(null); setModalOpen(true); }} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg">
          <PlusCircle size={18} /> افزودن کاربر
        </button>

        <UserModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} editUser={editUser} />
      </div>
    </motion.div>
  );
}
