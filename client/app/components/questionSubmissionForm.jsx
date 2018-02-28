import React from 'react';
import styles from '../styling/app.css';

const QuestionSubmissionForm = () => (
  <div className={styles.questionSubmissionFormContainer}>
    <p className={styles.questionSubmissionHeader}>Get quick answers from past visitors.</p>
    <form>
        <textarea className={styles.textEntry} placeholder="Hi, what would you like to know about this attraction?">
        </textarea>
    </form>
  </div>
);

export default QuestionSubmissionForm;
