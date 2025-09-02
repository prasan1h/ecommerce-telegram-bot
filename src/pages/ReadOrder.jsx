import { set } from 'mongoose';
import React, { useEffect } from 'react'
import { data } from 'react-router-dom';
const RENDER_URL = import.meta.env.VITE_RENDER_EXTERNAL_URL;

const ReadOrder = () => {

    const [orders, setOrders] = React.useState([])

    useEffect(() => {
        const fetchOrders = async () => {
          try {
            const response = await fetch(`${RENDER_URL}/server/read/readorder`, {
            // const response = await fetch(`http://localhost:8800/server/order/readorder`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json"
              }
            });
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }   
            const data = await response.json();
            const orders = data.data;
            console.log('Fetched orders:', data);
            console.log('Orders structure check:', orders);
            setOrders(orders);
          } catch (err) {
            console.error('Error fetching orders:', err);
          }
        };
        fetchOrders();
      }, []


    );

  return (
    <div className="orders-container">
        {orders.map((order) => (
            <div key={order._id} className="order-card">
            <h2>Order ID: {order.orderId}</h2>
            <p>Customer: {order.customer}</p>
            <p>Address: {order.address}</p>
            <p>Contact: {order.contact}</p>
            <p>Total Amount: ${order.totalAmount}</p>
            <p>Status: {order.status}</p>
            <h3>Items:</h3>
            <ul>
                {order.items.map((item, index) => (
                <li key={index}>
                    {item.title} - ${item.price} x {item.quantity}
                </li>
                ))}
            </ul>
            </div>
        ))}
    </div>

  )
}

export default ReadOrder