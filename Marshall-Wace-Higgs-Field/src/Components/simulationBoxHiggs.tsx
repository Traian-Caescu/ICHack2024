import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { FormInput } from '../App';

type Props = {
  inputs: FormInput;
  refresh: boolean;
}

const ParticleEnergyPlot = ({ inputs, refresh }: Props) => {
  const WIDTH = 20;
  const HEIGHT = 20;
  const DIFFUSIONRADIUS = 50;
  const VEV = 246000; // Vacuum Expectation Value (MeV)
  const particle = inputs.particle
  const velocity = inputs.velocity; // This could also be dynamic

  let x_loc = 10;
  const [y_loc, setYLoc] = useState(0); // Convert y_loc to a state variable

  const [data, setData] = useState<any[]>([]);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    // Logic to increase y_loc
    setYLoc((prevYLoc) => prevYLoc + 1);
  }, [refresh]); // This effect depends on the refresh prop


  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 0.1); // Adjust time increment for animation speed
    }, 100); // Adjust interval for frame rate

    
    const Particles_Dict = {
      "Electron": 9.11e-31,
      "Neutron": 1.674e-27,
      "QuarkUp": 3.56e-30,
      "QuarkDown": 8.9e-30,
      "QuarkCharm": 2.28e-36,
      "QuarkStrange": 2.1e-28
    };
    const mass = Particles_Dict[particle as keyof typeof Particles_Dict];
    const potential = (0.25*Math.PI*1.602e-19*VEV)/2e-12;  //Coulombs Constant
    const momentum = mass * velocity;
    const p1 = 0.5 * (mass ** 2) * (Math.sqrt(momentum ** 2 + mass ** 2)) ** 2;
    const p2 = VEV * 2;
    const A = 5;
    const B = A*VEV**2;
    const a_quad = A;
    const b_quad = -2 * B;
    const c_quad = potential - p1 - p2;
    const Phi_2 = (-b_quad + Math.sqrt((b_quad ** 2) - 4 * a_quad * c_quad)) / (2 * a_quad);
    const energy = Math.ceil(Phi_2/1000);

    const df_energy: number[][] = Array.from(Array(WIDTH), () => new Array(HEIGHT).fill(0));

    const distFromParticle = (x: number, y: number, x_loc: number, y_loc: number) => {
      return Math.sqrt((x - x_loc) ** 2 + (y - y_loc) ** 2);
    };

    for (let x = 0; x < WIDTH; x++) {
      for (let y = 0; y < HEIGHT; y++) {
        if (distFromParticle(x, y, x_loc, y_loc) <= DIFFUSIONRADIUS) {
          df_energy[x][y] = VEV + Math.ceil(energy/distFromParticle(x, y, x_loc, y_loc))
        } else {
          df_energy[x][y] = VEV;
        }
      }
    }

    const X = Array.from({ length: WIDTH }, (_, index) => index);
    const Y = Array.from({ length: HEIGHT }, (_, index) => index);
    const Z = df_energy; // Use the 2D array directly


    // Particle trajectory
    const trajectoryZ = Array(WIDTH).fill(energy + 20); // Slightly above the energy surface
    const trajectoryX = Array.from({ length: WIDTH }, (_, i) => i); // Straight line across X-axis
    const trajectoryY = Array(WIDTH).fill(HEIGHT / 2); // Center of Y-axis

    
    setData([
      // Energy surface
      {
        type: 'surface',
        z: df_energy,
        contours: {
          z: {
            show: false,
            usecolormap: true,
            project: { z: true },
          },
        },
        showscale: false, // Hide color scale for surface
      },
      // Particle trajectory
      {
        type: 'scatter3d',
        mode: 'lines',
        x: trajectoryX,
        y: trajectoryY,
        z: trajectoryZ,
        line: {
          color: 'red',
          width: 6,
        },
      },
    ]);
  }, [inputs, particle, velocity, refresh]); // Empty dependency array means this effect runs once on mount



  return (
    <Plot
      data={data}
      layout={{
        title: 'Particle Energy Distribution around Neutron with Higgs Field Effect',
        autosize: true,
        width: 1000,
        height: 700
      }}
    />
  );
};

export default ParticleEnergyPlot;
