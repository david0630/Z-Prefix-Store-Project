import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ItemsPage = ({ user }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:8081/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <h2>Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.ItemName}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsPage;
