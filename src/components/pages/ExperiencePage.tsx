import React, { useEffect, useRef } from 'react';
import { Calendar, MapPin, ExternalLink, ChevronRight } from 'lucide-react';

interface ExperiencePageProps {
  onNavigate: (page: string) => void;
}

const ExperiencePage: React.FC<ExperiencePageProps> = ({ onNavigate }) => {
  const timelineRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      id: 'aws-restart',
      period: 'Jul 2025 – Sep 2025',
      role: 'Cloud Engineering Trainee (AWS re/Start)',
      company: 'Per Scholas • AWS re/Start',
      companyUrl: 'https://perscholas.org',
      location: 'Atlanta, GA (Remote/Hybrid)',
      type: 'Training',
      description:
        'Immersive cloud engineering program focused on AWS fundamentals, security, and automation with hands-on labs and team projects.',
      achievements: [
        'Built secure VPCs with public/private subnets, routing, and security groups',
        'Automated a LAMP → Amazon RDS migration with parameterized secrets and monitoring',
        'Developed serverless workflows using S3 + Lambda + SNS with CloudWatch observability',
        'Practiced IaC and reviews with CloudFormation/Terraform starter patterns'
      ],
      technologies: ['AWS', 'VPC', 'EC2', 'RDS', 'IAM', 'Lambda', 'CloudWatch', 'CloudFormation'],
      relatedProject: 'projects'
    },
    {
      id: 'springboard-fellow',
      period: 'Jan 2025 – May 2025',
      role: 'Software Engineering Fellow',
      company: 'Springboard',
      companyUrl: 'https://www.springboard.com',
      location: 'Remote',
      type: 'Bootcamp',
      description:
        'Mentor-guided bootcamp emphasizing full-stack delivery, clean architecture, and CI/CD. Built portfolio apps and received weekly code reviews.',
      achievements: [
        'Shipped full-stack/web projects: Neon Meme Machine, Jeopardy-style Trivia, Travel Portal',
        'Integrated React + Node patterns and REST APIs with robust error handling',
        'Set up GitHub Actions for lint/test workflows and repeatable deployments',
        'Collaborated via pair programming and iterative design feedback'
      ],
      technologies: ['React', 'Node.js', 'TypeScript', 'JavaScript', 'MongoDB', 'GitHub Actions'],
      relatedProject: 'projects'
    },
    {
      id: 'snhu-student',
      period: '2019 – Aug 2025',
      role: 'B.S. in Computer Science',
      company: 'Southern New Hampshire University',
      companyUrl: 'https://www.snhu.edu',
      location: 'Manchester, NH (Remote)',
      type: 'Education',
      description:
        'Computer Science degree with emphasis on software development, data structures, and security. Culminated in a security-focused capstone.',
      achievements: [
        'Capstone: Secure Task Manager with MVC, JWT auth, and RBAC + audit logging',
        'Built a Python ML Intrusion Detection System (Isolation Forest over netflow features)',
        'Implemented encrypted auth flows (hashing/crypto) and practiced secure coding',
        'Produced UML/system docs for DriverPass and other course projects'
      ],
      technologies: ['Java', 'Python', 'C++', 'SQL', 'Linux', 'Security', 'UML'],
      relatedProject: 'case-studies'
    },
    {
      id: 'amazon-associate',
      period: '2021 – 2023',
      role: 'Warehouse Associate',
      company: 'Amazon',
      companyUrl: 'https://www.amazon.com',
      location: 'Atlanta, GA',
      type: 'Operations',
      description:
        'High-volume operations experience while pursuing CS studies. Built discipline around process, quality, and teamwork.',
      achievements: [
        'Maintained high accuracy in fulfillment and inventory handling',
        'Supported process improvements that increased throughput and reduced waste',
        'Onboarded peers on safety and workflow best practices',
        'Balanced long shifts with completing degree and portfolio projects'
      ],
      technologies: ['Process Optimization', 'Quality', 'Teamwork', 'Documentation'],
      relatedProject: null
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
    timelineItems?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const handleCompanyClick = (url: string) => {
    window.open(url, '_blank');
  };

  const handleRelatedProjectClick = (project: string) => {
    if (project.includes('#')) {
      const [page] = project.split('#');
      onNavigate(page);
      // handle hash scroll in app router if needed
    } else {
      onNavigate(project);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Professional <span className="gradient-text">Journey</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            From operations discipline to cloud-first, security-minded engineering—bootcamp, degree, and AWS labs powering real projects.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline spine */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500 via-cyan-500 to-violet-500 transform md:-translate-x-0.5" />

          {/* Timeline items */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`timeline-item opacity-0 relative flex items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Timeline node */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full transform -translate-x-2 md:-translate-x-2 animate-pulse-glow z-10" />

                {/* Content card */}
                <div className={`ml-20 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:ml-8' : 'md:ml-auto md:mr-8'}`}>
                  <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/20">
                    {/* Period badge */}
                    <div className="absolute -top-3 left-6">
                      <span className="px-4 py-1 text-sm font-medium bg-gradient-to-r from-violet-500 to-cyan-500 text-white rounded-full">
                        {exp.period}
                      </span>
                    </div>

                    {/* Header */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors duration-300">
                        {exp.role}
                      </h3>

                      <div className="flex items-center gap-2 mb-2">
                        {exp.companyUrl ? (
                          <button
                            onClick={() => handleCompanyClick(exp.companyUrl!)}
                            className="text-violet-400 hover:text-violet-300 transition-colors duration-200 flex items-center gap-1 group/company"
                          >
                            {exp.company}
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover/company:opacity-100 transition-opacity duration-200" />
                          </button>
                        ) : (
                          <span className="text-violet-400">{exp.company}</span>
                        )}
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400 text-sm">{exp.type}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 group-hover:text-gray-2 00 transition-colors duration-300 mb-6 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-white mb-3">Key Achievements:</h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li
                            key={achIndex}
                            className="flex items-start gap-2 text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300"
                          >
                            <ChevronRight className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-white mb-3">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 text-xs font-medium rounded bg-white/10 border border-white/20 text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Related project link */}
                    {exp.relatedProject && (
                      <button
                        onClick={() => handleRelatedProjectClick(exp.relatedProject!)}
                        className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-200 group/link"
                      >
                        View related work
                        <ChevronRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform duration-200" />
                      </button>
                    )}

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperiencePage;
