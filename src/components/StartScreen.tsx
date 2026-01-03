interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
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
          カメラと写真の雑学クイズ<br />
          全10問にチャレンジ！
        </p>
      </div>
      
      <button className="start-button" onClick={onStart}>
        <span className="shutter-icon" />
        START
      </button>
      
      <div className="film-strip bottom" />
    </div>
  );
}
