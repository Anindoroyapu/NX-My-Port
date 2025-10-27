import StatusBadge from "./StatusBadge";

const ProductsPage = () => {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: "$99.99",
      stock: 150,
      status: "Active",
    },
    {
      id: 2,
      name: "Organic Green Tea",
      category: "Groceries",
      price: "$12.50",
      stock: 0,
      status: "Inactive",
    },
    {
      id: 3,
      name: "Running Shoes",
      category: "Apparel",
      price: "$120.00",
      stock: 80,
      status: "Active",
    },
    {
      id: 4,
      name: "Modern Coffee Table",
      category: "Furniture",
      price: "$250.00",
      stock: 25,
      status: "Active",
    },
    {
      id: 5,
      name: "Yoga Mat",
      category: "Sports",
      price: "$35.00",
      stock: 200,
      status: "Active",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-slate-800">Products</h2>
        <button className="bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 transition">
          Add New Product
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
                Product Name
              </th>
              <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
                Category
              </th>
              <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
                Price
              </th>
              <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
                Stock
              </th>
              <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
                Status
              </th>
              <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50"
              >
                <td className="p-4 text-slate-700 font-medium">
                  {product.name}
                </td>
                <td className="p-4 text-slate-700">{product.category}</td>
                <td className="p-4 text-slate-700">{product.price}</td>
                <td
                  className={`p-4 font-medium ${
                    product.stock > 0 ? "text-slate-700" : "text-red-600"
                  }`}
                >
                  {product.stock}
                </td>
                <td className="p-4">
                  <StatusBadge status={product.status} />
                </td>
                <td className="p-4 flex gap-4">
                  <a
                    href="#"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="text-red-600 hover:underline font-medium"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ProductsPage;
