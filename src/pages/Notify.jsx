import React from 'react'
import { useEffect, useState } from "react";


const Notify = () => {

    const [orderData, setOrderData] = useState([]);

    const RENDER_URL = import.meta.env.VITE_RENDER_EXTERNAL_URL;
    const user = window.Telegram.WebApp.initDataUnsafe.user;

    useEffect(() => {
            const fetchOrders = async () => {
          try {
            const response = await fetch(`${RENDER_URL}/server/order/readorder`, {
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
            const my_order = data.data;
            console.log('Fetched orders:', data);
            console.log('Orders structure check:', my_order);
            setOrderData(my_order);
          } catch (err) {
            console.error('Error fetching orders:', err);
          }
        };
        fetchOrders();


      }, [] );


    

  return (
    <>
      <div className="notify-wrapper">
        <h1 className="notify-title">Notify</h1>

        {orderData.map((my_order) =>
          Number(user.id) === Number(my_order.userId) && (
            <div className="notify-card" key={my_order._id}>
              <h2 className="order-id">Order ID: {my_order.orderId}</h2>
              <p className="order-status">On the way</p>
            </div>
          )
        )}
      </div>

    </>
  )

}

export default Notify