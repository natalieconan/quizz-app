import './Quiz.css';
import { Button } from './Button';
import lodash from 'lodash';
import { useEffect, useState } from 'react';

const buttonStyle = {
  background: '#F5F7FB',
};

const buttonClickStyle = {
  background: '#D6DBF5',
}

const buttonCorrectStyle = {
  background: '#94D7A2',
}

const buttonInCorrectStyle = {
  background: '#F8BCBC',
}

// eslint-disable-next-line react/prop-types
export const Quiz = ({ quiz, gameState, score, setScore }) => {
  const [buttonBackground, setButtonBackground] = useState({});
  const [currentButtonStyle, setCurrentButtonStyle] = useState({});
  // eslint-disable-next-line react/prop-types
  const [allAnswers, setAllAnswers] = useState([quiz.correct_answer, ...quiz.incorrect_answers]);
  const [isAdded, setIsAdded] = useState(false);

  const handleClickButton = (answer) => {
    const newStyle = {...buttonBackground};
    newStyle[answer] = newStyle[answer] != buttonStyle ? buttonStyle : buttonClickStyle ;
    setCurrentButtonStyle(newStyle);
  };

  const getButtonStyle = (gameState, answer) => {
    if (gameState === 'Choose Answers')
      return currentButtonStyle[answer];
    
    if (gameState === 'Check Answers') {
      // eslint-disable-next-line react/prop-types
      return answer === quiz.correct_answer 
      ? buttonCorrectStyle 
      : currentButtonStyle[answer] === buttonClickStyle ? buttonInCorrectStyle : buttonStyle;
    }

    return buttonStyle;
  };

  useEffect(() =>  {
    // eslint-disable-next-line react/prop-types
    const newAnswers = [quiz.correct_answer, ...quiz.incorrect_answers];
    const shuffleAnswers = lodash.shuffle(newAnswers);
    setAllAnswers(shuffleAnswers);
  }, [quiz]);

  useEffect(() => {
    const initialButtonStyle = allAnswers.reduce((style, answer) => {
      style[answer] = buttonStyle;
      return style;
    }, {});
    setButtonBackground(initialButtonStyle)
    setCurrentButtonStyle(initialButtonStyle);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allAnswers]);

  useEffect(() => {
    allAnswers.forEach((answer) => {
      // eslint-disable-next-line react/prop-types
      if (answer == quiz.correct_answer && currentButtonStyle[answer] === buttonClickStyle) {
        if (!isAdded) {
          setScore(score + 1);
          setIsAdded(true);
        }
      } else {
        if (isAdded) {
          setScore(score - 1);
          setIsAdded(false);
        }
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentButtonStyle]);
  
  return (
        <>
          <div className='question'>
            <p dangerouslySetInnerHTML={{
              // eslint-disable-next-line react/prop-types
              __html : quiz.question
            }} />
          </div>
          <div className='answers'>
            {allAnswers.map((answer) => (
              <Button
                key={answer}
                style={
                  getButtonStyle(gameState, answer)
                }
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