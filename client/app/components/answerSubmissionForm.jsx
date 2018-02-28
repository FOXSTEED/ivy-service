import React from 'react';
import styles from '../styling/app.css';

const AnswerSubmissionForm = (props) => {
  return (
    <div>
      <p className={styles.answerSubmissionHeader}> WHAT IS YOUR ANSWER?</p>
      <form>
          <textarea className={styles.textEntry} placeholder="Can you answer this question? Enter your answer here">
          </textarea>
      </form>

      <button className={styles.button}> Submit </button>
      <button className={styles.secondaryButton} onClick={() => props.displayAnswerForm()}> Cancel </button>
    </div>
  );
};

export default AnswerSubmissionForm;
