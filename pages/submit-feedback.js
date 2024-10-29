// pages/submit-feedback.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../styles/Form.module.css';

export default function SubmitFeedback() {
  const [feedbackList, setFeedbackList] = useState([
    { college: '', class: '', teacherFeedback: '', equipmentFeedback: '' },
  ]);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleChange = (index, e) => {
    const updatedList = [...feedbackList];
    updatedList[index][e.target.name] = e.target.value;
    setFeedbackList(updatedList);
  };

  const handleAddFeedback = () => {
    setFeedbackList([...feedbackList, { college: '', class: '', teacherFeedback: '', equipmentFeedback: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/feedback', { feedbackList }, {
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
        <table className={styles.table}>
          <thead>
            <tr>
              <th>学院</th>
              <th>班级</th>
              <th>教师反馈</th>
              <th>设备反馈</th>
            </tr>
          </thead>
          <tbody>
            {feedbackList.map((feedback, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    name="college"
                    value={feedback.college}
                    onChange={(e) => handleChange(index, e)}
                    required
                    className={styles.input}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="class"
                    value={feedback.class}
                    onChange={(e) => handleChange(index, e)}
                    required
                    className={styles.input}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="teacherFeedback"
                    value={feedback.teacherFeedback}
                    onChange={(e) => handleChange(index, e)}
                    required
                    className={styles.input}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="equipmentFeedback"
                    value={feedback.equipmentFeedback}
                    onChange={(e) => handleChange(index, e)}
                    required
                    className={styles.input}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={handleAddFeedback} className={styles.button}>添加反馈</button>
        <button type="submit" className={styles.button}>提交反馈</button>
      </form>
    </div>
  );
}
