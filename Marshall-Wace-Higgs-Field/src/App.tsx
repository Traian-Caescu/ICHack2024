import React, { useEffect, useState } from 'react';
import './App.css';
import SimulationBox from './Components/SimulationBox';
import SimulationBoxHiggs from './Components/simulationBoxHiggs';
import SimulationBoxHiggsSimple from './Components/simulationBoxHiggsSimple';
import MaxwellCoilField from './Components/MaxwellCallField';

const DeveloperCard = ({ name, imageUrl, linkedInUrl, description }: any) => {
  return (
    <div className="developer-card">
      <div
        className="developer-avatar"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="developer-info">
        <h3>{name}</h3>
        <p>{description}</p>
        <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="view-profile-button">
          View LinkedIn
        </a>
      </div>
    </div>
  );
};

export type FormInput = {
  topic: string;
  particle: string;
  velocity: number;
  phi: number;
}

const App = () => {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [inputs, setInputs] = useState<FormInput>({
    topic: 'HiggsField',
    particle: 'Neutron',
    velocity: 50000000,
    phi: 0,
  });

  const [toggles, setToggles] = useState<any>({
    viewMode: 'Basic',
    toolbar: true,
    tooltip: true,
    annotation: false,
    normalization: false,
    customScaler: '2x',
  });
  const developerData = [
    { name: 'Traian-Dumitru Caescu', imageUrl: 'https://media.licdn.com/dms/image/D5603AQEZd12aXMYNYQ/profile-displayphoto-shrink_800_800/0/1703183415520?e=1712793600&v=beta&t=dUba4jXqJHPnN-gBFgWcVR-vGCsezgnl1RRNAgnlnTs', linkedInUrl: 'https://www.linkedin.com/in/traian-dumitru-caescu/', description: 'Full Stack Developer' },
    { name: 'Na Wang', imageUrl: 'https://media.licdn.com/dms/image/D4E03AQHwG8X7lBIxsA/profile-displayphoto-shrink_800_800/0/1683915305861?e=1712793600&v=beta&t=ugsrJCTBJ-q_e1CiyHQqadoSpAnmtqcY9f_Gbq4v7Z8', linkedInUrl: 'https://www.linkedin.com/in/nwng/', description: 'Software Engineer' },
    { name: 'Nguyen Tran Khoi Pham', imageUrl: 'https://media.licdn.com/dms/image/D4E03AQEG__KZH2XWhg/profile-displayphoto-shrink_800_800/0/1699967367678?e=1712793600&v=beta&t=dF-vL3KZym5R5uGsX5CQtrF9AbSiySukTA3pjc18cdQ', linkedInUrl: 'https://www.linkedin.com/in/phamtrankhoinguyen-noah/', description: 'Back End Developer' },
    { name: 'Saffan Firdaus', imageUrl: 'https://media.licdn.com/dms/image/D5603AQH-0_sGTP5A-Q/profile-displayphoto-shrink_400_400/0/1688286180775?e=1712793600&v=beta&t=C2u2ulnvU6z68aSxsOl7cvjdQlisbT2p9NtP9MxJCSU', linkedInUrl: 'https://www.linkedin.com/in/saffanfirdaus/', description: 'Senior Designer' },
    { name: 'Bora Akyuz', imageUrl: 'https://media.licdn.com/dms/image/D4E03AQH_EJLBPWL3Ww/profile-displayphoto-shrink_400_400/0/1693246453787?e=1712793600&v=beta&t=utL53NKta2-BScYMOH9Q6Hn5FSF_Z9gZCV-v1H3UnG4', linkedInUrl: 'https://www.linkedin.com/in/boraakyuz/', description: 'Software Engineer' },
    { name: 'Moiz Imran', imageUrl: 'https://media.licdn.com/dms/image/D4E03AQGRQmm0srts4w/profile-displayphoto-shrink_400_400/0/1693647530890?e=1712793600&v=beta&t=edjxML5CBFhVdkZkOnaXhxen1Ma2ub4pgIUyK4nNFKQ', linkedInUrl: 'https://www.linkedin.com/in/moizimran/', description: 'Front End Developer' },
  ];

  const handleInputChange = (name: any, value: any) => {
    setInputs({ ...inputs, [name]: value });
    console.log(inputs);
  };

  const handleToggleChange = (name: any) => {
    setToggles({ ...toggles, [name]: !toggles[name] });
  };

  const handlePlay = () => {
    console.log('Playing with state:', { inputs, toggles });
    setRefresh(!refresh)
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">EnViz</div>
        <nav>
          <a href="/">Home</a>
          <a href="/projects">Projects</a>
        </nav>
        <div className="user-info">
          <span>Hi, Noah</span>
        </div>
      </header>
      <div className="app-body">
        <aside className="sidebar">
          <div className="control-panel">
            <h2>Control Panel</h2>
            <div className="input-group">
              <label>Topic</label>
              <select name="topic" value={inputs.topic} onChange={(e) => handleInputChange('topic', e.target.value)}>
                <option value="HiggsField">Higgs Field</option>
                <option value="DiscreteFourierTransform">Discrete Fourier Transform</option>
                <option value="MaxwellCoilField">Maxwell Coil Field</option>
                {/* Other topic options */}
              </select>
            </div>


            {inputs.topic === "HiggsField"
              &&
              <div>
                <div className="input-group">
                  <label>Choose Particle</label>
                  <select name="particle" value={inputs.particle} onChange={(e) => handleInputChange('particle', e.target.value)}>
                    <option value="Electron">Electron</option>
                    <option value="Neutron">Neutron</option>
                    <option value="QuarkUp">Quark Up</option>
                    <option value="QuarkDown">Quark Down</option>
                    <option value="QuarkCharm">Quark Charm</option>
                    <option value="QuarkStrange">Quark Strange</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Velocity</label>
                  <input type="text" name="velocity" value={inputs.velocity} onChange={(e) => handleInputChange('velocity', e.target.value)} placeholder="Input Velocity" />

                </div>
                <div className="input-group">
                  <label>Phi (φ)</label>
                  <input type="text" name="phi" value={inputs.phi} onChange={(e) => handleInputChange('phi', e.target.value)} placeholder="Input Phi" />
                </div>
              </div>
            }

            {inputs.topic === "DiscreteCourierTransform"
              &&
              <div>
              </div>
            }

            {inputs.topic === "MaxwellCoilField"
              &&
              <div>
              </div>
            }
            <div className="toggle-group">
              <label>
                <input type="checkbox" checked={toggles.toolbar} onChange={() => handleToggleChange('toolbar')} />
                Toolbar
              </label>
              <label>
                <input type="checkbox" checked={toggles.tooltip} onChange={() => handleToggleChange('tooltip')} />
                Tooltip
              </label>
            </div>
            <button className="play-button" onClick={handlePlay}>Play</button>
          </div>
        </aside>
        <main className="main-content">
          <div className="graph-container">
            {inputs.topic === "MaxwellCoilField" &&
              <MaxwellCoilField />
            }
            {inputs.topic === "HiggsField" &&
              <SimulationBoxHiggs refresh={refresh} inputs={inputs} />
            }
            {inputs.topic === "DiscreteFourierTransform" &&
              <SimulationBox />
            }

          </div>
          <div className="info-section">
            {inputs.topic === "HiggsField" &&
              <div>
                <article className="higgs-description">
                  <h2>Higgs Field - An Overview</h2>
                  <p>The Higgs field is an energy field that is thought to exist everywhere in the universe. The field is accompanied by a particle known as the Higgs boson, which in interaction with other particles gives them mass. This was first proposed by physicist Peter Higgs in the 1960s and was a pivotal part of the standard model of particle physics.</p>
                  <p>It wasn't until 2013 that the existence of the Higgs boson was confirmed by scientists at CERN's Large Hadron Collider. This discovery was a monumental step forward in our understanding of the universe's fundamental structure.</p>
                  <a href="https://en.wikipedia.org/wiki/Higgs_field" target="_blank" rel="noopener noreferrer">Learn more</a>
                </article>
                <aside className="references">
                  <h3>References</h3>
                  <ul>
                    <li><a href="https://example.com/reference1" target="_blank" rel="noopener noreferrer">Detailed Explanation of the Higgs Field</a></li>
                    <li><a href="https://example.com/reference2" target="_blank" rel="noopener noreferrer">The Higgs Boson and Its Discovery</a></li>
                    <li><a href="https://example.com/reference3" target="_blank" rel="noopener noreferrer">The Standard Model of Particle Physics</a></li>
                  </ul>
                </aside>
              </div>
            }

            {inputs.topic === "DiscreteFourierTransform" &&
              <div>
                <article className="higgs-description">
                  <h2> Discrete Fourier Transform - An Overview</h2>
                  <p>
                    The Discrete Fourier Transform (DFT) is a mathematical technique used to transform a sequence of complex or real numerical values into a frequency spectrum.
                  </p>
                  <p>
                    Essentially, it analyzes the frequencies present in the original sequence. The DFT is particularly useful in signal processing, image processing, and solving partial differential equations, among other applications.
                  </p>

                  <a href="https://en.wikipedia.org/wiki/Discrete_Fourier_transform" target="_blank" rel="noopener noreferrer">Learn more</a>
                </article>
                <aside className="references">
                  <h3>References</h3>
                  <ul>
                    <li><a href="https://example.com/reference1" target="_blank" rel="noopener noreferrer">Detailed Explanation of the Discrete Fourier Transform</a></li>
                    <li><a href="https://example.com/reference2" target="_blank" rel="noopener noreferrer">The origins of Discrete Fourier Transform</a></li>
                    <li><a href="https://example.com/reference3" target="_blank" rel="noopener noreferrer">Discrete Fourier Transform in Digital Forensics</a></li>
                  </ul>
                </aside>
              </div>
            }

            {inputs.topic === "MaxwellCoilField" &&
              <div>
                <article className="higgs-description">
                  <h2>Maxwell Coil Field - An Overview</h2>
                  <p>The Maxwell coil field refers to the magnetic field configuration generated by a specific arrangement of coils, known as Maxwell coils. </p>
                  <p>These coils are designed to produce a very uniform magnetic field in a given volume of space, which is crucial for experiments requiring precise magnetic field control, such as in magnetic resonance imaging (MRI) or atomic physics experiments.</p>
                  <a href="https://en.wikipedia.org/wiki/Maxwell_coil" target="_blank" rel="noopener noreferrer">Learn more</a>
                </article>
                <aside className="references">
                  <h3>References</h3>
                  <ul>
                    <li><a href="https://example.com/reference1" target="_blank" rel="noopener noreferrer">Detailed Explanation of the Maxwell Coil Field</a></li>
                    <li><a href="https://example.com/reference2" target="_blank" rel="noopener noreferrer">The origins of the Maxwell Coil Field</a></li>
                    <li><a href="https://example.com/reference3" target="_blank" rel="noopener noreferrer">Maxwell coil field in 3D</a></li>
                    { }
                  </ul>
                </aside>
              </div>
            }

          </div>
          <div className="developers-section">
            {developerData.map((developer, index) => (
              <DeveloperCard
                key={index}
                name={developer.name}
                imageUrl={developer.imageUrl}
                linkedInUrl={developer.linkedInUrl}
                description={developer.description}
              />
            ))}
          </div>
        </main>
      </div>
    </div>

  );

}

export default App;