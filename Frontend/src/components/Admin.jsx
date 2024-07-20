import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import './AdminPage.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchUserStats();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:2300/api/allusers');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchUserStats = async () => {
    try {
      const response = await axios.get('/api/admin/user-statshttp://localhost:2300/api/allusers');
      setUserStats(response.data);
    } catch (error) {
      console.error('Error fetching user statistics:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:2300/api/allusers${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const chartData = {
    labels: userStats.map(stat => `Month ${stat._id}`),
    datasets: [
      {
        label: 'Number of Users',
        data: userStats.map(stat => stat.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
      </header>
      <main>
        <h2>Manage Users</h2>
        <div className="chart-container">
          <Bar data={chartData} />
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button className="delete-button" onClick={() => handleDeleteUser(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default AdminPage;
