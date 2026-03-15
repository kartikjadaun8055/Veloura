import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getProfile, saveProfile } from "../utils/storage";

export default function Profile() {
  const initialProfile = getProfile() || {
    name: "",
    email: "",
    phone: "",
    city: "",
    pincode: "",
    address: "",
  };

  const [formData, setFormData] = useState(initialProfile);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setMessage("");
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveProfile(formData);
    setMessage("Profile saved successfully!");
  };

  return (
    <>
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <h1 className="mb-8 text-3xl font-bold text-[#2f1e14] md:text-5xl">
          My Profile
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80"
              alt="profile"
              className="mx-auto mb-5 h-28 w-28 rounded-full object-cover"
            />

            <h2 className="text-2xl font-bold text-[#2f1e14]">
              {formData.name || "Your Name"}
            </h2>

            <p className="mt-2 text-sm text-[#6b5b4f]">
              {formData.email || "yourmail@example.com"}
            </p>

            <p className="mt-2 font-semibold text-[#8B4513]">
              Premium Buyer
            </p>

            <button
              type="button"
              className="mt-5 rounded-xl bg-[#8B4513] px-5 py-3 text-white"
            >
              Edit Profile
            </button>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm lg:col-span-2">
            <h2 className="mb-6 text-2xl font-bold text-[#2f1e14] md:text-3xl">
              Personal Information
            </h2>

            <form onSubmit={handleSave} className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-semibold text-[#2f1e14]">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-[#2f1e14]">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-[#2f1e14]">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-[#2f1e14]">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-[#2f1e14]">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-3 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block font-semibold text-[#2f1e14]">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-3 outline-none"
                />
              </div>

              <button
                type="submit"
                className="mt-2 rounded-xl bg-[#8B4513] px-5 py-3 text-white md:col-span-2"
              >
                Save Changes
              </button>
            </form>

            {message && (
              <p className="mt-4 font-medium text-green-600">{message}</p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}