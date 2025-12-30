import React from 'react';
import { 
  ArrowRight, BookOpen, Compass, Target, CheckCircle, 
  BarChart, Cpu, Layout, Server, Layers, Terminal, 
  Shield, Brain, Link, Smartphone, Database, Code, Globe, Box, Hash, LogIn, UserPlus
} from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
  onGetStarted: (id?: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onGetStarted }) => {
  const skills = [
    { id: 'SQL', label: 'SQL', icon: Database },
    { id: 'React', label: 'React', icon: Code },
    { id: 'Vue', label: 'Vue', icon: Code },
    { id: 'Angular', label: 'Angular', icon: Code },
    { id: 'JavaScript', label: 'JavaScript', icon: Code },
    { id: 'Python', label: 'Python', icon: Code },
    { id: 'Java', label: 'Java', icon: Code },
    { id: 'API Design', label: 'API Design', icon: Globe },
    { id: 'C++', label: 'C++', icon: Code },
    { id: 'Flutter', label: 'Flutter', icon: Smartphone },
    { id: 'Rust', label: 'Rust', icon: Hash },
    { id: 'Go', label: 'Go', icon: Code },
    { id: 'React Native', label: 'React Native', icon: Smartphone },
    { id: 'Linux', label: 'Linux', icon: Terminal },
    { id: 'Docker', label: 'Docker', icon: Box },
    { id: 'Swift', label: 'Swift', icon: Code },
    { id: 'Laravel', label: 'Laravel', icon: Code },
    { id: 'Kotlin', label: 'Kotlin', icon: Code },
    { id: 'C#', label: 'C#', icon: Hash },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">
                B
              </div>
              <span className="text-xl font-bold text-slate-900">Budding Blooms</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={onLogin} 
                className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Log in
              </button>
              <button 
                onClick={onLogin} 
                className="px-4 py-2 text-sm font-bold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-16 pb-24 lg:pt-32 lg:pb-36 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/50 via-white to-white"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium mb-6 border border-emerald-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Bridging the Gap Between Classroom and Career
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6">
            Your Degree is Just the Beginning. <br className="hidden md:block" />
            <span className="text-emerald-600">Master the Industry Skills.</span>
          </h1>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto mb-10">
            Stop guessing what employers want. Budding Blooms analyzes your current academic knowledge 
            and builds a personalized, AI-guided roadmap to make you industry-ready.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => onGetStarted()}
              className="px-8 py-4 text-lg font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={onLogin}
              className="px-8 py-4 text-lg font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              Dashboard
            </button>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-2 text-sm text-slate-500">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>Powered by industry-standard skill maps</span>
          </div>
        </div>
      </header>

      {/* Value Propositions */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Why Budding Blooms?</h2>
            <p className="mt-4 text-lg text-slate-600">We translate your syllabus into job requirements.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Target className="w-8 h-8 text-emerald-600" />}
              title="Skill Gap Clarity"
              description="Instantly visualize the difference between what you know and what the job market demands."
            />
            <FeatureCard 
              icon={<Compass className="w-8 h-8 text-emerald-600" />}
              title="Personalized Roadmap"
              description="Get a step-by-step learning path tailored specifically to your target role and current level."
            />
            <FeatureCard 
              icon={<BookOpen className="w-8 h-8 text-emerald-600" />}
              title="AI-Powered Coding Interview"
              description="Our AI mentor suggests resources, projects, and certifications to close your gaps fast."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">How It Works</h2>
            <p className="mt-4 text-lg text-slate-600">Three simple steps to your dream job.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-200 z-0"></div>
            
            <StepCard 
              number="1"
              title="Choose the Role"
              description="Choose the industry role you aspire to achieve."
            />
            <StepCard 
              number="2"
              title="Enter your Skills"
              description="Tell us what you've studied and what tools you know."
            />
            <StepCard 
              number="3"
              title="Get your Roadmap to master in Industry"
              description="Receive a custom plan to bridge the gap instantly."
            />
          </div>
        </div>
      </section>

      {/* Example Roles */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Target Top Industry Roles</h2>
            <p className="mt-4 text-lg text-slate-600">We support roadmaps for the most in-demand careers.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <RoleChip onClick={() => onGetStarted('Frontend')} icon={<Layout className="w-5 h-5" />} label="Frontend" />
            <RoleChip onClick={() => onGetStarted('Backend')} icon={<Server className="w-5 h-5" />} label="Backend" />
            <RoleChip onClick={() => onGetStarted('Full Stack')} icon={<Layers className="w-5 h-5" />} label="Full Stack" />
            <RoleChip onClick={() => onGetStarted('DevOps')} icon={<Terminal className="w-5 h-5" />} label="DevOps" />
            <RoleChip onClick={() => onGetStarted('DevSecOps')} icon={<Shield className="w-5 h-5" />} label="DevSecOps" />
            <RoleChip onClick={() => onGetStarted('AI Engineer')} icon={<Cpu className="w-5 h-5" />} label="AI Engineer" />
            <RoleChip onClick={() => onGetStarted('AI and Data Scientist')} icon={<Brain className="w-5 h-5" />} label="AI & Data Scientist" />
            <RoleChip onClick={() => onGetStarted('Android')} icon={<Smartphone className="w-5 h-5" />} label="Android" />
            <RoleChip onClick={() => onGetStarted('iOS')} icon={<Smartphone className="w-5 h-5" />} label="iOS" />
            <RoleChip onClick={() => onGetStarted('Blockchain')} icon={<Link className="w-5 h-5" />} label="Blockchain" />
          </div>
        </div>
      </section>

      {/* Master the Skills Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Master the Skills</h2>
            <p className="mt-4 text-lg text-slate-600">Deep dive into specific technologies. Double-click to start your roadmap.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <div
                  key={skill.id}
                  onDoubleClick={() => onGetStarted(skill.id)}
                  className="group flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-full shadow-sm cursor-pointer select-none transition-all duration-200 hover:border-emerald-500 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                  title="Double click to view roadmap"
                >
                  <Icon className="w-4 h-4 text-slate-500 group-hover:text-emerald-600 transition-colors" />
                  <span className="font-semibold text-slate-700 group-hover:text-slate-900">{skill.label}</span>
                </div>
              );
            })}
          </div>
          <p className="text-center text-xs text-slate-400 mt-6 italic">
            * Double-click a skill to generate its specific roadmap
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">
              B
            </div>
            <span className="text-xl font-bold text-white">Budding Blooms</span>
          </div>
          <p className="text-sm">© 2025-26 Budding Blooms. Built with Kindness & Care.</p>
        </div>
      </footer>
    </div>
  );
};

// Sub-components for cleaner code
const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all group">
    <div className="mb-6 p-4 rounded-xl bg-emerald-50 w-fit group-hover:bg-emerald-100 transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);

const StepCard: React.FC<{ number: string; title: string; description: string }> = ({ number, title, description }) => (
  <div className="relative z-10 flex flex-col items-center text-center">
    <div className="w-16 h-16 rounded-full bg-white border-4 border-emerald-100 text-emerald-600 font-bold text-2xl flex items-center justify-center mb-6 shadow-sm">
      {number}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed max-w-xs">{description}</p>
  </div>
);

const RoleChip: React.FC<{ icon: React.ReactNode; label: string; onClick?: () => void }> = ({ icon, label, onClick }) => (
  <div onClick={onClick} className="flex items-center gap-3 px-6 py-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-emerald-500 hover:shadow-md hover:text-emerald-700 hover:scale-105 transition-all duration-200 cursor-pointer">
    <span className="text-emerald-500">{icon}</span>
    <span className="font-semibold text-slate-700">{label}</span>
  </div>
);

export default LandingPage;