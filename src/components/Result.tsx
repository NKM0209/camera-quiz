interface ResultProps {
  score: number;
  totalQuestions: number;
  onRetry: () => void;
}

export function Result({ score, totalQuestions, onRetry }: ResultProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getMessage = () => {
    if (percentage === 100) return { title: 'PERFECT!', sub: 'カメラマスター！' };
    if (percentage >= 80) return { title: 'EXCELLENT!', sub: 'かなりの知識派です' };
    if (percentage >= 60) return { title: 'GOOD!', sub: 'なかなかやりますね' };
    if (percentage >= 40) return { title: 'NOT BAD', sub: 'もう少しで合格ライン' };
    return { title: 'KEEP TRYING', sub: 'カメラの世界は奥深い！' };
  };

  const message = getMessage();

  return (
    <div className="result-screen">
      <div className="film-strip top" />
      
      <div className="result-container">
        <div className="result-frame">
          <div className="score-display">
            <span className="score-number">{score}</span>
            <span className="score-divider">/</span>
            <span className="score-total">{totalQuestions}</span>
          </div>
          
          <div className="percentage">{percentage}%</div>
        </div>
        
        <div className="result-message">
          <h2 className="message-title">{message.title}</h2>
          <p className="message-sub">{message.sub}</p>
        </div>
        
        <div className="result-grade">
          {[...Array(5)].map((_, i) => (
            <span 
              key={i} 
              className={`grade-star ${i < Math.ceil(percentage / 20) ? 'filled' : ''}`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      
      <button className="retry-button" onClick={onRetry}>
        <span className="reload-icon">↻</span>
        もう一度挑戦
      </button>
      
      <div className="film-strip bottom" />
    </div>
  );
}
