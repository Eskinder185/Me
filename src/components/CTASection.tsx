import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ExternalLink, Send, CheckCircle } from 'lucide-react';

interface CTASectionProps {
  onNavigate: (page: string) => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    projectType: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after success message
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '', projectType: '' });
    }, 3000);
  };

  const handleScheduleCall = () => {
    onNavigate('contact'); // route to your Contact page
  };

  return (
    <div className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Build <span className="gradient-text">Secure, Cloud-Ready</span> Systems?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Tell me about your idea, role, or collaboration. I focus on AWS, DevOps, and security—plus solid full-stack delivery.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>

            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-green-400 mb-2">Message Sent!</h4>
                <p className="text-gray-300">Thanks! I’ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="bg-white/5 border-white/10 focus:border-violet-500 text-white placeholder-gray-400"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-white/5 border-white/10 focus:border-violet-500 text-white placeholder-gray-400"
                      placeholder="you@domain.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Type
                  </label>
                  <Select
                    value={formData.projectType}
                    onValueChange={(value) => handleInputChange('projectType', value)}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 focus:border-violet-500 text-white">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/10">
                      <SelectItem value="cloud-devops">Cloud / DevOps (AWS, IaC, CI/CD)</SelectItem>
                      <SelectItem value="security">Security (RBAC, JWT, hardening)</SelectItem>
                      <SelectItem value="ai-ml">AI/ML (IDS, DQN, data)</SelectItem>
                      <SelectItem value="full-stack">Full-Stack (React/Node/Java)</SelectItem>
                      <SelectItem value="arch-review">AWS Architecture Review</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="bg-white/5 border-white/10 focus:border-violet-500 text-white placeholder-gray-400 min-h-[120px]"
                    placeholder="Quick context helps: goals, timeline, tech stack (e.g., AWS + React), and how I can help."
                  />
                  <p className="mt-2 text-xs text-gray-400">
                    Tip: I’m currently open to Cloud / DevOps / Security roles in Atlanta or remote.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white font-semibold py-3 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25 disabled:opacity-50 disabled:scale-100"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </div>
                  )}
                </Button>
            </form>
            )}

            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/5 to-cyan-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10" />
          </div>

          {/* Alternative CTA */}
          <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6">Prefer a Quick Chat?</h3>

            <div className="space-y-6">
              <p className="text-gray-300 leading-relaxed">
                Sometimes it’s faster to talk. I can walk you through my projects (JohnnyCloud, Secure Task Manager,
                IDS with ML) or discuss your role, team, and tech stack.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-gray-300">Replies within 24 hours</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-violet-400 rounded-full" />
                  <span className="text-gray-300">Free 30-minute intro call</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                  <span className="text-gray-300">No commitment required</span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <Button
                  onClick={handleScheduleCall}
                  variant="outline"
                  className="w-full border-2 border-white/20 bg-transparent hover:bg-white/5 text-white font-semibold py-3 rounded-full transition-all duration-200 hover:scale-105 hover:border-cyan-500/50 group"
                >
                  <div className="flex items-center gap-2">
                    Schedule a Call
                    <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </Button>

                <a
                  href="https://github.com/Eskinder185"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button
                    variant="outline"
                    className="w-full border-2 border-white/20 bg-transparent hover:bg-white/5 text-white font-semibold py-3 rounded-full transition-all duration-200 hover:scale-105 hover:border-violet-500/50"
                  >
                    View GitHub
                  </Button>
                </a>
              </div>

              <p className="text-sm text-gray-400">
                Based in Atlanta, GA • Open to Cloud / DevOps / Security roles • Remote or Hybrid
              </p>
            </div>

            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-violet-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
