import { useEffect, useState } from "react";
import axios from "axios";

export default function SellerDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  const sellerId = localStorage.getItem("sellerId");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/sellers/${sellerId}/stats`
        );

        if (data.success) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error("Fetch seller stats error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (sellerId) {
      fetchStats();
    } else {
      setLoading(false);
    }
  }, [sellerId]);

  const dashboardStats = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      note: "Your listed products",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      note: "Your customer orders",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      note: "Orders waiting action",
    },
    {
      title: "Revenue",
      value: `₹${stats.totalRevenue}`,
      note: "Your total earnings",
    },
  ];

  return (
    <div className="page-shell">
      <div className="page-top">
        <h2>Dashboard</h2>
        <p>
          Manage products, orders, and store activity from your premium seller
          panel.
        </p>
      </div>

      {loading ? (
        <div className="table-wrapper">
          <p>Loading dashboard...</p>
        </div>
      ) : (
        <>
          <div className="tab-row">
            <button className="tab-btn active-tab">Overview</button>
            <button className="tab-btn">Analytics</button>
            <button className="tab-btn">Orders</button>
            <button className="tab-btn">Performance</button>
          </div>

          <div className="stats-row">
            {dashboardStats.map((item, index) => (
              <div className="stat-box" key={index}>
                <h4>{item.title}</h4>
                <h3>{item.value}</h3>
                <p>{item.note}</p>
              </div>
            ))}
          </div>

          <div className="dashboard-bottom">
            <div className="big-panel-card">
              <h3>Store Overview</h3>
              <p>
                Here you can track your product performance, your order activity,
                pending deliveries, and your revenue in one clean view.
              </p>

              <div className="overview-placeholder">
                <div className="bar bar1"></div>
                <div className="bar bar2"></div>
                <div className="bar bar3"></div>
                <div className="bar bar4"></div>
              </div>
            </div>

            <div className="summary-card">
              <h3>Quick Summary</h3>

              <div className="summary-item">
                <span>Total Products</span>
                <strong>{stats.totalProducts}</strong>
              </div>

              <div className="summary-item">
                <span>Total Orders</span>
                <strong>{stats.totalOrders}</strong>
              </div>

              <div className="summary-item">
                <span>Pending Orders</span>
                <strong>{stats.pendingOrders}</strong>
              </div>

              <div className="summary-item">
                <span>Total Revenue</span>
                <strong>₹{stats.totalRevenue}</strong>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}