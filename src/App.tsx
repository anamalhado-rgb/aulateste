/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { VesselControl } from './pages/VesselControl';
import { PassengerMovement } from './pages/PassengerMovement';
import { CargoManagement } from './pages/CargoManagement';
import { BlockchainTracking } from './pages/BlockchainTracking';
import { UserManagement } from './pages/UserManagement';
import { Login } from './pages/Login';
import { Layout } from './components/Layout';

export default function App() {
  const [activePage, setActivePage] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleNavigate = (page: string) => {
    setActivePage(page);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActivePage('dashboard');
  };

  // If on landing or login, don't show layout
  if (activePage === 'landing') {
    return <Landing onNavigate={handleNavigate} />;
  }

  if (activePage === 'login') {
    return <Login onLogin={handleLogin} onNavigate={handleNavigate} />;
  }

  // Dashboard pages wrapped in Layout
  return (
    <Layout activePage={activePage} onNavigate={handleNavigate}>
      {activePage === 'dashboard' && <Dashboard />}
      {activePage === 'vessel-control' && <VesselControl />}
      {activePage === 'passenger-movement' && <PassengerMovement />}
      {activePage === 'cargo-management' && <CargoManagement />}
      {activePage === 'blockchain-tracking' && <BlockchainTracking />}
      {activePage === 'user-management' && <UserManagement />}
    </Layout>
  );
}
