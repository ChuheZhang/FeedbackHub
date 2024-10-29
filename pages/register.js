// pages/register.js
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '', role: 'user' });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', form);
      setMessage('注册成功！');
      localStorage.setItem('token', res.data.token);
      router.push('/');
    } catch (error) {
      setMessage(error.response?.data?.message || '注册失败');
    }
  };

  return (
    <div>
      <h1>注册</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>用户名:</label>
        <input type="text" name="username" value={form.username} onChange={handleChange} required />
        <label>密码:</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required />
        <label>角色:</label>
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="user">信息员</option>
          <option value="leader">领导</option>
        </select>
        <button type="submit">注册</button>
      </form>
    </div>
  );
}
