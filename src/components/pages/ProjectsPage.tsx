// src/components/pages/ProjectsPage.tsx
import React, { useMemo, useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ExternalLink, Github, Eye, Filter } from 'lucide-react';
import ProjectCover from '../ui/ProjectCover';

type Category = 'all' | 'frontend' | 'backend' | 'cloud' | 'ai-ml';
type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  categories: Exclude<Category, 'all'>[];
  githubUrl?: string | null;
  liveUrl?: string | null;
  featured?: boolean;
};

const img = (file: string) => `/images/${file}`;

const ProjectsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<Category>('all');

  // ✅ Explicitly typed filters => no 'never' anymore
  const filters: { id: Category; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'cloud', label: 'Cloud' },
    { id: 'ai-ml', label: 'AI/ML' },
  ];

  const projects: readonly Project[] = [
    // ⭐ Featured 1
    {
      id: 'jeopardy-trivia-game',
      title: 'Jeopardy-Style Trivia Game',
      description: 'Web game with categories, scoring, and timer—built with HTML/CSS/JS.',
      image: img('jeopardy-style-trivia-game.jpg'),
      technologies: ['JavaScript', 'HTML', 'CSS'],
      categories: ['frontend'],
      githubUrl: 'https://github.com/Eskinder185/jeopardy-trivia-game',
      featured: true,
    },
    // ⭐ Featured 2
    {
      id: 'neon-meme-machine',
      title: 'Neon Meme Machine',
      description: 'Futuristic meme generator with live text and image export; pure web stack.',
      image: img('neon-meme-machine.jpg'),
      technologies: ['JavaScript', 'HTML', 'CSS'],
      categories: ['frontend'],
      githubUrl: 'https://github.com/Eskinder185/neon-meme-machine',
      featured: true,
    },
    // ⭐ Featured 3
    {
      id: 'tasktracker',
      title: 'TaskTracker (TypeScript)',
      description:
        'Lightweight task management app demonstrating modern TS patterns and component state.',
      image: img('tasktracker.jpg'),
      technologies: ['TypeScript', 'React'],
      categories: ['frontend'],
      githubUrl: 'https://github.com/Eskinder185/tasktracker',
      featured: true,
    },

    {
      id: 'johnnycloud-vpc-ec2',
      title: 'JohnnyCloud – VPC & EC2 Launchpad',
      description:
        'AWS infrastructure baseline: VPC, subnets, routing, security groups, and EC2 bootstrap for app deployment.',
      image: img('johnnycloud-vpc-ec2.jpg'),
      technologies: ['AWS', 'VPC', 'EC2', 'IAM', 'CloudInit'],
      categories: ['cloud', 'backend'],
      githubUrl: 'https://github.com/Eskinder185/cloud-launchpad-vpc-ec2',
    },
    {
      id: 'pirate-intelligent-agent',
      title: 'Pirate Intelligent Agent (DQN)',
      description:
        'Reinforcement learning agent solving a grid world using Deep Q-Learning; notebook + report.',
      image: img('pirate-intelligent-agent.jpg'),
      technologies: ['Python', 'RL', 'NumPy', 'Jupyter'],
      categories: ['ai-ml', 'backend'],
      githubUrl: 'https://github.com/Eskinder185/Pirate-Intelligent-Agent',
    },
    {
      id: 'animal-shelter-analytics',
      title: 'Animal Shelter Analytics (Dash)',
      description:
        'Interactive dashboard with CRUD over MongoDB and charts for adoption trends and KPIs.',
      image: img('animal-shelter-analytics.jpg'),
      technologies: ['Python', 'Dash/Plotly', 'MongoDB'],
      categories: ['frontend', 'backend'],
      githubUrl: 'https://github.com/Eskinder185/animal-shelter-analytics',
    },
    {
      id: 'android-inventory-manager',
      title: 'Android Inventory Manager',
      description:
        'Mobile app with secure login, real-time stock levels, CRUD, and low-stock notifications.',
      image: img('android-inventory-manager.jpg'),
      technologies: ['Java', 'Android', 'SQLite'],
      categories: ['frontend', 'backend'],
      githubUrl: 'https://github.com/Eskinder185/android-inventory-manager',
    },
    {
      id: 'travel-portal-express',
      title: 'Travel Portal (Node/Express)',
      description: 'Class project with views, routes, and controllers for a travel booking portal.',
      image: img('travel-portal-express.jpg'),
      technologies: ['Node.js', 'Express', 'JavaScript'],
      categories: ['backend', 'frontend'],
      githubUrl: 'https://github.com/Eskinder185/travel-portal-express',
    },
    {
      id: 'weather',
      title: 'Weather App (Python)',
      description:
        'CLI/mini-service for fetching and parsing weather data; clean functions and error handling.',
      image: img('weather-app-python.jpg'),
      technologies: ['Python'],
      categories: ['backend'],
      githubUrl: 'https://github.com/Eskinder185/weather',
    },
    {
      id: 'java-security-hardening-artemis',
      title: 'Java Security Hardening – Artemis',
      description:
        'TLS configuration, SHA-256 hashing, and OWASP-aligned static analysis to reduce attack surface.',
      image: img('java-security-hardening-artemis.jpg'),
      technologies: ['Java', 'Security', 'TLS', 'OWASP'],
      categories: ['backend'],
      githubUrl: 'https://github.com/Eskinder185/java-security-hardening-artemis',
    },
    {
      id: 'cpp-data-structures-portfolio',
      title: 'C++ Data Structures Portfolio',
      description:
        'Course planner (map for fast lookup) and bid manager (linked list) with clean abstractions.',
      image: img('cpp-data-structures-portfolio.jpg'),
      technologies: ['C++', 'Algorithms', 'DSA'],
      categories: ['backend'],
      githubUrl: 'https://github.com/Eskinder185/cpp-data-structures-portfolio',
    },
    {
      id: 'java-contact-service-tests',
      title: 'Java Contact Service + Tests',
      description:
        'Unit tests and reflections on testing strategy (JUnit + TDD) for contact service.',
      image: img('java-contact-service-tests.jpg'),
      technologies: ['Java', 'JUnit', 'TDD'],
      categories: ['backend'],
      githubUrl: 'https://github.com/Eskinder185/java-contact-service-tests',
    },
    {
      id: 'aws-dlp-scanner',
      title: 'AWS DLP Scanner',
      description: 'Prototype for scanning data in S3 for sensitive info (PII) and reporting.',
      image: img('aws-dlp-scanner.jpg'),
      technologies: ['AWS', 'Python', 'S3'],
      categories: ['cloud', 'backend'],
      githubUrl: 'https://github.com/Eskinder185/aws-dlp-scanner',
    },
    {
      id: 'driverpass-system-design',
      title: 'DriverPass System Design',
      description: 'Systems analysis & UML artifacts for a multi-role driving lessons platform.',
      image: img('driverpass-system-design.jpg'),
      technologies: ['UML', 'Requirements', 'Design'],
      categories: ['backend'],
      githubUrl: 'https://github.com/Eskinder185/driverpass-system-design',
    },
    {
      id: 'coffee-mug-3d-scene',
      title: 'Coffee Mug 3D Scene (OpenGL)',
      description: 'Interactive 3D scene with lighting, shading, and WASD + mouse camera controls.',
      image: img('coffee-mug-3d-scene.jpg'),
      technologies: ['C++', 'OpenGL', '3D'],
      categories: ['frontend'],
      githubUrl: 'https://github.com/Eskinder185/coffee-mug-3d-scene',
    },
  ];

  const handleExternalLink = (url?: string | null) => {
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const featuredProjects = useMemo(() => projects.filter((p) => p.featured), [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((p) => p.categories.includes(activeFilter as Exclude<Category, 'all'>));
  }, [activeFilter, projects]);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore my work across cloud infrastructure, security-focused backends, AI/ML, and modern web apps.
          </p>
        </div>

        {/* Featured */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
            Featured Projects
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/20 overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <ProjectCover
                    id={project.id}
                    title={project.title}
                    cover={project.image}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-violet-500 to-cyan-500 text-white rounded-full">
                      Featured
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.githubUrl && (
                      <Button
                        onClick={() => handleExternalLink(project.githubUrl)}
                        size="sm"
                        variant="secondary"
                        className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button
                        onClick={() => handleExternalLink(project.liveUrl)}
                        size="sm"
                        className="bg-violet-500 hover:bg-violet-600 text-white"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="px-2 py-1 text-xs bg-white/5 border-white/20 text-gray-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge
                        variant="outline"
                        className="px-2 py-1 text-xs bg-violet-500/20 border-violet-500/50 text-violet-300"
                      >
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <Filter className="w-5 h-5 text-gray-400" />
            <h2 className="text-2xl font-bold">All Projects</h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === f.id
                    ? 'bg-gradient-to-r from-violet-500 to-cyan-500 text-white shadow-lg'
                    : 'bg-white/5 border border-white/20 text-gray-300 hover:bg-white/10 hover:border-violet-500/50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* All projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/20 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <ProjectCover
                  id={project.id}
                  title={project.title}
                  cover={project.image}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />

                <div className="absolute top-4 right-4 flex gap-2">
                  {project.githubUrl && (
                    <button
                      onClick={() => handleExternalLink(project.githubUrl)}
                      className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors duration-200"
                      title="View Code"
                    >
                      <Github className="w-4 h-4" />
                    </button>
                  )}
                  {project.liveUrl && (
                    <button
                      onClick={() => handleExternalLink(project.liveUrl)}
                      className="p-2 rounded-full bg-violet-500/80 hover:bg-violet-500 text-white transition-colors duration-200"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {project.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-violet-500 to-cyan-500 text-white rounded-full">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold mb-3 group-hover:text-white transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-4 leading-relaxed text-sm">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="px-2 py-1 text-xs bg-white/5 border-white/20 text-gray-300"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <Badge
                      variant="outline"
                      className="px-2 py-1 text-xs bg-violet-500/20 border-violet-500/50 text-violet-300"
                    >
                      +{project.technologies.length - 4}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;

