// app/page.tsx
'use client';

import { useEffect, useState } from 'react';

interface Comment {
  id: number;
  number: number;
  document: string;
  created_at: string;
  vote_count: number;
}

interface RawPost {
  id: number;
  title: string;
  document: string;
  category: string;
  view_count: number;
  vote_count: number;
  reply_count: number;
  unique_view_count: number;
  created_at: string;
  comments: Comment[];
}

interface Post {
  thread_id: number;
  title: string;
  author_name: string;
  author_role: string;
  created_at: string;
  category: string;
  status: string | null;
  raw: RawPost;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      const response = await fetch('/data.jsonl');
      if (!response.ok) {
        throw new Error('Failed to load data.jsonl');
      }
      
      const content = await response.text();
      const lines = content.trim().split('\n');
      const parsedPosts = lines.map(line => JSON.parse(line));
      
      setPosts(parsedPosts);
      setLoading(false);
    } catch (err) {
      setError(`Error loading posts: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setLoading(false);
    }
  }

  const totalComments = posts.reduce((sum, post) => sum + (post.raw?.comments?.length || 0), 0);
  const totalViews = posts.reduce((sum, post) => sum + (post.raw?.view_count || 0), 0);

  function formatDate(dateString: string) {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen from-purple-600 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen from-purple-600 to-purple-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">📚 Forum Posts Viewer</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-purple-600">
              <div className="text-gray-600 text-sm mb-1">Total Posts</div>
              <div className="text-3xl font-bold text-gray-800">{posts.length}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-purple-600">
              <div className="text-gray-600 text-sm mb-1">Total Comments</div>
              <div className="text-3xl font-bold text-gray-800">{totalComments}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-purple-600">
              <div className="text-gray-600 text-sm mb-1">Total Views</div>
              <div className="text-3xl font-bold text-gray-800">{totalViews.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {posts.map((post) => {
            const raw = post.raw || {};
            const comments = raw.comments || [];

            return (
              <div
                key={post.thread_id}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
                  <h2 className="text-2xl font-bold text-gray-800 flex-1 min-w-[200px]">
                    {post.title || 'Untitled'}
                  </h2>
                  <div className="flex gap-2 flex-wrap">
                    {post.category && (
                      <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-semibold uppercase">
                        {post.category}
                      </span>
                    )}
                    {post.status && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold uppercase">
                        {post.status}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <span className="font-semibold">{post.author_name || 'Anonymous'}</span>
                  {post.author_role && (
                    <span className="text-gray-500 text-sm">• {post.author_role}</span>
                  )}
                  <span className="text-gray-400 text-sm">• {formatDate(post.created_at)}</span>
                </div>

                {raw.document && (
                  <div className="text-gray-600 leading-relaxed mb-4">
                    {raw.document.substring(0, 500)}
                    {raw.document.length > 500 ? '...' : ''}
                  </div>
                )}

                <div className="flex flex-wrap gap-6 pt-4 border-t border-gray-200 text-gray-600 text-sm">
                  <span className="flex items-center gap-1">
                    👁️ {raw.view_count || 0} views
                  </span>
                  <span className="flex items-center gap-1">
                    ⭐ {raw.vote_count || 0} votes
                  </span>
                  <span className="flex items-center gap-1">
                    💬 {raw.reply_count || 0} replies
                  </span>
                  <span className="flex items-center gap-1">
                    🔍 {raw.unique_view_count || 0} unique views
                  </span>
                </div>

                {comments.length > 0 && (
                  <div className="mt-6 pt-6 border-t-2 border-gray-200">
                    <div className="font-semibold text-gray-800 mb-4">
                      💬 {comments.length} Comment{comments.length > 1 ? 's' : ''}
                    </div>
                    <div className="space-y-3">
                      {comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="bg-gray-50 p-4 rounded-lg border-l-4 border-purple-600"
                        >
                          <div className="font-semibold text-gray-800 mb-2">
                            Comment #{comment.number}
                          </div>
                          <div className="text-gray-600 leading-relaxed">
                            {comment.document || 'No content'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// // app/layout.tsx
// import type { Metadata } from 'next';
// import './globals.css';

// export const metadata: Metadata = {
//   title: 'Forum Posts Viewer',
//   description: 'View and browse forum posts from JSONL data',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   );
// }
