import React from 'react';
import { Briefcase, Folder, FileText } from 'lucide-react';

interface FeaturesSectionProps {
  onNavigate: (page: string) => void;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onNavigate }) => {
  const features = [
    {
      id: 'experience',
      icon: Briefcase,
      title: 'Experience',
      description:
        'From Amazon operations to SNHU CS, Springboard, and AWS re/Start—hands-on with 1200+ hrs of training across AWS (EC2, VPC, Lambda, RDS), Java/Python, and DevSecOps practices.',
      gradient: 'from-violet-500 to-purple-600',
    },
    {
      id: 'projects',
      icon: Folder,
      title: 'Projects',
      description:
        'JohnnyCloud (serverless on AWS), Secure Task Manager (RBAC + JWT), Trivia Clash (React/Node), IDS with ML, Animal Shelter Analytics (Python + Dash), and more.',
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      id: 'case-studies',
      icon: FileText,
      title: 'Case Studies',
      description:
        'Deep dives on real builds: securing a Java app (TLS, hashing, OWASP), migrating LAMP → Amazon RDS, and designing RBAC/JWT with audit logging for production readiness.',
      gradient: 'from-emerald-500 to-teal-600',
    },
  ];

  return (
    <div className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What I <span className="gradient-text">Offer</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Cloud & DevOps engineering with a security-first mindset—plus full-stack delivery and clear documentation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;

            return (
              <div
                key={feature.id}
                className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/20 cursor-pointer"
                onClick={() => onNavigate(feature.id)}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-full h-full text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* Arrow indicator */}
                <div className="absolute top-6 right-6 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Hover glow effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
