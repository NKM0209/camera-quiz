import { Question as QuestionType } from '../types';

interface QuestionProps {
  question: QuestionType;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  showExplanation: boolean;
  onSelectAnswer: (index: number) => void;
  onNext: () => void;
}

export function Question({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  showExplanation,
  onSelectAnswer,
  onNext,
}: QuestionProps) {
  const isCorrect = selectedAnswer === question.answer;
  
  const getDifficultyLabel = (d: number) => {
    return '★'.repeat(d) + '☆'.repeat(3 - d);
  };

  return (
    <div className="question-screen">
      <div className="question-header">
        <div className="progress">
          <span className="progress-text">
            {questionNumber} / {totalQuestions}
          </span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
        
        <div className="question-meta">
          <span className="category">{question.category}</span>
          <span className="difficulty">{getDifficultyLabel(question.difficulty)}</span>
        </div>
      </div>

      <div className="question-body">
        <h2 className="question-text">{question.question}</h2>
        
        <div className="choices">
          {question.choices.map((choice, index) => {
            let choiceClass = 'choice';
            if (selectedAnswer !== null) {
              if (index === question.answer) {
                choiceClass += ' correct';
              } else if (index === selectedAnswer) {
                choiceClass += ' wrong';
              }
            }
            
            return (
              <button
                key={index}
                className={choiceClass}
                onClick={() => onSelectAnswer(index)}
                disabled={selectedAnswer !== null}
              >
                <span className="choice-label">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="choice-text">{choice}</span>
              </button>
            );
          })}
        </div>
      </div>

      {showExplanation && (
        <div className={`explanation ${isCorrect ? 'correct' : 'wrong'}`}>
          <div className="result-badge">
            {isCorrect ? '○ 正解！' : '× 不正解'}
          </div>
          <p className="explanation-text">{question.explanation}</p>
          <button className="next-button" onClick={onNext}>
            {questionNumber === totalQuestions ? '結果を見る' : '次の問題へ'}
          </button>
        </div>
      )}
    </div>
  );
}
