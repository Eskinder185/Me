import React, { useMemo, useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { ExternalLink, Star, BookOpen, Clock, User, Github } from 'lucide-react';
import BookCover from '../ui/BookCover';

type Related = { label: string; href: string };

const BooksPage: React.FC = () => {
  // --- YOUR BOOKS ------------------------------------------------------------
  const books = [
    {
      id: 'deep-learning-with-keras',
      title: 'Deep Learning with Keras',
      author: 'Antonio Gulli, Sujit Pal',
      year: '2017',
      isbn: '9781787128422',
      cover: '/api/placeholder/300/450',
      rating: 4,
      tags: ['AI/ML', 'Keras', 'Neural Nets'],
      category: 'AI/ML',
      summary:
        'Hands-on guide to building and training deep neural networks using Keras abstractions.',
      insights: [
        'Model layers as composable building blocks → faster iteration',
        'Early-stopping and regularization to prevent overfitting',
        'Data pipelines matter as much as the model definition',
        'Transfer learning is a strong baseline for small datasets'
      ],
      whyItMatters:
        'Grounded my ML comfort: confident with NN basics and rapid prototyping.',
      buyUrl: 'https://www.amazon.com/s?k=Deep+Learning+with+Keras',
      readingTime: '10 hours',
      related: [
        { label: 'Pirate Intelligent Agent (DQN)', href: 'https://github.com/Eskinder185/Pirate-Intelligent-Agent' }
      ] as Related[]
    },
    {
      id: 'applied-rl-python',
      title: 'Applied Reinforcement Learning with Python',
      author: 'Taweh Beysolow II',
      year: '2019',
      isbn: '9781484253489',
      cover: '/api/placeholder/300/450',
      rating: 4,
      tags: ['Reinforcement Learning', 'Python'],
      category: 'AI/ML',
      summary:
        'Practical reinforcement learning—Q-learning, policy gradients, and evaluation—implemented in Python.',
      insights: [
        'Exploration vs. exploitation: epsilon schedules matter',
        'Reward shaping can make or break learning progress',
        'Replay buffers stabilize training in off-policy methods',
        'Evaluate with seed control and rolling averages'
      ],
      whyItMatters:
        'Enabled my DQN project setup and tuning loop with confidence.',
      buyUrl: 'https://www.amazon.com/s?k=Applied+Reinforcement+Learning+with+Python',
      readingTime: '8 hours',
      related: [
        { label: 'Pirate Intelligent Agent (DQN)', href: 'https://github.com/Eskinder185/Pirate-Intelligent-Agent' }
      ] as Related[]
    },
    {
      id: 'clean-architecture',
      title: 'Clean Architecture',
      author: 'Robert C. Martin',
      year: '2017',
      isbn: '9780134494166',
      cover: '/api/placeholder/300/450',
      rating: 5,
      tags: ['Architecture', 'SOLID', 'Best Practices'],
      category: 'Software Engineering',
      summary:
        'How to separate business logic from frameworks, UIs, and databases using clean boundaries.',
      insights: [
        'Dependency inversion → testable, swappable components',
        'Use-case / service layer keeps domain logic framework-free',
        'Entities and boundaries outlive tools and libraries',
        'Treat frameworks as plugins at the edges'
      ],
      whyItMatters:
        'Shaped my Secure Task Manager design (controllers/services/repos).',
      buyUrl: 'https://www.amazon.com/s?k=Clean+Architecture',
      readingTime: '8 hours',
      related: [
        { label: 'Secure Task Manager (Java)', href: 'https://github.com/Eskinder185/secure-task-manager-java' }
      ] as Related[]
    },
    {
      id: 'rich-dad-poor-dad',
      title: 'Rich Dad Poor Dad',
      author: 'Robert T. Kiyosaki',
      year: '1997',
      isbn: '9781612680194',
      cover: '/api/placeholder/300/450',
      rating: 4,
      tags: ['Personal Finance', 'Mindset'],
      category: 'Personal Development',
      summary:
        'Mindset-oriented finance book on assets, liabilities, and financial literacy.',
      insights: [
        'Think in terms of assets that generate cash flow',
        'Skills build opportunities; jobs are not the ceiling',
        'Track spending and invest consistently',
        'Long-term thinking compounds results'
      ],
      whyItMatters:
        'Motivates deliberate career/project choices and investing in skills.',
      buyUrl: 'https://www.amazon.com/s?k=Rich+Dad+Poor+Dad',
      readingTime: '6 hours',
      related: [] as Related[]
    },
    {
      id: 'how-to-win-friends',
      title: 'How to Win Friends and Influence People',
      author: 'Dale Carnegie',
      year: '1936',
      isbn: '9781451621716',
      cover: '/api/placeholder/300/450',
      rating: 5,
      tags: ['Communication', 'Leadership'],
      category: 'Communication',
      summary:
        'Timeless techniques for building rapport, resolving conflict, and leading with empathy.',
      insights: [
        'Genuine appreciation opens doors',
        'Ask questions; let others talk about themselves',
        'Frame feedback around shared goals',
        'Admit mistakes quickly to build trust'
      ],
      whyItMatters:
        'Improves pair programming, code reviews, and stakeholder comms.',
      buyUrl: 'https://www.amazon.com/s?k=How+to+Win+Friends+and+Influence+People',
      readingTime: '7 hours',
      related: [] as Related[]
    },
    {
      id: 'atomic-habits',
      title: 'Atomic Habits',
      author: 'James Clear',
      year: '2018',
      isbn: '9780735211292',
      cover: '/api/placeholder/300/450',
      rating: 5,
      tags: ['Habits', 'Productivity'],
      category: 'Personal Development',
      summary:
        'Small, consistent behavior changes compound into meaningful life and career progress.',
      insights: [
        'Make habits obvious, attractive, easy, and satisfying',
        'Environment design beats willpower',
        'Identity-based habits stick longer',
        'Track tiny wins; 1% gains add up'
      ],
      whyItMatters:
        'I use habit stacking to keep daily coding/learning cadence.',
      buyUrl: 'https://www.amazon.com/s?k=Atomic+Habits',
      readingTime: '6 hours',
      related: [
        { label: 'TaskTracker (TypeScript)', href: 'https://github.com/Eskinder185/tasktracker' }
      ] as Related[]
    },
    {
      id: 'the-art-of-communicating',
      title: 'The Art of Communicating',
      author: 'Thich Nhat Hanh',
      year: '2013',
      isbn: '9780062224668',
      cover: '/api/placeholder/300/450',
      rating: 4,
      tags: ['Mindfulness', 'Communication'],
      category: 'Communication',
      summary:
        'Mindful listening and speaking to reduce conflict and increase understanding.',
      insights: [
        'Listen to understand, not to reply',
        'Slow down; clarity improves outcomes',
        'Compassionate tone diffuses tension',
        'Silence can be a powerful tool'
      ],
      whyItMatters:
        'Useful during incident calls and code review discussions.',
      buyUrl: 'https://www.amazon.com/s?k=The+Art+of+Communicating',
      readingTime: '4 hours',
      related: [] as Related[]
    },
    {
      id: 'you-are-not-so-smart',
      title: 'You Are Not So Smart',
      author: 'David McRaney',
      year: '2011',
      isbn: '9781592407361',
      cover: '/api/placeholder/300/450',
      rating: 4,
      tags: ['Psychology', 'Cognitive Bias'],
      category: 'Psychology',
      summary:
        'Entertaining tour of cognitive biases that trip up our decision-making.',
      insights: [
        'Confirmation bias skews debugging and analysis',
        'Beware hindsight and survivorship bias in postmortems',
        'Write hypotheses; test, don’t assume',
        'Diverse feedback surfaces blind spots'
      ],
      whyItMatters:
        'Improves how I design experiments and review incidents.',
      buyUrl: 'https://www.amazon.com/s?k=You+Are+Not+So+Smart',
      readingTime: '5 hours',
      related: [] as Related[]
    },
    {
      id: 'crucial-conversations',
      title: 'Crucial Conversations',
      author: 'Patterson, Grenny, McMillan, Switzler',
      year: '2002',
      isbn: '9780071771320',
      cover: '/api/placeholder/300/450',
      rating: 4,
      tags: ['Conflict', 'Leadership'],
      category: 'Communication',
      summary:
        'Tools for high-stakes conversations where opinions vary and emotions run strong.',
      insights: [
        'Start with heart (shared purpose)',
        'Make it safe; watch for silence/violence',
        'STATE your path: facts → story → ask → talk tentatively → encourage testing',
        'Move to action with clear owners and timelines'
      ],
      whyItMatters:
        'Helps drive alignment during architecture and priority debates.',
      buyUrl: 'https://www.amazon.com/s?k=Crucial+Conversations',
      readingTime: '6 hours',
      related: [] as Related[]
    },
    {
      id: 'emotional-intelligence',
      title: 'Emotional Intelligence',
      author: 'Daniel Goleman',
      year: '1995',
      isbn: '9780553383713',
      cover: '/api/placeholder/300/450',
      rating: 4,
      tags: ['EQ', 'Self-awareness'],
      category: 'Psychology',
      summary:
        'Why emotional regulation, empathy, and social skills predict success beyond IQ.',
      insights: [
        'Self-regulation prevents reactive decisions',
        'Empathy strengthens teams and trust',
        'Motivation sustains long-term goals',
        'Social skills turn ideas into outcomes'
      ],
      whyItMatters:
        'Better collaboration and leadership under pressure.',
      buyUrl: 'https://www.amazon.com/s?k=Emotional+Intelligence+Daniel+Goleman',
      readingTime: '7 hours',
      related: [] as Related[]
    }
  ];

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(books.map((b) => b.category)))],
    [books]
  );

  const [activeCategory, setActiveCategory] = useState('All');

  const filteredBooks = activeCategory === 'All'
    ? books
    : books.filter((book) => book.category === activeCategory);

  const handleExternalLink = (url: string) => window.open(url, '_blank');

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
    ));

  // Robust sum of hours from strings like "12 hours", "5h", "15"
  const totalHours = books.reduce((acc, b) => {
    const n = parseFloat(String(b.readingTime).replace(/[^\d.]/g, ''));
    return acc + (isNaN(n) ? 0 : n);
  }, 0);

  const avgRating = (books.reduce((a, b) => a + b.rating, 0) / books.length).toFixed(1);

  // --- UI --------------------------------------------------------------------
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            My Reading <span className="gradient-text">Library</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Books that shaped how I build: practical ML, clean architecture, communication, and mindset.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <BookOpen className="w-5 h-5 text-gray-400" />
            <h2 className="text-2xl font-bold">Browse by Category</h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-violet-500 to-cyan-500 text-white shadow-lg'
                    : 'bg-white/5 border border-white/20 text-gray-300 hover:bg-white/10 hover:border-violet-500/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredBooks.map((book, index) => (
            <Dialog key={book.id}>
              <DialogTrigger asChild>
                <div
                  className="group relative cursor-pointer rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/20 overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Book Cover */}
                  <div className="relative aspect-[3/4] overflow-hidden">
  <BookCover
    title={book.title}
    author={book.author}
    isbn={book.isbn}  
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
  />

                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className="px-2 py-1 text-xs bg-gradient-to-r from-violet-500 to-cyan-500 text-white border-none">
                        {book.category}
                      </Badge>
                    </div>

                    {/* Reading time */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded bg-black/50 text-white text-xs">
                      <Clock className="w-3 h-3" />
                      {book.readingTime}
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-medium">View Details</span>
                    </div>
                  </div>

                  {/* Book Info */}
                  <div className="p-4">
                    <h3 className="font-bold mb-2 group-hover:text-white transition-colors duration-300 line-clamp-2">
                      {book.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1 text-sm text-gray-400">
                        <User className="w-3 h-3 text-gray-400" />
                        {book.author}
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className="text-sm text-gray-400">{book.year}</span>
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      {renderStars(book.rating)}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {book.tags.slice(0, 2).map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="outline"
                          className="px-2 py-0.5 text-xs bg-white/5 border-white/20 text-gray-400"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {book.tags.length > 2 && (
                        <Badge
                          variant="outline"
                          className="px-2 py-0.5 text-xs bg-violet-500/20 border-violet-500/50 text-violet-300"
                        >
                          +{book.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </div>
              </DialogTrigger>

              {/* Book Modal */}
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900/95 border-white/20 text-white">
                <div className="grid md:grid-cols-2 gap-8 p-6">
                  {/* Left: Book Cover & Basic Info */}
                  <div className="space-y-6">
                  <div className="relative aspect-[3/4] max-w-xs mx-auto">
  <BookCover
    title={book.title}
    author={book.author}
    isbn={book.isbn}  
    className="w-full h-full object-cover rounded-xl shadow-2xl"
  />
                    </div>
                    
                    <div className="text-center space-y-4">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
                        <p className="text-lg text-gray-300">by {book.author}</p>
                        <p className="text-gray-400">{book.year}</p>
                      </div>

                      <div className="flex justify-center items-center gap-1">
                        {renderStars(book.rating)}
                      </div>

                      <div className="flex flex-wrap justify-center gap-2">
                        {book.tags.map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            variant="outline"
                            className="px-3 py-1 bg-white/5 border-white/20 text-gray-300"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                        <Clock className="w-4 h-4" />
                        {book.readingTime}
                      </div>
                    </div>
                  </div>

                  {/* Right: Details & Insights */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-violet-400">Summary</h3>
                      <p className="text-gray-300 leading-relaxed">{book.summary}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3 text-cyan-400">Key Insights</h3>
                      <ul className="space-y-2">
                        {book.insights.map((insight, insightIndex) => (
                          <li key={insightIndex} className="flex items-start gap-2 text-sm text-gray-300">
                            <div className="w-1.5 h-1.5 bg-violet-400 rounded-full mt-2 flex-shrink-0" />
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3 text-emerald-400">Why It Matters</h3>
                      <p className="text-gray-300 leading-relaxed italic">"{book.whyItMatters}"</p>
                    </div>

                    {/* Related work */}
                    {'related' in book && Array.isArray((book as any).related) && (book as any).related.length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold mb-3 text-orange-400">Related Work</h3>
                        <div className="flex flex-wrap gap-2">
                          {(book as any).related.map((r: Related, i: number) => (
                            <Button
                              key={i}
                              variant="outline"
                              size="sm"
                              onClick={() => handleExternalLink(r.href)}
                              className="border-white/20 hover:border-violet-500/50 text-gray-300 hover:text-white"
                            >
                              <Github className="w-4 h-4 mr-2" />
                              {r.label}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 pt-2">
                      <Button
                        onClick={() => handleExternalLink((book as any).buyUrl)}
                        className="flex-1 bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Buy Book
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {/* No results message */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold mb-4">No books found</h3>
            <p className="text-gray-400">Try selecting a different category</p>
          </div>
        )}

        {/* Reading Stats */}
        <div className="mt-20 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Reading <span className="gradient-text">Stats</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">{books.length}</div>
              <div className="text-gray-400">Books Read</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">{categories.length - 1}</div>
              <div className="text-gray-400">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">{totalHours}h</div>
              <div className="text-gray-400">Reading Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">{avgRating}</div>
              <div className="text-gray-400">Avg Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
