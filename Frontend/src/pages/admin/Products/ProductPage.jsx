import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useProduct from "../../../hooks/useProduct";
import { useSelector } from "react-redux";
import { IoSearch } from "react-icons/io5";
import { FiPlus, FiEdit2, FiTrash2, FiPackage } from "react-icons/fi";

function Product() {
  const { getAllProducts, deleteExistingProduct } = useProduct();
  const navigate = useNavigate();

  const products = useSelector((store) => store.product.products);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [month, setMonth] = useState("All Months");
  const [year, setYear] = useState("All Years");

  const months = ["All Months","January","February","March","April","May","June","July","August", "September","October","November","December"];

  const years = ["All Years", 2023, 2024, 2025, 2026, 2027];

  const categories = [
    { label: "All Categories", value: "all" },
    { label: "Watch", value: "watch" },
    { label: "Fashion", value: "fashion" },
    { label: "Mobile", value: "mobile" },
    { label: "Beauty", value: "beauty" },
    { label: "Shoes", value: "shoes" },
    { label: "Laptop", value: "laptop" },
    { label: "Appliances", value: "appliances" },
  ];

  const filterData = products.filter((product) => {

    const matchSearch = product?.productName.toLowerCase() .includes(search.toLowerCase());

    const matchCategory = category === "all" || product?.category.toLowerCase() === category.toLowerCase();

    const productMonth = new Date(product.createdAt).toLocaleString("default", { month: "long" });
    const matchMonth = month === "All Months" || productMonth === month;

    const productYear = new Date(product.createdAt).getFullYear();
    const matchYear = year === "All Years" || productYear === Number(year);

    return matchSearch && matchCategory && matchMonth && matchYear;
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await getAllProducts();
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load products"
        );
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen w-full">

      {/* Page Header */}
      <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <FiPackage className="text-xl" />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Products
              </h1>

              <p className="mt-0.5 text-sm text-gray-500">
                Manage and organize your store products
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate("/admin/product/add")}
          className="flex items-center cursor-pointer justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-[0.98]"
        >
          <FiPlus className="text-lg" />
          Add Product
        </button>

      </div>

      {/* Main Content */}
      <main className="w-full">

        {/* Filter Section */}
        <div className="mb-5">

          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

            {/* Search */}
            <div className="relative  w-full xl:max-w-md">
              <IoSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-gray-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search products..."
                className="h-11 w-full bg-white shadow rounded-lg border border-gray-200 pl-10 pr-4 text-[16px] font-semibold text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500  focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 xl:flex">

              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="h-11 min-w-[170px] bg-white shadow  cursor-pointer rounded-lg border border-gray-200 px-3 text-sm font-medium text-gray-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              >
                {categories.map((categoryItem) => (
                  <option
                    key={categoryItem.value}
                    value={categoryItem.value}
                  >
                    {categoryItem.label}
                  </option>
                ))}
              </select>

              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="h-11 min-w-[150px] bg-white cursor-pointer rounded-lg  border border-gray-200 px-3 text-sm font-medium text-gray-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              >
                {months.map((monthItem) => (
                  <option key={monthItem} value={monthItem}>
                    {monthItem}
                  </option>
                ))}
              </select>

              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="h-11 min-w-[130px] bg-white cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm font-medium text-gray-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              >
                {years.map((yearItem) => (
                  <option key={yearItem} value={yearItem}>
                    {yearItem}
                  </option>
                ))}
              </select>

            </div>
          </div>
        </div>

        {/* Product Count */}
        <div className="mb-3 flex items-center justify-between px-1">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-800">
              {filterData.length}
            </span>{" "}
            products
          </p>
        </div>

        {/* Table Card */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

          {/* Table Scroll Container */}
          <div className="max-h-[400px] overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

            <table className="w-full  min-w-[1000px]  text-left">

              {/* Table Header */}
              <thead className="sticky top-0 z-10 bg-gray-50 text-sm">

                <tr className="border-b border-gray-200">

                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-500">
                    Product
                  </th>

                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-500">
                    Category
                  </th>

                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-500">
                    Brand
                  </th>

                  <th className="px-6 py-4 text-center font-semibold uppercase tracking-wider text-gray-500">
                    Original Price
                  </th>

                  <th className="px-6 py-4 text-center font-semibold uppercase tracking-wider text-gray-500">
                    Stock
                  </th>

                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-500">
                    Offer Price
                  </th>

                  <th className="px-6 py-4 text-center font-semibold uppercase tracking-wider text-gray-500">
                    Date
                  </th>

                  <th className="px-6 py-4 text-center font-semibold uppercase tracking-wider text-gray-500">
                    Actions
                  </th>

                </tr>

              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-100">

                {filterData && filterData.length > 0 ? (

                  filterData.map((product) => (

                    <tr key={product._id} className="group transition-colors hover:bg-blue-50/40">

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                            <FiPackage className="text-lg" />
                          </div>

                          <div>
                            <p className="font-semibold text-gray-900">
                              {product.productName}
                            </p>

                            <p className="mt-0.5 text-xs text-gray-400">
                              Product ID: {product._id?.slice(-6)}
                            </p>
                          </div>

                        </div>

                      </td>

                      <td className="px-6 py-4">

                        <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium capitalize text-gray-600">
                          {product.category}
                        </span>

                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-gray-700">
                        {product.brand}
                      </td>

                      <td className="px-6 py-4">

                        <span className="text-sm font-semibold text-gray-800">
                          ₹ {product.price.toLocaleString()}
                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                            product.stock > 10
                              ? "bg-emerald-50 text-emerald-700"
                              : product.stock > 0
                              ? "bg-amber-50 text-amber-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {product.stock > 0
                            ? `${product.stock} in stock`
                            : "Out of stock"}
                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <span className="text-sm font-bold text-blue-600">
                          ₹ {product.discountPrice.toLocaleString()}
                        </span>

                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-sm text-gray-500">

                        {new Date(product.createdAt).toLocaleDateString(
                          "default",
                          {day: "numeric", month: "short", year: "numeric"}              
                          
                        )}

                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">

                        <div className="flex items-center justify-end gap-2">

                          <button
                            onClick={() => navigate(`/admin/product/edit/${product._id}`) }     
                            title="Edit Product"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-all hover:border-blue-200 hover:bg-blue-100 cursor-pointer"
                           >
                            <FiEdit2 className="text-sm text-blue-600" />
                          </button>

                          <button
                            onClick={() => deleteExistingProduct(product._id)}
                            title="Delete Product"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-all hover:border-red-200 hover:bg-red-100 cursor-pointer"
                          >
                            <FiTrash2 className="text-sm text-red-600" />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td colSpan={8} className="px-6 py-16 text-center" >

                      <div className="flex flex-col items-center justify-center">

                        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                          <FiPackage className="text-2xl" />
                        </div>

                        <h3 className="text-sm font-semibold text-gray-800">
                          No products found
                        </h3>

                        <p className="mt-1 text-sm text-gray-400">
                          Try changing your search or filters.
                        </p>

                      </div>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </main>
    </div>
  );
}

export default Product;