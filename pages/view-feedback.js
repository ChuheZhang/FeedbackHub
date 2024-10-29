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
        feedbacks.map((feedback) => (
          <div key={feedback._id} className={styles.feedbackItem}>
            <h3>学院: {feedback.college}</h3>
            <p>班级: {feedback.class}</p>
            <p>教师反馈: {feedback.teacherFeedback}</p>
            <p>设备反馈: {feedback.equipmentFeedback}</p>
            <p>提交者: {feedback.submittedBy?.username}</p>
            <p>日期: {new Date(feedback.date).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
}
