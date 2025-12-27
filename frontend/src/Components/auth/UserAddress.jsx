import { useNavigate } from "react-router-dom";
import { useState } from "react";

const UserAddress = () => {
  const navigate = useNavigate();

  // Start empty — show only after adding address
  const [addresses, setAddresses] = useState([]);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this address?")) return;
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <p className="text-sm text-gray-400 mb-4">
        My Account <span className="mx-2">{">"}</span> My Addresses
      </p>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">My Addresses</h1>
        <button
          onClick={() => navigate("/add-address")}
          className="text-emerald-400 font-semibold"
        >
          + ADD NEW ADDRESS
        </button>
      </div>

      {/* Empty state */}
      {addresses.length === 0 && (
        <p className="text-gray-400">
          No addresses added yet.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="border border-gray-700 rounded-lg p-6"
          >
            <h2 className="text-emerald-400 font-semibold mb-2">
              {addr.name}
            </h2>

            <p className="text-sm mb-2">{addr.phone}</p>
            <p className="text-sm text-gray-300 mb-4">
              {addr.address}
            </p>

            <div className="flex justify-between items-center text-sm">
              <span>
                Address Type:{" "}
                <span className="capitalize">{addr.type}</span>
              </span>
              <button
                onClick={() => handleDelete(addr.id)}
                className="border px-4 py-2 rounded hover:bg-red-600"
              >
                DELETE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAddress;