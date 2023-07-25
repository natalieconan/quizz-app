import './QuestionPage.css';
import { Button } from './Button';
import { Quiz } from './Quiz';
import { useState, useEffect } from 'react';

export const QuestionPage = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [checkAnswer, setCheckAnswer] = useState(false);

    useEffect(() => {
        const fetchQuizzes = async () => {
            const response = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
            const data = await response.json();
            const quizzesData = data.results;
            setQuizzes(quizzesData);
        };
        fetchQuizzes();
    }, []);

    const handleCheckAnswer = () => {
        setCheckAnswer((checkAnswer) => !checkAnswer); 
        if (checkAnswer) {
            window.location.reload();
            setCheckAnswer((checkAnswer) => !checkAnswer);
        }  
    };

    return (
        <>
            <div className='question-page'>
                <div className='question-block'>
                    {quizzes.map((quiz, index) => <Quiz quiz={quiz} key={index} checkAnswer={checkAnswer} />)}
                </div>
                <div className='check-answer-btn'>
                    <Button onClick={handleCheckAnswer}>
                        {!checkAnswer ? 'Check answers' : 'Play Again'}
                    </Button>
                </div>
            </div>
        </>
    );
};