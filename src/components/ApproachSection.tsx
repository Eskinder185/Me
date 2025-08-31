import React from 'react';
import { Search, Palette, Code, Rocket } from 'lucide-react';

const ApproachSection: React.FC = () => {
  const steps = [
    {
      number: 1,
      icon: Search,
      title: 'Discovery',
      description:
        'Gather requirements, risks, and constraints. Align goals with AWS Well-Architected pillars, capture user stories, and do a quick threat model (roles, data, attack surface).',
      color: 'from-violet-500 to-purple-600'
    },
    {
      number: 2,
      icon: Palette,
      title: 'Design & Prototype',
      description:
        'Sketch AWS diagrams (VPC, subnets, IAM, Lambda, RDS), UML for services, and click-through UI prototypes. Validate early with peers/mentors before writing code.',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      number: 3,
      icon: Code,
      title: 'Build & Secure',
      description:
        'Implement with a security-first mindset: RBAC/JWT auth, input validation, logging. Ship infra as code (CloudFormation/Terraform), CI/CD, and clean code (React/Node/Java/Python).',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      number: 4,
      icon: Rocket,
      title: 'Launch, Observe & Iterate',
      description:
        'Deploy to AWS, monitor via CloudWatch and metrics, run post-deploy checks, track cost & performance, then iterate. Document lessons and next steps.',
      color: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <div className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="gradient-text">Approach</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A clear, security-first workflow from idea to cloud deployment
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;

            return (
              <div
                key={step.number}
                className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/20"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const centerX = rect.left + rect.width / 2;
                  const centerY = rect.top + rect.height / 2;
                  const mouseX = e.clientX;
                  const mouseY = e.clientY;

                  const rotateX = ((mouseY - centerY) / rect.height) * 10;
                  const rotateY = ((mouseX - centerX) / rect.width) * 10;

                  card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget;
                  card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
                }}
              >
                {/* Step number */}
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mb-4">
                  <IconComponent className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors duration-300">
                  {step.title}
                </h3>

                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed text-sm">
                  {step.description}
                </p>

                {/* Connecting line (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-violet-500/50 to-transparent -translate-y-1/2" />
                )}

                {/* Hover glow effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ApproachSection;
