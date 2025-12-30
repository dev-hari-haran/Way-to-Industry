import React, { useState } from 'react';
import { 
  BarChart, PlayCircle, Clock, CheckCircle, Code, Briefcase, 
  ChevronRight, Star, Brain, Cpu, Terminal, Layers, RefreshCw, 
  Sparkles, Award, Play, AlertCircle, Save, Check, X, LogOut, Layout,
  Smartphone, Database, Globe, TrendingUp, Zap
} from 'lucide-react';
import { generateInterviewQuestions, InterviewQuestion } from '../services/geminiService';

interface DashboardProps {
  onNavigateToRoadmap: (roleId: string) => void;
  onLogout: () => void;
}

interface InterviewResult {
  id: string;
  topic: string;
  type: 'Skill' | 'Role';
  score: number;
  date: string;
  label: string;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigateToRoadmap, onLogout }) => {
  // --- STATE ---
  const [interviewMode, setInterviewMode] = useState<boolean>(false);
  const [loadingInterview, setLoadingInterview] = useState<boolean>(false);
  const [currentQuestions, setCurrentQuestions] = useState<InterviewQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [interviewConfig, setInterviewConfig] = useState<{topic: string, type: 'Skill'|'Role'} | null>(null);
  
  // Mock History Data
  const [history, setHistory] = useState<InterviewResult[]>([
    { id: '1', topic: 'React', type: 'Skill', score: 85, date: '2 days ago', label: 'Very Good' },
    { id: '2', topic: 'Frontend', type: 'Role', score: 60, date: '1 week ago', label: 'Good' },
    { id: '3', topic: 'JavaScript', type: 'Skill', score: 90, date: '2 weeks ago', label: 'Excellent' },
  ]);

  const savedRoadmaps = [
    { id: 'Frontend', progress: 68, lastUpdated: '2 hours ago', icon: Layers },
    { id: 'Backend', progress: 35, lastUpdated: '1 day ago', icon: Terminal },
    { id: 'DevOps', progress: 10, lastUpdated: '3 days ago', icon: Cpu },
  ];

  const interviewSkills = ['React', 'JavaScript', 'Python', 'SQL', 'Docker', 'AWS'];
  const interviewRoles = ['Frontend', 'Backend', 'Full Stack', 'DevOps', 'Data Scientist'];

  // --- ACTIONS ---

  const startInterview = async (topic: string, type: 'Skill' | 'Role') => {
    setLoadingInterview(true);
    setInterviewConfig({ topic, type });
    const questions = await generateInterviewQuestions(topic, type);
    setCurrentQuestions(questions);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setLoadingInterview(false);
    setInterviewMode(true);
  };

  const handleAnswer = (answer: string) => {
    setUserAnswers(prev => ({ ...prev, [currentQuestions[currentQuestionIndex].id]: answer }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishInterview();
    }
  };

  const finishInterview = () => {
    // Scoring Logic
    let score = 0;
    const total = currentQuestions.length;
    
    currentQuestions.forEach(q => {
      if (q.type === 'MCQ') {
        if (userAnswers[q.id] === q.correctAnswer) score += 20; // 5 questions * 20 = 100 max
      } else {
        // For MVP, give points if they wrote something (> 10 chars)
        if (userAnswers[q.id] && userAnswers[q.id].length > 10) score += 20; 
      }
    });

    let label = 'Bad';
    if (score >= 90) label = 'Excellent';
    else if (score >= 70) label = 'Very Good';
    else if (score >= 40) label = 'Good';

    const newResult: InterviewResult = {
      id: Date.now().toString(),
      topic: interviewConfig?.topic || 'Unknown',
      type: interviewConfig?.type || 'Skill',
      score,
      date: 'Just now',
      label
    };

    setHistory(prev => [newResult, ...prev]);
    setInterviewMode(false);
  };

  // --- RENDER INTERVIEW OVERLAY ---
  if (interviewMode && currentQuestions.length > 0) {
    const q = currentQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;

    return (
      <div className="fixed inset-0 bg-slate-900/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
             <div>
               <h3 className="text-lg font-bold text-slate-900">
                 {interviewConfig?.topic} Interview
               </h3>
               <div className="text-xs font-medium text-slate-500">Question {currentQuestionIndex + 1} of {currentQuestions.length}</div>
             </div>
             <button onClick={() => setInterviewMode(false)} className="text-slate-400 hover:text-slate-600">
               <X className="w-6 h-6" />
             </button>
          </div>
          
          {/* Progress Bar */}
          <div className="h-1 bg-slate-100 w-full">
            <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>

          {/* Question Body */}
          <div className="flex-1 p-8 overflow-y-auto">
             <span className={`inline-block px-2 py-1 rounded text-xs font-bold mb-4 ${q.type === 'MCQ' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
               {q.type === 'MCQ' ? 'Multiple Choice' : 'Coding Challenge'}
             </span>
             <h2 className="text-2xl font-medium text-slate-800 mb-8">{q.question}</h2>

             {q.type === 'MCQ' && q.options ? (
               <div className="space-y-3">
                 {q.options.map((opt) => (
                   <button
                     key={opt}
                     onClick={() => handleAnswer(opt)}
                     className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                       userAnswers[q.id] === opt 
                       ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm' 
                       : 'border-slate-200 hover:border-emerald-200 hover:bg-slate-50'
                     }`}
                   >
                     {opt}
                   </button>
                 ))}
               </div>
             ) : (
               <div className="space-y-4">
                 <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-slate-300 min-h-[150px]">
                   <textarea 
                     className="w-full h-full bg-transparent border-none focus:outline-none resize-none"
                     placeholder="// Write your code here..."
                     onChange={(e) => handleAnswer(e.target.value)}
                     value={userAnswers[q.id] || ''}
                   />
                 </div>
                 {q.hint && (
                   <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 p-3 rounded-lg">
                     <Sparkles className="w-3 h-3" />
                     Hint: {q.hint}
                   </div>
                 )}
               </div>
             )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-end">
            <button
              onClick={nextQuestion}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-2"
            >
              {currentQuestionIndex === currentQuestions.length - 1 ? 'Finish Interview' : 'Next Question'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER DASHBOARD ---
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      
      {/* 1. Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center sticky top-0 z-30 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
         <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">B</div>
            <span className="font-bold text-slate-900 hidden sm:block">Dashboard</span>
         </div>
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100 uppercase tracking-wide">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
               Live
            </div>
            <button onClick={onLogout} className="text-slate-500 hover:text-red-600 flex items-center gap-2 text-sm font-medium transition-colors">
               <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Log out</span>
            </button>
         </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 2. Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
           <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, Student!</h1>
              <p className="text-slate-500">Your journey to becoming a <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">Frontend Developer</span> is active.</p>
           </div>
           <div className="hidden md:block text-right">
              <div className="text-sm font-medium text-slate-400">Current Streak</div>
              <div className="flex items-center justify-end gap-1 text-orange-500 font-bold text-xl">
                 <Zap className="w-5 h-5 fill-current" /> 3 Days
              </div>
           </div>
        </div>

        {/* 3. Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* --- LEFT COLUMN (Content Focus) --- */}
            <div className="lg:col-span-8 space-y-8">
                
                {/* Hero Card: Up Next */}
                <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl group cursor-pointer" onClick={() => onNavigateToRoadmap('Frontend')}>
                   {/* Background Gradient & Pattern */}
                   <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 z-0"></div>
                   <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                   
                   <div className="relative z-10 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                      <div className="flex-1">
                         <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
                            <PlayCircle className="w-3 h-3" /> Up Next
                         </div>
                         <h2 className="text-3xl font-bold mb-2 text-white">React Hooks</h2>
                         <p className="text-slate-300 mb-6 max-w-md">Deep dive into useEffect, useContext, and custom hooks. This module is essential for modern React development.</p>
                         
                         <div className="flex items-center gap-4">
                            <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-emerald-500/25 flex items-center gap-2">
                               <Play className="w-4 h-4 fill-current" /> Resume Learning
                            </button>
                            <span className="text-sm font-medium text-slate-400">~ 45 min left</span>
                         </div>
                      </div>
                      
                      {/* Icon Graphic */}
                      <div className="hidden md:flex items-center justify-center w-32 h-32 bg-white/5 rounded-2xl border border-white/10 group-hover:scale-105 transition-transform backdrop-blur-sm">
                         <Code className="w-16 h-16 text-emerald-400" />
                      </div>
                   </div>
                </div>

                {/* Saved Roadmaps Grid */}
                <div>
                   <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                         <Layers className="w-5 h-5 text-slate-400" /> My Roadmaps
                      </h3>
                      <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700">View All</button>
                   </div>
                   
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {savedRoadmaps.map((map) => (
                         <div 
                           key={map.id} 
                           onClick={() => onNavigateToRoadmap(map.id)} 
                           className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
                         >
                            <div className="flex justify-between items-start mb-4">
                               <div className="p-3 bg-slate-50 text-slate-600 rounded-xl group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                  <map.icon className="w-6 h-6" />
                               </div>
                               <div className="flex flex-col items-end">
                                  <span className="text-2xl font-bold text-slate-900">{map.progress}%</span>
                               </div>
                            </div>
                            <h4 className="text-lg font-bold text-slate-800 mb-1">{map.id}</h4>
                            <p className="text-xs text-slate-400 flex items-center gap-1 mb-4">
                               <Clock className="w-3 h-3" /> Updated {map.lastUpdated}
                            </p>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                               <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${map.progress}%` }}></div>
                            </div>
                         </div>
                      ))}
                      
                      {/* Add New Roadmap Button */}
                      <div 
                        onClick={() => onNavigateToRoadmap('')}
                        className="bg-slate-50 p-5 rounded-2xl border border-dashed border-slate-300 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-emerald-600 min-h-[180px]"
                      >
                         <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                            <Layers className="w-6 h-6" />
                         </div>
                         <span className="font-bold text-sm">Explore New Path</span>
                      </div>
                   </div>
                </div>

                {/* Practice Area */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                   <div className="flex items-center justify-between mb-6">
                      <div>
                         <h3 className="text-lg font-bold text-slate-900">Quick Practice</h3>
                         <p className="text-sm text-slate-500">Keep your skills sharp with AI-generated questions.</p>
                      </div>
                      {loadingInterview && (
                         <div className="flex items-center gap-2 text-sm text-purple-600 font-medium">
                            <RefreshCw className="w-4 h-4 animate-spin" /> Generating...
                         </div>
                      )}
                   </div>
                   
                   <div className="space-y-4">
                      <div>
                         <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Skills</span>
                         <div className="flex flex-wrap gap-2">
                            {interviewSkills.map(skill => (
                               <button 
                                  key={skill}
                                  onClick={() => startInterview(skill, 'Skill')}
                                  disabled={loadingInterview}
                                  className="px-4 py-2 bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-200 text-slate-700 hover:text-purple-700 rounded-lg text-sm font-medium transition-all"
                               >
                                  {skill}
                               </button>
                            ))}
                         </div>
                      </div>
                      <div>
                         <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Role-Based</span>
                         <div className="flex flex-wrap gap-2">
                            {interviewRoles.map(role => (
                               <button 
                                  key={role}
                                  onClick={() => startInterview(role, 'Role')}
                                  disabled={loadingInterview}
                                  className="px-4 py-2 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-slate-700 hover:text-blue-700 rounded-lg text-sm font-medium transition-all shadow-sm"
                               >
                                  {role}
                               </button>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>

            </div>

            {/* --- RIGHT COLUMN (Stats & Sidebar) --- */}
            <div className="lg:col-span-4 space-y-8">
               
               {/* Redesigned Progress Card */}
               <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center">
                   <h3 className="font-bold text-slate-800 mb-6 self-start flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-emerald-500" /> Overall Progress
                   </h3>
                   
                   <div className="relative w-48 h-48 mb-6">
                       <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                           {/* Background Circle */}
                           <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                           {/* Progress Circle */}
                           <circle 
                             cx="50" cy="50" r="45" fill="none" 
                             stroke="#10b981" strokeWidth="8" 
                             strokeDasharray="282.7" 
                             strokeDashoffset={282.7 * (1 - 0.68)} 
                             strokeLinecap="round"
                             className="drop-shadow-lg"
                           />
                       </svg>
                       <div className="absolute inset-0 flex flex-col items-center justify-center">
                           <span className="text-5xl font-black text-slate-900 tracking-tight">68%</span>
                           <span className="text-xs font-bold text-slate-400 uppercase mt-1 tracking-widest">Completed</span>
                       </div>
                   </div>
                   
                   <div className="w-full grid grid-cols-2 gap-4 text-center">
                        <div className="p-3 bg-slate-50 rounded-xl">
                            <div className="text-2xl font-bold text-slate-900">12</div>
                            <div className="text-xs text-slate-500 font-medium uppercase">Mastered</div>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl">
                            <div className="text-2xl font-bold text-slate-900">44</div>
                            <div className="text-xs text-slate-500 font-medium uppercase">Total Skills</div>
                        </div>
                   </div>
               </div>

               {/* Interview Readiness */}
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        <Award className="w-5 h-5 text-purple-500" /> Readiness
                     </h3>
                     <span className="text-xs font-bold px-2 py-1 bg-purple-100 text-purple-700 rounded-lg">High</span>
                  </div>
                  
                  <div className="space-y-4">
                     <div>
                        <div className="flex justify-between text-xs font-medium mb-1.5">
                           <span className="text-slate-600">React Core</span>
                           <span className="text-slate-900">85%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                           <div className="bg-purple-500 h-full rounded-full" style={{ width: '85%' }}></div>
                        </div>
                     </div>
                     <div>
                        <div className="flex justify-between text-xs font-medium mb-1.5">
                           <span className="text-slate-600">JavaScript</span>
                           <span className="text-slate-900">92%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                           <div className="bg-purple-500 h-full rounded-full" style={{ width: '92%' }}></div>
                        </div>
                     </div>
                     <div>
                        <div className="flex justify-between text-xs font-medium mb-1.5">
                           <span className="text-slate-600">System Design</span>
                           <span className="text-slate-900">45%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                           <div className="bg-slate-300 h-full rounded-full" style={{ width: '45%' }}></div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Recent Activity */}
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider text-slate-400">Activity Log</h3>
                  <div className="space-y-4 relative">
                     {/* Vertical Line */}
                     <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-100"></div>
                     
                     {history.map((item) => (
                        <div key={item.id} className="relative pl-8">
                           <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center ${item.score >= 80 ? 'bg-emerald-500' : 'bg-amber-400'}`}>
                           </div>
                           <div className="text-sm font-bold text-slate-800">{item.topic} Quiz</div>
                           <div className="text-xs text-slate-500 mb-1">{item.date} • Score: {item.score}%</div>
                        </div>
                     ))}
                  </div>
                  <button className="w-full mt-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                     View Full History
                  </button>
               </div>

            </div>

        </div>

        {/* Footer */}
        <div className="mt-16 text-center pb-8 border-t border-slate-200 pt-8">
           <p className="text-slate-400 font-medium text-sm">© 2025-26 Budding Blooms. Keep growing.</p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;