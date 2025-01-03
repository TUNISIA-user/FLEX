import React, { useRef, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';

function Draw() {
  const [lines, setLines] = useState([]);
  const [currentColor, setCurrentColor] = useState('black');
  const isDrawing = useRef(false);

  const handleMouseDown = (e) => {
    console.log(lines,"this currrent line")
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y], color: currentColor }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    setLines([...lines.slice(0, -1), lastLine]);
  };

  const handleMouseUp = () => (isDrawing.current = false);

  const handleColorChange = (color) => setCurrentColor(color);
  const undoLastLine = () => setLines(lines.slice(0, -1));
  const clearBoard = () => setLines([]);

  return (
    <div style={{ textAlign: 'center', padding: '10px',backgroundColor:"black",height:"100vh"}}>
       

      <div style={{display:"flex",gap:"20px",justifyContent:"center"}}>
      <button onClick={() => handleColorChange('white')} style={{color:"white"}} >white</button>
      <button onClick={() => handleColorChange('red')} style={{color:"red"}}>Red</button>
      <button onClick={() => handleColorChange('blue')} style={{color:"blue"}}>Blue</button>
      <button onClick={() => handleColorChange('green')} style={{color:"green"}}>Green</button>
      <button onClick={() => handleColorChange('yellow')} style={{color:"yellow"}}>yellow</button>
      <button onClick={undoLastLine} style={{ marginLeft: '10px' }}>Undo</button>
      <button onClick={clearBoard}><img src="" alt=''/></button>
      </div>

      {/* Konva Canvas */}
      <Stage
        width={window.innerWidth}
        height={window.innerHeight - 100}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        style={{ border: '7px solid blue',borderRadius:"10px", marginTop: '10px',cursor:"crosshair" }}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.color}
              strokeWidth={2}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

export default Draw;
