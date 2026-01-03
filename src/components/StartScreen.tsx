import { useState } from 'react';
import { DifficultyFilter } from '../types';

interface StartScreenProps {
  onStart: (difficulty: DifficultyFilter) => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyFilter>('all');

  const handleStart = () => {
    onStart(selectedDifficulty);
  };

  return (
    <div className="start-screen">
      <div className="film-strip top" />

      <div className="title-container">
        <div className="aperture-icon">
          <div className="aperture-blade" />
          <div className="aperture-blade" />
          <div className="aperture-blade" />
          <div className="aperture-blade" />
          <div className="aperture-blade" />
          <div className="aperture-blade" />
        </div>

        <h1 className="title">
          <span className="title-main">CAMERA</span>
          <span className="title-sub">QUIZ</span>
        </h1>

        <p className="description">
          カメラと写真の雑学クイズ
        </p>
      </div>

      <div className="difficulty-selector">
        <h3 className="difficulty-title">難易度を選択</h3>
        <div className="difficulty-options">
          <button
            className={`difficulty-option ${selectedDifficulty === 'all' ? 'selected' : ''}`}
            onClick={() => setSelectedDifficulty('all')}
          >
            <span className="difficulty-label">すべて</span>
            <span className="difficulty-count">30問からランダム</span>
          </button>
          <button
            className={`difficulty-option difficulty-easy ${selectedDifficulty === 1 ? 'selected' : ''}`}
            onClick={() => setSelectedDifficulty(1)}
          >
            <span className="difficulty-label">初級</span>
            <span className="difficulty-count">12問から出題</span>
          </button>
          <button
            className={`difficulty-option difficulty-medium ${selectedDifficulty === 2 ? 'selected' : ''}`}
            onClick={() => setSelectedDifficulty(2)}
          >
            <span className="difficulty-label">中級</span>
            <span className="difficulty-count">12問から出題</span>
          </button>
          <button
            className={`difficulty-option difficulty-hard ${selectedDifficulty === 3 ? 'selected' : ''}`}
            onClick={() => setSelectedDifficulty(3)}
          >
            <span className="difficulty-label">上級</span>
            <span className="difficulty-count">6問すべて出題</span>
          </button>
        </div>
      </div>

      <button className="start-button" onClick={handleStart}>
        <span className="shutter-icon" />
        START
      </button>

      <div className="film-strip bottom" />
    </div>
  );
}
