// pages/index.js
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>欢迎来到反馈系统</h1>
      <p className={styles.description}>
        在此系统中，信息员可以提交反馈，领导可以查看反馈。
      </p>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={() => router.push('/register')}>
          注册
        </button>
        <button className={styles.button} onClick={() => router.push('/login')}>
          登录
        </button>
      </div>
    </div>
  );
}
