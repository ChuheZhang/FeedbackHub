// pages/view-feedback.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../styles/Form.module.css';

export default function ViewFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const res = await axios.get('/api/feedback', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFeedbacks(res.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchFeedbacks();
  }, [router]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>查看反馈</h1>
      {feedbacks.length === 0 ? (
        <p className={styles.message}>暂无反馈</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>学院</th>
              <th>班级</th>
              <th>教师反馈</th>
              <th>设备反馈</th>
              <th>提交者</th>
              <th>日期</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback._id}>
                <td>{feedback.college}</td>
                <td>{feedback.class}</td>
                <td>{feedback.teacherFeedback}</td>
                <td>{feedback.equipmentFeedback}</td>
                <td>{feedback.submittedBy?.username}</td>
                <td>{new Date(feedback.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
