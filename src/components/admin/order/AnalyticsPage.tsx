const AnalyticsPage = () => {
  const salesData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 4500 },
    { month: "May", sales: 6000 },
    { month: "Jun", sales: 5500 },
  ];
  const maxSales = Math.max(...salesData.map((d) => d.sales));

  return (
    <div className="row g-4">
      <div className="col-12 col-lg-6">
        <div className="card border shadow-sm">
          <div className="card-body">
            <h2 className="card-title h5 mb-4">Sales Over Time</h2>
            <div
              className="d-flex justify-content-between align-items-end gap-2"
              style={{ height: "256px" }}
            >
              {salesData.map((data) => (
                <div
                  key={data.month}
                  className="flex-fill d-flex flex-column align-items-center gap-2"
                >
                  <div
                    className="w-100 bg-primary rounded-top"
                    style={{ height: `${(data.sales / maxSales) * 100}%` }}
                    title={`$${data.sales.toLocaleString()}`}
                  ></div>
                  <span className="small fw-medium text-muted">
                    {data.month}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-6">
        <div className="card border shadow-sm">
          <div className="card-body">
            <h2 className="card-title h5 mb-4">Top Products</h2>
            <ul className="list-unstyled mb-0">
              <li className="d-flex justify-content-between py-2 border-bottom">
                <span>Wireless Headphones</span> <span>250 sold</span>
              </li>
              <li className="d-flex justify-content-between py-2 border-bottom">
                <span>Running Shoes</span> <span>180 sold</span>
              </li>
              <li className="d-flex justify-content-between py-2 border-bottom">
                <span>Yoga Mat</span> <span>150 sold</span>
              </li>
              <li className="d-flex justify-content-between py-2">
                <span>Organic Green Tea</span> <span>120 sold</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AnalyticsPage;
