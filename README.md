# VirtuoLabs - Virtual Lab Platform

A comprehensive virtual laboratory platform for STEM education, providing interactive simulations for Physics, Chemistry, Electrical Engineering, and Advanced STEM subjects.

## Features

- **Interactive Experiments**: Multiple virtual lab experiments with real-time simulations
- **Progress Tracking**: Monitor your learning progress with detailed analytics
- **Dashboard**: Overview of your learning streak, study time, and scores
- **Multiple Categories**: Physics, Chemistry, Electrical Engineering, and Advanced STEM
- **Modern UI**: Clean, responsive design with intuitive navigation

## Available Experiments

### Physics
- Simple Pendulum
- Energy Gap of P-N Junction Diode
- Free Fall Motion
- Projectile Motion

### Chemistry
- Acid-Base Titration

### Electrical Engineering
- I-V Characteristics
- Energy Gap of P-N Junction Diode

## Technology Stack

- **Frontend**: React.js
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Styling**: CSS3
- **Backend**: Node.js + Express (in `server/`)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd virtuolabs
```

2. Install dependencies:
```bash
npm install
```

Install backend dependencies (same command installs both frontend + backend deps):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

5. Start the API server (new terminal):
```bash
npm run server
```
API is available at `http://localhost:4000`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## Project Structure

```
virtuolabs/
├── src/
│   ├── components/
│   │   ├── Layout.jsx
│   │   └── Layout.css
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ProgressTracking.jsx
│   │   └── experiments/
│   │       ├── EnergyGapExperiment.jsx
│   │       ├── IVCharacteristics.jsx
│   │       ├── TitrationExperiment.jsx
│   │       ├── SimplePendulum.jsx
│   │       ├── FreeFallMotion.jsx
│   │       ├── ProjectileMotion.jsx
│   │       └── ExperimentPage.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Features in Detail

### Homepage
- Welcome banner with call-to-action buttons
- Experiment listings with filters (Category, Difficulty, Sort)
- Experiment cards with images and descriptions

### Dashboard
- Learning streak counter
- Total study time tracking
- Average score display
- Recent experiments list

### Progress Tracking
- Visual progress bars for each subject
- Completion statistics
- Learning metrics

### Experiment Pages
- Interactive simulations
- Parameter controls
- Real-time data visualization
- Key concepts and theory
- Download data functionality

### Backend (Express API)
- `POST /auth/register` — create account (name, email, password)
- `POST /auth/login` — login and receive token
- `GET /me` — fetch profile & averages (requires `Authorization: Bearer <token>`)
- `GET /experiments` — list experiments
- `POST /progress` — record experiment attempt `{ experimentId, experimentTitle?, score }`
- `GET /progress` — fetch user progress

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Future Enhancements

- AI-driven feedback system
- 3D simulations using Unity WebGL
- User authentication and profiles
- More experiment categories
- Real-time assessments
- Performance reports

