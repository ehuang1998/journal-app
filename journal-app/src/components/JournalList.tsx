'use client';

import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '../lib/utils';

interface Journal {
  id: string;
  title: string;
  content: string;
  mood: string;
  createdAt: string;
}

export function JournalList() {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJournals() {
      try {
        const response = await fetch('/api/journals');
        if (response.ok) {
          const data = await response.json();
          setJournals(data);
        }
      } catch (error) {
        console.error('Error fetching journals:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchJournals();
  }, []);

  if (loading) {
    return (
      <div className="p-4 sm:px-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      <div className="p-4 sm:px-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Recent Entries
          </h3>
        </div>
      </div>
      {journals.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-sm text-gray-500">No journal entries yet.</p>
        </div>
      ) : (
        <ul role="list" className="divide-y divide-gray-100">
          {journals.map((journal) => (
            <li
              key={journal.id}
              className="flex items-center justify-between gap-x-6 py-5 px-4 sm:px-6"
            >
              <div className="min-w-0">
                <div className="flex items-start gap-x-3">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {journal.title}
                  </p>
                  <p
                    className={cn(
                      'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                      getMoodStyle(journal.mood)
                    )}
                  >
                    {journal.mood}
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                  <p className="truncate">{journal.content}</p>
                  <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <p className="whitespace-nowrap">
                    {formatDistanceToNow(new Date(journal.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
              <div className="flex flex-none items-center gap-x-4">
                <a
                  href={`/journal/${journal.id}`}
                  className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                >
                  View
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function getMoodStyle(mood: string) {
  const styles = {
    HAPPY: 'text-green-700 bg-green-50 ring-green-600/20',
    EXCITED: 'text-purple-700 bg-purple-50 ring-purple-600/20',
    GRATEFUL: 'text-blue-700 bg-blue-50 ring-blue-600/20',
    RELAXED: 'text-teal-700 bg-teal-50 ring-teal-600/20',
    NEUTRAL: 'text-gray-700 bg-gray-50 ring-gray-600/20',
    ANXIOUS: 'text-yellow-700 bg-yellow-50 ring-yellow-600/20',
    STRESSED: 'text-orange-700 bg-orange-50 ring-orange-600/20',
    SAD: 'text-blue-700 bg-blue-50 ring-blue-600/20',
    ANGRY: 'text-red-700 bg-red-50 ring-red-600/20',
  };
  return styles[mood as keyof typeof styles] || styles.NEUTRAL;
} 