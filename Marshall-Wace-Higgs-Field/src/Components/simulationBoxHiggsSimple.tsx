import React from 'react';
import Plot from 'react-plotly.js';

const ParticleEnergyPlot: React.FC = () => {
  const generateData = () => {
    const WIDTH = 20;
    const HEIGHT = 20;
    const x = Array.from({ length: WIDTH }, (_, i) => i);
    const y = Array.from({ length: HEIGHT }, (_, i) => i);
    const z = Array.from({ length: WIDTH }, () =>
      Array.from({ length: HEIGHT }, () => Math.random())
    );

    return { x, y, z };
  };

  const { x, y, z } = generateData();

  return (
    <Plot
      data={[
        {
          type: 'surface',
          x: x,
          y: y,
          z: z,
        },
      ]}
      layout={{ title: 'Particle Energy Distribution', autosize: true, width: 800, height: 600 }}
    />
  );
};

export default ParticleEnergyPlot;
