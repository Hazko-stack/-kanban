import Link from 'next/link';
import { LayoutGrid } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <LayoutGrid className="h-8 w-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">かおり kanban</h1>
        </div>
        <nav>
          <Link href="/kanban" className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
            Launch App
          </Link>
        </nav>
      </div>
    </header>
  );
}