import React from 'react';
import { AppView } from '../types';

interface TopBarProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ currentView, onChangeView }) => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 lg:px-8">
      <div className="flex items-center gap-4 md:hidden">
        <button className="text-gray-500 hover:text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="font-bold text-blue-800">CAF Online</span>
      </div>

      <div className="hidden md:block">
        <h1 className="text-lg font-semibold text-gray-800">
          {currentView === AppView.DASHBOARD && 'Panoramica Servizi'}
          {currentView === AppView.IMAGE_GENERATOR && 'Studio Creativo AI (Pro)'}
          {currentView === AppView.IMAGE_EDITOR && 'Editor Assistito AI'}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold border border-blue-200">
          U
        </div>
      </div>
    </header>
  );
};
