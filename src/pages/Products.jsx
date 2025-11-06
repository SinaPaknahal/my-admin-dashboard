import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, Edit, Trash2, Image as ImageIcon, Search } from "lucide-react";

const initialProducts = [
  {
    id: 1,
    name: "کفش اسپرت",
    description: "کفش راحت و سبک برای پیاده‌روی روزانه",
    price: 350000,
    stock: 12,
    category: "پوشاک",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "هدفون بی‌سیم",
    description: "دارای نویز کنسلینگ و کیفیت صدای بالا",
    price: 980000,
    stock: 7,
    category: "الکترونیک",
    image: "https://via.placeholder.com/100",
  },
];

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setEditProduct(product);
      setForm(product);
      setPreview(product.image);
    } else {
      setEditProduct(null);
      setForm({ name: "", description: "", price: "", stock: "", category: "", image: "" });
      setPreview(null);
    }
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.price) return alert("فیلدهای ضروری را پر کنید");
    if (editProduct)
      setProducts(products.map((p) => (p.id === editProduct.id ? { ...form, id: editProduct.id } : p)));
    else setProducts([...products, { ...form, id: Date.now() }]);
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("آیا از حذف این محصول مطمئن هستید؟"))
      setProducts(products.filter((p) => p.id !== id));
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (categoryFilter ? p.category === categoryFilter : true)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm transition-all"
    >
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          مدیریت محصولات ({filteredProducts.length})
        </h2>

        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          <PlusCircle size={18} /> افزودن محصول
        </button>
      </div>

      {/* فیلتر و جستجو */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative w-full md:w-1/3">
          <Search size={18} className="absolute right-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="جستجو در محصولات..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-9 p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
        >
          <option value="">همه دسته‌بندی‌ها</option>
          <option value="پوشاک">پوشاک</option>
          <option value="الکترونیک">الکترونیک</option>
          <option value="زیبایی و سلامت">زیبایی و سلامت</option>
          <option value="لوازم خانگی">لوازم خانگی</option>
        </select>
      </div>

      {/* جدول محصولات */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <th className="py-2 px-3">تصویر</th>
              <th className="py-2 px-3">نام</th>
              <th className="py-2 px-3">توضیحات</th>
              <th className="py-2 px-3">دسته‌بندی</th>
              <th className="py-2 px-3">قیمت</th>
              <th className="py-2 px-3">موجودی</th>
              <th className="py-2 px-3 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredProducts.map((p, i) => (
                <motion.tr
                  key={p.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition"
                >
                  <td className="py-2 px-3">
                    <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-lg" />
                  </td>
                  <td className="py-2 px-3 font-medium">{p.name}</td>
                  <td className="py-2 px-3 text-gray-600 dark:text-gray-300">{p.description}</td>
                  <td className="py-2 px-3">{p.category}</td>
                  <td className="py-2 px-3">
                    <span className="bg-green-100 dark:bg-green-800/40 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-xs font-medium">
                      {p.price.toLocaleString()} تومان
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        p.stock > 5
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-800/40 dark:text-blue-200"
                          : "bg-red-100 text-red-700 dark:bg-red-800/40 dark:text-red-200"
                      }`}
                    >
                      {p.stock}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => openModal(p)}
                        className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* مودال افزودن / ویرایش */}
      {modalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-[420px] shadow-lg"
          >
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
              {editProduct ? "ویرایش محصول" : "افزودن محصول"}
            </h3>

            <div className="flex flex-col gap-3">
              <input
                name="name"
                placeholder="نام محصول"
                value={form.name}
                onChange={handleChange}
                className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
              />
              <textarea
                name="description"
                placeholder="توضیحات"
                value={form.description}
                onChange={handleChange}
                rows="2"
                className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 resize-none"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  name="price"
                  placeholder="قیمت (تومان)"
                  value={form.price}
                  onChange={handleChange}
                  type="number"
                  className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
                />
                <input
                  name="stock"
                  placeholder="موجودی"
                  value={form.stock}
                  onChange={handleChange}
                  type="number"
                  className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
                />
              </div>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
              >
                <option value="">انتخاب دسته‌بندی</option>
                <option value="پوشاک">پوشاک</option>
                <option value="الکترونیک">الکترونیک</option>
                <option value="زیبایی و سلامت">زیبایی و سلامت</option>
                <option value="لوازم خانگی">لوازم خانگی</option>
              </select>

              {/* آپلود تصویر */}
              <div className="border border-dashed border-gray-400 rounded-lg p-4 text-center bg-gray-50 dark:bg-gray-700 cursor-pointer">
                {preview ? (
                  <img src={preview} alt="preview" className="w-24 h-24 mx-auto object-cover rounded" />
                ) : (
                  <div className="flex flex-col items-center text-gray-500">
                    <ImageIcon size={24} />
                    <p className="text-sm">بارگذاری تصویر</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="upload"
                  onChange={handleImageChange}
                />
                <label htmlFor="upload" className="cursor-pointer text-green-600 text-sm mt-2 block">
                  انتخاب فایل
                </label>
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-lg"
                >
                  انصراف
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                >
                  {editProduct ? "ویرایش" : "افزودن"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
