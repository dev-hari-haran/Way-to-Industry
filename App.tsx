import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import RoadmapGenerator from './components/RoadmapGenerator';
import Dashboard from './components/Dashboard';

type ViewState = 'landing' | 'dashboard' | 'app';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  // Navigation Handlers

  // Go to Dashboard (Simulated Login)
  const handleLogin = () => {
    setCurrentView('dashboard');
  };

  // Go to Roadmap Generator (Get Started)
  const handleStartRoadmap = (roleId?: string) => {
    setSelectedTopicId(roleId || null);
    setCurrentView('app');
  };

  // Back to Landing Page (Logout)
  const handleLogout = () => {
    setCurrentView('landing');
    setSelectedTopicId(null);
  };

  // Back from Roadmap Generator -> Dashboard (Keep user in app context)
  const handleBackFromRoadmap = () => {
    setCurrentView('dashboard');
    setSelectedTopicId(null);
  };
  
  // Dashboard -> Specific Roadmap
  const handleNavigateToRoadmap = (roleId: string) => {
    setSelectedTopicId(roleId);
    setCurrentView('app');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {currentView === 'landing' && (
        <LandingPage 
          onLogin={handleLogin} 
          onGetStarted={handleStartRoadmap} 
        />
      )}
      
      {currentView === 'dashboard' && (
        <Dashboard 
          onNavigateToRoadmap={handleNavigateToRoadmap} 
          onLogout={handleLogout}
        />
      )}

      {currentView === 'app' && (
        <RoadmapGenerator 
          onBack={handleBackFromRoadmap} 
          initialRoleId={selectedTopicId}
        />
      )}
    </div>
  );
};

export default App;