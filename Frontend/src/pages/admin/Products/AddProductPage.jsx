import React, { useEffect, useState } from "react";
import ImageUploader from "../../../component/admin/product/ImageUploader";
import ImagePreview from "../../../component/admin/product/ImagePreview";
import useProduct from "../../../hooks/useProduct";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FiPackage,
  FiTag,
  FiDollarSign,
  FiLayers,
  FiFileText,
  FiImage,
  FiArrowLeft,
  FiSave,
} from "react-icons/fi";

function AddProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isLoading = useSelector((state) => state.product.isLoading);

  const {
    createNewProduct,
    getSingleProduct,
    updateExistingProduct,
  } = useProduct();

  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    category: "",
    price: "",
    discountPrice: "",
    stock: "",
    description: "",
    existingImages: [],
    images: [],
  });

  const handleInput = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const textFields = [
        "productName",
        "brand",
        "category",
        "price",
        "discountPrice",
        "stock",
        "description",
      ];

      const data = new FormData();

      textFields.forEach((text) => {
        data.append(text, formData[text]);
      });

      formData.images.forEach((image) => {
        data.append("images", image);
      });

      formData.existingImages.forEach((image) => {
        data.append("existingImages", JSON.stringify(image));
      });

      if (id) {
        const response = await updateExistingProduct(id, data);

        if (response.success) {
          navigate("/admin/products");
          toast.success(
            response?.message || "Product Updated Successfully"
          );
        }
      } else {
        const response = await createNewProduct(data);

        if (response) {
          setFormData({
            productName: "",
            brand: "",
            category: "",
            price: "",
            discountPrice: "",
            stock: "",
            description: "",
            existingImages: [],
            images: [],
          });

          toast.success(
            response?.message || "Product added Successfully"
          );
        }
      }
    } catch (error) {
      console.log(
        "Error in handle submit in Add Product page",
        error
      );

      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const response = await getSingleProduct(id);

        if (response) {
          setFormData({
            productName: response.productName,
            brand: response.brand,
            category: response.category,
            price: response.price,
            discountPrice: response.discountPrice,
            stock: response.stock,
            description: response.description,
            existingImages: response.images || [],
            images: [],
          });
        }
      } catch (error) {
        toast.error(
          error?.response?.message || "Failed to fetch product"
        );

        navigate("/admin/product");
      }
    };

    fetchData();
  }, [id]);

  return (
    <main className="w-full ">

      <div className="mx-auto mb-6 max-w-7xl">

        <button
          type="button"
          onClick={() => navigate("/admin/product")}
          className="mb-4 flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-blue-600"
        >
          <FiArrowLeft />
          Back to Products
        </button>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <FiPackage className="text-xl" />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                {id ? "Update Product" : "Add Product"}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                {id
                  ? "Update your product information and inventory."
                  : "Add a new product to your store."}
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-7xl"
      >

        {/* BASIC INFORMATION */}
        <section className="mb-5 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

          {/* Section Header */}
          <div className="border-b border-gray-100 px-5 py-4 sm:px-6">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <FiTag />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  Basic Information
                </h2>

                <p className="text-xs text-gray-500">
                  Enter the basic details of your product
                </p>
              </div>

            </div>

          </div>

          {/* Section Body */}
          <div className="p-5 sm:p-6">

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Product Name */}
              <div className="flex flex-col gap-1.5">

                <label
                  htmlFor="productName"
                  className="text-sm font-medium text-gray-700"
                >
                  Product Name
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  onChange={handleInput}
                  value={formData.productName}
                  name="productName"
                  id="productName"
                  type="text"
                  placeholder="Enter product name"
                  className="h-11 rounded-lg border border-gray-200 bg-gray-50 px-3.5 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* Brand */}
              <div className="flex flex-col gap-1.5">

                <label
                  htmlFor="brand"
                  className="text-sm font-medium text-gray-700"
                >
                  Brand
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  onChange={handleInput}
                  value={formData.brand}
                  name="brand"
                  id="brand"
                  type="text"
                  placeholder="Enter brand name"
                  className="h-11 rounded-lg border border-gray-200 bg-gray-50 px-3.5 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* Category */}
              <div className="flex flex-col gap-1.5">

                <label
                  htmlFor="category"
                  className="text-sm font-medium text-gray-700"
                >
                  Category
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <select
                  onChange={handleInput}
                  value={formData.category}
                  name="category"
                  id="category"
                  className="h-11 cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-3.5 text-sm text-gray-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select Category</option>
                  <option value="watch">Watch</option>
                  <option value="fashion">Fashion</option>
                  <option value="mobile">Mobile</option>
                  <option value="Beauty">Beauty</option>
                  <option value="shoes">Shoe</option>
                  <option value="laptop">Laptop</option>
                  <option value="applinces">Appliances</option>
                </select>

              </div>

            </div>

          </div>
        </section>


        {/* =====================================================
            PRICING & INVENTORY
        ====================================================== */}
        <section className="mb-5 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

          <div className="border-b border-gray-100 px-5 py-4 sm:px-6">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <FiDollarSign />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  Pricing & Inventory
                </h2>

                <p className="text-xs text-gray-500">
                  Set pricing and manage available stock
                </p>
              </div>

            </div>

          </div>

          <div className="p-5 sm:p-6">

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

              {/* Price */}
              <div className="flex flex-col gap-1.5">

                <label
                  htmlFor="price"
                  className="text-sm font-medium text-gray-700"
                >
                  Original Price
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <div className="relative">

                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">
                    ₹
                  </span>

                  <input
                    onChange={handleInput}
                    value={formData.price}
                    name="price"
                    id="price"
                    type="number"
                    placeholder="0.00"
                    className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 pl-8 pr-3.5 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />

                </div>

              </div>

              {/* Discount Price */}
              <div className="flex flex-col gap-1.5">

                <label
                  htmlFor="discountPrice"
                  className="text-sm font-medium text-gray-700"
                >
                  Offer Price
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <div className="relative">

                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">
                    ₹
                  </span>

                  <input
                    type="number"
                    onChange={handleInput}
                    value={formData.discountPrice}
                    name="discountPrice"
                    id="discountPrice"
                    placeholder="0.00"
                    className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 pl-8 pr-3.5 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />

                </div>

              </div>

              {/* Stock */}
              <div className="flex flex-col gap-1.5">

                <label
                  htmlFor="stock"
                  className="text-sm font-medium text-gray-700"
                >
                  Stock Quantity
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <div className="relative">

                  <FiLayers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    onChange={handleInput}
                    value={formData.stock}
                    name="stock"
                    id="stock"
                    type="number"
                    placeholder="Enter quantity"
                    className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3.5 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />

                </div>

              </div>

            </div>

          </div>
        </section>


        {/* =====================================================
            DESCRIPTION
        ====================================================== */}
        <section className="mb-5 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

          <div className="border-b border-gray-100 px-5 py-4 sm:px-6">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                <FiFileText />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  Product Description
                </h2>

                <p className="text-xs text-gray-500">
                  Describe your product for customers
                </p>
              </div>

            </div>

          </div>

          <div className="p-5 sm:p-6">

            <div className="flex flex-col gap-1.5">

              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-700"
              >
                Description
              </label>

              <textarea
                onChange={handleInput}
                value={formData.description}
                name="description"
                id="description"
                placeholder="Enter a detailed description of your product..."
                rows={6}
                className="resize-none rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-3 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />

              <p className="text-xs text-gray-400">
                Provide useful information about the product, features,
                materials, specifications, etc.
              </p>

            </div>

          </div>
        </section>


        {/* =====================================================
            PRODUCT IMAGES
        ====================================================== */}
        <section className="mb-5 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

          <div className="border-b border-gray-100 px-5 py-4 sm:px-6">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                <FiImage />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  Product Images
                </h2>

                <p className="text-xs text-gray-500">
                  Upload high-quality images of your product
                </p>
              </div>

            </div>

          </div>

          <div className="p-5 sm:p-6">

            <ImageUploader
              images={formData.images}
              setFormData={setFormData}
            />

            <div className="mt-5">
              <ImagePreview
                images={formData.images}
                existingImages={formData.existingImages}
                setFormData={setFormData}
              />
            </div>

          </div>

        </section>


        {/* =====================================================
            ACTIONS
        ====================================================== */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end">

          <button
            onClick={() => navigate("/admin/product")}
            type="button"
            className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-6 text-sm font-semibold text-gray-600 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-7 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiSave />

            {isLoading
              ? "Saving..."
              : id
              ? "Update Product"
              : "Create Product"}
          </button>

        </div>

      </form>
    </main>
  );
}

export default AddProductPage;