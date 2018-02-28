import React from 'react';
import styles from '../styling/app.css';

const QuestionSubmissionForm = (props) => {
  return (
    <div className={styles.questionSubmissionFormContainer}>
      <p className={styles.questionSubmissionHeader}>Get quick answers from past visitors.</p>
      <form>
          <textarea className={styles.textEntry} placeholder="Hi, what would you like to know about this attraction?">
          </textarea>
      </form>

      <button className={styles.button}> Submit </button>
      <button className={styles.secondaryButton} onClick={() => props.displaySubmissionForm()}> Cancel </button>
    </div>
  );
};

export default QuestionSubmissionForm;
