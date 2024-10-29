// pages/login.js
import { useState, useEffect } from 'react';
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
      const res = await axios.post('/api/auth/login', form);
      localStorage.setItem('token', res.data.token);

      setRole(res.data.role); // 设置角色
      setMessage('登录成功！');
    } catch (error) {
      setMessage(error.response?.data?.message || '登录失败');
      console.error("Error in login:", error);
    }
  };

  // 监听 role 变化，在角色信息更新后跳转
  useEffect(() => {
    if (role === 'user') {
      router.push('/submit-feedback'); // 信息员跳转到反馈提交页面
    } else if (role === 'teacher') {
      router.push('/view-feedback'); // 老师跳转到查看反馈页面
    }
  }, [role, router]);

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
