import { useEffect, useState } from "react";
import API from "../../api/axios";
import UserCard from "../../components/kyc/UserCard";
import "./KYC.css";

const KYC = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/users/all");
        setUsers(res.data);
      } catch (err) {
        console.error("KYC fetch error:", err);
      }
    };

    fetchUsers();
  }, []);

  const pendingUsers = users.filter((u) => u.kycStatus === "pending");
  const rejectedUsers = users.filter((u) => u.kycStatus === "rejected");

  return (
    <div className="kyc-page-wrapper">
      <h2 className="kyc-page-title">KYC Management</h2>

      <h3 className="kyc-section-title">Pending Requests</h3>
      {pendingUsers.length === 0 ? (
        <p className="kyc-empty-text">No pending KYC</p>
      ) : (
        <div className="kyc-grid-wrapper">
          {pendingUsers.map((u) => (
            <UserCard key={u._id} user={u} />
          ))}
        </div>
      )}

      <h3 className="kyc-section-title">Rejected Requests</h3>
      {rejectedUsers.length === 0 ? (
        <p className="kyc-empty-text">No rejected KYC</p>
      ) : (
        <div className="kyc-grid-wrapper">
          {rejectedUsers.map((u) => (
            <UserCard key={u._id} user={u} />
          ))}
        </div>
      )}
    </div>
  );
};

export default KYC;