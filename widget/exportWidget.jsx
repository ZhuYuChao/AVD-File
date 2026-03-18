import React, { forwardRef } from 'react';
import './exportWidget.scss';

export const ExportWidget = forwardRef(({ progress, isVisible, onClick }, ref) => {
  // We want the wave to start "below" the visible area (100% top) and move up to cover it (-10% top)
  // progress 0 -> top: 100%
  // progress 100 -> top: -10%
  const waveTop = 100 - (progress * 1.15);

  return (
    <div
      role="button"
      tabIndex="0"
      ref={ref}
      className={isVisible ? 'e-visible export-widget' : 'e-hidden'}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      <div className="wave-container ">
        <div
          className="wave-1"
          style={{
            top: `${waveTop - 5}%`,
            left: '-50%',
          }}
        />
        <div
          className="wave-2"
          style={{
            top: `${waveTop}%`,
            left: '-50%',
          }}
        />
      </div>
      <div className={progress > 50 ? 'progress-label white-lable' : 'progress-label'}>{`${progress}%`}</div>
    </div>
  );
});
