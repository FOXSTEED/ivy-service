import React from 'react';
import styles from '../styling/app.css';

const QuestionSubmissionForm = () => (
  <div className={styles.questionSubmissionFormContainer}>
    <form>

        <textarea className={styles.textEntry} placeholder="Hi, what would you like to know about this attraction?">
        </textarea>

    </form>
  </div>
);

export default QuestionSubmissionForm;
