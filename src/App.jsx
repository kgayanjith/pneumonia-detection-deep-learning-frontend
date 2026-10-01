import { useState } from "react";
import "./App.css";
import NetworkVisualization from "./NetworkVisualization";


function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (selected) => {
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setResult(null);
  };

  const checkImage = async () => {
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    const start = Date.now();

    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    const remaining = 2000 - (Date.now() - start);

    if (remaining > 0) {
      await new Promise((resolve) => setTimeout(resolve, remaining));
    }

    setLoading(false);
    setResult(data);
  };

  const resetScan = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
  };

  return (
    <div className="page">
      <div className="topbar">
        <span className="brand">Pneumonia screening</span>
        <span className="status"><i className="dot" />Model online</span>
      </div>
  
      <header className="header">
        <h1 style={{ color: "black" }}>Read a chest X-ray in seconds</h1>
        <p className="subhead">Upload an image and the model flags signs of pneumonia, with a confidence score.</p>
      </header>

      <div className="panel">
        <div className="viewer">
          <label className={`dropzone ${loading ? "scanning" : ""}`} htmlFor="fileInput">
            {preview ? (
              <img src={preview} alt="Uploaded X-ray" />
            ) : (
              <span>Click to upload a chest X-ray</span>
            )}
            {loading && <div className="scanline" />}
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e.target.files[0])}
          />
          {file && <p className="filename">{file.name}</p>}
          <button onClick={checkImage} disabled={!file || loading}>
            {loading ? "Analyzing" : "Run screening"}
          </button>
        </div>

        <div className="result">
          <h2>Result</h2>

          {!loading && !result && (
            <p className="placeholder">Upload an X-ray to see a screening result here.</p>
          )}

          {loading && <p className="placeholder">Reading the image</p>}

          {!loading && result && (
            <div className={`readout ${result.label === "PNEUMONIA" ? "positive" : "clear"}`}>
              <p className="label">{result.label}</p>
              <div className="divider" />
              <p className="confidence-row">
                <span className="confidence-value">{(result.confidence * 100).toFixed(1)}</span>
                <span className="confidence-unit">% confidence</span>
              </p>
              <div className="bar">
                <div className="fill" style={{ width: `${result.confidence * 100}%` }} />
              </div>
              <button className="secondary" onClick={resetScan}>Scan another image</button>
            </div>
          )}
        </div>
      </div>

      <p className="disclaimer">Screening aid only — not a diagnosis. Always consult a doctor.</p>
    </div>
  );
}

export default App;