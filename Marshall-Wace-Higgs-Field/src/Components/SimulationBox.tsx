import React, { useEffect, useState } from 'react'
// import Plotly from "plotly.js-gl3d-dist";
// import createPlotlyComponent from "react-plotly.js/factory";
import Plot from 'react-plotly.js';
type Props = {}
// Function to generate a mesh grid and calculate z values for a bowl shape
const generateOceanSurface = (size: number, step: number, time: number) => {
  const range = Array.from({ length: size }, (_, i) => (i - size / 2) * step);
  const x: number[][] = [];
  const y: number[][] = [];
  const z: number[][] = [];

  for (let i = 0; i < range.length; i++) {
    x[i] = [];
    y[i] = [];
    z[i] = [];
    for (let j = 0; j < range.length; j++) {
      x[i][j] = range[j];
      y[i][j] = range[i];
      // Update to include time in the wave calculation for animation
      z[i][j] = Math.sin(range[i] + time) * Math.cos(range[j] + time);
    }
  }

  return { x, y, z };
};

const SimulationBox = (props: Props) => {
  // const Plot = createPlotlyComponent(Plotly);
  const [data, setData] = useState<any>({ x: [], y: [], z: [] });
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 0.1); // Adjust time increment for animation speed
    }, 100); // Adjust interval for frame rate

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setData(generateOceanSurface(50, 0.2, time));
  }, [time]);

  // const [result, setResults] = useState<any[]>([x, y, z]);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Plot
        data={[
          {
            name: "surface",
            x: data.x,
            y: data.y,
            z: data.z,
            type: "surface",
            opacity: 1,
          },
        ]}
        layout={{
          "xaxis.title": "A",
          "yaxis.title": "B",
          autosize: true,
          margin: {
            l: 20,
            r: 20,
            t: 20,
            pad: 10
          }
        }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
}

export default SimulationBox