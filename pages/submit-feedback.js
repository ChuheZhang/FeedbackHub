// pages/submit-feedback.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../styles/Form.module.css';

export default function SubmitFeedback() {
  const [form, setForm] = useState({
    college: '',
    class: '',
    teacherFeedback: '',
    equipmentFeedback: '',
  });
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    // 检查用户是否登录
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/feedback', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('反馈提交成功！');
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      console.error('Error in feedback submission:', error.response?.data || error);
      setMessage(error.response?.data?.message || '反馈提交失败');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>提交反馈</h1>
      {message && <p className={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>学院:</label>
        <input
          type="text"
          name="college"
          value={form.college}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <label className={styles.label}>班级:</label>
        <input
          type="text"
          name="class"
          value={form.class}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <label className={styles.label}>教师反馈:</label>
        <textarea
          name="teacherFeedback"
          value={form.teacherFeedback}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <label className={styles.label}>设备反馈:</label>
        <textarea
          name="equipmentFeedback"
          value={form.equipmentFeedback}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>提交反馈</button>
      </form>
    </div>
  );
}
