import { useState } from 'react';
import api from '../utils/api';

function RegistrationForm() {
  const [form, setForm] = useState({ name: '', email: '', college: '' });
  const [status, setStatus] = useState({ loading: false, error: null, success: null });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: null });

    try {
      const response = await api.post('/api/register', form);
      setStatus({ loading: false, error: null, success: response.data.message });
      setForm({ name: '', email: '', college: '' });
    } catch (error) {
      setStatus({ loading: false, error: error.message, success: null });
    }
  };

  const inputStyle = {
    width: '100%', padding: '10px', marginBottom: '12px',
    border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px',
    boxSizing: 'border-box'
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '30px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#333' }}>
        E-Cell Event Registration
      </h2>

      {status.success && (
        <div style={{ padding: '12px', backgroundColor: '#d4edda',
          color: '#155724', borderRadius: '4px', marginBottom: '16px' }}>
          {status.success}
        </div>
      )}

      {status.error && (
        <div style={{ padding: '12px', backgroundColor: '#f8d7da',
          color: '#721c24', borderRadius: '4px', marginBottom: '16px' }}>
          {status.error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          style={inputStyle} type="text" name="name"
          placeholder="Full Name" value={form.name} onChange={handleChange}
        />
        <input
          style={inputStyle} type="email" name="email"
          placeholder="Email Address" value={form.email} onChange={handleChange}
        />
        <input
          style={inputStyle} type="text" name="college"
          placeholder="College Name" value={form.college} onChange={handleChange}
        />
        <button
          type="submit" disabled={status.loading}
          style={{ width: '100%', padding: '12px',
            backgroundColor: status.loading ? '#6c757d' : '#007bff',
            color: 'white', border: 'none', borderRadius: '4px',
            fontSize: '16px', cursor: status.loading ? 'not-allowed' : 'pointer' }}
        >
          {status.loading ? 'Submitting...' : 'Register Now'}
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;