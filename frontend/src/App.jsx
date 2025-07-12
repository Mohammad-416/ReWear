import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    secret_key: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8000/api/accounts/create-superuser/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Superuser created successfully!');
      } else {
        setMessage(data.detail || 'Failed to create superuser.');
      }
    } catch (err) {
      setMessage('Error: ' + err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', paddingTop: '40px' }}>
      <h2>Create Superuser</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="secret_key"
          placeholder="Secret Key"
          type="text"
          value={formData.secret_key}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Create Superuser</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default App;
