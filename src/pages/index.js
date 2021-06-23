import React from 'react'
import styles from './index.less'
// import { formatMessage } from 'umi-plugin-locale';

export default function () {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>
          <a href="https://umijs.org/guide/getting-started.html">
            {/* {formatMessage({ id: 'index.start' })} */}
            奔跑吧兄弟
          </a>
        </li>
      </ul>
    </div>
  )
}
