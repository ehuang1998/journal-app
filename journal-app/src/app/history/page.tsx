import { Navigation } from '@/components/Navigation';
import { PrismaClient } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';

const prisma = new PrismaClient();

async function getJournals() {
  try {
    const journals = await prisma.journal.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return journals;
  } catch (error) {
    console.error('Error fetching journals:', error);
    return [];
  }
}

export default async function HistoryPage() {
  const journals = await getJournals();

  return (
    <div className="min-h-full">
      <Navigation />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-6">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Journal History
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                A complete history of your journal entries
              </p>
            </div>

            <div className="bg-white shadow sm:rounded-lg">
              <ul role="list" className="divide-y divide-gray-100">
                {journals.map((journal) => (
                  <li
                    key={journal.id}
                    className="flex items-center justify-between gap-x-6 p-5"
                  >
                    <div className="min-w-0">
                      <div className="flex items-start gap-x-3">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {journal.title}
                        </p>
                        <p className="rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset text-green-700 bg-green-50 ring-green-600/20">
                          {journal.mood}
                        </p>
                      </div>
                      <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                        <p className="truncate">{journal.content}</p>
                        <svg
                          viewBox="0 0 2 2"
                          className="h-0.5 w-0.5 fill-current"
                        >
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
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        View details
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 