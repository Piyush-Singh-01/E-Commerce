import React, { useState } from 'react';
import { IoAddCircleOutline } from "react-icons/io5";
import { HiOutlineMinusCircle } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineFileUpload } from "react-icons/md";
import { CgSpinner } from "react-icons/cg";
import useProduct from '../../../hooks/useProduct';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { updateProductState } from '../../../redux/slice/productSlice';

function UpdateInventory({ product, onClose }) {
  const { updateProductStock } = useProduct();
  const [operation, setOperation] = useState(true); // true = Add, false = Remove
  const [stock, setStock] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.product.isLoading);

  const quantityNum = Math.abs(Number(stock) || 0);
  const previewStock = operation 
    ? (product?.stock || 0) + quantityNum 
    : (product?.stock || 0) - quantityNum;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stock || quantityNum <= 0) {
      toast.error("Please enter a valid quantity greater than 0");
      return;
    }
    if (previewStock < 0) {
      toast.error("Stock cannot be negative");
      return;
    }
    try {
      const response = await updateProductStock(product._id, { stock: previewStock });
      toast.success(response?.message || "Stock updated successfully");
      dispatch(updateProductState(response.product));
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update stock");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4 backdrop-blur-sm transition-opacity">
      <div className="flex w-full max-w-md flex-col gap-5 rounded-2xl bg-white p-6 shadow-2xl transition-all">
        
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Update Stock Level</h2>
            <p className="text-xs text-gray-500">Adjust physical inventory counts</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
          >
            <RxCross2 className="h-5 w-5" />
          </button>
        </div>

        {/* Product Details Card */}
        <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50/70 p-3.5">
          <img
            className="h-14 w-14 rounded-lg border border-gray-200 object-cover bg-white"
            src={product?.images?.[0]?.url || "/placeholder.png"}
            alt={product?.productName || "Product Image"}
          />
          <div className="flex-1 min-w-0">
            <h3 className="truncate text-sm font-semibold text-gray-900">
              {product?.productName || "Product Name"}
            </h3>
            <p className="text-xs text-gray-500 capitalize">
              Category: {product?.category || "N/A"}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-medium text-gray-500 block">In Stock</span>
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 ring-1 ring-inset ring-blue-700/10">
              {product?.stock ?? 0} units
            </span>
          </div>
        </div>

        {/* Operation Selection Segment */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Select Action
          </label>
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => setOperation(true)}
              className={`flex items-center justify-center cursor-pointer gap-2 rounded-lg py-2.5 text-xs font-bold transition-all ${
                operation
                  ? "bg-white text-emerald-700 shadow-sm border border-emerald-200"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <IoAddCircleOutline className="h-4 w-4 text-emerald-600" />
              Add Stock
            </button>
            <button
              type="button"
              onClick={() => setOperation(false)}
              className={`flex items-center cursor-pointer justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition-all ${
                !operation
                  ? "bg-white text-rose-700 shadow-sm border border-rose-200"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <HiOutlineMinusCircle className="h-4 w-4 text-rose-600" />
              Remove Stock
            </button>
          </div>
        </div>

        {/* Form Controls */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Quantity Input */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="stock" className="text-xs font-semibold text-gray-700">
              Quantity to {operation ? "Add" : "Deduct"} <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <input
                id="stock"
                name="stock"
                type="number"
                min="1"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="e.g. 25"
                className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              <span className="absolute right-3 text-xs font-medium text-gray-400 select-none">
                units
              </span>
            </div>
          </div>

          {/* New Stock Preview Banner */}
          <div
            className={`rounded-xl border p-3.5 transition-colors ${
              operation
                ? "border-emerald-200 bg-emerald-50/60"
                : previewStock < 0
                ? "border-rose-200 bg-rose-50/60"
                : "border-amber-200 bg-amber-50/60"
            }`}
          >
            <span
              className={`text-xs font-semibold uppercase tracking-wider block mb-1 ${
                operation
                  ? "text-emerald-800"
                  : previewStock < 0
                  ? "text-rose-800"
                  : "text-amber-800"
              }`}
            >
              New Stock Calculation
            </span>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
              <span>{product?.stock ?? 0}</span>
              <span className="text-gray-400">{operation ? "+" : "-"}</span>
              <span>{quantityNum}</span>
              <span className="text-gray-400">=</span>
              <span
                className={
                  operation
                    ? "text-emerald-700"
                    : previewStock < 0
                    ? "text-rose-600"
                    : "text-amber-700"
                }
              >
                {previewStock} units
              </span>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl cursor-pointer border border-gray-300 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center cursor-pointer gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {isLoading ? (
                <>
                  <CgSpinner className="h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <MdOutlineFileUpload className="h-4 w-4" />
                  Update Stock
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default UpdateInventory;