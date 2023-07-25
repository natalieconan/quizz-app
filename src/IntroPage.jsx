import './IntroPage.css';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';

export const IntroPage = () => {
    const navigate = useNavigate()
    const startQuizz = () => {
        navigate('/question-page');
    };

    return (
        <div className='intro-page'> 
            <main>
                <div className='header-nav'>
                    Quizzical
                </div>
                <div className='description'>
                    Some description if needed
                </div>
                <Button onClick={startQuizz}>Start quiz</Button>
            </main>
        </div>
    );
};