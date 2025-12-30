import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Loader2, Sparkles, ChevronRight, Check, Flag,
  Layout, Server, Layers, Terminal, Shield, Cpu, Brain, Smartphone, Link, Star,
  Lock, Trophy, User, LogIn, ArrowRight, Database, Code, Globe, Box, Hash, Feather, Cloud,
  X, ExternalLink, PlayCircle, BookOpen, MessageSquare, ChevronDown
} from 'lucide-react';

interface RoadmapGeneratorProps {
  onBack: () => void;
  initialRoleId?: string | null;
}

// Extended ROLES data with specific skills for checklist
const ROLES = [
  // --- Original Roles ---
  { 
    id: 'Frontend', 
    label: 'Frontend', 
    icon: Layout,
    skills: [
      'Internet Fundamentals (HTTP, DNS, Hosting)',
      'HTML (Semantic, Forms, A11y, SEO)',
      'CSS (Flexbox, Grid, Responsive)',
      'Tailwind CSS & Preprocessors',
      'JavaScript (ES6+, DOM, Fetch)',
      'Git & GitHub/GitLab',
      'Package Managers (npm, yarn)',
      'React',
      'Vue.js',
      'Angular',
      'Svelte/Solid/Qwik',
      'Build Tools (Vite, Webpack)',
      'Code Quality (ESLint, Prettier)',
      'Unit Testing (Vitest, Jest)',
      'E2E Testing (Playwright, Cypress)',
      'Auth & Security (JWT, OAuth, CORS)',
      'TypeScript',
      'Web Components & Shadow DOM',
      'SSR (Next.js, Nuxt, SvelteKit)',
      'GraphQL (Apollo, Relay)',
      'Static Site Generators (Astro, Eleventy)',
      'Performance Optimization (Lighthouse)',
      'Browser APIs (Storage, Workers)',
      'Progressive Web Apps (PWA)',
      'Mobile/Desktop (React Native, Electron)'
    ]
  },
  { 
    id: 'Backend', 
    label: 'Backend', 
    icon: Server,
    skills: ['Node.js', 'Python', 'Java', 'SQL (Postgres/MySQL)', 'REST APIs', 'Authentication (JWT)', 'Docker', 'Redis', 'Message Queues', 'Microservices']
  },
  { 
    id: 'Full Stack', 
    label: 'Full Stack', 
    icon: Layers,
    skills: ['Frontend Frameworks', 'Backend Logic', 'Database Design', 'API Development', 'DevOps Basics', 'Version Control', 'System Design', 'Testing']
  },
  { 
    id: 'DevOps', 
    label: 'DevOps', 
    icon: Terminal,
    skills: ['Linux Basics', 'AWS/Azure', 'Docker/Kubernetes', 'CI/CD Pipelines', 'Terraform', 'Scripting (Bash/Python)', 'Monitoring Tools', 'Networking']
  },
  { 
    id: 'DevSecOps', 
    label: 'DevSecOps', 
    icon: Shield,
    skills: ['Security Protocols', 'Compliance Standards', 'Vulnerability Scanning', 'Cloud Security', 'CI/CD Security', 'Automation', 'Ethical Hacking']
  },
  { 
    id: 'AI Engineer', 
    label: 'AI Engineer', 
    icon: Cpu,
    skills: ['Python', 'TensorFlow/PyTorch', 'NLP', 'Computer Vision', 'Model Deployment', 'Cloud AI Services', 'Mathematics', 'Data Pipelines']
  },
  { 
    id: 'AI and Data Scientist', 
    label: 'AI & Data Scientist', 
    icon: Brain,
    skills: ['Python', 'Statistics & Probability', 'Machine Learning Algos', 'Data Wrangling', 'Jupyter Notebooks', 'Big Data Tools', 'Visualization']
  },
  { 
    id: 'Android', 
    label: 'Android', 
    icon: Smartphone,
    skills: ['Kotlin', 'Java', 'Android SDK', 'Jetpack Compose', 'Material Design', 'Mobile Architecture', 'Play Store Deployment']
  },
  { 
    id: 'iOS', 
    label: 'iOS', 
    icon: Smartphone,
    skills: ['Swift', 'SwiftUI', 'UIKit', 'Xcode', 'Core Data', 'App Store Guidelines', 'CocoaPods']
  },
  { 
    id: 'Blockchain', 
    label: 'Blockchain', 
    icon: Link,
    skills: ['Solidity', 'Smart Contracts', 'Web3.js', 'Cryptography', 'Ethereum', 'Consensus Mechanisms', 'DeFi Basics']
  },

  // --- New Skills (Acting as Roles for the Generator) ---
  { id: 'SQL', label: 'SQL', icon: Database, skills: ['Basic Queries (SELECT, WHERE)', 'Joins (INNER, LEFT, RIGHT)', 'Aggregations (GROUP BY)', 'Subqueries', 'Normalization', 'Indexes', 'Stored Procedures', 'Transactions'] },
  { id: 'React', label: 'React', icon: Code, skills: ['JSX & Components', 'Props & State', 'Hooks (useState, useEffect)', 'Context API', 'React Router', 'Redux/Zustand', 'Custom Hooks', 'Performance Optimization'] },
  { id: 'Vue', label: 'Vue', icon: Code, skills: ['Directives', 'Components & Props', 'Computed & Watchers', 'Lifecycle Hooks', 'Vue Router', 'Pinia/Vuex', 'Composition API', 'Slots'] },
  { id: 'Angular', label: 'Angular', icon: Code, skills: ['Components & Templates', 'Dependency Injection', 'Services', 'Routing', 'RxJS Observables', 'Forms (Reactive/Template)', 'Modules', 'Directives'] },
  { id: 'JavaScript', label: 'JavaScript', icon: Code, skills: ['Variables & Types', 'Functions (Arrow, HOF)', 'DOM Manipulation', 'Events', 'ES6+ Features', 'Promises & Async/Await', 'Closures', 'Prototypes'] },
  { id: 'Python', label: 'Python', icon: Code, skills: ['Syntax & Variables', 'Data Structures (Lists, Dicts)', 'Loops & Conditionals', 'Functions & Modules', 'OOP Basics', 'File Handling', 'PIP & VirtualEnv', 'Error Handling'] },
  { id: 'Java', label: 'Java', icon: Code, skills: ['Syntax & Types', 'OOP Principles', 'Collections Framework', 'Exception Handling', 'Streams API', 'Multithreading', 'File I/O', 'JVM Basics'] },
  { id: 'API Design', label: 'API Design', icon: Globe, skills: ['REST Principles', 'HTTP Methods & Status Codes', 'JSON/XML', 'Authentication (Auth/JWT)', 'Versioning', 'Pagination', 'Documentation (Swagger)', 'Rate Limiting'] },
  { id: 'C++', label: 'C++', icon: Code, skills: ['Syntax & Basics', 'Pointers & References', 'Memory Management', 'OOP', 'STL (Vectors, Maps)', 'Templates', 'File I/O', 'Smart Pointers'] },
  { id: 'Flutter', label: 'Flutter', icon: Smartphone, skills: ['Dart Basics', 'Widget Tree', 'Stateless vs Stateful', 'Layouts', 'Navigation', 'State Management (Provider)', 'API Calls', 'Material Design'] },
  { id: 'Rust', label: 'Rust', icon: Hash, skills: ['Ownership & Borrowing', 'Lifetimes', 'Structs & Enums', 'Pattern Matching', 'Traits', 'Error Handling', 'Concurrency', 'Cargo & Crates'] },
  { id: 'Go', label: 'Go', icon: Code, skills: ['Syntax & Packages', 'Goroutines', 'Channels', 'Interfaces', 'Structs', 'Error Handling', 'Go Modules', 'Defer/Panic/Recover'] },
  { id: 'React Native', label: 'React Native', icon: Smartphone, skills: ['Core Components', 'Flexbox Layout', 'Navigation', 'State Management', 'Native Modules', 'API Integration', 'Device APIs', 'Deployment'] },
  { id: 'Linux', label: 'Linux', icon: Terminal, skills: ['File System Hierarchy', 'Basic Commands (ls, cd, mv)', 'Permissions (chmod, chown)', 'Bash Scripting', 'Process Management', 'Package Management', 'Networking Basics', 'SSH'] },
  { id: 'Docker', label: 'Docker', icon: Box, skills: ['Container Concepts', 'Images vs Containers', 'Dockerfile Instructions', 'Docker Compose', 'Volumes & Storage', 'Networking', 'Docker Hub', 'Multi-stage Builds'] },
  { id: 'Swift', label: 'Swift', icon: Code, skills: ['Syntax & Basics', 'Optionals', 'Structs vs Classes', 'Protocols', 'Closures', 'UIKit/SwiftUI Basics', 'ARC (Memory)', 'Concurrency'] },
  { id: 'Laravel', label: 'Laravel', icon: Code, skills: ['MVC Architecture', 'Routing', 'Middleware', 'Eloquent ORM', 'Migrations', 'Blade Templates', 'Authentication', 'Artisan CLI'] },
  { id: 'Kotlin', label: 'Kotlin', icon: Code, skills: ['Syntax Basics', 'Null Safety', 'Classes & Objects', 'Extension Functions', 'Coroutines', 'Collections', 'Lambdas', 'Android Basics'] },
  { id: 'C#', label: 'C#', icon: Hash, skills: ['Syntax & Types', 'OOP', 'LINQ', 'Async/Await', 'Generics', 'Delegates & Events', 'Exception Handling', '.NET Core Basics'] },
];

