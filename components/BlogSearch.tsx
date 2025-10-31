'use client';

import { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
}

interface BlogSearchProps {
  posts: PostMeta[];
}

export default function BlogSearch({ posts }: BlogSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Initialize Fuse.js with posts
  const fuse = useMemo(() => {
    return new Fuse(posts, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'description', weight: 0.3 },
        { name: 'slug', weight: 0.3 },
      ],
      threshold: 0.3, // Lower threshold = more strict matching
      includeScore: true,
      includeMatches: true,
    });
  }, [posts]);

  // Search results
  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).slice(0, 5); // Limit to 5 results
  }, [fuse, query]);

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(e.target.value.length > 0);
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.search-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="search-container relative w-full max-w-md">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search blog posts..."
          value={query}
          onChange={handleSearch}
          className="w-full px-4 py-3 pl-12 pr-4 text-text bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-200"
          onFocus={() => query && setIsOpen(true)}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-text/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-text/60 hover:text-text transition-colors"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto"
          >
            {results.map((result, index) => (
              <Link
                key={result.item.slug}
                href={`/blog/${result.item.slug}`}
                className="block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                onClick={() => {
                  setQuery('');
                  setIsOpen(false);
                }}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-secondary rounded-full mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-text truncate">
                      {result.item.title}
                    </h4>
                    <p className="text-xs text-text/70 mt-1 line-clamp-2">
                      {result.item.description}
                    </p>
                    <p className="text-xs text-text/50 mt-1">
                      {new Date(result.item.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        )}

        {isOpen && query && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4 text-center"
          >
            <p className="text-sm text-text/60">No blog posts found for "{query}"</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}