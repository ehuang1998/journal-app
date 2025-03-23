import { Navigation } from '@/components/Navigation';
import { AddJournalButton } from '@/components/AddJournalButton';
import { JournalList } from '@/components/JournalList';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-full">
      <Navigation />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Your Journal
              </h2>
              <AddJournalButton />
            </div>
            <div className="bg-white shadow sm:rounded-lg">
              <JournalList />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 