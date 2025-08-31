import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import {
  GraduationCap,
  ShieldCheck,
  Cloud,
  Code2,
  MapPin,
  Globe,
  Calendar,
  CheckCircle,
  Cpu,
  GitBranch,
  Rocket,
  BarChart3,
  Boxes,
} from 'lucide-react';

const AboutPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vision' | 'expertise' | 'innovation'>('vision');

  // If your photo is at public/images/eskinder.jpg, this will resolve correctly
const photoUrl = '/eskinder.jpg';

  // If you placed it directly under /public, use:
  // const photoUrl = `${import.meta.env.BASE_URL}eskinder.jpg`;

  // ---- Top tabs -------------------------------------------------------------
  const visionContent = {
    description:
      'I believe technology should solve real problems and create meaningful impact. My journey spans cloud engineering, cybersecurity, and AI. I always focused on secure, scalable, and user-centric solutions.',
    technologies: [
      'Cloud Architecture',
      'Zero Trust Security',
      'AI/ML Engineering',
      'DevSecOps',
      'Microservices',
      'Event-Driven Systems',
    ],
  };

  const expertiseContent = {
    description:
      'I design robust cloud infrastructure, implement practical security, and build data-driven apps. I enjoy clean architectures, IaC, and repeatable delivery.',
    technologies: [
      'AWS (re/Start)',
      'Kubernetes',
      'Terraform',
      'Python / TypeScript',
      'React / Node.js',
      'PostgreSQL / MongoDB',
    ],
  };

  const innovationContent = {
    description:
      'I experiment with RAG patterns, reinforcement learning, and modern web stacks—then fold the useful bits into real projects.',
    technologies: [
      'RAG + Vector Search',
      'LLM Tooling',
      'Reinforcement Learning',
      'Dash / Plotly',
      'CI/CD & Observability',
      'Container Security',
    ],
  };

  const tabContent = {
    vision: visionContent,
    expertise: expertiseContent,
    innovation: innovationContent,
  } as const;

  const certifications = [
    {
      title: 'B.S. Computer Science (Summa Cum Laude)',
      institution: 'Southern New Hampshire University',
      icon: GraduationCap,
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Software Engineering Training',
      institution: 'Per Scholas',
      icon: Code2,
      gradient: 'from-emerald-500 to-emerald-600',
    },
    {
      title: 'ISC2 Certified in Cybersecurity',
      institution: 'ISC2',
      icon: ShieldCheck,
      gradient: 'from-red-500 to-rose-600',
    },
    {
      title: 'AWS re/Start Graduate',
      institution: 'Amazon Web Services',
      icon: Cloud,
      gradient: 'from-orange-500 to-amber-600',
    },
  ] as const;

  const achievements = [
    {
      icon: Cpu,
      title: 'RL Agent (DQN)',
      detail: 'Pirate-Intelligent-Agent using Deep Q-Learning (Gym + notebooks).',
      chips: ['Python', 'NumPy', 'RL'],
      gradient: 'from-violet-500 to-purple-600',
    },
    {
      icon: Boxes,
      title: 'Cloud Launchpad (IaC)',
      detail: 'VPC + EC2 scaffolding and AWS DLP Scanner for security experiments.',
      chips: ['AWS', 'Terraform', 'Security'],
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboards',
      detail: 'Animal Shelter analytics app with MongoDB CRUD + interactive charts.',
      chips: ['Dash/Plotly', 'MongoDB', 'Python'],
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      icon: Code2,
      title: 'Android Inventory Manager',
      detail: 'Secure login, CRUD, and low-stock notifications (SQLite).',
      chips: ['Java', 'Android', 'SQLite'],
      gradient: 'from-indigo-500 to-sky-600',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Task Manager (Java)',
      detail: 'Role-based access with AVL tree storage; testing & hardening.',
      chips: ['Java', 'Security', 'AVL'],
      gradient: 'from-pink-500 to-fuchsia-600',
    },
    {
      icon: GitBranch,
      title: '20+ Public Repos',
      detail: 'Full-stack projects, system-design docs, and learning labs.',
      chips: ['TypeScript', 'C++', 'Node.js'],
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      icon: Rocket,
      title: 'Project Delivery',
      detail: 'Multiple class & personal apps shipped with CI/CD habits.',
      chips: ['CI/CD', 'Docker', 'Testing'],
      gradient: 'from-slate-500 to-zinc-600',
    },
  ] as const;

  const current = tabContent[activeTab];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/10">
                <ImageWithFallback
                  src={photoUrl}
                  alt="Eskinder Kassahun"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-green-300">Available for projects</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">Eskinder Kassahun</span>
              </h1>
              <h2 className="text-xl text-gray-300 mb-6">
                Cloud Security Engineer &amp; Full-Stack Developer
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Georgia, GA
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Remote Worldwide
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  4+ Years Experience
                </div>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10">
                <TabsTrigger value="vision" className="data-[state=active]:bg-violet-500 data-[state=active]:text-white">
                  Vision
                </TabsTrigger>
                <TabsTrigger value="expertise" className="data-[state=active]:bg-violet-500 data-[state=active]:text-white">
                  Expertise
                </TabsTrigger>
                <TabsTrigger value="innovation" className="data-[state=active]:bg-violet-500 data-[state=active]:text-white">
                  Innovation
                </TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <TabsContent value={activeTab} className="space-y-6">
                  <p className="text-gray-300 leading-relaxed text-lg">{current.description}</p>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-white">Key Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {current.technologies.map((t) => (
                        <Badge
                          key={t}
                          variant="outline"
                          className="px-3 py-1 bg-white/5 border-white/20 text-gray-300 hover:bg-violet-500/20 hover:border-violet-500/50 transition-all duration-200"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            Selected <span className="gradient-text">Achievements</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((a, i) => {
              const Icon = a.icon;
              return (
                <div
                  key={a.title}
                  className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${a.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-full h-full text-white" />
                  </div>

                  <h3 className="font-bold mb-1 group-hover:text-white">{a.title}</h3>
                  <p className="text-sm text-gray-400 mb-3">{a.detail}</p>

                  <div className="flex flex-wrap gap-2">
                    {a.chips.map((c) => (
                      <Badge key={c} variant="outline" className="px-2 py-0.5 text-xs bg-white/5 border-white/20 text-gray-300">
                        {c}
                      </Badge>
                    ))}
                  </div>

                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${a.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Education & Certifications */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Education &amp; <span className="gradient-text">Certifications</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, i) => {
              const IconComponent = cert.icon;
              return (
                <div
                  key={cert.title}
                  className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/20"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${cert.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-full h-full text-white" />
                  </div>

                  <h3 className="font-bold mb-2 group-hover:text-white transition-colors duration-300">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {cert.institution}
                  </p>

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>

                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${cert.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
