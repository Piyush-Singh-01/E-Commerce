export const stockStatus = (stock) => {
  if (stock === 0) {
    return {
      label: "Out of Stock",
      className: "text-red-400",
    };
  }

  if (stock <= 10) {
    return {
      label: "Low Stock",
      className: " text-yellow-400",
    };
  }

  return {
    label: "In Stock",
    className: "text-green-600",
  };
};