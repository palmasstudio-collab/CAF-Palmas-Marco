import React from 'react';
import { AppView } from '../types';

interface DashboardProps {
    onChangeView: (view: AppView) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onChangeView }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center py-16">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
           <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
           </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Benvenuto nel Portale CAF</h2>
        <p className="text-gray-500 max-w-lg mx-auto mb-8">
          Seleziona uno degli strumenti di elaborazione digitale dal menu laterale per iniziare. Il sistema è pronto per l'assistenza fiscale e l'elaborazione documentale avanzata.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <button 
                onClick={() => onChangeView(AppView.IMAGE_GENERATOR)}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group text-left"
            >
                <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mr-4 group-hover:bg-indigo-200 transition-colors">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900">Generazione Immagini</h3>
                    <p className="text-xs text-gray-500 mt-1">Crea visualizzazioni professionali 4K</p>
                </div>
            </button>

            <button 
                onClick={() => onChangeView(AppView.IMAGE_EDITOR)}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group text-left"
            >
                <div className="h-10 w-10 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 mr-4 group-hover:bg-teal-200 transition-colors">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900">Modifica Assistita</h3>
                    <p className="text-xs text-gray-500 mt-1">Ritocco immagini con linguaggio naturale</p>
                </div>
            </button>
        </div>
      </div>
    </div>
  );
};
