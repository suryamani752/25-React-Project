import { useEffect, useState } from "react";

export default function Random() {
  const [typeOfColor, setTypeOfColor] = useState("hex");
  const [randomColor, setRandomColor] = useState("#000000");

  function randomColorGenerator(length) {
    return Math.floor(Math.random() * length);
  }

  function generateHexColor() {
    const hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let hexColor = "#";
    for (let i = 0; i < 6; i++) {
      hexColor += hex[randomColorGenerator(hex.length)];
    }
    setRandomColor(hexColor);
  }
  function generateRgbColor() {
    const r = randomColorGenerator(256);
    const g = randomColorGenerator(256);
    const b = randomColorGenerator(256);
    setRandomColor(`rgb(${r}, ${g}, ${b})`);
  }

  useEffect(() => {
    if (typeOfColor === "rgb") {
      generateRgbColor();
    } else {
      generateHexColor();
    }
  }, [typeOfColor]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: randomColor,
        textAlign: "center",
        
      }}
    >
      <button onClick={() => setTypeOfColor("hex")}>Create Hex Color</button>
      <button onClick={() => setTypeOfColor("rgb")}>Create RGB Color</button>
      <button
        onClick={typeOfColor === "hex" ? generateHexColor : generateRgbColor}
      >
        Generate Random Color
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontSize: "60px",
          margin: "50px",
          flexDirection: "column",
        gap: "20px",
        }}
      >
        <h3>{typeOfColor === "rgb" ? "RGB Color " : "Hex Color "}</h3>
        <h1>{randomColor}</h1>
      </div>
    </div>
  );
}
