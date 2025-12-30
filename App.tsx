import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import RoadmapGenerator from './components/RoadmapGenerator';

type ViewState = 'landing' | 'app';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  const handleGetStarted = (id?: string) => {
    if (id) {
      setSelectedTopicId(id);
    } else {
      setSelectedTopicId(null);
    }
    setCurrentView('app');
  };

  const handleBackToHome = () => {
    setCurrentView('landing');
    setSelectedTopicId(null);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {currentView === 'landing' ? (
        <LandingPage onGetStarted={handleGetStarted} />
      ) : (
        <RoadmapGenerator 
          onBack={handleBackToHome} 
          initialRoleId={selectedTopicId}
        />
      )}
    </div>
  );
};

export default App;