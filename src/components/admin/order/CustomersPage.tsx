const CustomersPage = () => {
  const customers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      orders: 5,
      totalSpent: "$450.00",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      orders: 2,
      totalSpent: "$120.50",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.j@example.com",
      orders: 10,
      totalSpent: "$1250.10",
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "emily.b@example.com",
      orders: 1,
      totalSpent: "$45.00",
    },
  ];
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 gap-3">
          <h2 className="card-title h5 mb-0">Customers</h2>
          <input
            type="text"
            placeholder="Search customers..."
            className="form-control form-control-sm"
            style={{ maxWidth: "250px" }}
          />
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th scope="col" className="text-uppercase small fw-bold">
                  Name
                </th>
                <th scope="col" className="text-uppercase small fw-bold">
                  Email
                </th>
                <th scope="col" className="text-uppercase small fw-bold">
                  Orders
                </th>
                <th scope="col" className="text-uppercase small fw-bold">
                  Total Spent
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="fw-medium">{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.orders}</td>
                  <td>{customer.totalSpent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
