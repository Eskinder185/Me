import React, { useMemo, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Mail, Github, Linkedin, MapPin, Clock, Send, CheckCircle, ExternalLink } from 'lucide-react';

type ProjectType =
  | 'cloud-architecture'
  | 'cybersecurity'
  | 'ai-ml'
  | 'full-stack'
  | 'microservices'
  | 'consulting'
  | 'other'
  | '';

const FORMSPREE_ENDPOINT = ''; // <-- put your Formspree endpoint here (e.g. "https://formspree.io/f/abcdwxyz")

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    message: string;
    projectType: ProjectType;
    // honeypot
    company?: string;
  }>({
    name: '',
    email: '',
    message: '',
    projectType: '',
    company: '', // hidden honeypot field
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const cooldownLeft = useMemo(() => {
    const last = Number(localStorage.getItem('contact:lastSentAt') || '0');
    const diffMs = Date.now() - last;
    const minGap = 5 * 60 * 1000; // 5 minutes
    return Math.max(0, minGap - diffMs);
  }, [isSubmitting, isSubmitted]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Please enter a valid email.';
    if (!formData.message.trim() || formData.message.trim().length < 20)
      e.message = 'Please share at least a couple of sentences.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSocialClick = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

  const handleBackToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const mailtoFallback = () => {
    const subject = encodeURIComponent(`New ${formData.projectType || 'project'} inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType || 'N/A'}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:eskewabe185@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // basic rate limit
    if (cooldownLeft > 0) {
      setSubmitError('Please wait a few minutes before sending another message.');
      return;
    }

    if (!validate()) return;

    // honeypot (bots often fill "company")
    if (formData.company && formData.company.trim().length > 0) {
      setSubmitError('Spam detected. Please try again.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (FORMSPREE_ENDPOINT) {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            projectType: formData.projectType || 'N/A',
            _subject: `New inquiry from ${formData.name}`,
          }),
        });

        if (!res.ok) throw new Error(`Formspree error: ${res.status}`);
      } else {
        // fall back to mailto
        mailtoFallback();
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '', projectType: '', company: '' });
      localStorage.setItem('contact:lastSentAt', String(Date.now()));
    } catch (err: any) {
      console.error(err);
      setSubmitError('Something went wrong sending your message. Please try again or email me directly.');
    } finally {
      setIsSubmitting(false);
      // hide success after a few seconds
      setTimeout(() => setIsSubmitted(false), 4000);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let’s discuss how we can work together to create something
            amazing. I’m always excited to take on new challenges.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Let’s Start a <span className="gradient-text">Conversation</span>
              </h2>
              <p className="text-gray-300 leading-relaxed mb-8">
                Whether you have a specific project in mind or just want to explore possibilities, I’m here to help.
                I specialize in cloud architecture, cybersecurity, AI/ML applications, and full-stack development.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-200">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Email</h3>
                  <p className="text-gray-400">eskewabe185@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-200">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Location</h3>
                  <p className="text-gray-400">Atlanta, GA (Remote Worldwide)</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-200">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Response Time</h3>
                  <p className="text-gray-400">Usually within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Connect on Social</h3>
              <div className="flex gap-4">
                <button
                  onClick={() => handleSocialClick('https://github.com/Eskinder185')}
                  className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-violet-500/50 transition-all duration-200"
                  aria-label="Open GitHub profile in a new tab"
                >
                  <Github className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-200" />
                </button>

                <button
                  onClick={() => handleSocialClick('https://linkedin.com/in/eskinder-kassahun')}
                  className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-200"
                  aria-label="Open LinkedIn profile in a new tab"
                >
                  <Linkedin className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-200" />
                </button>

                <button
                  onClick={() => handleSocialClick('mailto:eskewabe185@gmail.com')}
                  className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/50 transition-all duration-200"
                  aria-label="Compose email"
                >
                  <Mail className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-200" />
                </button>
              </div>
            </div>

            {/* Availability */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <h3 className="font-bold text-green-400">Currently Available</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                I’m actively taking on new projects and would love to hear about your requirements. Whether it’s a quick
                consultation or a long-term engagement, let’s explore how I can help.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
                <h4 className="text-2xl font-bold text-green-400 mb-4">Message Sent Successfully!</h4>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Thanks for reaching out! I’ll review your message and get back to you within 24 hours.
                </p>
                <Button
                  onClick={handleBackToTop}
                  variant="outline"
                  className="border-white/20 hover:border-violet-500/50 text-gray-300 hover:text-white"
                >
                  Back to Top
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Honeypot */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name *</label>
                    <Input
                      type="text"
                      required
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="bg-white/5 border-white/20 focus:border-violet-500 text-white placeholder-gray-400"
                      placeholder="John Doe"
                    />
                    {errors.name && <p id="name-error" className="mt-2 text-sm text-red-400">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address *</label>
                    <Input
                      type="email"
                      required
                      inputMode="email"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-white/5 border-white/20 focus:border-violet-500 text-white placeholder-gray-400"
                      placeholder="john@example.com"
                    />
                    {errors.email && <p id="email-error" className="mt-2 text-sm text-red-400">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Project Type</label>
                  <Select
                    value={formData.projectType}
                    onValueChange={(v) => handleInputChange('projectType', v as ProjectType)}
                  >
                    <SelectTrigger className="bg-white/5 border-white/20 focus:border-violet-500 text-white">
                      <SelectValue placeholder="What kind of project are you working on?" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      <SelectItem value="cloud-architecture">Cloud Architecture & Infrastructure</SelectItem>
                      <SelectItem value="cybersecurity">Cybersecurity & Zero Trust</SelectItem>
                      <SelectItem value="ai-ml">AI/ML Development</SelectItem>
                      <SelectItem value="full-stack">Full-Stack Web Application</SelectItem>
                      <SelectItem value="microservices">Microservices Architecture</SelectItem>
                      <SelectItem value="consulting">Technical Consulting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Project Details *</label>
                  <Textarea
                    required
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="bg-white/5 border-white/20 focus:border-violet-500 text-white placeholder-gray-400 min-h-[140px]"
                    placeholder="Tell me about your goals, timeline, budget range, and any specific requirements or constraints..."
                  />
                  {errors.message && <p id="message-error" className="mt-2 text-sm text-red-400">{errors.message}</p>}
                </div>

                {!!submitError && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                    {submitError}
                  </div>
                )}

                {cooldownLeft > 0 && (
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm">
                    You recently sent a message. You can submit again in ~
                    {Math.ceil(cooldownLeft / 1000)}s.
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting || cooldownLeft > 0}
                  className="w-full bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white font-semibold py-4 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25 disabled:opacity-50 disabled:scale-100"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending Your Message...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Send className="w-5 h-5" />
                      Send Message
                    </div>
                  )}
                </Button>
            </form>
            )}

            {/* Hover glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/5 to-cyan-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10" />
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-20 text-center">
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4">Prefer a Quick Call?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Sometimes it’s easier to discuss project requirements over a call.
              I’m available for free 30-minute consultations to explore how we can work together.
            </p>
            <Button
              onClick={() =>
                handleSocialClick(
                  'mailto:eskewabe185@gmail.com?subject=Schedule%20Call%20Request'
                )
              }
              variant="outline"
              className="border-2 border-white/20 bg-transparent hover:bg-white/5 text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 hover:scale-105 hover:border-cyan-500/50 group"
            >
              <div className="flex items-center gap-2">
                Schedule a Call
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
