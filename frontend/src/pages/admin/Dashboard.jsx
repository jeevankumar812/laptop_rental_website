import { useEffect, useState, useMemo } from "react";
import API from "../../api/axios";
import "./Dashboard.css";

/* ===== Reusable Components ===== */
const StatCard = ({ title, value }) => (
  <div className="dashboard-card">
    <h3>{title}</h3>
    <span>{value}</span>
  </div>
);

const SkeletonCard = () => (
  <div className="dashboard-card skeleton">
    <div className="skeleton-title"></div>
    <div className="skeleton-value"></div>
  </div>
);

/* ===== Utility Functions ===== */
const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    return {};
  }
};

const normalizeCount = (data) => {
  if (Array.isArray(data)) return data.length;
  if (data?.count) return data.count;
  return 0;
};

/* ===== Main Component ===== */
const Dashboard = () => {
  const user = useMemo(() => getUser(), []);

  const [stats, setStats] = useState({
    laptops: 0,
    rentals: 0,
    payments: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [laptopsRes, rentalsRes, paymentsRes] = await Promise.all([
          API.get("/laptops"),
          API.get("/rentals"),
          API.get("/payments/all"),
        ]);

        setStats({
          laptops: normalizeCount(laptopsRes.data),
          rentals: normalizeCount(rentalsRes.data),
          payments: normalizeCount(paymentsRes.data),
        });
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statsList = [
    { title: "Total Laptops", value: stats.laptops },
    { title: "Total Rentals", value: stats.rentals },
    { title: "Total Payments", value: stats.payments },
  ];

  const displayName = user?.name || user?.username || "Admin";

  return (
    <div className="dashboard-container">

      {/* ===== Header ===== */}
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>System overview and statistics</p>
        </div>

        <div className="dashboard-user">
          Welcome {displayName} 👋
        </div>
      </div>

      {/* ===== Cards ===== */}
      <div className="dashboard-grid">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          : statsList.map((item, index) => (
              <StatCard
                key={index}
                title={item.title}
                value={item.value}
              />
            ))}
      </div>

      {/* ===== Table ===== */}
      <div className="dashboard-table">
        <div className="dashboard-table-header">
          Quick Overview
        </div>

        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Total Count</th>
            </tr>
          </thead>

          <tbody>
            {statsList.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Dashboard;