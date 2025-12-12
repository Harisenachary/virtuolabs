export const experiments = [
    {
        id: 'simple-pendulum',
        title: 'Simple Pendulum',
        category: 'Physics',
        theory: `
### Introduction to Simple Harmonic Motion
A simple pendulum is an idealized mathematical model of a pendulum. It consists of a massless string of length **L** fixed at a pivot point and a bob of mass **m** at the other end.

When the bob is displaced from its equilibrium position by a small angle (**θ**) and released, it swings back and forth. This periodic motion is known as *Simple Harmonic Motion (SHM)*, provided the angle of displacement is small (typically less than 15°).

### Forces Acting on the Bob
There are two primary forces acting on the pendulum bob:
1.  **Gravitational Force (mg)**: Acting downwards.
2.  **Tension (T)**: Acting along the string towards the pivot.

The gravitational force can be resolved into two components:
*   **Radial component (mg cos θ)**: Balances the tension in the string.
*   **Tangential component (mg sin θ)**: This provides the restoring force that brings the bob back to equilibrium.

### The Period of Oscillation
The time taken for one complete cycle of the swing (left to right and back) is called the **Period (T)**. For small angles, the period is independent of the mass of the bob and the amplitude of the swing. It depends only on:
*   The length of the string (**L**)
*   The acceleration due to gravity (**g**)

This relationship allows us to use a simple pendulum to measure the local acceleration due to gravity with high precision.
        `,
        formulas: [
            { label: 'Period (Small Angle)', equation: 'T = 2\\pi \\sqrt{\\frac{L}{g}}' },
            { label: 'Frequency', equation: 'f = \\frac{1}{2\\pi} \\sqrt{\\frac{g}{L}}' },
            { label: 'Angular Frequency', equation: '\\omega = \\sqrt{\\frac{g}{L}}' },
            { label: 'Restoring Force', equation: 'F_{restoring} = -mg \\sin(\\theta) \\approx -mg\\theta' },
            { label: 'Potential Energy', equation: 'U = mgh = mgL(1 - \\cos \\theta)' }
        ],
        procedure: [
            '**Setup**: Attach a bob of known mass to a string and clamp the other end firmly to a stand. Measure the length **L** from the pivot point to the center of mass of the bob.',
            '**Initial Displacement**: Pull the bob slightly to one side. Ensure the angle with the vertical is small (less than 10-15 degrees) to satisfy the condition for Simple Harmonic Motion.',
            '**Release**: Release the bob gently without giving it any initial push or rotation. Ensure it oscillates in a single vertical plane.',
            '**Measurement**: Use a stopwatch to measure the time taken for 10 or 20 complete oscillations. Counting more oscillations reduces human reaction time error.',
            '**Calculation**: Divide the total time by the number of oscillations to find the time period **T**.',
            '**Variation**: Change the length of the pendulum (**L**) by 10 cm steps and repeat the experiment. Record T for each length.',
            '**Analysis**: Plot a graph of **T² vs L**. The graph should be a straight line passing through the origin. The slope of this line can be used to calculate **g** using the formula $g = 4\\pi^2 / \\text{slope}$.'
        ],
        advantages: [
            'Simple to set up and perform.',
            'Provides accurate measurement of Earth\'s gravity.',
            'Demonstrates fundamental physics concepts clearly.',
            'Low cost equipment required.'
        ],
        disadvantages: [
            'Approximation only holds for small angles (< 15°).',
            'Air resistance can dampen oscillations over time.',
            'String is not truly massless or inextensible.',
            'Measurement errors in length can significantly affect results.'
        ],
        images: [
            'https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2018/09/25134149/simple-pendulum-1024x557.png',
            'https://media.geeksforgeeks.org/wp-content/uploads/20230504153028/Simple-Pendulum.webp'
        ],
        quiz: [
            {
                question: "What is the formula for the period of a simple pendulum?",
                options: [
                    "T = 2π√(L/g)",
                    "T = π√(2L/g)",
                    "T = 2π√(g/L)",
                    "T = π√(g/L)"
                ],
                correctAnswer: 0,
                explanation: "The correct formula is T = 2π√(L/g) where L is the length and g is the acceleration due to gravity."
            },
            {
                question: "Does the mass of the bob affect the period of oscillation?",
                options: [
                    "Yes, heavier bobs swing slower",
                    "No, period is independent of mass",
                    "Yes, heavier bobs swing faster",
                    "Only for large masses"
                ],
                correctAnswer: 1,
                explanation: "The period of a simple pendulum is independent of the mass of the bob. This is a fundamental property of simple harmonic motion."
            },
            {
                question: "What happens to the period when you double the length of the pendulum?",
                options: [
                    "Period doubles",
                    "Period increases by √2",
                    "Period stays the same",
                    "Period quadruples"
                ],
                correctAnswer: 1,
                explanation: "Since T = 2π√(L/g), doubling L means the new period = 2π√(2L/g) = √2 × T. The period increases by a factor of √2 ≈ 1.414."
            },
            {
                question: "Why does a pendulum eventually stop swinging?",
                options: [
                    "Gravity decreases over time",
                    "Air resistance and friction dissipate energy",
                    "Mass increases during oscillation",
                    "Length changes with temperature"
                ],
                correctAnswer: 1,
                explanation: "A real pendulum experiences air resistance and friction at the pivot point, which gradually dissipate the mechanical energy, causing the amplitude to decrease until it stops."
            },
            {
                question: "In the simulation, what effect did increasing the bob mass have?",
                options: [
                    "Changed the period of oscillation",
                    "Made the pendulum stop faster",
                    "Increased the time until the pendulum came to rest",
                    "Changed the frequency of oscillation"
                ],
                correctAnswer: 2,
                explanation: "In the simulation, heavier masses experience less effect from air resistance relative to their inertia, so they take longer to come to rest due to damping."
            },
            {
                question: "For small angle approximation to be valid, the angle should be less than:",
                options: [
                    "5 degrees",
                    "15 degrees",
                    "30 degrees",
                    "45 degrees"
                ],
                correctAnswer: 1,
                explanation: "The small angle approximation (sin θ ≈ θ) is typically considered valid for angles less than 15 degrees, giving less than 1% error."
            },
            {
                question: "What type of motion does a simple pendulum exhibit for small angles?",
                options: [
                    "Uniform motion",
                    "Uniformly accelerated motion",
                    "Simple Harmonic Motion (SHM)",
                    "Circular motion"
                ],
                correctAnswer: 2,
                explanation: "For small angles, the restoring force is proportional to displacement (F = -mgθ ≈ -mg sin θ), which is the defining characteristic of Simple Harmonic Motion."
            },
            {
                question: "If you take a pendulum to the Moon (where g ≈ 1.6 m/s²), what happens to its period compared to Earth?",
                options: [
                    "Period decreases",
                    "Period increases",
                    "Period stays the same",
                    "Pendulum won't oscillate"
                ],
                correctAnswer: 1,
                explanation: "Since T = 2π√(L/g), a smaller value of g results in a larger period. The Moon's lower gravity (1.6 m/s² vs 9.8 m/s²) means the pendulum swings more slowly."
            },
            {
                question: "The frequency (f) of a simple pendulum is:",
                options: [
                    "Directly proportional to length",
                    "Inversely proportional to length",
                    "Inversely proportional to √length",
                    "Independent of length"
                ],
                correctAnswer: 2,
                explanation: "Since f = 1/T = 1/(2π√(L/g)) = (1/2π)√(g/L), frequency is inversely proportional to the square root of length."
            },
            {
                question: "What is the potential energy of the pendulum bob at its highest point in terms of its amplitude?",
                options: [
                    "U = mgL",
                    "U = mgL(1 - cos θ)",
                    "U = ½mgL",
                    "U = mgL sin θ"
                ],
                correctAnswer: 1,
                explanation: "The potential energy at maximum displacement is U = mgL(1 - cos θ), where θ is the maximum angle. This represents the height gained above the lowest point."
            }
        ]
    },
    {
        id: 'energy-gap',
        title: 'Energy Gap of P-N Junction',
        category: 'Physics',
        theory: `
### Semiconductor Band Theory
In solid-state physics, the **energy gap** (or band gap) is an energy range in a solid where no electron states can exist. It is the energy difference between the top of the valence band and the bottom of the conduction band.

### Conductivity and Temperature
*   **Insulators**: Large band gap (> 3 eV). Electrons cannot jump to the conduction band easily.
*   **Conductors**: Overlapping bands. Electrons move freely.
*   **Semiconductors**: Small band gap (~1 eV). Conductivity increases with temperature.

### Determination using P-N Junction
In a P-N junction diode, the reverse saturation current ($I_s$) is highly sensitive to temperature. The relationship is approximately exponential. By plotting the natural logarithm of the reverse current against the inverse of absolute temperature, we get a straight line. The slope of this line is directly related to the energy gap ($E_g$).

For Germanium, $E_g \approx 0.72 eV$. For Silicon, $E_g \approx 1.1 eV$.
        `,
        formulas: [
            { label: 'Reverse Saturation Current', equation: 'I_s \\propto T^{3} e^{\\frac{-E_g}{kT}}' },
            { label: 'Linearized Form', equation: '\\ln(I_s) = C - \\frac{E_g}{k} \\left(\\frac{1}{T}\\right)' },
            { label: 'Slope Calculation', equation: 'E_g = \\text{slope} \\times k \\times 10^3' },
            { label: 'Boltzmann Constant', equation: 'k = 8.617 \\times 10^{-5} eV/K' }
        ],
        procedure: [
            '**Circuit**: Connect the P-N junction diode in reverse bias configuration (Positive to N, Negative to P).',
            '**Heating**: Place the diode in a temperature-controlled oven or oil bath along with a thermometer.',
            '**Initial Reading**: Heat the arrangement to about 70-80°C.',
            '**Cooling & Variation**: Allow the temperature to drop gradually. Record the reverse current ($I_s$) and temperature ($T$) at intervals of 5°C.',
            '**Graph**: Plot a graph of $\\ln(I_s)$ versus $10^3/T$.',
            '**Calculation**: Determine the slope of the straight line obtained. Calculate $E_g = \\text{slope} \\times k \times 1000$.'
        ],
        advantages: [
            'Non-destructive method to characterize semiconductors.',
            'Simple equipment (diode, heater, multimeter).',
            'Accurate for intrinsic semiconductors.',
            'Visualizes temperature dependence of conductivity.'
        ],
        disadvantages: [
            'Leakage current must be pure reverse saturation current.',
            'Surface leakage can introduce errors.',
            'Temperature gradients in the bath can cause reading errors.',
            'Risk of damaging diode at high temperatures.'
        ],
        images: [
            'https://media.geeksforgeeks.org/wp-content/uploads/20220221151624/EnergyBandGap.jpg'
        ],
        quiz: [
            {
                question: "What is the energy gap (band gap) in a semiconductor?",
                options: [
                    "Energy difference between valence and conduction bands",
                    "Energy of free electrons",
                    "Potential difference across P-N junction",
                    "Thermal energy of the crystal"
                ],
                correctAnswer: 0,
                explanation: "The energy gap is the energy difference between the top of the valence band and the bottom of the conduction band, where no electron states can exist."
            },
            {
                question: "What is the approximate energy gap of Silicon?",
                options: ["0.72 eV", "1.1 eV", "3.0 eV", "5.0 eV"],
                correctAnswer: 1,
                explanation: "Silicon has an energy gap of approximately 1.1 eV at room temperature."
            },
            {
                question: "In a P-N junction, the depletion region forms because:",
                options: [
                    "Electrons and holes recombine at the junction",
                    "External voltage is applied",
                    "Temperature increases",
                    "Semiconductors are doped"
                ],
                correctAnswer: 0,
                explanation: "When electrons from N-side diffuse to P-side and holes move opposite, they recombine, creating a region depleted of mobile charge carriers."
            },
            {
                question: "Which material has a smaller energy gap?",
                options: ["Silicon", "Germanium", "Diamond", "Silicon Carbide"],
                correctAnswer: 1,
                explanation: "Germanium has an energy gap of ~0.72 eV, smaller than Silicon's ~1.1 eV."
            },
            {
                question: "What happens to conductivity when temperature increases in a semiconductor?",
                options: [
                    "Decreases",
                    "Increases",
                    "Remains constant",
                    "First increases then decreases"
                ],
                correctAnswer: 1,
                explanation: "As temperature increases, more electrons gain enough thermal energy to jump across the band gap, increasing conductivity."
            },
            {
                question: "The reverse saturation current in a P-N junction:",
                options: [
                    "Increases with temperature",
                    "Decreases with temperature",
                    "Is independent of temperature",
                    "Only depends on voltage"
                ],
                correctAnswer: 0,
                explanation: "Reverse saturation current is highly temperature-sensitive and increases exponentially with temperature."
            },
            {
                question: "Knee voltage for Silicon diode is approximately:",
                options: ["0.3V", "0.7V", "1.1V", "1.5V"],
                correctAnswer: 1,
                explanation: "The knee voltage (threshold voltage) for Silicon is approximately 0.7V, while for Germanium it's ~0.3V."
            },
            {
                question: "In forward bias, the P-N junction:",
                options: [
                    "Blocks current flow",
                    "Allows easy current flow after knee voltage",
                    "Has maximum resistance",
                    "Creates larger depletion region"
                ],
                correctAnswer: 1,
                explanation: "Forward bias reduces the depletion region and allows current to flow once the knee voltage is exceeded."
            },
            {
                question: "What is the relationship between energy gap and conductivity?",
                options: [
                    "Larger gap = better conductor",
                    "Smaller gap = better conductor",
                    "No relationship",
                    "Only gap size matters"
                ],
                correctAnswer: 1,
                explanation: "A smaller energy gap makes it easier for electrons to reach the conduction band, resulting in better conductivity."
            },
            {
                question: "In the simulation, increasing voltage above 0.7V causes:",
                options: [
                    "No change in current",
                    "Exponential increase in current",
                    "Linear increase in current",
                    "Decrease in current"
                ],
                correctAnswer: 1,
                explanation: "Once the knee voltage is exceeded, current increases exponentially with voltage due to the diode equation."
            }
        ]
    },
    {
        id: 'iv-characteristics',
        title: 'I-V Characteristics',
        category: 'Electrical',
        theory: `
### P-N Junction Diode
A P-N junction is formed by joining a P-type semiconductor (rich in holes) with an N-type semiconductor (rich in electrons). This creates a boundary called the depletion region.

### Bias Modes
1.  **Forward Bias**: An external voltage is applied such that it opposes the built-in potential barrier. (P connected to Positive, N to Negative). Current flows easily once the *Knee Voltage* (0.7V for Si) is overcome.
2.  **Reverse Bias**: The external voltage adds to the potential barrier. (P connected to Negative, N to Positive). Very little current flows (Reverse Saturation Current) until *Breakdown Voltage* is reached.

### I-V Curve
The plot of Current ($I$) vs Voltage ($V$) is non-linear and asymmetric. It explains the rectification property of diodes.
        `,
        formulas: [
            { label: 'Shockley Equation', equation: 'I = I_s (e^{\\frac{V}{\\eta V_T}} - 1)' },
            { label: 'Thermal Voltage', equation: 'V_T = \\frac{kT}{q} \\approx 26mV \\text{ at } 300K' },
            { label: 'Dynamic Resistance', equation: 'r_d = \\frac{\\Delta V}{\\Delta I}' }
        ],
        procedure: [
            '**Forward Bias Setup**: Connect the positive terminal of the source to the P-side (Anode) and negative to N-side (Cathode) through a resistor and Ammeter.',
            '**Measurement**: Increase the voltage from 0V in steps of 0.1V. Record Voltage (V) and Current (mA). Note the sharp rise after 0.7V.',
            '**Reverse Bias Setup**: Reverse the battery connections. Connect a sensitive micro-ammeter.',
            '**Measurement**: Increase the voltage in steps of 1V. Record Voltage (V) and small Leakage Current ($\mu A$).',
            '**Graph**: Plot the combined graph with Forward V-I in the first quadrant and Reverse V-I in the third quadrant.'
        ],
        advantages: [
            'Fundamental to learning electronics.',
            'Determines key diode parameters (Cut-in voltage, Breakdown).',
            'Helps in selecting diodes for rectification or switching.',
            'Visualizes non-ohmic behavior.'
        ],
        disadvantages: [
            'Junction heating can alter characteristics during measurement.',
            'Requires sensitive meters for reverse bias.',
            'Analog meters decrease precision.',
            'Possibility of thermal runaway in reverse breakdown.'
        ],
        images: [
            'https://media.geeksforgeeks.org/wp-content/uploads/20210216170425/IVCharacteristicsofPNJunctionDiode.png'
        ]
    },
    {
        id: 'titration',
        title: 'Acid-Base Titration',
        category: 'Chemistry',
        theory: `
### Principles of Titration
Titration is a volumetric analysis technique used to determine the concentration of an unknown solution (analyte) by reacting it with a solution of known concentration (titrant).

### Neutralization
In Acid-Base titration, $\text{H}^+$ ions from the acid react with $\text{OH}^-$ ions from the base to form water ($\text{H}_2\text{O}$).
$$ \text{Acid} + \text{Base} \rightarrow \text{Salt} + \text{Water} $$

### Equivalence Point vs End Point
*   **Equivalence Point**: The exact stoichiometric point where moles of acid = moles of base.
*   **End Point**: The point where the indicator changes color. Ideally, these points should be identical.
        `,
        formulas: [
            { label: 'Molarity Equation', equation: 'M_1 V_1 = M_2 V_2' },
            { label: 'pH', equation: 'pH = -\\log[H^+]' },
            { label: 'Strength', equation: 'S = M \\times \\text{Mol. Wt}' }
        ],
        procedure: [
            '**Preparation**: Rinse the burette with the titrant (e.g., NaOH) and fill it. Remove air bubbles.',
            '**Sampling**: Pipette exactly 20mL (or similar) of the analyte (e.g., HCl) into a clean conical flask.',
            '**Indicator**: Add 2-3 drops of Phenolphthalein indicator. Solution remains colorless (if acid).',
            '**Titration**: Slowly add NaOH from burette while constantly swirling the flask.',
            '**End Point**: Stop when a faint pink color persists (for strong acid-strong base).',
            '**Reading**: Note volume consumed. Repeat for concordance.',
            '**Calculation**: Use $M_1V_1 = M_2V_2$ to find the unknown Molarity.'
        ],
        advantages: [
            'High precision and accuracy.',
            'Low cost and simple apparatus.',
            'Standard method for concentration analysis.',
            'Fundamental skill in chemistry labs.'
        ],
        disadvantages: [
            'Destructive test (sample is consumed).',
            'Relies on visual color perception (subjective).',
            'Time-consuming for large numbers of samples.',
            'Indicator error if wrong indicator is chosen.'
        ],
        images: [
            'https://chem.libretexts.org/@api/deki/files/125860/Titration_setup.jpg'
        ]
    },
    {
        id: 'free-fall',
        title: 'Free Fall Motion',
        category: 'Physics',
        theory: `
### Gravity
Near the surface of the Earth, the gravitational field is approximately uniform. This means all objects, regardless of mass, experience the same acceleration downwards, denoted by **g** ($ \approx 9.8 m/s^2 $), provided air resistance is negligible.

### Equations of Motion
For an object dropped from rest ($u=0$):
*   Velocity after time t: $v = gt$
*   Distance fallen: $h = \frac{1}{2}gt^2$

By measuring the time ($t$) it takes to fall a known distance ($h$), we can calculate $g$.
        `,
        formulas: [
            { label: 'Displacement', equation: 'h = \\frac{1}{2} g t^2' },
            { label: 'Gravity Calculation', equation: 'g = \\frac{2h}{t^2}' },
            { label: 'Velocity', equation: 'v = \\sqrt{2gh}' }
        ],
        procedure: [
            '**Setup**: Mount a release mechanism (electromagnet or clamp) at a height $h$. Place a timer pad or sensor on the floor.',
            '**Release**: Drop the object (steel ball) and simultaneously start the timer.',
            '**Impact**: Stop the timer when the object hits the sensor.',
            '**Repeat**: Record time $t$. Repeat 5 times to take an average.',
            '**Variation**: Change height $h$ and repeat.',
            '**Calculation**: Compute $g$ for each height and find the mean value.'
        ],
        advantages: [
            'Direct verification of Newton\'s laws.',
            'Simple calculation.',
            'Demonstrates constancy of acceleration due to gravity.',
            'Can be automated with gates for high precision.'
        ],
        disadvantages: [
            'Air resistance introduces error (drag).',
            'Reaction time error with manual stopwatches.',
            'Parallax error in measuring height.',
            'Difficulty in precise release without initial velocity.'
        ],
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Z3C4y8e7J4e9x5z6yA&s'
        ],
        quiz: [
            {
                question: "What is the acceleration due to gravity (g) on Earth?",
                options: ["9.8 m/s²", "10 m/s²", "8.9 m/s²", "9.0 m/s²"],
                correctAnswer: 0,
                explanation: "The standard acceleration due to gravity on Earth's surface is approximately 9.8 m/s²."
            },
            {
                question: "In free fall, what is the initial velocity if an object is simply dropped?",
                options: ["9.8 m/s", "0 m/s", "5 m/s", "Depends on mass"],
                correctAnswer: 1,
                explanation: "When an object is simply dropped (not thrown), its initial velocity is 0 m/s."
            },
            {
                question: "The equation for distance in free fall is:",
                options: ["d = vt", "d = 0.5gt²", "d = gt", "d = v²/2g"],
                correctAnswer: 1,
                explanation: "For free fall starting from rest, distance = 0.5 × g × t²."
            },
            {
                question: "Does mass affect the rate of free fall (ignoring air resistance)?",
                options: ["Yes, heavier objects fall faster", "No, all objects fall at the same rate", "Yes, lighter objects fall faster", "Only for very heavy objects"],
                correctAnswer: 1,
                explanation: "In the absence of air resistance, all objects fall at the same rate regardless of mass - a fundamental principle demonstrated by Galileo."
            },
            {
                question: "The final velocity after falling for time t is:",
                options: ["v = t/g", "v = g/t", "v = gt", "v = g + t"],
                correctAnswer: 2,
                explanation: "Final velocity = g × t, where g is acceleration and t is time."
            },
            {
                question: "If you double the height, the time to fall:",
                options: ["Doubles", "Increases by √2", "Quadruples", "Stays the same"],
                correctAnswer: 1,
                explanation: "Since h = 0.5gt², time t = √(2h/g). Doubling h increases t by √2."
            },
            {
                question: "What is kinetic energy when the object hits the ground?",
                options: ["0 J", "Equal to initial potential energy", "Half of potential energy", "Double the potential energy"],
                correctAnswer: 1,
                explanation: "By conservation of energy, all potential energy converts to kinetic energy at ground level."
            },
            {
                question: "In the simulation, increasing mass affects:",
                options: ["Time to fall", "Final velocity", "Energy values only", "Nothing about the motion"],
                correctAnswer: 2,
                explanation: "Mass affects the energy values (KE and PE) but not the kinematics of free fall motion."
            },
            {
                question: "At what point is velocity maximum in free fall?",
                options: ["At the start", "In the middle", "Just before hitting ground", "Constant throughout"],
                correctAnswer: 2,
                explanation: "Velocity continuously increases during fall, reaching maximum just before impact."
            },
            {
                question: "Potential energy is maximum when:",
                options: ["Object is at ground level", "Object is halfway down", "Object is at initial height", "Object is falling"],
                correctAnswer: 2,
                explanation: "Potential energy PE = mgh is maximum when height h is maximum (at the starting point)."
            }
        ]
    },

    {
        id: 'rlc-resonance',
        title: 'RLC Resonance',
        category: 'Electrical',
        theory: `
### Resonance
In a series RLC circuit, resonance is a special condition where the inductive reactance equals capacitive reactance ($X_L = X_C$).
At this point:
1.  Net Reactance is zero.
2.  Circuit becomes purely resistive.
3.  Impedance is minimum ($Z = R$).
4.  Current is Maximum.

This frequency is called the **Resonant Frequency ($f_0$)**.
        `,
        formulas: [
            { label: 'Resonant Freq', equation: 'f_0 = \\frac{1}{2\\pi \\sqrt{LC}}' },
            { label: 'Q-Factor', equation: 'Q = \\frac{1}{R}\\sqrt{\\frac{L}{C}}' },
            { label: 'Bandwidth', equation: 'BW = \\frac{R}{2\\pi L}' }
        ],
        procedure: [
            '**Setup**: Connect R, L, C in series with a Function Generator.',
            '**Sweep**: Maintain constant input Voltage amplitude but vary frequency from low to high.',
            '**Observe**: Measure the current (or $V_R$) at each frequency step.',
            '**Peak**: Notice the frequency where current reaches a maximum.',
            '**Plot**: Graph Current vs Frequency. The peak corresponds to $f_0$.'
        ],
        advantages: [
            'Basis for all radio/TV tuning circuits.',
            'Demonstrates frequency selectivity.',
            'High Q-factor concept visualization.',
            'Clear validation of AC theory.'
        ],
        disadvantages: [
            'Heating at resonance (current max).',
            'Can damage components if V is high.',
            'Stray capacitance affects result.',
            'Requires stable frequency source.'
        ],
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_2v3w4x5y6z7A8b9c&s'
        ],
        quiz: [
            {
                question: "What is the condition for resonance in a series RLC circuit?",
                options: ["XL > XC", "XL < XC", "XL = XC", "R = 0"],
                correctAnswer: 2,
                explanation: "Resonance occurs when inductive reactance (XL) equals capacitive reactance (XC), cancelling out the reactive components."
            },
            {
                question: "At resonant frequency, the circuit impedance is:",
                options: ["Maximum", "Minimum", "Zero", "Infinite"],
                correctAnswer: 1,
                explanation: "Since XL cancels XC, impedance Z = √(R² + (XL-XC)²) becomes Z = √(R² + 0) = R, which is the minimum possible value."
            },
            {
                question: "The current in a series RLC circuit at resonance is:",
                options: ["Minimum", "Maximum", "Zero", "Depending on L only"],
                correctAnswer: 1,
                explanation: "Since impedance is minimum (Z=R), the current I = V/Z becomes maximum (I = V/R)."
            },
            {
                question: "The resonant frequency formula is:",
                options: ["f = 1/√(LC)", "f = 1/(2π√(LC))", "f = 2π√(LC)", "f = √(LC)/2π"],
                correctAnswer: 1,
                explanation: "Resonant frequency f₀ is derived from 2πfL = 1/(2πfC), giving f₀ = 1/(2π√(LC))."
            },
            {
                question: "What is the Q-factor (Quality Factor)?",
                options: ["A measure of resistance", "A measure of selectivity/sharpness", "A measure of capacitance", "A measure of power"],
                correctAnswer: 1,
                explanation: "The Q-factor determines the sharpness of the resonance peak. Higher Q means a narrower bandwidth and better selectivity."
            },
            {
                question: "If Resistance R is increased, the bandwidth:",
                options: ["Increases", "Decreases", "Stays same", "Becomes zero"],
                correctAnswer: 0,
                explanation: "Bandwidth BW = R/L (in rad/s). Increasing resistance broadens the resonance curve, increasing bandwidth."
            },
            {
                question: "At resonance, the phase angle between voltage and current is:",
                options: ["90°", "-90°", "0°", "45°"],
                correctAnswer: 2,
                explanation: "The circuit acts purely resistive at resonance, so voltage and current are in phase (phase angle = 0°)."
            },
            {
                question: "Below resonant frequency (f < f₀), the circuit behaves as:",
                options: ["Inductive", "Capacitive", "Resistive", "Short circuit"],
                correctAnswer: 1,
                explanation: "At low frequencies, XC (1/ωC) is large and XL (ωL) is small, so capacitive reactance dominates."
            },
            {
                question: "Above resonant frequency (f > f₀), the circuit behaves as:",
                options: ["Inductive", "Capacitive", "Resistive", "Open circuit"],
                correctAnswer: 0,
                explanation: "At high frequencies, XL (ωL) becomes larger than XC, so inductive reactance dominates."
            },
            {
                question: "In a parallel RLC circuit at resonance, the impedance is:",
                options: ["Minimum", "Maximum", "Zero", "R/2"],
                correctAnswer: 1,
                explanation: "Unlike series RLC (min Z), a parallel RLC circuit has MAXIMUM impedance at resonance (acting as a rejector circuit)."
            }
        ]
    },
    {
        id: 'op-amp',
        title: 'Op-Amp Amplifier',
        category: 'Electrical',
        theory: `
### The 741 Op-Amp
An Operational Amplifier is a DC-coupled high-gain electronic voltage amplifier. It has a differential input and usually a single-ended output.
It operates based on feedback:
*   **Negative Feedback**: Stabilizes gain, increases bandwidth. Used in amplifiers.
*   **Positive Feedback**: Used in oscillators/comparators.

The **Gain** of an inverting amplifier depends only on the ratio of external resistors ($R_f$ and $R_{in}$), making it very precise.
        `,
        formulas: [
            { label: 'Inverting Gain', equation: 'A_v = -\\frac{R_f}{R_{in}}' },
            { label: 'Non-Inv Gain', equation: 'A_v = 1 + \\frac{R_f}{R_{in}}' },
            { label: 'Output Voltage', equation: 'V_{out} = A_v \\times V_{in}' }
        ],
        procedure: [
            '**Circuit**: Set up the 741 IC in Inverting configuration.',
            '**Resistors**: Choose $R_f = 10k\Omega, R_{in} = 1k\Omega$ for Gain = -10.',
            '**Power**: Connect dual supply ($\pm 12V$).',
            '**Input**: Apply 1V peak-to-peak sine wave.',
            '**Output**: Observe output on CRO. It should be 10V sine wave, inverted.',
            '**Verify**: Change resistors and verify new gain.'
        ],
        advantages: [
            'Gain is easily customizable.',
            'High input impedance implies low loading effect.',
            'Low output impedance can drive loads.',
            'Fundamental building block (Adders, Integrators).'
        ],
        disadvantages: [
            'Bandwidth decreases as Gain increases.',
            'Slew Rate limited (distortion at high freq/amp).',
            'Requires dual power supply usually.',
            'Input offset voltage can cause DC error.'
        ],
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_1a2b3c4d5e6f7g8h&s'
        ],
        quiz: [
            {
                question: "What does 'Op-Amp' stand for?",
                options: ["Optical Amplifier", "Operational Amplifier", "Optimized Amplifier", "Optional Amplifier"],
                correctAnswer: 1,
                explanation: "Operational Amplifiers were originally named for their ability to perform mathematical operations like addition, integration, and differentiation."
            },
            {
                question: "What is the ideal input impedance of an Op-Amp?",
                options: ["Zero", "Infinite", "50 Ohms", "1 kOhm"],
                correctAnswer: 1,
                explanation: "An ideal Op-Amp has infinite input impedance, meaning it draws zero current from the input source."
            },
            {
                question: "In an inverting amplifier with Rf = 100kΩ and Rin = 10kΩ, what is the gain?",
                options: ["10", "-10", "11", "-11"],
                correctAnswer: 1,
                explanation: "The gain of an inverting amplifier is given by -Rf/Rin = -100k/10k = -10."
            },
            {
                question: "What is 'Negative Feedback' used for in Op-Amp circuits?",
                options: ["To increase gain to infinity", "To stabilize gain and reduce distortion", "To make it an oscillator", "To reduce bandwidth"],
                correctAnswer: 1,
                explanation: "Negative feedback sacrifices some gain to strictly control the amplifier's performance, improving linearity, stability, and bandwidth."
            },
            {
                question: "What is the output voltage if Vin = 0.5V and Gain = -10?",
                options: ["5V", "-5V", "0.05V", "-0.05V"],
                correctAnswer: 1,
                explanation: "Vout = Gain × Vin = -10 × 0.5V = -5V."
            },
            {
                question: "What is the 'Virtual Ground' concept?",
                options: ["The ground is virtual reality", "Inverting terminal is at same potential as non-inverting terminal", "Output is always ground", "Power supply is ground"],
                correctAnswer: 1,
                explanation: "Because of infinite gain, the voltage difference between inputs is practically zero. If one input is grounded, the other is 'virtually' at ground."
            },
            {
                question: "The 741 Op-Amp typically requires which power supply?",
                options: ["Single 5V", "Dual (±V)", "AC mains", "Current source"],
                correctAnswer: 1,
                explanation: "Standard Op-Amps like the 741 usually operate with a split or dual power supply (e.g., ±12V or ±15V) to amplify both positive and negative signals."
            },
            {
                question: "What is Slew Rate?",
                options: ["Maximum gain", "Maximum rate of change of output voltage", "Input offset voltage", "Bandwidth limit"],
                correctAnswer: 1,
                explanation: "Slew rate (measured in V/μs) defines how fast the Op-Amp output can change in response to a step input change."
            },
            {
                question: "For a Non-Inverting amplifier with Rf = 9kΩ and Rin = 1kΩ, the gain is:",
                options: ["9", "10", "-9", "1"],
                correctAnswer: 1,
                explanation: "Non-inverting gain is 1 + (Rf/Rin) = 1 + (9k/1k) = 1 + 9 = 10."
            },
            {
                question: "What happens if the Op-Amp output tries to exceed the power supply voltage?",
                options: ["It explodes", "It saturates (clipping)", "It turns off", "Voltage doubles"],
                correctAnswer: 1,
                explanation: "The output voltage is limited by the supply rails. If the amplified signal exceeds this, the peaks are flattened or 'clipped' (Saturation)."
            }
        ]
    },
    {
        id: 'hookes-law',
        title: "Hooke's Law",
        category: 'Physics',
        theory: `
### Properties of Solids
Elasticity is the property of a body to regain its original shape and size after the deforming force is removed.
**Hooke's Law** states that for small deformations, the stress is proportional to strain. In terms of a spring, the extension ($x$) is directly proportional to load ($F$).
$$ F = -kx $$
Where $k$ is the spring constant (stiffness).
        `,
        formulas: [
            { label: 'Hooke\'s Law', equation: 'F_{applied} = kx' },
            { label: 'Spring Constant', equation: 'k = \\frac{F}{x} (N/m)' },
            { label: 'Elastic P.E.', equation: 'U = \\frac{1}{2} k x^2' }
        ],
        procedure: [
            '**Mount**: Suspend a spring from a retort stand. Attach a pointer.',
            '**Zero**: Note the initial reading of the pointer on the meter scale.',
            '**Load**: Add mass $m$ (e.g. 50g) to the hanger.',
            '**Measure**: Calculate force $F = mg$ and measure extension $x$.',
            '**Repeat**: Add more masses and record readings.',
            '**Plot**: Graph $F$ vs $x$. The slope gives $k$.'
        ],
        advantages: [
            'Simplest experiment to study elasticity.',
            'Very robust and repeatable.',
            'Intro to linear relationships and slope.',
            'Visualizes potential energy storage.'
        ],
        disadvantages: [
            'Spring may permanently deform (yield).',
            'Oscillations make reading difficult.',
            'Spring mass approximation error.',
            'Zero error in scale.'
        ],
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_9z8y7x6w5v4u3t2s1r&s'
        ],
        quiz: [
            {
                question: "Hooke's Law states that force is proportional to:",
                options: ["Mass", "Extension/Compression", "Velocity", "Time"],
                correctAnswer: 1,
                explanation: "Hooke's Law (F = kx) states that the force needed to extend or compress a spring is directly proportional to the distance of extension/compression."
            },
            {
                question: "What does the slope of the Force vs Extension graph represent?",
                options: ["Mass", "Spring Constant (k)", "Energy", "Acceleration"],
                correctAnswer: 1,
                explanation: "Since F = kx, the slope (F/x) of the graph represents the spring constant or stiffness k."
            },
            {
                question: "The unit of Spring Constant (k) is:",
                options: ["Newtons (N)", "Meters (m)", "N/m", "kg/m"],
                correctAnswer: 2,
                explanation: "Since k = F/x, the unit is Newtons per meter (N/m)."
            },
            {
                question: "What happens if you stretch a spring beyond its elastic limit?",
                options: ["It becomes stiffer", "It breaks instantly", "It permanently deforms", "Hooke's law becomes more accurate"],
                correctAnswer: 2,
                explanation: "Beyond the elastic limit, the material yields and will not return to its original shape. Hooke's law is no longer valid in this plastic region."
            },
            {
                question: "Potential energy stored in a spring is given by:",
                options: ["kx", "kx²", "1/2 kx²", "mgH"],
                correctAnswer: 2,
                explanation: "The elastic potential energy stored in a stretched/compressed spring is U = 1/2 kx²."
            },
            {
                question: "A stiffer spring has a:",
                options: ["Higher spring constant k", "Lower spring constant k", "Zero spring constant", "Variable spring constant"],
                correctAnswer: 0,
                explanation: "A higher value of k means more force is required for the same extension, indicating a stiffer spring."
            },
            {
                question: "If two identical springs are connected in series, the effective spring constant:",
                options: ["Doubles", "Halves", "Stays same", "Quadruples"],
                correctAnswer: 1,
                explanation: "For springs in series, 1/keff = 1/k + 1/k = 2/k, so keff = k/2. The system becomes less stiff."
            },
            {
                question: "In the experiment, the force F is provided by:",
                options: ["Motor", "Gravity acting on hung masses", "Magnetic field", "Hand pressure"],
                correctAnswer: 1,
                explanation: "The force F is the weight of the masses suspended from the spring, calculated as F = mg."
            },
            {
                question: "If exact 1 kg mass stretches a spring by 10 cm, what is k? (g=10 m/s²)",
                options: ["1 N/m", "10 N/m", "100 N/m", "1000 N/m"],
                correctAnswer: 2,
                explanation: "F = mg = 1*10 = 10N. x = 0.1m. k = F/x = 10/0.1 = 100 N/m."
            },
            {
                question: "Restoring force always acts:",
                options: ["In direction of displacement", "Opposite to displacement", "Perpendicular to displacement", "Randomly"],
                correctAnswer: 1,
                explanation: "The negative sign in Hooke's Law (F = -kx) indicates that the restoring force acts in the opposite direction to the displacement."
            }
        ]
    },
    {
        id: 'lens-optics',
        title: 'Lens Optics',
        category: 'Physics',
        theory: `
### Geometrical Optics
A convex lens (converging lens) focuses parallel light rays to a real focal point. It can form both real and virtual images.
*   **Real Image**: Formed when light rays actually meet. Can be projected on a screen. Inverted.
*   **Virtual Image**: Formed when light rays appear to meet. Erect.

The positions of object ($u$), image ($v$) and focal length ($f$) are related by the Lens Formula.
        `,
        formulas: [
            { label: 'Lens Formula', equation: '\\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u}' },
            { label: 'Magnification', equation: 'm = \\frac{h_i}{h_o} = \\frac{v}{u}' },
            { label: 'Power (Diopters)', equation: 'P = \\frac{1}{f(meters)}' }
        ],
        procedure: [
            '**Bench**: Set up optical bench with Lens holder, Object needle/Light, and Screen.',
            '**Focus**: Estimate $f$ by focusing distant object (window) on wall.',
            '**Placement**: Place object needle at distance $> f$.',
            '**Search**: Move screen back and forth until a sharp inverted image is obtained.',
            '**Parallax**: Remove parallax between image and screen crosswire.',
            '**Measure**: Record $u$ and $v$. Calculate $f$.'
        ],
        advantages: [
            'Core principle of imaging systems.',
            'Easy to verify mathematically.',
            'Safe and clean experiment.',
            'Demonstrates conjugate foci.'
        ],
        disadvantages: [
            'Parallax error is the main source of inaccuracy.',
            'Chromatic aberration (color fringing).',
            'Spherical aberration (blurry edges).',
            'Requires good lighting control.'
        ],
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_1a2b3c4d5e6f7g8h&s'
        ],
        quiz: [
            {
                question: "Which type of lens can form a real inverted image?",
                options: ["Concave Lens", "Convex Lens", "Plane Mirror", "Prism"],
                correctAnswer: 1,
                explanation: "A convex (converging) lens forms real, inverted images when the object is placed outside its focal length."
            },
            {
                question: "If the object distance (u) is at infinity, the image is formed at:",
                options: ["2F", "Infinity", "The solid surface", "The Focus (F)"],
                correctAnswer: 3,
                explanation: "Parallel rays coming from infinity converge at the principal focus of a convex lens."
            },
            {
                question: "The Lens Formula is:",
                options: ["1/f = 1/v + 1/u", "1/f = 1/v - 1/u", "1/f = u + v", "f = uv"],
                correctAnswer: 1,
                explanation: "The lens formula relates focal length (f), image distance (v), and object distance (u): 1/f = 1/v - 1/u (with sign convention)."
            },
            {
                question: "What is Magnification (m)?",
                options: ["v/u", "-v/u", "u/v", "f/v"],
                correctAnswer: 0,
                explanation: "Magnification m = height of image / height of object = v/u (for lenses)."
            },
            {
                question: "A virtual image formed by a convex lens is always:",
                options: ["Inverted", "Erect (Upright)", "Real", "Smaller"],
                correctAnswer: 1,
                explanation: "Virtual images formed by single lenses (when object is within f) are always upright (erect) and magnified."
            },
            {
                question: "Power of a lens is measured in:",
                options: ["Watts", "Joules", "Diopters", "Meters"],
                correctAnswer: 2,
                explanation: "The optical power of a lens is the reciprocal of its focal length in meters, measured in Diopters (D)."
            },
            {
                question: "If an object is placed at 2F, the image is formed at:",
                options: ["F", "Infinity", "2F", "Between F and 2F"],
                correctAnswer: 2,
                explanation: "At 2F (center of curvature), the image is also formed at 2F on the other side, same size, real, and inverted."
            },
            {
                question: "Chromatic aberration is caused by:",
                options: ["Lens shape", "Dispersion only", "Diffraction", "Reflection"],
                correctAnswer: 1,
                explanation: "Different colors (wavelengths) refract by different amounts (dispersion), causing them to focus at different points."
            },
            {
                question: "To correct spherical aberration, one uses:",
                options: ["Thicker lens", "Parabolic lens", "Prism", "Mirror"],
                correctAnswer: 1,
                explanation: "Spherical aberration (blurring at edges) occurs in spherical lenses. Parabolic surfaces or stopping down the aperture reduces it."
            },
            {
                question: "A converging lens has a focal length that is:",
                options: ["Positive", "Negative", "Zero", "Undefined"],
                correctAnswer: 0,
                explanation: "By convention, a converging (convex) lens has a positive focal length, while a diverging (concave) lens has a negative one."
            }
        ]
    },
    {
        id: 'pid-control',
        title: 'PID Control Tuning',
        category: 'Advanced',
        theory: `
### Automatic Control
A PID controller is the workhorse of industrial automation. It maintains a system output at a target level (Setpoint).
*   **Proportional (P)**: "Present error". Corrects based on current deviation. Major drive.
*   **Integral (I)**: "Past error". Accumulates error over time. Removes steady-state offset.
*   **Derivative (D)**: "Future error". Predicts error trend. Adds damping/stability.
        `,
        formulas: [
            { label: 'Control Law', equation: 'u(t) = K_p e(t) + K_i \\int e(t)dt + K_d \\dot{e}(t)' },
            { label: 'Transfer Func', equation: 'C(s) = K_p(1 + \\frac{1}{T_i s} + T_d s)' }
        ],
        procedure: [
            '**Step Response**: Apply a step change to the setpoint.',
            '**Tune P**: Increase Kp until system starts oscillating constantly.',
            '**Tune I**: Add Integral action to remove the steady-state gap (offset). Watch for "Windup".',
            '**Tune D**: Add Derivative action to dampen the overshoot and settle faster.',
            '**Optimization**: Fine tune for desired Rise Time and Settling Time.'
        ],
        advantages: [
            'Applicable to almost any linear system.',
            'Industry standard (SCADA/PLC).',
            'Robust against disturbances.',
            'Intuitive (Past, Present, Future).'
        ],
        disadvantages: [
            'D-term amplifies noise (avoid in noisy systems).',
            'Tuning can be tricky (Dark art).',
            'Performance limits for highly non-linear systems.',
            'Integral Windup can cause saturation.'
        ],
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_1a2b3c4d5e6f7g8h&s'
        ],
        quiz: [
            {
                question: "In PID control, what does 'P' stand for?",
                options: ["Proportional", "Power", "Program", "Peak"],
                correctAnswer: 0,
                explanation: "P stands for Proportional control, which produces an output proportional to the current error value."
            },
            {
                question: "Which term eliminates steady-state error (offset)?",
                options: ["Proportional (P)", "Integral (I)", "Derivative (D)", "Gain"],
                correctAnswer: 1,
                explanation: "The Integral term accumulates past errors over time, increasing control action until the steady-state error is zero."
            },
            {
                question: "The Derivative (D) term responds to:",
                options: ["Current Error", "Past Error", "Rate of change of error", "Total Error"],
                correctAnswer: 2,
                explanation: "The Derivative term predicts future error by looking at the slope (rate of change) of the error, adding damping."
            },
            {
                question: "Increasing Kp too much causes:",
                options: ["Sluggish response", "Oscillations/Instability", "Zero error", "System shutdown"],
                correctAnswer: 1,
                explanation: "High proportional gain Kp causes the system to overreact to errors, leading to overshoot and potentially unstable oscillations."
            },
            {
                question: "What is 'Integral Windup'?",
                options: ["Mechanical failure", "Fan spinning too fast", "Accumulator saturating output", "Derivative noise"],
                correctAnswer: 2,
                explanation: "Windup occurs when a large error persists (e.g., actuator saturated), causing the I-term to accumulate a huge value, delaying recovery."
            },
            {
                question: "Derivative action is sensitive to:",
                options: ["DC offset", "High frequency noise", "Low frequency driift", "Integral windup"],
                correctAnswer: 1,
                explanation: "Since D-term amplifies the rate of change, high-frequency noise (rapid changes) results in large, erratic control spikes."
            },
            {
                question: "A system with only P-control usually has:",
                options: ["No error", "Steady-state error", "Infinite oscillation", "Negative gain"],
                correctAnswer: 1,
                explanation: "A pure P-controller requires a non-zero error to generate a non-zero output, resulting in a permanent steady-state offset."
            },
            {
                question: "Settling time is:",
                options: ["Time to reach 50%", "Time to stay within error band", "Time to first peak", "Time to start"],
                correctAnswer: 1,
                explanation: "Settling time is the time required for the response curve to reach and stay within a specified percentage (e.g., 2%) of the final value."
            },
            {
                question: "Overshoot is typically reduced by increasing:",
                options: ["Kp", "Ki", "Kd", "Setpoint"],
                correctAnswer: 2,
                explanation: "Increasing the Derivative (Kd) term adds damping, which braking the system as it approaches the target, reducing overshoot."
            },
            {
                question: "Which tuning method is commonly used for PID?",
                options: ["Trial and Error", "Ziegler-Nichols", "Cohen-Coon", "All of the above"],
                correctAnswer: 3,
                explanation: "PID loops can be tuned manually (trial and error) or using heuristic methods like Ziegler-Nichols or Cohen-Coon."
            }
        ]
    },
    {
        id: 'buffer-capacity',
        title: 'Buffer Capacity',
        category: 'Chemistry',
        theory: `
### Buffer Solutions
A buffer is a solution that resists changes in pH when small amounts of acid or base are added. It usually consists of a weak acid and its conjugate base (e.g., Acetic Acid + Sodium Acetate).
**Buffer Capacity ($\beta$)** is the amount of acid/base required to change the pH of 1 liter of buffer by 1 unit. Capacity is max when $[Acid] = [Base]$ (i.e. $pH = pK_a$).
        `,
        formulas: [
            { label: 'Henderson-Hasselbalch', equation: 'pH = pK_a + \\log\\frac{[A^-]}{[HA]}' },
            { label: 'Buffer Capacity', equation: '\\beta = \\frac{dn}{d(pH)}' }
        ],
        procedure: [
            '**Prepare**: Makes varying mixtures of $0.1M$ CH3COOH and $0.1M$ CH3COONa.',
            '**Measure**: Use a pH meter to record initial pH.',
            '**Perturb**: Add $1.0 mL$ of $0.1M$ HCl.',
            '**Record**: Measure new pH.',
            '**Calculate**: Determine $\Delta pH$ and calculate $\beta$.',
            '**Plot**: Graph $\beta$ vs pH to find max capacity.'
        ],
        advantages: [
            'Essential for biological systems (Blood pH).',
            'Demonstrates chemical equilibrium.',
            'Quantitative measure of stability.',
            'Practical lab skill.'
        ],
        disadvantages: [
            'pH meters require careful calibration.',
            'Temperature dependent ($K_a$ changes).',
            'Limited range (typically $pK_a \pm 1$).',
            'Handling of strong acids/bases.'
        ],
        images: [
            'https://images.unsplash.com/photo-1581091012184-7c54c53737c1?w=400'
        ],
        quiz: [
            {
                question: "A buffer solution consists of:",
                options: ["Strong Acid + Strong Base", "Weak Acid + Conjugate Base", "Strong Acid + Water", "Salt + Water"],
                correctAnswer: 1,
                explanation: "A buffer is typically made of a weak acid and its conjugate base (or weak base and conjugate acid) to resist pH changes."
            },
            {
                question: "Buffer Capacity is maximum when:",
                options: ["pH = 7", "pH = pKa", "[Acid] >> [Base]", "[Base] >> [Acid]"],
                correctAnswer: 1,
                explanation: "Buffer capacity is highest when the concentration of acid equals the concentration of base, which occurs when pH = pKa."
            },
            {
                question: "The Henderson-Hasselbalch equation is:",
                options: ["pH = pKa + log([A-]/[HA])", "pH = -log[H+]", "pH = pKa - log([A-]/[HA])", "pH = 14 - pOH"],
                correctAnswer: 0,
                explanation: "pH = pKa + log([Base]/[Acid]), which relates pH to the ratio of conjugate base to acid species."
            },
            {
                question: "If you add strong acid to a buffer, what reacts with it?",
                options: ["The weak acid", "The conjugate base", "Water only", "The glass beaker"],
                correctAnswer: 1,
                explanation: "The added H+ ions react with the conjugate base (A-) to form weak acid (HA), minimizing the change in free H+ concentration."
            },
            {
                question: "What is the effective pH range of a buffer?",
                options: ["Any pH", "pKa ± 1", "pH 7 only", "pKa ± 5"],
                correctAnswer: 1,
                explanation: "A buffer is generally effective within the range of pKa ± 1. Outside this, one component is depleted too much."
            },
            {
                question: "Which of the following is an example of a buffer?",
                options: ["HCl + NaCl", "Acetic Acid + Sodium Acetate", "NaOH + H2O", "H2SO4 + KOH"],
                correctAnswer: 1,
                explanation: "Acetic Acid (weak acid) and Sodium Acetate (source of conjugate base) form a classic acidic buffer system."
            },
            {
                question: "Diluting a buffer with moderate water:",
                options: ["Drastically changes pH", "Has little effect on pH", "Destroys the buffer", "Increases capacity"],
                correctAnswer: 1,
                explanation: "Dilution changes concentrations of both acid and base by the same ratio, so the log ratio (and thus pH) remains largely unchanged, though capacity decreases."
            },
            {
                question: "The pKa of Acetic Acid is approx:",
                options: ["2.5", "4.76", "7.0", "9.2"],
                correctAnswer: 1,
                explanation: "The pKa of acetic acid is approximately 4.76 at 25°C."
            },
            {
                question: "Blood pH is buffered primarily by:",
                options: ["Acetate system", "Bicarbonate system", "Phosphate only", "Protein only"],
                correctAnswer: 1,
                explanation: "The carbonic acid-bicarbonate buffer system is the primary mechanism for maintaining blood pH around 7.4."
            },
            {
                question: "When [A-] = [HA], the log term in Henderson-Hasselbalch is:",
                options: ["0", "1", "Infinity", "-1"],
                correctAnswer: 0,
                explanation: "If [A-]=[HA], the ratio is 1. log(1) = 0. Therefore pH = pKa."
            }
        ]
    },
    {
        id: 'reaction-rate',
        title: 'Reaction Rate',
        category: 'Chemistry',
        theory: `
### Kinetics
Chemical kinetics studies the speed of reaction.
Rate depends on:
1.  **Concentration**: Collision frequency.
2.  **Surface Area**: Contact area.
3.  **Temperature**: Molecular Kinetic Energy.
4.  **Catalysts**: Activation Energy pathway.

**Arrhenius Equation** links rate constant $k$ with $T$, allowing calculation of Activation Energy $E_a$.
        `,
        formulas: [
            { label: 'Arrhenius Eq', equation: 'k = A e^{-E_a/RT}' },
            { label: 'Log Linear', equation: '\\ln k = \\ln A - \\frac{E_a}{R}(\\frac{1}{T})' },
            { label: 'Rate Def', equation: 'Rate = -\\frac{d[R]}{dt}' }
        ],
        procedure: [
            '**Reaction**: Sodium Thiosulfate + HCl $\rightarrow$ Sulfur precipitate (turbidity).',
            '**Control**: Perform at different temperatures (Water bath).',
            '**Timing**: Place flask over a "Cross (X)" mark. Measure time $t$ for X to disappear.',
            '**Assumption**: Rate $\propto 1/t$.',
            '**Plot**: Graph $\ln(1/t)$ vs $1/T$. Slope gives $-E_a/R$.'
        ],
        advantages: [
            'Classic visual experiment.',
            'Directly calculates Activation Energy.',
            'Connects macro observation to micro theory.',
            'Validates kinetic theory.'
        ],
        disadvantages: [
            'Subjective endpoint (visual disappearance).',
            'Requires strict temperature control.',
            'Toxic gas ($SO_2$) evolution - requires ventilation.',
            'Reaction generates heat (exothermic error).'
        ],
        images: [
            'https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=400'
        ],
        quiz: [
            {
                question: "The rate of a chemical reaction is defined as:",
                options: ["Change in concentration per unit time", "Total time taken", "Amount of product formed", "Temperature change"],
                correctAnswer: 0,
                explanation: "Reaction rate is the change in concentration of reactants or products per unit time (d[C]/dt)."
            },
            {
                question: "According to collision theory, reaction rate depends on:",
                options: ["Only temperature", "Only concentration", "Collision frequency and orientation", "Only catalyst"],
                correctAnswer: 2,
                explanation: "For a reaction to occur, molecules must collide with sufficient energy (activation energy) and correct orientation."
            },
            {
                question: "How does temperature affect reaction rate?",
                options: ["Decreases it", "Increases it exponentially", "No effect", "Increases it linearly"],
                correctAnswer: 1,
                explanation: "Increasing temperature increases the kinetic energy of molecules, leading to more frequent and energetic collisions, exponentially increasing the rate (Arrhenius equation)."
            },
            {
                question: "The energy required to start a reaction is called:",
                options: ["Potential Energy", "Kinetic Energy", "Activation Energy", "Bond Energy"],
                correctAnswer: 2,
                explanation: "Activation Energy (Ea) is the minimum energy barrier that reacting molecules must overcome to form products."
            },
            {
                question: "A catalyst increases reaction rate by:",
                options: ["Increasing temperature", "Lowering activation energy", "Increasing concentration", "Changing the products"],
                correctAnswer: 1,
                explanation: "Catalysts provide an alternative reaction pathway with a lower activation energy, speeding up the reaction without being consumed."
            },
            {
                question: "In the Arrhenius equation k = Ae^(-Ea/RT), 'A' represents:",
                options: ["Activation Energy", "Frequency Factor", "Gas Constant", "Rate Constant"],
                correctAnswer: 1,
                explanation: "The Frequency Factor (A) represents the frequency of collisions with proper orientation."
            },
            {
                question: "The unit of rate constant k for a first-order reaction is:",
                options: ["mol/L/s", "s^-1", "L/mol/s", "Unitless"],
                correctAnswer: 1,
                explanation: "For a first-order reaction (Rate = k[A]), the unit of k is 1/time (s^-1)."
            },
            {
                question: "If the concentration of a reactant is doubled and the rate doubles, the order is:",
                options: ["Zero", "First", "Second", "Third"],
                correctAnswer: 1,
                explanation: "If Rate ∝ [Conc]^1, then doubling concentration doubles the rate, indicating a first-order reaction."
            },
            {
                question: "Surface area affects reaction rate for:",
                options: ["Gases only", "Solids", "Liquids only", "None"],
                correctAnswer: 1,
                explanation: "For solids, increasing surface area (e.g., powdering) exposes more particles to collisions, increasing the reaction rate."
            },
            {
                question: "What does the slope of a ln(k) vs 1/T graph represent?",
                options: ["-Ea/R", "Ea/R", "A", "k"],
                correctAnswer: 0,
                explanation: "From the linearized Arrhenius equation ln(k) = ln(A) - (Ea/R)(1/T), the slope is -Ea/R."
            }
        ]
    },
    {
        id: 'fourier-series',
        title: 'Fourier Series',
        category: 'Advanced',
        theory: `
### Signal Decomposition
Fourier analysis states that any periodic function (signal) can be constructed by summing a set of simple sine and cosine waves.
*   **Fundamental Frequency ($f$)**: The base sine wave.
*   **Harmonics**: Multiples of $f$ ($2f, 3f...$) with decreasing amplitudes.

Square waves are made of odd harmonics ($f, 3f, 5f...$). Sawtooth waves contain all harmonics.
        `,
        formulas: [
            { label: 'Synthesis', equation: 'f(t) = \\Sigma A_n \\sin(n\\omega t + \\phi_n)' },
            { label: 'Square Wave', equation: '\\Sigma_{odd} \\frac{1}{n} \\sin(nt)' }
        ],
        procedure: [
            '**Target**: Choose a target shape (e.g. Square wave).',
            '**Build**: Start with Fundamental Sinewave.',
            '**Add**: Add 3rd harmonic ($1/3$ amplitude). Notice "squaring" of edges.',
            '**Add**: Add 5th, 7th harmonics.',
            '**Converge**: Observe how the shape approaches ideal square wave as N increases (Gibbs phenomenon).'
        ],
        advantages: [
            'Foundation of Digital Signal Processing.',
            'Understanding bandwidth / spectrum.',
            'Visual and mathematical link.',
            'Basis for audio/image compression.'
        ],
        disadvantages: [
            'Infinite series required for perfect shape.',
            'Gibbs phenomenon (overshoot at edges).',
            'Computationally intensive (FFT).',
            'Abstract concept for beginners.'
        ],
        images: [
            'https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?w=400'
        ],
        quiz: [
            {
                question: "A Fourier Series represents a periodic function as a sum of:",
                options: ["Polynomials", "Exponentials only", "Sines and Cosines", "Logarithms"],
                correctAnswer: 2,
                explanation: "Fourier Series decomposes a periodic signal into a sum of simple sine and cosine waves (harmonics)."
            },
            {
                question: "The lowest frequency component in a Fourier series is called:",
                options: ["DC component", "Fundamental Frequency", "Harmonic", "Noise"],
                correctAnswer: 1,
                explanation: "The fundamental frequency (f or 1st harmonic) matches the periodicity of the original signal and is the lowest frequency sine wave."
            },
            {
                question: "A square wave consists of:",
                options: ["All harmonics", "Only odd harmonics", "Only even harmonics", "No harmonics"],
                correctAnswer: 1,
                explanation: "An ideal square wave is constructed by summing the fundamental frequency and all its ODD harmonics (3f, 5f, etc.) with decreasing amplitude."
            },
            {
                question: "The Gibbs Phenomenon refers to:",
                options: ["Frequency shift", "Overshoot at discontinuities", "Noise reduction", "Amplitude loss"],
                correctAnswer: 1,
                explanation: "Gibbs phenomenon is the persistent overshoot/ringing that occurs at sharp transitions (discontinuities) in a signal when reconstructed from a finite number of Fourier terms."
            },
            {
                question: "As you add more harmonics to the series, the approximation:",
                options: ["Gets worse", "Stays same", "Gets closer to the original signal", "Becomes zero"],
                correctAnswer: 2,
                explanation: "Adding more harmonics improves the resolution and makes the reconstructed signal match the original shape more closely."
            },
            {
                question: "A sawtooth wave contains:",
                options: ["Only odd harmonics", "Only even harmonics", "Both odd and even harmonics", "No harmonics"],
                correctAnswer: 2,
                explanation: "A sawtooth wave is composed of ALL integer harmonics (both odd and even) with amplitudes proportional to 1/n."
            },
            {
                question: "The amplitude of the nth harmonic in a square wave decreases as:",
                options: ["1/n", "1/n²", "1/n!", "Constant"],
                correctAnswer: 0,
                explanation: "For a square wave, the amplitude of the nth harmonic is proportional to 1/n."
            },
            {
                question: "Fourier Analysis is used in:",
                options: ["Signal Processing", "Image Compression", "Audio filtering", "All of the above"],
                correctAnswer: 3,
                explanation: "Fourier analysis is fundamental to many fields, including analyzing signals, compressing JPEGs/MP3s, and solving differential equations."
            },
            {
                question: "The DC component of a signal represents its:",
                options: ["Average value", "Maximum value", "Minimum value", "RMS value"],
                correctAnswer: 0,
                explanation: "The constant term (a0) in the Fourier series represents the average value (DC offset) of the periodic function over one period."
            },
            {
                question: "Which domain does Fourier Transform switch to?",
                options: ["Time Domain", "Frequency Domain", "Space Domain", "Power Domain"],
                correctAnswer: 1,
                explanation: "Fourier Transform converts a signal from the Time Domain (amplitude vs time) to the Frequency Domain (amplitude vs frequency)."
            }
        ]
    },
    {
        id: 'neural-activation',
        title: 'Neural Activation',
        category: 'Advanced',
        theory: `
### Artificial Neurons
In Deep Learning, a neuron receives inputs, weights them, sums them, and passes them through an **Activation Function**.
The Activation Function introduces **Non-Linearity**, allowing the network to learn complex patterns (not just linear regression).
Common functions:
*   **Sigmoid**: S-shape, 0 to 1. Good for probability.
*   **ReLU**: Linear for x>0, zero for x<0. Fast, standard for hidden layers.
*   **Tanh**: -1 to 1. Zero centered.
        `,
        formulas: [
            { label: 'Sigmoid', equation: '\\sigma(z) = \\frac{1}{1+e^{-z}}' },
            { label: 'Tanh', equation: '\\tanh(z) = \\frac{e^z-e^{-z}}{e^z+e^{-z}}' },
            { label: 'ReLU', equation: 'f(z) = \\max(0, z)' }
        ],
        procedure: [
            '**Input**: Sweep input values $x$ from -5 to +5.',
            '**Process**: Apply function to each $x$.',
            '**Analyze**: Observe Output Range (bounds).',
            '**Derivative**: Observe Gradient (steepness). Crucial for Backpropagation.',
            '**Compare**: Check Vanishing Gradient potential (flat regions).'
        ],
        advantages: [
            'Core concept of AI/ML.',
            'Visualizes math behind "Thinking".',
            'Explains "Dying ReLU" and saturation.',
            'Immediate visual feedback.'
        ],
        disadvantages: [
            'Highly abstract math model.',
            'No physical analog (purely computational).',
            'Requires understanding of derivatives.',
            'Oversimplification of biological neurons.'
        ],
        images: [
            'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400'
        ],
        quiz: [
            {
                question: "What is the purpose of an activation function in a neural network?",
                options: ["To sum inputs", "To add non-linearity", "To increase speed", "To store data"],
                correctAnswer: 1,
                explanation: "Activation functions introduce non-linear properties to the network, allowing it to learn complex mappings beyond simple linear regression."
            },
            {
                question: "Which activation function outputs values between 0 and 1?",
                options: ["ReLU", "Tanh", "Sigmoid", "Linear"],
                correctAnswer: 2,
                explanation: "The Sigmoid function squashes inputs into a range between 0 and 1, making it useful for probability estimation."
            },
            {
                question: "The ReLU function is defined as:",
                options: ["max(0, x)", "1/(1+e^-x)", "tanh(x)", "sin(x)"],
                correctAnswer: 0,
                explanation: "Rectified Linear Unit (ReLU) outputs the input directly if it is positive, otherwise, it outputs zero: f(x) = max(0, x)."
            },
            {
                question: "What is the 'Vanishing Gradient' problem?",
                options: ["Gradients become too large", "Gradients become too small during backprop", "Weights disappear", "Neurons die"],
                correctAnswer: 1,
                explanation: "In deep networks with sigmoid/tanh, gradients can become extremely small during backpropagation, causing early layers to stop learning."
            },
            {
                question: "Which function is zero-centered?",
                options: ["Sigmoid", "ReLU", "Tanh", "Step"],
                correctAnswer: 2,
                explanation: "The Tanh function outputs values between -1 and 1, making it zero-centered, which generally helps in faster convergence."
            },
            {
                question: "The 'Dying ReLU' problem refers to:",
                options: ["Neurons stuck outputting 0", "Neurons overheating", "Weights exploding", "Infinite output"],
                correctAnswer: 0,
                explanation: "If a ReLU neuron enters a state where it always outputs 0 for all inputs (negative weights), its gradient becomes 0 and it stops learning permanently."
            },
            {
                question: "Which activation function is commonly used in the output layer for binary classification?",
                options: ["ReLU", "Sigmoid", "Softmax", "Tanh"],
                correctAnswer: 1,
                explanation: "Sigmoid is standard for binary classification output as it produces a probability value between 0 and 1."
            },
            {
                question: "For multi-class classification, the output layer uses:",
                options: ["Sigmoid", "Softmax", "ReLU", "Linear"],
                correctAnswer: 1,
                explanation: "Softmax normalizes the output vector into a probability distribution over multiple classes."
            },
            {
                question: "A linear activation function allows the network to learn:",
                options: ["Complex patterns", "Only linear relationships", "Everything", "Nothing"],
                correctAnswer: 1,
                explanation: "If only linear activation functions are used, the entire deep neural network behaves like a single layer linear regression model."
            },
            {
                question: "The derivative of the Sigmoid function is largest at:",
                options: ["x = 0", "x = 10", "x = -10", "x = 1"],
                correctAnswer: 0,
                explanation: "The slope of the sigmoid curve is steepest at the midpoint z = 0, where the derivative is maximum (0.25)."
            }
        ]
    },
    {
        id: 'circuit-analysis',
        title: 'AC Circuit Analysis',
        category: 'Electrical',
        theory: `
### AC Circuits
In Alternating Current (AC) circuits, voltage and current vary sinusoidally with time. components behave differently than in DC:
*   **Resistors (R)**: Voltage and current are in phase.
*   **Capacitors (C)**: Current leads voltage by 90°. Oppose change in voltage.
*   **Inductors (L)**: Voltage leads current by 90°. Oppose change in current.

**Capacitive Reactance ($X_C$)** is the opposition to AC current flow by a capacitor, inversely proportional to frequency and capacitance.
        `,
        formulas: [
            { label: 'Reactance', equation: 'X_C = \\frac{1}{2\\pi f C}' },
            { label: 'OhmLaw (AC)', equation: 'V = I \\times Z' },
            { label: 'Impedance (RC)', equation: 'Z = \\sqrt{R^2 + X_C^2}' }
        ],
        procedure: [
            '**Setup**: Connect AC Source, Resistor, and Capacitor in series.',
            '**Vary Frequency**: Increase source frequency $f$ and observe $I$.',
            '**Vary C**: Change capacitance and observe effect on reactance.',
            '**Measure**: Use oscilloscope to measure phase difference between V and I.',
            '**Plot**: Graph $X_C$ vs $1/f$. Slope should be $1/(2\\pi C)$.'
        ],
        advantages: [
            'Basis of filters (Low-pass, High-pass).',
            'Understanding power factor.',
            'Essential for electronics design.',
            'Visualizes phase shift concepts.'
        ],
        disadvantages: [
            'Requires oscilloscope for phase measurement.',
            'High voltages can be dangerous.',
            'Real components have parasitics.',
            'Complex math (phasors) required.'
        ],
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_1a2b3c4d5e6f7g8h&s'
        ],
        quiz: [
            {
                question: "In a purely capacitive circuit, current:",
                options: ["Lags voltage by 90°", "Leads voltage by 90°", "Is in phase with voltage", "Is zero"],
                correctAnswer: 1,
                explanation: "In a capacitor, current leads the voltage by 90 degrees (ICE - Current Capacitance Electric potential)."
            },
            {
                question: "Capacitive Reactance (Xc) is given by:",
                options: ["2πfC", "1/(2πfC)", "2πfL", "R"],
                correctAnswer: 1,
                explanation: "Xc is inversely proportional to frequency and capacitance: Xc = 1/(2πfC)."
            },
            {
                question: "As frequency increases, capacitive reactance:",
                options: ["Increases", "Decreases", "Stays constant", "Becomes zero"],
                correctAnswer: 1,
                explanation: "Since Xc = 1/(2πfC), increasing f (denominator) decreases Xc."
            },
            {
                question: "Which component opposes changes in voltage?",
                options: ["Resistor", "Inductor", "Capacitor", "Switch"],
                correctAnswer: 2,
                explanation: "A capacitor stores energy in an electric field and opposes rapid changes in voltage across it."
            },
            {
                question: "Impedance (Z) is measured in:",
                options: ["Farads", "Henrys", "Ohms", "Hertz"],
                correctAnswer: 2,
                explanation: "Impedance, like resistance and reactance, represents opposition to current flow and is measured in Ohms (Ω)."
            },
            {
                question: "In a purely resistive AC circuit, the phase angle is:",
                options: ["0°", "90°", "-90°", "180°"],
                correctAnswer: 0,
                explanation: "For a resistor, voltage and current are always in phase, so the phase difference is 0 degrees."
            },
            {
                question: "Power dissipated in a pure capacitor is:",
                options: ["Maximum", "Minimum", "Zero (Ideal)", "Infinite"],
                correctAnswer: 2,
                explanation: "Ideal capacitors store and release energy but do not dissipate it as heat. Average power is zero."
            },
            {
                question: "Which circuit filters out low frequencies?",
                options: ["Low-pass filter", "High-pass filter", "All-pass filter", "No-pass filter"],
                correctAnswer: 1,
                explanation: "A High-pass filter (e.g., CR series) allows high frequencies to pass while attenuating low frequencies."
            },
            {
                question: "The RMS value of a sine wave is:",
                options: ["Peak value", "Peak / √2", "Peak * √2", "Average value"],
                correctAnswer: 1,
                explanation: "Vrms = Vpeak / √2 ≈ 0.707 * Vpeak."
            },
            {
                question: "Total impedance of a series RC circuit is:",
                options: ["R + Xc", "R - Xc", "√(R² + Xc²)", "R * Xc"],
                correctAnswer: 2,
                explanation: "Impedance Z is the vector sum of resistance and reactance: Z = √(R² + Xc²)."
            }
        ]
    }
]

export const categories = {
    Physics: { color: '#1a73e8', icon: '⚛️' },
    Chemistry: { color: '#34a853', icon: '🧪' },
    Electrical: { color: '#9c27b0', icon: '⚡' },
    Advanced: { color: '#ff9800', icon: '💻' }
}
