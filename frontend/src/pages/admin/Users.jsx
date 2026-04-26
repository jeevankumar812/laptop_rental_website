import { useEffect, useState } from "react";
import API from "../../api/axios";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/users/all", authHeader())
      .then((res) => setUsers(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="admin-users-page">
        <div className="users-loading">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="admin-users-page">
      <div className="users-container">

        {/* HEADER */}
        <div className="users-header">
          <h2>Users</h2>
          <span className="count">{users.length} users</span>
        </div>

        {/* GRID (LEFT → RIGHT FLOW) */}
        <div className="users-list">
          {users.map((u, index) => (
            <div className="user-card" key={u._id}>

              {/* TOP */}
              <div className="user-top">
                <h3>{index + 1}. {u.name}</h3>
                <span className="role">{u.role}</span>
              </div>

              {/* DETAILS */}
              <div className="user-section">
                <p><strong>Email:</strong> {u.email}</p>
                <p><strong>User ID:</strong> {u._id}</p>
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

export default Users;