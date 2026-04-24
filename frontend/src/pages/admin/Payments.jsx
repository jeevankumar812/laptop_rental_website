import { useEffect, useState } from "react";
import API from "../../api/axios";
import "./Payments.css";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/payments/all", authHeader())
      .then((res) => setPayments(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="admin-payments-page">
        <div className="payments-loading">Loading payments...</div>
      </div>
    );
  }

  return (
    <div className="admin-payments-page">
      <div className="payments-container">

        {/* HEADER */}
        <div className="payments-header">
          <h2>Payments</h2>
        </div>

        {/* LIST */}
        <div className="payments-list">
          {payments.map((p) => (
            <div className="payment-card" key={p._id}>

              {/* TOP */}
              <div className="payment-top">
                <div className="payment-top-left">
                  <div className="label">Laptop</div>
                  <div><strong>Brand:</strong> {p.laptopId?.brand}</div>
                  <div><strong>Model:</strong> {p.laptopId?.model}</div>
                </div>

                <span
                  className={`status ${
                    p.status === "success"
                      ? "status-success"
                      : "status-pending"
                  }`}
                >
                  {p.status}
                </span>
              </div>

              {/* AMOUNT */}
              <div className="payment-amount">₹{p.amount}</div>

              {/* USER */}
              <div className="payment-user">
                <div className="label">User</div>
                <span>{p.userId?.name}</span>
                <span>{p.userId?.email}</span>
              </div>

              {/* DIVIDER */}
              <div className="payment-divider"></div>

              {/* FOOTER */}
              <div className="payment-footer">
                <span>Rental ID: {p.rentalId?._id}</span>
                <span>
                  {new Date(p.paidAt).toLocaleDateString("en-IN")}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default Payments;