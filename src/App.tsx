import { useQuiz } from './hooks/useQuiz';
import { StartScreen } from './components/StartScreen';
import { Question } from './components/Question';
import { Result } from './components/Result';
import './index.css';

function App() {
  const {
    phase,
    currentQuestion,
    currentIndex,
    questions,
    score,
    selectedAnswer,
    showExplanation,
    startGame,
    selectAnswer,
    nextQuestion,
    resetGame,
  } = useQuiz();

  return (
    <div className="app">
      <div className="container">
        {phase === 'start' && (
          <StartScreen onStart={startGame} />
        )}
        
        {phase === 'playing' && currentQuestion && (
          <Question
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
            selectedAnswer={selectedAnswer}
            showExplanation={showExplanation}
            onSelectAnswer={selectAnswer}
            onNext={nextQuestion}
          />
        )}
        
        {phase === 'result' && (
          <Result
            score={score}
            totalQuestions={questions.length}
            onRetry={resetGame}
          />
        )}
      </div>
    </div>
  );
}

export default App;
