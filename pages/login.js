// pages/login.js
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/Form.module.css';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('');
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 输出请求体数据，确保格式正确
      console.log("Login form data:", form);
      
      const res = await axios.post('/api/auth/login', form);
      localStorage.setItem('token', res.data.token);

      setRole(res.data.role); // 设置角色
      setMessage('登录成功！');

      // 根据角色跳转
      if (res.data.role === 'user') {
        router.push('/submit-feedback'); // 信息员跳转到反馈提交页面
      } else if (res.data.role === 'teacher') {
        router.push('/view-feedback'); // 老师跳转到查看反馈页面
      }
    } catch (error) {
      setMessage(error.response?.data?.message || '登录失败');
      console.error("Error in login:", error.response?.data || error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>登录</h1>
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
        <button type="submit" className={styles.button}>登录</button>
      </form>
    </div>
  );
}
