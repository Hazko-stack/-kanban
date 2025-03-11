'use client';

import Link from 'next/link';
import { ArrowRight, ListTodo, LayoutGrid, Check } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
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

      {/* Hero Section */}
      <section className="flex-grow bg-gradient-to-br from-indigo-100 to-purple-100 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-6">
                Organize Your Work with Ease
              </h2>
              <p className="text-lg text-gray-700 mb-8">
              かおり kanban helps you manage your projects efficiently with a simple drag-and-drop Kanban board. Create tasks, organize workflows, and boost your productivity.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-700">Drag and drop task management</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-700">Automatic storage in your browser</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-700">Works on mobile and desktop devices</p>
                </div>
              </div>
              <p className="text-lg text-gray-700 mb-10 mt-5">
              Proudly crafted by Kaori.
              </p>
              <div className="mt-10">
                <Link href="/kanban" className="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-4 rounded-lg shadow-xl">
                <div className="flex space-x-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex justify-around p-4 bg-gray-50 rounded-md">
                  <div className="w-1/3 bg-blue-50 rounded-md p-3 mx-1">
                    <div className="bg-blue-500 text-white text-sm font-medium rounded py-1 px-2 mb-3">To Do</div>
                    <div className="bg-white p-2 rounded shadow-sm mb-2">Project planning</div>
                    <div className="bg-white p-2 rounded shadow-sm mb-2">UX research</div>
                    <div className="bg-white p-2 rounded shadow-sm">Content writing</div>
                  </div>
                  <div className="w-1/3 bg-amber-50 rounded-md p-3 mx-1">
                    <div className="bg-amber-500 text-white text-sm font-medium rounded py-1 px-2 mb-3">In Progress</div>
                    <div className="bg-white p-2 rounded shadow-sm mb-2">UI design</div>
                    <div className="bg-white p-2 rounded shadow-sm">Frontend dev</div>
                  </div>
                  <div className="w-1/3 bg-green-50 rounded-md p-3 mx-1">
                    <div className="bg-green-500 text-white text-sm font-medium rounded py-1 px-2 mb-3">Done</div>
                    <div className="bg-white p-2 rounded shadow-sm mb-2">Wireframing</div>
                    <div className="bg-white p-2 rounded shadow-sm">Project setup</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <ListTodo className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexible Task Management</h3>
              <p className="text-gray-700">Create, edit, and delete tasks with ease. Organize them into custom columns based on your workflow.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow-md">
              <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <LayoutGrid className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Customizable Boards</h3>
              <p className="text-gray-700">Add new columns, rename them, and reorder everything to match your project&apos;s unique requirements. </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-lg shadow-md">
              <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Persistent Storage</h3>
              <p className="text-gray-700">Your board is automatically saved to your browser&apos;s local storage, so your work is never lost.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Organized?</h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">Start using our Kanban board today and experience the difference in your productivity.</p>
          <Link href="/kanban" className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-indigo-600 font-medium hover:bg-gray-100 transition-colors">
            Go to Kanban Board
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <LayoutGrid className="h-6 w-6 text-indigo-400" />
              <span className="text-xl font-semibold text-white">かおり kanban</span>
            </div>
            <div className="text-sm">
              &copy; {new Date().getFullYear()} かおり kanban. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}