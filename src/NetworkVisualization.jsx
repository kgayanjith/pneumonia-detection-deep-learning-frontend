import { useRef, useEffect } from "react";

const history = [
  { loss: 0.5606, acc: 0.7343 },
  { loss: 0.3320, acc: 0.8648 },
  { loss: 0.2028, acc: 0.9202 },
  { loss: 0.1650, acc: 0.9352 },
  { loss: 0.1701, acc: 0.9341 },
  { loss: 0.1504, acc: 0.9417 },
  { loss: 0.1465, acc: 0.9403 },
  { loss: 0.1259, acc: 0.9510 },
  { loss: 0.1313, acc: 0.9496 },
  { loss: 0.1301, acc: 0.9465 },
  { loss: 0.1257, acc: 0.9539 }
];

const layers = [3, 4, 4, 4, 4, 3, 2];
const labels = ["Input", "Conv1", "Conv2", "Conv3", "Conv4", "Dense", "Output"];
const outputLabels = ["NORMAL", "PNEUMONIA"];

function buildPositions(width) {
  const startX = width * 0.42;
  const endX = width * 0.9;
  return layers.map((count, i) => {
    const x = startX + ((endX - startX) / (layers.length - 1)) * i;
    const gap = 46;
    const totalHeight = (count - 1) * gap;
    const startY = 190 - totalHeight / 2;
    return Array.from({ length: count }, (_, n) => ({ x, y: startY + n * gap }));
  });
}

function NetworkVisualization() {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const nodePositions = buildPositions(width);
    let animationId;

    const draw = () => {
      frameRef.current += 1;
      const frame = frameRef.current;
      const epochIndex = Math.floor(frame / 25) % history.length;
      const activeLayer = Math.floor(frame / 15) % layers.length;

      ctx.fillStyle = "#0f1210";
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "#3a3f3c";
      ctx.fillStyle = "#dfe1dc";
      ctx.font = "10px monospace";

      ctx.fillText("Cost", 16, 20);
      ctx.beginPath();
      ctx.moveTo(16, 90);
      ctx.lineTo(150, 90);
      ctx.stroke();
      ctx.strokeStyle = "#4fb8b8";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i <= epochIndex; i++) {
        const x = 16 + (i / (history.length - 1)) * 134;
        const y = 90 - (history[i].loss / 0.6) * 60;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.strokeStyle = "#3a3f3c";
      ctx.lineWidth = 1;
      ctx.fillStyle = "#dfe1dc";
      ctx.fillText("Accuracy", 16, 120);
      ctx.beginPath();
      ctx.moveTo(16, 190);
      ctx.lineTo(150, 190);
      ctx.stroke();
      ctx.strokeStyle = "#c1502b";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i <= epochIndex; i++) {
        const x = 16 + (i / (history.length - 1)) * 134;
        const y = 190 - ((history[i].acc - 0.6) / 0.4) * 70;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      for (let l = 0; l < nodePositions.length - 1; l++) {
        for (const a of nodePositions[l]) {
          for (const b of nodePositions[l + 1]) {
            ctx.strokeStyle = l === activeLayer ? "rgba(79,184,184,0.7)" : "rgba(90,95,92,0.35)";
            ctx.lineWidth = l === activeLayer ? 1.3 : 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      nodePositions.forEach((layer, l) => {
        layer.forEach((p) => {
          ctx.fillStyle = l === activeLayer ? "#4fb8b8" : "#5a5f5c";
          ctx.beginPath();
          ctx.arc(p.x, p.y, l === activeLayer ? 6 : 4.5, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.fillStyle = "#a7aca9";
        ctx.font = "9px monospace";
        ctx.textAlign = "center";
        ctx.fillText(labels[l], layer[0].x, 250);
      });

      const outputLayer = nodePositions[nodePositions.length - 1];
      ctx.textAlign = "left";
      outputLabels.forEach((label, i) => {
        ctx.fillStyle = activeLayer === layers.length - 1 ? "#4fb8b8" : "#8a8f8c";
        ctx.font = "10px monospace";
        ctx.fillText(label, outputLayer[i].x + 12, outputLayer[i].y + 3);
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return <canvas ref={canvasRef} width={420} height={260} className="network-canvas" />;
}

export default NetworkVisualization;