const FIXED_QUOTE = "Consistency is the key to mastery.";

// Helper to generate description text
const getSkillDescription = (skill: string) => {
  return `${skill} is a fundamental concept or tool in this roadmap. It allows developers to build robust applications by managing data, state, or user interfaces efficiently. Mastering ${skill} involves understanding its core syntax, best practices, and how it integrates with other technologies in the ecosystem. It is widely used in the industry and is critical for building scalable solutions.`;
};

const RoadmapGenerator: React.FC<RoadmapGeneratorProps> = ({ onBack, initialRoleId }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  
  // State for Step 1
  const [selectedRole, setSelectedRole] = useState<string | null>(initialRoleId || null);
  
  // State for Step 2
  const [skillRatings, setSkillRatings] = useState<Record<string, number>>({});
  const [otherContext, setOtherContext] = useState('');
  
  // State for Step 3
  const [loading, setLoading] = useState(false);
  const [completedSkills, setCompletedSkills] = useState<Set<string>>(new Set());
  const [selectedSkillForSidebar, setSelectedSkillForSidebar] = useState<string | null>(null);

  // Handle Initial Prop Effect
  useEffect(() => {
    if (initialRoleId) {
      setSelectedRole(initialRoleId);
      setStep(2);
      setSkillRatings({});
      setOtherContext('');
      window.scrollTo(0, 0);
    }
  }, [initialRoleId]);

  const getRoleData = (roleId: string | null) => ROLES.find(r => r.id === roleId);

  const handleNextStep = () => {
    if (step === 1 && selectedRole) {
      setStep(2);
      setSkillRatings({});
      setOtherContext('');
      window.scrollTo(0, 0);
    }
  };

  const handleRoleDoubleClick = (roleId: string) => {
    setSelectedRole(roleId);
    setStep(2);
    setSkillRatings({});
    setOtherContext('');
    window.scrollTo(0, 0);
  };

  const handleBackStep = () => {
    if (step === 2) {
      // If we started with an initial role, going back should essentially go "home"
      if (initialRoleId) {
        onBack();
      } else {
        setStep(1);
      }
    } else {
      onBack();
    }
  };

  const handleRateSkill = (skillName: string, rating: number) => {
    setSkillRatings(prev => ({
      ...prev,
      [skillName]: rating
    }));
  };

  const handleSubmit = async () => {
    if (!selectedRole) return;
    setLoading(true);
    
    // Simulate API delay for UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Initialize completed skills based on ratings (Rating >= 3 means proficient enough to check off)
    const initialCompleted = new Set<string>();
    Object.entries(skillRatings).forEach(([skill, rating]) => {
      if (rating >= 3) {
        initialCompleted.add(skill);
      }
    });
    setCompletedSkills(initialCompleted);
    
    setLoading(false);
    setStep(3);
    window.scrollTo(0, 0);
  };

  const toggleSkillCompletion = (skill: string) => {
    const next = new Set(completedSkills);
    if (next.has(skill)) {
      next.delete(skill);
    } else {
      next.add(skill);
    }
    setCompletedSkills(next);
  };

  const currentRoleData = getRoleData(selectedRole);
  const totalSkills = currentRoleData?.skills.length || 1;
  const progressPercentage = Math.round((completedSkills.size / totalSkills) * 100);

  // Circular Progress Component
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  const RATING_LABELS = ['Beginner', 'Elementary', 'Intermediate', 'Proficient', 'Advanced'];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-4 sticky top-0 z-30 shadow-sm">
        <button onClick={step === 1 ? onBack : handleBackStep} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
           <h1 className="text-xl font-bold text-slate-800">
             {step === 3 ? `Roadmap: ${selectedRole}` : 'Create Your Roadmap'}
           </h1>
           <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mt-0.5">
             <button 
               onClick={() => setStep(1)}
               disabled={step === 1}
               className={`transition-colors ${step >= 1 ? "text-emerald-600 hover:text-emerald-700" : "hover:text-slate-700"}`}
             >
               Home
             </button>
             <ChevronRight className="w-3 h-3" />
             <button 
               onClick={() => step > 2 ? setStep(2) : null}
               disabled={step <= 2}
               className={`transition-colors ${step >= 2 ? "text-emerald-600 hover:text-emerald-700" : ""} ${step > 2 ? "cursor-pointer" : "cursor-default"}`}
             >
               Skill
             </button>
             <ChevronRight className="w-3 h-3" />
             <span className={step >= 3 ? "text-emerald-600" : ""}>Roadmap</span>
           </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 pb-24 relative">
        
        {/* STEP 1: SELECT ROLE */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
            <div className="text-center md:text-left mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Select your Target</h2>
              <p className="text-slate-600 mt-2">Which career path or skill do you want to pursue?</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {ROLES.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    onDoubleClick={() => handleRoleDoubleClick(role.id)}
                    className={`
                      flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all duration-200 text-center
                      ${isSelected 
                        ? 'border-emerald-500 bg-emerald-50/50 text-emerald-700 shadow-md scale-[1.02]' 
                        : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:bg-slate-50 hover:shadow-sm'
                      }
                    `}
                  >
                    <div className={`p-3 rounded-full ${isSelected ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                      <Icon className={`w-6 h-6 ${isSelected ? 'text-emerald-600' : 'text-slate-500'}`} />
                    </div>
                    <span className="font-semibold text-sm">{role.label}</span>
                  </button>
                );
              })}
            </div>
            
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 md:relative md:bg-transparent md:border-0 md:p-0 md:mt-8 flex justify-end">
               <button
                 onClick={handleNextStep}
                 disabled={!selectedRole}
                 className="w-full md:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
               >
                 Next: Assess Skills
                 <ChevronRight className="w-5 h-5" />
               </button>
            </div>
          </div>
        )}

        {/* STEP 2: ENTER SKILLS */}
        {step === 2 && currentRoleData && (
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-right-8 duration-500">
             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8 text-left">
                <div className="flex items-center gap-3 mb-3">
                    <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                    Target: {selectedRole}
                    </span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900">Assess Your Knowledge</h2>
                <p className="text-slate-600 mt-2 max-w-lg">
                  Rate yourself on each topic to let us personalize your roadmap.
                </p>
             </div>

             <div className="space-y-4">
                {currentRoleData.skills.map((skill, index) => {
                  const rating = skillRatings[skill] || 0;
                  return (
                    <div key={skill} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-500">
                          {index + 1}
                        </div>
                        <span className="font-medium text-slate-800">{skill}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleRateSkill(skill, star)}
                            className={`p-1.5 transition-all ${rating >= star ? 'text-yellow-400' : 'text-slate-200 hover:text-yellow-200'}`}
                            title={RATING_LABELS[star-1]}
                          >
                            <Star className={`w-5 h-5 ${rating >= star ? 'fill-current' : ''}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
             </div>

             <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 pb-8">
                 <div className="hidden md:block text-slate-400 italic font-medium text-sm">
                    "Every expert was once a beginner."
                 </div>
                 <button
                   onClick={handleSubmit}
                   disabled={loading}
                   className="w-full md:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                 >
                   {loading ? (
                     <>
                       <Loader2 className="w-5 h-5 animate-spin" />
                       Generating...
                     </>
                   ) : (
                     <>
                       <Sparkles className="w-5 h-5" />
                       Generate Roadmap
                     </>
                   )}
                 </button>
             </div>
          </div>
        )}

        {/* STEP 3: VISUAL ROADMAP PAGE */}
        {step === 3 && currentRoleData && (
          <div className="grid lg:grid-cols-12 gap-8 animate-in fade-in duration-500">
            
            {/* Left Sidebar: Progress & Actions & Motivation */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                
                {/* Progress Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center text-center">
                  <h3 className="text-lg font-bold text-slate-800 mb-6">Readiness Score</h3>
                  
                  <div className="relative w-40 h-40 mb-6">
                    {/* SVG Circle Progress */}
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="50%" cy="50%" r={radius}
                        stroke="currentColor" strokeWidth="8" fill="transparent"
                        className="text-slate-100"
                      />
                      <circle
                        cx="50%" cy="50%" r={radius}
                        stroke="currentColor" strokeWidth="8" fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="text-emerald-500 transition-all duration-1000 ease-out"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-4xl font-bold text-emerald-600">{progressPercentage}%</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-500 mb-6">
                    {progressPercentage < 30 ? "Good start! Keep learning." : 
                     progressPercentage < 70 ? "You're making great progress!" : 
                     "You are almost industry ready!"}
                  </p>

                  {/* Save Progress Card */}
                  <div className="w-full bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="text-sm font-medium text-slate-700 mb-3">Save your progress?</p>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="px-3 py-2 text-xs font-bold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1">
                        <LogIn className="w-3 h-3" /> Login
                      </button>
                      <button className="px-3 py-2 text-xs font-bold text-emerald-700 bg-emerald-100 rounded-lg hover:bg-emerald-200 transition-colors flex items-center justify-center gap-1">
                        <User className="w-3 h-3" /> Sign Up
                      </button>
                    </div>
                  </div>
                </div>

                {/* Motivation Card */}
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-md">
                  <Sparkles className="w-6 h-6 mb-3 opacity-80" />
                  <p className="font-medium text-lg italic leading-relaxed">
                    "{FIXED_QUOTE}"
                  </p>
                </div>

              </div>
            </div>

            {/* Main Content: Vertical Roadmap */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                      <Flag className="w-6 h-6 text-emerald-500" />
                      Your Learning Path
                    </h2>
                    <p className="text-slate-500 mt-1">Check off items as you master them.</p>
                  </div>
                  <button onClick={() => window.print()} className="text-slate-400 hover:text-slate-600">
                    <ArrowLeft className="w-5 h-5 rotate-180" />
                  </button>
                </div>

                <div className="relative pl-6 md:pl-8 space-y-8">
                  
                  {currentRoleData.skills.map((skill, index) => {
                    const isCompleted = completedSkills.has(skill);
                    const isNext = !isCompleted && (index === 0 || completedSkills.has(currentRoleData.skills[index - 1]));
                    
                    // Insert Project Milestone every 4 skills
                    const showProject = (index + 1) % 4 === 0;
                    const isLastSkill = index === currentRoleData.skills.length - 1;

                    return (
                      <React.Fragment key={skill}>
                        {/* Skill Node */}
                        <div className="relative pl-10 md:pl-12 group">
                          
                          {/* Connection Line */}
                          {(!isLastSkill || showProject) && (
                            <div className="absolute left-[15px] top-5 h-[calc(100%+4rem)] w-0.5 bg-slate-100 -z-10" />
                          )}

                          {/* Node Dot/Check - Acts as COMPLETE button */}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSkillCompletion(skill);
                            }}
                            className={`
                              absolute left-0 top-1 w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-300 bg-white cursor-pointer hover:scale-110 hover:shadow-sm
                              ${isCompleted 
                                ? 'border-emerald-500 bg-emerald-500 text-white' 
                                : isNext ? 'border-emerald-400 ring-4 ring-emerald-50 text-emerald-400' : 'border-slate-200 text-slate-300'}
                            `}
                            title="Click to complete"
                          >
                            {isCompleted ? <Check className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                          </button>

                          {/* Content - Acts as INFO button */}
                          <div 
                            onClick={() => setSelectedSkillForSidebar(skill)}
                            className={`
                              p-4 rounded-xl border transition-all cursor-pointer hover:border-emerald-400 hover:shadow-md
                              ${selectedSkillForSidebar === skill ? 'ring-2 ring-emerald-500 ring-offset-2' : ''}
                              ${isCompleted 
                                ? 'bg-emerald-50/30 border-emerald-100 opacity-75' 
                                : isNext ? 'bg-white border-emerald-500 shadow-md scale-[1.01]' : 'bg-white border-slate-100 text-slate-500'}
                            `}
                          >
                            <h4 className={`font-bold ${isCompleted ? 'text-emerald-800 line-through decoration-emerald-300' : 'text-slate-800'}`}>
                              {skill}
                            </h4>
                            <p className="text-xs mt-1 text-slate-400">
                              {isCompleted ? 'Completed' : isNext ? 'Recommended Next Step' : 'Locked'}
                            </p>
                          </div>
                        </div>

                        {/* Project Milestone Node */}
                        {showProject && (
                          <div className="relative pl-10 md:pl-12 py-4">
                            
                            {/* Connection Line */}
                            {!isLastSkill && (
                              <div className="absolute left-[17px] top-8 h-[calc(100%+4rem)] w-0.5 bg-slate-100 -z-10" />
                            )}

                            <div className="absolute left-[2px] top-4 w-8 h-8 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center z-10">
                              <Trophy className="w-4 h-4 text-amber-600" />
                            </div>
                            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-100">
                              <h4 className="font-bold text-amber-800 flex items-center gap-2">
                                <Sparkles className="w-4 h-4" /> Milestone Project
                              </h4>
                              <p className="text-sm text-amber-700 mt-1">
                                Build a small project using {currentRoleData.skills[index]} and previous skills to solidify your knowledge.
                              </p>
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                  
                  {/* Distinct End Bar */}
                  <div className="relative pl-10 md:pl-12 pt-4">
                      <div className="bg-slate-900 text-white py-4 px-6 rounded-full shadow-xl text-center font-semibold tracking-wide flex items-center justify-center gap-3 w-fit">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          Practice turns effort into mastery.
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      </div>
                  </div>

                </div>
              </div>

              {/* Related Roles / Coding Interview */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Explore Paths</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {ROLES.filter(r => r.id !== selectedRole).slice(0, 3).map(role => (
                     <div key={role.id} onClick={() => handleRoleDoubleClick(role.id)} className="p-4 bg-white border border-slate-200 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group">
                        <div className="flex items-center gap-3 mb-2">
                           <role.icon className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                           <span className="font-bold text-slate-800">{role.label}</span>
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-1 group-hover:text-emerald-600">
                          View Roadmap <ArrowRight className="w-3 h-3" />
                        </div>
                     </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* SKILL DETAIL SIDEBAR OVERLAY */}
      {selectedSkillForSidebar && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 z-[40]"
            onClick={() => setSelectedSkillForSidebar(null)}
          />
          
          {/* Sidebar Drawer */}
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-[450px] bg-[#f0f2f5] z-[50] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            
            {/* Top Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-transparent">
               <div className="flex items-center gap-2">
                 <button className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white rounded-md text-xs font-medium hover:bg-slate-800 transition-colors">
                   <Globe className="w-3.5 h-3.5" />
                   Resources
                 </button>
                 <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-md text-xs font-medium hover:bg-slate-50 transition-colors">
                   <Sparkles className="w-3.5 h-3.5" />
                   AI Tutor
                 </button>
               </div>
               
               <div className="flex items-center gap-2">
                  <button 
                    onClick={() => toggleSkillCompletion(selectedSkillForSidebar)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-slate-200/60 rounded-full text-xs font-medium text-slate-600 hover:bg-slate-200"
                  >
                    <div className={`w-2 h-2 rounded-full ${completedSkills.has(selectedSkillForSidebar) ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                    {completedSkills.has(selectedSkillForSidebar) ? 'Completed' : 'Pending'}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={() => setSelectedSkillForSidebar(null)}
                    className="p-1.5 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
               </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              
              <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">
                {selectedSkillForSidebar}
              </h2>

              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                {getSkillDescription(selectedSkillForSidebar)}
              </p>

              {/* Free Resources Section */}
              <div className="mb-8">
                 <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                      <Star className="w-3 h-3 fill-emerald-700" />
                      Free Resources
                    </span>
                    <div className="h-px bg-slate-200 flex-1"></div>
                 </div>

                 <div className="space-y-2">
                    <a href="#" className="flex items-center gap-3 p-2 hover:bg-white rounded-lg transition-colors group">
                       <span className="px-2 py-1 rounded bg-slate-600 text-white text-[10px] font-bold uppercase tracking-wider">Official</span>
                       <span className="text-slate-700 font-medium underline decoration-slate-300 underline-offset-4 group-hover:decoration-emerald-400">
                         {selectedSkillForSidebar} Website
                       </span>
                       <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                    
                    <a href="#" className="flex items-center gap-3 p-2 hover:bg-white rounded-lg transition-colors group">
                       <span className="px-2 py-1 rounded bg-slate-600 text-white text-[10px] font-bold uppercase tracking-wider">Official</span>
                       <span className="text-slate-700 font-medium underline decoration-slate-300 underline-offset-4 group-hover:decoration-emerald-400">
                         {selectedSkillForSidebar} Documentation
                       </span>
                       <BookOpen className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>

                    <a href="#" className="flex items-center gap-3 p-2 hover:bg-white rounded-lg transition-colors group">
                       <span className="px-2 py-1 rounded bg-purple-600 text-white text-[10px] font-bold uppercase tracking-wider">Video</span>
                       <span className="text-slate-700 font-medium underline decoration-slate-300 underline-offset-4 group-hover:decoration-emerald-400">
                         {selectedSkillForSidebar} in 100 Seconds
                       </span>
                       <PlayCircle className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>

                    <a href="#" className="flex items-center gap-3 p-2 hover:bg-white rounded-lg transition-colors group">
                       <span className="px-2 py-1 rounded bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider">Feed</span>
                       <span className="text-slate-700 font-medium underline decoration-slate-300 underline-offset-4 group-hover:decoration-emerald-400">
                         Explore top posts about {selectedSkillForSidebar}
                       </span>
                       <MessageSquare className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                 </div>
              </div>

              {/* Status Section */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200">
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    At this point you should have the expertise of an intermediate level developer. Keep practicing and sharpening your skills.
                  </p>
                  
                  <div className="flex gap-2">
                     <button className="flex-1 py-3 px-4 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors text-sm">
                       Advanced Project Ideas
                     </button>
                     <button className="flex items-center justify-center gap-2 py-3 px-6 bg-slate-800 text-white font-medium rounded-xl hover:bg-slate-900 transition-colors text-sm">
                       <Sparkles className="w-4 h-4 text-emerald-400" />
                       AI Tutor
                     </button>
                  </div>
              </div>

            </div>
            
            {/* Ask AI Sticky Input */}
            <div className="p-4 border-t border-slate-200 bg-white">
               <div className="relative">
                 <input 
                   type="text" 
                   placeholder="Have a question? Ask AI Tutor..." 
                   className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                 />
                 <button className="absolute right-3 top-3 text-slate-400 hover:text-emerald-600">
                   <Sparkles className="w-5 h-5" />
                 </button>
               </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
};

export default RoadmapGenerator;