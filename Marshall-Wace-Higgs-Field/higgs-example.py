import math
import numpy as np
import json

# Constants and settings
C = 3e8  # Speed of light in meters/second
VEV = 246e9  # GeV
WIDTH, HEIGHT = 20, 20
DIFFUSIONCONST = 0  # Range between 0 and 1
DIFFUSIONRADIUS = 5
x_loc, y_loc = 50, 50  # Location of particle

particle = "Electron"
velocity = 5e7  # Velocity of particle
Particles_Dict = {"Electron": 9.11e-31}  # Particle masses in kg

mass = Particles_Dict[particle]
kinetic_energy = 0.5 * mass * velocity**2
potential_energy = mass * C**2
energy = kinetic_energy + potential_energy

# Function to calculate distance from particle
def dist_from_particle(x, y):
    return math.sqrt((x - x_loc)**2 + (y - y_loc)**2)

# Generate X, Y, Z for Plotly
X, Y, Z = [], [], []

for x in range(WIDTH):
    for y in range(HEIGHT):
        distance = dist_from_particle(x, y)
        if distance < DIFFUSIONRADIUS:
            local_energy = energy - (energy - VEV) * distance * DIFFUSIONCONST
        else:
            local_energy = 0
        X.append(x)
        Y.append(y)
        Z.append(local_energy)

print(X)

print('')
print(Y)
print('')
print(Z)

# Convert X, Y, Z to a JSON string
data = json.dumps({'X': X, 'Y': Y, 'Z': Z})

# Save to a file (You could also print and manually copy)
with open('data.json', 'w') as f:
    f.write(data)

# Now X, Y, Z are ready for Plotly