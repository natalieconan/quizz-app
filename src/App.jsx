import './App.css';
import { IntroPage } from './IntroPage';
import { QuestionPage } from './QuestionPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<IntroPage />} />
          <Route path='/question-page' element={<QuestionPage />} />
        </Routes>
      </Router>
    </>
  )
};

export default App;
