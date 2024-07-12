// frontend/src/components/ItemsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ItemsPage = ({ user, handleLogout }) => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:8081/items', {
          params: user ? { userId: user.Id } : {},
        });
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items', error);
      }
    };

    fetchItems();
  }, [user]);

  const handleCreateItem = async () => {
    try {
      const newItem = {
        UserID: user.Id,
        ItemName: itemName,
        Description: description,
        Quantity: quantity,
      };
      const response = await axios.post('http://localhost:8081/items', newItem);
      setItems([...items, response.data]);
      setItemName('');
      setDescription('');
      setQuantity('');
    } catch (error) {
      console.error('Error creating item', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/items/${id}`);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item', error);
    }
  };

  const handleEditItem = (item) => {
    setEditingItemId(item.id);
    setItemName(item.ItemName);
    setDescription(item.Description);
    setQuantity(item.Quantity);
  };

  const handleUpdateItem = async (id) => {
    try {
      const updatedItem = {
        UserID: user.Id,
        ItemName: itemName,
        Description: description,
        Quantity: quantity,
      };
      const response = await axios.put(`http://localhost:8081/items/${id}`, updatedItem);
      setItems(items.map(item => (item.id === id ? response.data : item)));
      setEditingItemId(null);
      setItemName('');
      setDescription('');
      setQuantity('');
    } catch (error) {
      console.error('Error updating item', error);
    }
  };

  const groupedItems = items.reduce((acc, item) => {
    const ownerKey = `${item.FirstName} ${item.LastName} (${item.UserName})`;
    if (!acc[ownerKey]) {
      acc[ownerKey] = [];
    }
    acc[ownerKey].push(item);
    return acc;
  }, {});

  return (
    <div>
      <h2>Items</h2>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {Object.entries(groupedItems).map(([owner, ownerItems]) => (
          <div key={owner}>
            <h3>{owner}</h3>
            <ul>
              {ownerItems.map(item => (
                <li key={item.id}>
                  {editingItemId === item.id ? (
                    <div>
                      <input
                        type="text"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                      />
                      <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                      <button onClick={() => handleUpdateItem(item.id)}>Save</button>
                      <button onClick={() => setEditingItemId(null)}>Cancel</button>
                    </div>
                  ) : (
                    <div>
                      <strong>{item.ItemName}</strong>
                      <p>Description: {item.Description}</p>
                      <p>Quantity: {item.Quantity}</p>
                      {user && user.Id === item.UserID && (
                        <div>
                          <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                          <button onClick={() => handleEditItem(item)}>Edit</button>
                        </div>
                      )}
                    </div>
                  )}
                </li>
              ))}
              {ownerItems.length === 0 && <p>No items available</p>}
            </ul>
          </div>
        ))}
      </div>
      {user && (
        <div>
          <h3>Create New Item</h3>
          <input
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button onClick={handleCreateItem}>Create Item</button>
        </div>
      )}
    </div>
  );
};

export default ItemsPage;
