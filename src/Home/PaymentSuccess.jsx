import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

const PaymentSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("order_id"); // Get the order ID from the URL
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (orderId) {
      // Fetch order details from the backend
      fetch(`${process.env.REACT_APP_API_URL}/orders/${orderId}`)
        .then((response) => response.json())
        .then((data) => {
          setOrder(data.order);
          toast.success("Payment successful! Your order has been placed.");
        })
        .catch((error) => {
          console.error("Error fetching order details:", error);
          toast.error("Failed to fetch order details.");
        });
    }
  }, [orderId]);

  return (
    <div>
      <h1>Payment Successful</h1>
      {order ? (
        <div>
          <p>Order ID: {order._id}</p>
          <p>Total Amount: ₹{order.totalAmount}</p>
          <p>Status: {order.orderStatus}</p>
        </div>
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  );
};

export default PaymentSuccess;