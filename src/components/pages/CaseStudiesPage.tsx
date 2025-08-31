import React, { useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ArrowRight, Clock, Users, Target, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const img = (file: string) => `/images/${file}`; // files live in public/images/

type Study = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  duration: string;
  team: string;
  client: string;
  image: string;
  technologies: string[];
  challenge: string;
  success?: string[];
  diagram?: string;
  decisions?: string[];
  security?: string[];
  results: string[];
  keyFeatures: string[];
  technicalHighlights: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
};

const CaseStudiesPage: React.FC = () => {
  const [selectedStudy, setSelectedStudy] = useState<string | null>(null);

  const caseStudies: Readonly<Study[]> = [
    // 1) JohnnyCloud — serverless alerts (use your existing jpg)
    {
      id: 'johnnycloud-serverless',
      title: 'JohnnyCloud — Serverless Cost & Security Alerts',
      subtitle:
        'Centralize events, normalize, and notify in sub-second time using an event-driven, pay-per-use pipeline.',
      category: 'Cloud / Serverless',
      duration: '4 weeks',
      team: 'Solo Developer',
      client: 'Personal Project',
      image: img('johnnycloud-vpc-ec2.jpg'), // ✅ matches your /public/images
      technologies: ['AWS', 'S3', 'EventBridge', 'Lambda', 'DynamoDB', 'SNS', 'CloudWatch', 'IAM', 'KMS'],
      challenge:
        'Teams lacked a unified, low-cost path to fan out cost and security alerts quickly. Needed a single normalized pipeline that notifies fast and stays cheap.',
      success: [
        'p95 processing < 500 ms end-to-end',
        '≈ $0.42–$1.00 monthly cost at portfolio traffic',
        '90% rule coverage via EventBridge patterns',
        'Strict least-privilege IAM everywhere',
      ],
      diagram: 'S3 / EventBridge → Lambda (normalize) → DynamoDB (single-table) → SNS fan-out; logs/metrics in CloudWatch.',
      decisions: [
        'DynamoDB single-table design for simple, low-latency lookups',
        'SNS (multi-protocol) over SES to keep notifications pluggable',
        'EventBridge pattern filtering to cut noise early',
      ],
      security: [
        'KMS for env/secrets and encrypted topics',
        'Scoped IAM per function and table access',
        'DLQs on Lambdas to avoid silent drops',
      ],
      results: [
        'Cut alert fan-out time from ~5s to ~1.2s',
        'Observed cost ≈ $0.42/month in test profile',
      ],
      keyFeatures: [
        'Event-driven normalization with idempotent writes',
        'Fan-out via SNS (email/SMS/webhook)',
        'CloudWatch metrics/dashboards for visibility',
      ],
      technicalHighlights: [
        'Idempotency keys from object metadata',
        'TTL + sparse GSIs for lifecycle and queries',
        'Retry + DLQ strategies at integration and function levels',
      ],
      githubUrl: 'https://github.com/Eskinder185/cloud-launchpad-vpc-ec2',
      liveUrl: null,
    },

    // 2) TaskTracker — use your existing tasktracker.jpg
    {
      id: 'tasktracker-advanced',
      title: 'TaskTracker — Realtime + Offline-First Team Tasks',
      subtitle:
        'A modern PWA that stays usable offline, syncs fast, and supports role-based collaboration with audit trails.',
      category: 'Full-Stack / Realtime',
      duration: '5 weeks',
      team: 'Solo Developer',
      client: 'Personal Project',
      image: img('tasktracker.jpg'), // ✅ matches your /public/images
      technologies: [
        'TypeScript',
        'React (PWA)',
        'IndexedDB',
        'Service Worker',
        'WebSockets/SSE',
        'PostgreSQL (or DynamoDB+GSI)',
        'Lambda',
        'SNS',
      ],
      challenge:
        'Teams needed live updates without sacrificing offline usability. The app must queue changes safely and reconcile in seconds after reconnect.',
      success: [
        '< 300 ms perceived update latency while online',
        'Offline create/edit works; auto-sync < 10s on reconnect',
        '0 data loss observed in forced network drop tests',
      ],
      diagram:
        'PWA (Service Worker + IndexedDB queue) ↔ API (WebSockets/SSE) → DB (Postgres schema: users, teams, memberships, projects, tasks, comments, audit_logs) + reminder Lambda → SNS.',
      decisions: [
        'Client-side write queue with conflict timestamps',
        'SSE for simple, low-overhead fanout; upgrade to WS when needed',
        'Audit log table for compliance and debugging',
      ],
      security: [
        'Role-based permissions (Owner/Admin/Member)',
        'JWT + claim checks at route/service layer',
        'Row-level security (or scoped queries) on teams/projects',
      ],
      results: [
        'Offline queue survived 3 intentional network drops',
        'Average auto-sync time: 6.4s after connectivity returns',
      ],
      keyFeatures: [
        'PWA + IndexedDB offline queue and reconciliation',
        'Background sync via Service Worker',
        'Reminder Lambda + SNS notifications',
      ],
      technicalHighlights: [
        'Optimistic UI with reconciliation on server acks',
        'Deterministic conflict resolution (last-write-wins + audit trail)',
        'Delta payloads to minimize over-the-wire cost',
      ],
      githubUrl: 'https://github.com/Eskinder185/tasktracker',
      liveUrl: null,
    },

    // 3) Neon Meme Generator — use neon-meme-machine.jpg
    {
      id: 'neon-meme-generator',
      title: 'Neon Meme Generator — AI Captions with Safety Guardrails',
      subtitle:
        'Generate three witty caption options in under two seconds, auto-layout text, and ship a shareable, moderated meme link.',
      category: 'AI / Product',
      duration: '3 weeks',
      team: 'Solo Developer',
      client: 'Personal Project',
      image: img('neon-meme-machine.jpg'), // ✅ matches your /public/images
      technologies: [
        'LLM (Bedrock/OpenAI-compatible)',
        'React',
        'Canvas/WebGL',
        'Step Functions',
        'S3 + presigned URLs',
        'CloudFront',
      ],
      challenge:
        'Users want fast, funny captions and clean layouts—but content must stay safe and shareable with minimal friction.',
      success: [
        '3 caption options generated in < 2s (median)',
        '95% safe-content pass rate via text+image moderation',
        'Shareable shortlink in one click',
      ],
      diagram:
        'Client upload (presigned S3) → caption LLM → moderation (text+image) → renderer (Canvas/WebGL) → S3 asset → CloudFront CDN; optional heavy jobs via Step Functions.',
      decisions: [
        'Presigned uploads to avoid server hot-paths',
        'Shortlink signer for ephemeral share URLs',
        'Template gallery + smart text layout for legibility',
      ],
      security: [
        'Rate limits per IP/session for abuse prevention',
        'Dual moderation (text + image) with blocklist fallbacks',
        'Signed, expiring links for private renders',
      ],
      results: [
        'Caption accept rate: ~62% (users choose 1 of 3)',
        'Average render time: 1.8s at 1080p templates',
        '0 unsafe posts released during test runs',
      ],
      keyFeatures: [
        'Neon template gallery + auto text-fit',
        'One-click share via signed shortlinks',
        'Batch jobs via Step Functions for heavier effects',
      ],
      technicalHighlights: [
        'Prompt templates with style tokens and guardrails',
        'CloudFront caching of static templates',
        'Graceful degradation paths on model timeouts',
      ],
      githubUrl: 'https://github.com/Eskinder185/neon-meme-machine',
      liveUrl: null,
    },
  ] as const;

  const handleExternalLink = (url: string) => window.open(url, '_blank');
  const handleStudySelect = (studyId: string) =>
    setSelectedStudy((curr) => (curr === studyId ? null : studyId));

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Case <span className="gradient-text">Studies</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Three focused builds—each optimized for speed, safety, and real-world usability.
          </p>
        </div>

        {/* Case Studies */}
        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <div
              key={study.id}
              className="group relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative overflow-hidden lg:order-1">
                  <ImageWithFallback
                    src={`${study.image}?v=1`} // cache-bust
                    alt={study.title}
                    className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-6 left-6">
                    <Badge className="px-3 py-1 bg-gradient-to-r from-violet-500 to-cyan-500 text-white border-none">
                      {study.category}
                    </Badge>
                  </div>
                  <div className="absolute top-6 right-6 flex gap-2">
                    {study.githubUrl && (
                      <button
                        onClick={() => handleExternalLink(study.githubUrl!)}
                        className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors duration-200"
                        title="View Repository"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Summary */}
                <div className="p-8 lg:order-2">
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-white transition-colors duration-300">
                      {study.title}
                    </h2>
                    <p className="text-lg text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                      {study.subtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-violet-400" />
                      <span className="text-gray-400">{study.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-cyan-400" />
                      <span className="text-gray-400">{study.team}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Target className="w-4 h-4 text-emerald-400" />
                      <span className="text-gray-400">{study.client}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {study.technologies.slice(0, 6).map((tech, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="px-2 py-1 text-xs bg-white/5 border-white/20 text-gray-300"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {study.technologies.length > 6 && (
                        <Badge
                          variant="outline"
                          className="px-2 py-1 text-xs bg-violet-500/20 border-violet-500/50 text-violet-300"
                        >
                          +{study.technologies.length - 6}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleStudySelect(study.id)}
                    className="group/btn bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white font-semibold rounded-full transition-all duration-200 hover:scale-105"
                  >
                    <span className="flex items-center gap-2">
                      {selectedStudy === study.id ? 'Hide Details' : 'Read Case Study'}
                      <ArrowRight
                        className={`w-4 h-4 transition-transform duration-200 ${
                          selectedStudy === study.id ? 'rotate-90' : 'group-hover/btn:translate-x-1'
                        }`}
                      />
                    </span>
                  </Button>
                </div>
              </div>

              {/* Details */}
              {selectedStudy === study.id && (
                <div className="border-t border-white/10 bg-white/5 p-8 animate-fade-in-up">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left column */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold mb-3 text-red-400">The Problem</h3>
                        <p className="text-gray-300 leading-relaxed">{study.challenge}</p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-3 text-green-400">The Solution</h3>
                        <p className="text-gray-300 leading-relaxed">{study.subtitle}</p>
                      </div>

                      {study.diagram && (
                        <div>
                          <h3 className="text-xl font-bold mb-3 text-blue-400">Architecture (Diagram)</h3>
                          <p className="text-gray-300 leading-relaxed font-mono text-sm">{study.diagram}</p>
                        </div>
                      )}

                      <div>
                        <h3 className="text-xl font-bold mb-3 text-blue-400">Key Features</h3>
                        <ul className="space-y-2">
                          {study.keyFeatures.map((f, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                              <div className="w-1.5 h-1.5 bg-violet-400 rounded-full mt-2 flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right column */}
                    <div className="space-y-6">
                      {study.success?.length ? (
                        <div>
                          <h3 className="text-xl font-bold mb-3 text-teal-400">Success Metrics</h3>
                          <ul className="space-y-2">
                            {study.success.map((s, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {study.decisions?.length ? (
                        <div>
                          <h3 className="text-xl font-bold mb-3 text-orange-400">Key Decisions</h3>
                          <ul className="space-y-2">
                            {study.decisions.map((d, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {study.security?.length ? (
                        <div>
                          <h3 className="text-xl font-bold mb-3 text-pink-400">Security</h3>
                          <ul className="space-y-2">
                            {study.security.map((sec, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                <div className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full mt-2 flex-shrink-0" />
                                {sec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      <div>
                        <h3 className="text-xl font-bold mb-3 text-violet-400">Results</h3>
                        <ul className="space-y-2">
                          {study.results.map((r, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-3 text-indigo-400">Technical Highlights</h3>
                        <ul className="space-y-2">
                          {study.technicalHighlights.map((t, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                              <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 flex-shrink-0" />
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex gap-3 pt-4">
                        {study.githubUrl && (
                          <Button
                            onClick={() => handleExternalLink(study.githubUrl!)}
                            variant="outline"
                            size="sm"
                            className="border-white/20 hover:border-violet-500/50 text-gray-300 hover:text-white"
                          >
                            View Repository
                          </Button>
                        )}
                        {study.liveUrl && (
                          <Button
                            onClick={() => handleExternalLink(study.liveUrl!)}
                            size="sm"
                            className="bg-cyan-500 hover:bg-cyan-600 text-white"
                          >
                            Live Demo
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            variant="outline"
            className="border-white/20 hover:border-violet-500/50 text-gray-300 hover:text-white"
          >
            Back to Top
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CaseStudiesPage;
