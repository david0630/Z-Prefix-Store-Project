import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ItemsPage = ({ user, handleLogout }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:8081/items', {
          params: {
            userId: user ? user.Id : null,
          },
        });
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items', error);
      }
    };

    fetchItems();
  }, [user]);

  return (
    <div>
      <h2>Items</h2>
      <button onClick={handleLogout}>Logout</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h3>{item.ItemName}</h3>
            <p>Description: {item.Description}</p>
            <p>Quantity: {item.Quantity}</p>
            <p>Owner: {item.FirstName} {item.LastName} ({item.UserName})</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsPage;
