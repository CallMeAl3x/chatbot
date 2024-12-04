import React from 'react';
// import Brain3D from "../components/Brain3d";
import GlassBrain from '../components/Brain3d';

const DashboardPage: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <h1>Dashboard</h1>
      <GlassBrain />
    </div>
  );
};

export default DashboardPage;
