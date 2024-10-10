'use client';

import React from 'react';
import styles from './page.module.css';
import { Layout } from './hoc/Layout';

export default function Home() {
  return (
    <Layout>
      <main className={styles.main}>{'lets test smth'}</main>
    </Layout>
  );
}
