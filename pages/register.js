// pages/register.js
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/Form.module.css';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '', role: 'user' });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 检查提交数据
      console.log("Register form data:", form);
      const res = await axios.post('/api/auth/register', form);
      
      localStorage.setItem('token', res.data.token);
      setMessage('注册成功！');

      if (form.role === 'user') {
        router.push('/submit-feedback');
      } else if (form.role === 'teacher') {
        router.push('/view-feedback');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || '注册失败');
      console.error("Error in registration:", error.response?.data || error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>注册</h1>
      {message && <p className={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>用户名:</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <label className={styles.label}>密码:</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <label className={styles.label}>角色:</label>
        <select name="role" value={form.role} onChange={handleChange} className={styles.select}>
          <option value="user">信息员</option>
          <option value="teacher">老师</option>
        </select>
        <button type="submit" className={styles.button}>注册</button>
      </form>
    </div>
  );
}
