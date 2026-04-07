import AdminLayout from "../../components/admin/AdminLayout";
import StatCard from "../../components/admin/StatCard";

const Dashboard = () => {
  return (
    <AdminLayout>
      <h1>Admin Dashboard</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <StatCard title="Total Laptops" value="42" />

        <StatCard title="Active Rentals" value="15" />

        <StatCard title="Users" value="120" />

        <StatCard title="Revenue" value="₹12000" />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
// This is a simple dashboard page for the admin panel. It uses the AdminLayout component to provide a consistent layout and the StatCard component to display key statistics.
//hi
