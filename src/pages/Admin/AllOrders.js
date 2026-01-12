import React, { useEffect, useState } from "react";
import SummaryApi from "../../common";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch(SummaryApi.allOrders.url, {
          method: SummaryApi.allOrders.method,
          credentials: "include",
        });
        const dataResponse = await response.json();
        setOrders(dataResponse?.data || []);
      } catch (error) {
        setError("Error fetching orders.");
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeDetails = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="p-4 min-h-screen bg-white">
      <h2 className="text-2xl font-bold text-white bg-black px-4 py-2 rounded mb-6 shadow">
        All Orders
      </h2>

      {loading && <p className="text-gray-600">Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && orders.length > 0 ? (
        <div className="overflow-x-auto shadow-lg rounded-lg border border-black">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-100 transition">
                  <td className="px-6 py-4 font-medium">{order._id}</td>
                  <td className="px-6 py-4">{order.userId?.name || "N/A"}</td>
                  <td className="px-6 py-4">${order.totalAmount}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="text-black hover:underline font-medium"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <p className="text-gray-500">No orders found.</p>
      )}

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
            <h3 className="text-xl font-bold mb-4 text-black">Order Details</h3>

            <div className="space-y-2 text-sm text-gray-700">
              <p><span className="font-semibold">Order ID:</span> {selectedOrder._id}</p>
              <p><span className="font-semibold">Customer:</span> {selectedOrder.userId?.name || "N/A"}</p>
              <p><span className="font-semibold">Email:</span> {selectedOrder.userId?.email || "N/A"}</p>
              <p><span className="font-semibold">Total:</span> ${selectedOrder.totalAmount}</p>
              <p><span className="font-semibold">Status:</span> {selectedOrder.status || "Pending"}</p>
            </div>

            <button
              onClick={closeDetails}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllOrders;
