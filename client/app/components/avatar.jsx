import React from 'react';
import styles from '../styling/app.css';

const Avatar = (props) => {
  return (
    <div className={styles.avatarContainer}>
      <img className={styles.avatarImage} src={props.avatar}></img>
      <p className={styles.username}>{`${props.firstName} ${props.lastName}`}</p>
    </div>
  );
};

export default Avatar;