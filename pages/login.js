// pages/login.js
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', form);
      setMessage('登录成功！');
      localStorage.setItem('token', res.data.token);
      router.push('/');
    } catch (error) {
      setMessage(error.response?.data?.message || '登录失败');
    }
  };

  return (
    <div>
      <h1>登录</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>用户名:</label>
        <input type="text" name="username" value={form.username} onChange={handleChange} required />
        <label>密码:</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required />
        <button type="submit">登录</button>
      </form>
    </div>
  );
}
