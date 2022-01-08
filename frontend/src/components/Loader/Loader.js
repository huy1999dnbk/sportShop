import React from 'react'
import { Spinner } from 'react-bootstrap'
import styles from './loader.module.css'
const Loader = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.bounce1}></div>
      <div className={styles.bounce2}></div>
      <div className={styles.bounce3}></div>
    </div>
  )
}

export default Loader 
