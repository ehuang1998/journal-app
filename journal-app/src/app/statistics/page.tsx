import { Navigation } from '@/components/Navigation';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getStatistics() {
  try {
    const totalEntries = await prisma.journal.count();
    
    const moodDistribution = await prisma.journal.groupBy({
      by: ['mood'],
      _count: true,
    });

    const lastWeekEntries = await prisma.journal.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    });

    return {
      totalEntries,
      moodDistribution,
      lastWeekEntries,
    };
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return {
      totalEntries: 0,
      moodDistribution: [],
      lastWeekEntries: 0,
    };
  }
}

export default async function StatisticsPage() {
  const stats = await getStatistics();

  return (
    <div className="min-h-full">
      <Navigation />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-6">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Journal Statistics
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Insights about your journaling habits
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Total Entries Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Entries
                        </dt>
                        <dd className="text-3xl font-semibold text-gray-900">
                          {stats.totalEntries}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              {/* Last Week Entries Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Entries Last Week
                        </dt>
                        <dd className="text-3xl font-semibold text-gray-900">
                          {stats.lastWeekEntries}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mood Distribution */}
            <div className="mt-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                Mood Distribution
              </h3>
              <div className="bg-white shadow rounded-lg p-6">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {stats.moodDistribution.map((mood) => (
                    <div key={mood.mood} className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-2 ${getMoodColor(
                          mood.mood
                        )}`}
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {mood.mood}
                        </p>
                        <p className="text-sm text-gray-500">
                          {mood._count} entries
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function getMoodColor(mood: string) {
  const colors = {
    HAPPY: 'bg-green-500',
    EXCITED: 'bg-purple-500',
    GRATEFUL: 'bg-blue-500',
    RELAXED: 'bg-teal-500',
    NEUTRAL: 'bg-gray-500',
    ANXIOUS: 'bg-yellow-500',
    STRESSED: 'bg-orange-500',
    SAD: 'bg-blue-500',
    ANGRY: 'bg-red-500',
  };
  return colors[mood as keyof typeof colors] || colors.NEUTRAL;
} 