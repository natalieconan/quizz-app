import './Quiz.css';
import { Button } from './Button';
import lodash from 'lodash';
import { useEffect, useState } from 'react';

const buttonStyles = {
  background: '#F5F7FB',
};

const buttonClickStyles = {
  background: '#D6DBF5',
}

const buttonCorrectStyles = {
  background: '#94D7A2',
}

const buttonInCorrectStyles = {
  background: '#F8BCBC',
}

export const Quiz = (props) => {
  const [originBackground, setOriginBackground] = useState({});
  const [btnBackground, setBtnBackground] = useState({});
  const [allAnswers, setAllAnswers] = useState([props.quiz.correct_answer, ...props.quiz.incorrect_answers]);

  const handleClickButton = (answer) => {
    const changedBtnBackground = {...originBackground};
    changedBtnBackground[answer] = changedBtnBackground[answer] === buttonStyles ? buttonClickStyles : buttonStyles;
    setBtnBackground(changedBtnBackground);
  };

  useEffect(() => {
    const initialBtnBackground = allAnswers.reduce((acc, answer) => {
      acc[answer] = buttonStyles;
      return acc;
    }, {});
    setBtnBackground(initialBtnBackground);
    setOriginBackground(initialBtnBackground);

    const shuffleAnswers = lodash.shuffle(allAnswers);
    setAllAnswers(shuffleAnswers);
  }, []);
  
  return (
        <>
          <div className='question'>
            <p dangerouslySetInnerHTML={{__html : props.quiz.question}} />
          </div>
          <div className='answers'>
            {allAnswers.map((answer) => (
              <Button
                key={answer}
                style={
                  !props.checkAnswer 
                  ? btnBackground[answer]
                  : answer === props.quiz.correct_answer 
                  ? buttonCorrectStyles
                  : btnBackground[answer] === buttonClickStyles
                  ? buttonInCorrectStyles 
                  : buttonStyles
                }
                className={answer === props.quiz.correct_answer ? 'correct' : 'incorrect'}
                onClick={() => handleClickButton(answer)}
              >
                <p dangerouslySetInnerHTML={{__html : answer}} />
              </Button>
            ))}
          </div>
          <div className='sep-line'></div>
        </>
  );
};