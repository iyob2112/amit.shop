import React, { useContext, useEffect, useState, useCallback } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Cart = () => {
  const user = useSelector((state) => state?.user?.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("cart");
  const [orders, setOrders] = useState([]);
  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null);
  const fetchData = useCallback(async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const responseData = await response.json();
    if (responseData.success) {
      setData(responseData.data);
    }
  }, []);

  const fetchUserOrders = useCallback(async () => {
    try {
      if (!user?._id) {
        toast.error("Please login to view orders");
        return;
      }
      
      const response = await fetch(`${SummaryApi.getOrderById.url}/${user._id}`, {
        method: SummaryApi.getOrderById.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      
      const data = await response.json();

      if (data.success) {
        setOrders(data.data);
      } else {
        toast.error(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
      console.error(error);
    }
  }, [user?._id]);

  const cancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    try {
      const response = await fetch(`${SummaryApi.cancelOrder.url}/${orderId}`, {
        method: SummaryApi.cancelOrder.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success("Order cancelled successfully");
        fetchUserOrders();

      } else {
        toast.error(`Failed to cancel order: ${responseData.message}`);
      }
    } catch (error) {
      toast.error("Network error. Please try again later.");
      console.error("Error cancelling order:", error);
    }
  };

  const handleLoading = useCallback(async () => {
    setLoading(true);
    await fetchData();
    if (activeTab === "orders") {
      await fetchUserOrders();
    }
    setLoading(false);
  }, [activeTab, fetchData, fetchUserOrders]);

  useEffect(() => {
    handleLoading();
  }, [user, activeTab, handleLoading]);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const placeOrder = async () => {
    if (data.length === 0) {
      toast.error("Your cart is empty. Add items before placing an order.");
      return;
    }

    if (!user?._id) {
      toast.error("User ID is missing. Please log in again.");
      return;
    }

    try {
      const response = await fetch(SummaryApi.createOrder.url, {
        method: SummaryApi.createOrder.method,
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ userId: user?._id }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success("Order placed successfully!");
        fetchData();
        context.fetchUserAddToCart();
      } else {
        toast.error(`Failed: ${responseData.message}`);
      }
    } catch (error) {
      toast.error("Network error. Try again later.");
    }
  };

  const totalQty = data.reduce((prev, curr) => prev + curr.quantity, 0);
  const totalPrice = data.reduce(
    (prev, curr) => prev + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  return (
    <div className="container mx-auto py-16">
      {/* Tab Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-full ${
            activeTab === "cart" ? "bg-black text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("cart")}
        >
          My Cart
        </button>
        <button
          className={`px-4 py-2 rounded-full ${
            activeTab === "orders" ? "bg-black text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("orders")}
        >
          My Orders
        </button>
      </div>

      {activeTab === "cart" ? (
        <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
          {/* Cart Products View */}
          <div className="w-full max-w-3xl">
            {loading
              ? loadingCart?.map((el, index) => (
                  <div
                    key={el + "Add To Cart Loading" + index}
                    className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                  ></div>
                ))
              : data.map((product, index) => (
                  <Link
                    to={"/product/" + product?.productId?._id}
                    key={index}
                    className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
                  >
                    <div className="w-32 h-32 bg-slate-200">
                      <img
                        src={product?.productId?.productImage[0]}
                        className="w-full h-full object-scale-down mix-blend-multiply"
                        alt={product?.productId?.productName}
                      />
                    </div>
                    <div className="px-4 py-2 relative">
                      {/* delete product */}
                      <div
                        className="absolute right-0 text-black hover:text-white hover:bg-black rounded-full p-2 cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          deleteCartProduct(product?._id);
                        }}
                      >
                        <MdDelete />
                      </div>

                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.productId.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-black font-medium text-lg">
                          {displayINRCurrency(product?.productId?.sellingPrice)}
                        </p>
                        <p className="text-slate-600 font-semibold text-lg">
                          {displayINRCurrency(
                            product?.productId?.sellingPrice * product?.quantity
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          className="border border-black text-black hover:text-white hover:bg-black w-6 h-6 flex justify-center items-center rounded"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            decraseQty(product?._id, product?.quantity);
                          }}
                        >
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button
                          className="border border-black text-black hover:text-white hover:bg-black w-6 h-6 flex justify-center items-center rounded"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            increaseQty(product?._id, product?.quantity);
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
          </div>

          {/* Cart Summary */}
          <div className="mt-5 lg:mt-0 w-full max-w-sm">
            {loading ? (
              <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
            ) : (
              <div className="h-52 rounded-3xl bg-white justify-center items-center">
                <h2 className="text-2xl font-semibold py-4 px-4">Summary</h2>
                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Quantity</p>
                  <p>{totalQty}</p>
                </div>
                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Total</p>
                  <p>{displayINRCurrency(totalPrice)}</p>
                </div>

                <div className="px-4 py-3">
                  <button
                    className="w-full p-2 text-white bg-black rounded-xl"
                    onClick={placeOrder}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
          {loading ? (
            loadingCart?.map((el, index) => (
              <div
                key={`order-loading-${index}`}
                className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
              ></div>
            ))
          ) : orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order._id}
                className="w-full bg-white p-4 my-2 border border-slate-300 rounded"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Order ID: {order._id}</span>
                  <span className={`text-sm ${
                    order.status === "cancelled" ? "text-red-500" : 
                    order.status === "delivered" ? "text-green-600" :
                    "text-yellow-600"
                  }`}>
                    {order.status}
                  </span>
                </div>

                <div>
                  {order.products.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center border-b border-slate-200 py-2 gap-4"
                    >
                      <img
                        src={item.productId?.productImage?.[0]}
                        alt={item.productId?.productName}
                        className="w-20 h-20 object-contain bg-slate-100 rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-lg line-clamp-1">
                          {item.productId?.productName}
                        </h3>
                        <p className="text-slate-500">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-slate-600 font-semibold">
                          {displayINRCurrency(item.productId?.sellingPrice)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {order.status !== "cancelled" && order.status !== "delivered" && (
                  <div className="text-right mt-4">
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                      onClick={() => cancelOrder(order._id)}
                    >
                      Cancel Order
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-slate-500">No orders found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
