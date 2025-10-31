import React from 'react';
import styles from '../styles/StaticPage.module.css';

interface StaticPageProps {
  title: string;
  children: React.ReactNode;
}

const StaticPage: React.FC<StaticPageProps> = ({ title, children }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default StaticPage;