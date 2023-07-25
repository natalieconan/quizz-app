import './QuestionPage.css';
import { Button } from './Button';
import { Quiz } from './Quiz';
import { useState, useEffect } from 'react';

export const QuestionPage = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [gameState, setGameState] = useState('Choose Answers');
    const [score, setScore] = useState(0);

    const fetchQuizzes = async () => {
        const response = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
        const data = await response.json();
        const quizzesData = data.results;
        setQuizzes(quizzesData);
    };

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const handleClickButton = () => {
        switch (gameState) {
            case 'Choose Answers':
                setGameState('Check Answers'); 
                break;

            case 'Check Answers':
                fetchQuizzes();
                setGameState('Choose Answers');
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                });
                break;
        }
    };

    return (
        <>
            <div className='question-page'>
                <div className='question-block'>
                    {quizzes.map((quiz, index) => 
                        <Quiz quiz={quiz} key={index} gameState={gameState} score={score} setScore={setScore} />)}
                </div>
                <div className='check-answer-btn'>
                    <p style={gameState === 'Choose Answers' ? {display: 'none'} : {}}>
                        You scored {score}/{quizzes.length} correct answers
                    </p>
                    <Button onClick={handleClickButton}>
                        {gameState === 'Choose Answers' ? 'Check answers' : 'Play again'}
                    </Button>
                </div>
            </div>
        </>
    );
};