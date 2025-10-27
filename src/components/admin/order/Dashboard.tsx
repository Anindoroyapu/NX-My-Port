import StatusBadge from "./StatusBadge";

const Dashboard = () => {
  const metrics = [
    { title: "Total Revenue", value: "$54,385", change: "+2.5%" },
    { title: "Total Orders", value: "1,250", change: "+5.1%" },
    { title: "New Customers", value: "82", change: "-1.2%" },
    { title: "Conversion Rate", value: "12.3%", change: "+0.8%" },
  ];

  const recentOrders = [
    {
      id: "#12345",
      customer: "John Doe",
      date: "2024-07-29",
      total: "$150.00",
      status: "Shipped",
    },
    {
      id: "#12346",
      customer: "Jane Smith",
      date: "2024-07-29",
      total: "$75.50",
      status: "Processing",
    },
    {
      id: "#12347",
      customer: "Mike Johnson",
      date: "2024-07-28",
      total: "$220.10",
      status: "Delivered",
    },
    {
      id: "#12348",
      customer: "Emily Brown",
      date: "2024-07-28",
      total: "$45.00",
      status: "Shipped",
    },
    {
      id: "#12349",
      customer: "Chris Lee",
      date: "2024-07-27",
      total: "$300.75",
      status: "Pending",
    },
  ];

  return (
    <>
      <section
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10"
        aria-labelledby="metrics-heading"
      >
        <h2 id="metrics-heading" className="sr-only">
          Key Metrics
        </h2>
        {metrics.map((metric) => (
          <div
            className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg"
            key={metric.title}
          >
            <h3 className="text-sm text-slate-500 font-medium mb-2">
              {metric.title}
            </h3>
            <p className="text-3xl font-bold mb-2 text-slate-800">
              {metric.value}
            </p>
            <p
              className={`text-sm font-semibold ${
                metric.change.startsWith("+")
                  ? "text-green-600"
                  : "text-red-700"
              }`}
            >
              {metric.change}
            </p>
          </div>
        ))}
      </section>

      <section
        className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm"
        aria-labelledby="orders-heading"
      >
        <h2
          id="orders-heading"
          className="mb-6 text-xl font-semibold text-slate-800"
        >
          Recent Orders
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-slate-200">
              <tr>
                <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
                  Order ID
                </th>
                <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
                  Customer
                </th>
                <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
                  Date
                </th>
                <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
                  Total
                </th>
                <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50"
                >
                  <td className="p-4 text-slate-700 font-medium">{order.id}</td>
                  <td className="p-4 text-slate-700">{order.customer}</td>
                  <td className="p-4 text-slate-700">{order.date}</td>
                  <td className="p-4 text-slate-700">{order.total}</td>
                  <td className="p-4">
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
