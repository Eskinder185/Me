import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const CodeShowcase: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const codeExamples = [
    // 1) JohnnyCloud — S3 → Lambda → DynamoDB + SNS
    {
      title: 'JohnnyCloud — S3 → Lambda → DynamoDB + SNS',
      description:
        'Event-driven pipeline: on S3 upload, normalize, persist to DynamoDB, and fan out via SNS. Idempotent; least-privilege IAM.',
      tags: ['AWS', 'Lambda', 'S3', 'DynamoDB', 'SNS'],
      code: `// index.mjs — AWS SDK v3 (Node 20.x)
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const ddb = new DynamoDBClient({});
const sns = new SNSClient({});
const TABLE = process.env.TABLE!;
const TOPIC_ARN = process.env.TOPIC_ARN!;

export const handler = async (event) => {
  // One S3 put event (single record for brevity)
  const r = event.Records[0];
  const bucket = r.s3.bucket.name;
  const { key, size = 0, eTag } = r.s3.object;

  // Idempotency: use (bucket/key/eTag) as natural key
  const id = \`\${bucket}/\${key}#\${eTag ?? 'na'}\`;

  const item = {
    pk:  { S: 'FILE#' + id },
    sk:  { S: new Date().toISOString() },
    sz:  { N: String(size) },
    src: { S: 's3' }
  };

  await ddb.send(new PutItemCommand({ TableName: TABLE, Item: item }));
  await sns.send(new PublishCommand({
    TopicArn: TOPIC_ARN,
    Subject: 'JohnnyCloud: file processed',
    Message: JSON.stringify({ bucket, key, size })
  }));

  return { statusCode: 200 };
};`
    },

    // 2) TaskTracker — Offline-first + realtime
    {
      title: 'TaskTracker — Offline Queue & SSE Realtime',
      description:
        'PWA strategy: queue writes in IndexedDB while offline, background-sync later; subscribe to server-sent events for live updates.',
      tags: ['TypeScript', 'PWA', 'IndexedDB', 'SSE', 'React'],
      code: `// useOfflineQueue.ts — minimal client write queue
import { useEffect, useRef, useState } from 'react';

type Pending = { id: string; url: string; body: any; method?: 'POST'|'PATCH'|'DELETE' };

export function useOfflineQueue() {
  const [pending, setPending] = useState<Pending[]>([]);
  const syncing = useRef(false);

  // Enqueue write
  const enqueue = (p: Pending) => setPending(q => [...q, p]);

  // Try flush on reconnect
  useEffect(() => {
    const flush = async () => {
      if (syncing.current || pending.length === 0) return;
      syncing.current = true;
      try {
        for (const job of pending) {
          await fetch(job.url, {
            method: job.method ?? 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(job.body),
          });
          setPending(q => q.filter(x => x.id !== job.id));
        }
      } finally {
        syncing.current = false;
      }
    };

    const onOnline = () => flush();
    window.addEventListener('online', onOnline);
    flush();
    return () => window.removeEventListener('online', onOnline);
  }, [pending]);

  return { enqueue, pending };
}

// useSSE.ts — realtime updates
export function useSSE(url: string) {
  const [events, setEvents] = useState<any[]>([]);
  useEffect(() => {
    const es = new EventSource(url, { withCredentials: true });
    es.onmessage = (e) => setEvents((xs) => [...xs, JSON.parse(e.data)]);
    es.onerror = () => es.close();
    return () => es.close();
  }, [url]);
  return events;
}`
    },

    // 3) Neon Meme Machine — captions + moderation + presigned upload
    {
      title: 'Neon Meme Machine — Captions + Moderation',
      description:
        'API flow: presigned S3 upload, generate 3 captions with an LLM, dual moderation (text+image), return safe options quickly.',
      tags: ['LLM', 'Moderation', 'S3', 'Edge API', 'Node'],
      code: `// api/caption.ts — pseudo-edge handler
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({});
const BUCKET = process.env.BUCKET!;

export async function POST(req: Request) {
  const { mime } = await req.json();

  // 1) Presign for direct browser upload (avoid server hot path)
  const presign = await createPresignedPost(s3, {
    Bucket: BUCKET,
    Key: \`uploads/\${crypto.randomUUID()}\`,
    Conditions: [['content-length-range', 0, 5_000_000], ['starts-with', '$Content-Type', 'image/']],
    Expires: 60
  });

  // 2) Ask model for 3 short caption options (guardrail template)
  const captions = await llmGenerate({
    system: 'Write witty, safe, PG captions in 8 words max.',
    user: 'Image context from user prompt or tags here.',
    n: 3
  });

  // 3) Moderate all captions (and later the image after upload)
  const safe = (await Promise.all(captions.map(moderateText))).filter(Boolean);

  return new Response(JSON.stringify({ presign, captions: safe.slice(0, 3) }), { status: 200 });
}

// stubs
async function llmGenerate(_: any){ return ['Caption A', 'Caption B', 'Caption C']; }
async function moderateText(t: string){ return /badword/i.test(t) ? null : t; }`
    },

    // 4) DQN — core training loop
    {
      title: 'Pirate Intelligent Agent — DQN (Core Loop)',
      description:
        'Minimal Deep Q-Learning: epsilon-greedy policy, replay buffer sample, target network update, and TD loss.',
      tags: ['Python', 'PyTorch', 'RL', 'DQN'],
      code: `# train.py — condensed DQN core (educational)
import random, torch, torch.nn as nn, torch.optim as optim

gamma, eps, eps_min, eps_decay = 0.99, 1.0, 0.05, 0.995
policy, target = Net(), Net(),  # define Net() elsewhere
optimizer = optim.Adam(policy.parameters(), lr=1e-3)
buffer = ReplayBuffer(100_000)  # push((s,a,r,s2,done))

for step in range(1, 50_001):
  s = env.state()
  a = policy.act(s, eps)  # epsilon-greedy
  s2, r, done, _ = env.step(a)
  buffer.push((s, a, r, s2, done))

  if len(buffer) > 1024:
    batch = buffer.sample(64)
    loss = td_loss(policy, target, batch, gamma)
    optimizer.zero_grad(); loss.backward(); optimizer.step()

  if step % 1000 == 0:  # soft target update
    target.load_state_dict(policy.state_dict())
    eps = max(eps_min, eps * eps_decay)

def td_loss(policy, target, batch, gamma):
  s,a,r,s2,d = batch
  q = policy(s).gather(1, a)
  with torch.no_grad():
    q2 = target(s2).max(1, keepdim=True)[0]
    y  = r + gamma * q2 * (1 - d)
  return nn.functional.smooth_l1_loss(q, y)`
    }
  ];

  const copyToClipboard = async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1200);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Code <span className="gradient-text">Showcase</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real snippets from JohnnyCloud, TaskTracker, Neon Meme Machine, and DQN.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {codeExamples.map((example, index) => (
            <div
              key={index}
              className="group relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300 overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold group-hover:text-white transition-colors duration-300">
                    {example.title}
                  </h3>
                  <button
                    onClick={() => copyToClipboard(example.code, index)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200 group/btn"
                    title="Copy code"
                    aria-label="Copy code to clipboard"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400 group-hover/btn:text-white" />
                    )}
                  </button>
                </div>

                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-4">
                  {example.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {example.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-white/10 text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Code */}
              <div className="relative">
                <pre className="p-6 text-sm text-gray-300 overflow-x-auto bg-black/20 font-mono leading-relaxed">
                  <code>{example.code}</code>
                </pre>
                <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
              </div>

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeShowcase;
