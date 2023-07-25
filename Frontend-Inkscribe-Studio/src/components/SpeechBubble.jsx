import React from 'react';

const SpeechBubble = ({ bubble }) => {
  const { x, y, text, color } = bubble;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        padding: '8px',
        background: color,
        border: '1px solid black',
      }}
    >
      {text}
    </div>
  );
};

export default SpeechBubble;
