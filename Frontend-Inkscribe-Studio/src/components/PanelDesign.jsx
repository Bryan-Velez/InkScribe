import React, { useState, useRef, useEffect } from 'react'
import SpeechBubble from './SpeechBubble'

const PanelDesign = () => {
  const canvasRef = useRef(null)
  const [speechBubbles, setSpeechBubbles] = useState([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentPath, setCurrentPath] = useState([])
  const [paths, setPaths] = useState([])

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')

    // Canvas drawing logic here
    // ...
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    // Clear canvas and redraw speech bubbles and drawings whenever they change
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw speech bubbles
    speechBubbles.forEach(bubble => drawSpeechBubble(ctx, bubble))

    // Draw saved drawings
    paths.forEach(path => drawPath(ctx, path))
  }, [speechBubbles, paths])

  const handleMouseDown = (e) => {
    setIsDrawing(true)
    setCurrentPath([{ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }])
  }

  const handleMouseMove = (e) => {
    if (!isDrawing) return
    setCurrentPath(prevPath => [...prevPath, { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }])
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
    if (currentPath.length > 0) {
      setPaths(prevPaths => [...prevPaths, currentPath])
      setCurrentPath([])
    }
  }

  const drawPath = (ctx, path) => {
    if (path.length < 2) return

    ctx.beginPath()
    ctx.moveTo(path[0].x, path[0].y)

    for (let i = 1; i < path.length; i++) {
      ctx.lineTo(path[i].x, path[i].y)
    }

    ctx.strokeStyle = '#000' // Set the stroke color to black
    ctx.lineWidth = 2;
    ctx.stroke()
  }

  const drawSpeechBubble = (ctx, bubble) => {
    // Draw speech bubble logic here
    const { x, y, text, color } = bubble;

    ctx.fillStyle = color;
    ctx.fillRect(x, y, 150, 60) // Draw a rectangle as the speech bubble background

    ctx.fillStyle = '#000' // Set the text color to black
    ctx.font = '14px Arial'
    ctx.fillText(text, x + 10, y + 25) // Draw the text inside the speech bubble
  }

  const addSpeechBubble = () => {
    // Add speech bubble logic here
    // For simplicity, let's add a random speech bubble at a fixed position
    const randomX = Math.floor(Math.random() * 600) // Random X coordinate within the canvas width
    const randomY = Math.floor(Math.random() * 400) // Random Y coordinate within the canvas height

    const newBubble = {
      x: randomX,
      y: randomY,
      text: 'Hello!',
      color: '#fff', // Set the speech bubble background color
    }

    setSpeechBubbles(prevBubbles => [...prevBubbles, newBubble])
  }

  return (
    <div>
      {/* Canvas and drawing area */}
      <canvas
        ref={canvasRef}
        width={800} // Set the desired width of the canvas
        height={600} // Set the desired height of the canvas
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ border: '1px solid black', background: 'white' }}
      />

      {/* Speech bubble text area */}
      <textarea placeholder="Enter dialogue here" />
      <button onClick={addSpeechBubble}>Add Speech Bubble</button>

      {/* Other UI elements */}
    </div>
  )
}

export default PanelDesign
