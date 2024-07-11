import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ItemsPage = ({ user, handleLogout }) => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ ItemName: '', Description: '', Quantity: '' });
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/items?userId=${user.Id}`);
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items', error);
      }
    };

    fetchItems();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleCreateItem = async () => {
    try {
      const response = await axios.post('http://localhost:8081/items', { ...newItem, UserID: user.Id });
      setItems([...items, response.data]);
      setNewItem({ ItemName: '', Description: '', Quantity: '' });
    } catch (error) {
      console.error('Error creating item', error);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
  };

  const handleUpdateItem = async () => {
    try {
      const response = await axios.put(`http://localhost:8081/items/${editingItem.id}`, editingItem);
      setItems(items.map(item => (item.id === editingItem.id ? response.data : item)));
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating item', error);
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

  const handleEditingChange = (e) => {
    const { name, value } = e.target;
    setEditingItem({ ...editingItem, [name]: value });
  };

  return (
    <div>
      <h2>Items</h2>
      <button onClick={handleLogout}>Logout</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {editingItem && editingItem.id === item.id ? (
              <div>
                <input
                  type="text"
                  name="ItemName"
                  value={editingItem.ItemName}
                  onChange={handleEditingChange}
                />
                <input
                  type="text"
                  name="Description"
                  value={editingItem.Description}
                  onChange={handleEditingChange}
                />
                <input
                  type="number"
                  name="Quantity"
                  value={editingItem.Quantity}
                  onChange={handleEditingChange}
                />
                <button onClick={handleUpdateItem}>Save</button>
                <button onClick={() => setEditingItem(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <p><strong>{item.ItemName}</strong></p>
                <p>Description: {item.Description}</p>
                <p>Quantity: {item.Quantity}</p>
                <button onClick={() => handleEditItem(item)}>Edit</button>
                <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <h3>Create New Item</h3>
      <input
        type="text"
        name="ItemName"
        placeholder="Item Name"
        value={newItem.ItemName}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="Description"
        placeholder="Description"
        value={newItem.Description}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="Quantity"
        placeholder="Quantity"
        value={newItem.Quantity}
        onChange={handleInputChange}
      />
      <button onClick={handleCreateItem}>Create Item</button>
    </div>
  );
};

export default ItemsPage;
