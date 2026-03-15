import { NavLink } from "react-router-dom";

export default function SellerSidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Add Product", path: "/add-product" },
    { name: "Products", path: "/products" },
    { name: "Orders", path: "/orders" },
  ];

  return (
    <aside className="panel-sidebar">
      <div className="panel-brand">
        <h2>VELOURA</h2>
        <p>Seller Panel</p>
      </div>

      <nav className="panel-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "panel-link active-panel-link" : "panel-link"
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}