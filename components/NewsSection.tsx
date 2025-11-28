
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useState } from 'react';
import { NEWS_ARTICLES } from '../constants';
import { JournalArticle } from '../types';
import { fetchFiscalNews } from '../services/geminiService';

const NewsSection: React.FC = () => {
  const [articles, setArticles] = useState<JournalArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadNews = async () => {
      try {
        const news = await fetchFiscalNews();
        if (mounted) {
          setArticles(news);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Failed to load news", err);
        if (mounted) {
           setArticles(NEWS_ARTICLES); // Fallback statico
           setIsLoading(false);
        }
      }
    };

    loadNews();

    return () => { mounted = false; };
  }, []);

  return (
    <section className="bg-white py-20 px-6 border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-end mb-12">
            <div>
                <span className="text-red-600 font-bold uppercase tracking-widest text-xs mb-2 block flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    Live Update
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-[#1A202C]">News in Primo Piano</h2>
            </div>
            <div className="hidden md:block text-sm text-gray-500 text-right">
                Aggiornamenti in tempo reale su<br/>
                Fisco, INPS, Lavoro e Famiglia
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoading ? (
                // SKELETON LOADING
                [1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                        <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </div>
                ))
            ) : (
                articles.map((news) => (
                    <div 
                        key={news.id} 
                        className="group cursor-pointer flex flex-col h-full"
                        onClick={() => {
                            if(news.url) window.open(news.url, '_blank');
                        }}
                    >
                        <div className="relative overflow-hidden rounded-xl mb-4 h-48 bg-gray-100">
                            <img 
                                src={news.image} 
                                alt={news.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                onError={(e) => {
                                    // Fallback image if Unsplash fails
                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800';
                                }}
                            />
                            <div className={`absolute top-4 left-4 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm ${
                                news.category === 'INPS' ? 'bg-blue-100/90 text-blue-800' :
                                news.category === 'Fisco' ? 'bg-green-100/90 text-green-800' :
                                news.category === 'Lavoro' ? 'bg-orange-100/90 text-orange-800' :
                                'bg-white/90 text-gray-800'
                            }`}>
                                {news.category || 'News'}
                            </div>
                        </div>
                        
                        <div className="flex-1 flex flex-col">
                            <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {news.date}
                                {news.url && (
                                    <span className="ml-auto text-blue-500 hover:underline flex items-center gap-1">
                                        Fonte esterna
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                        </svg>
                                    </span>
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-[#1A202C] mb-2 group-hover:text-[#2B6CB0] transition-colors leading-tight">
                                {news.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                {news.excerpt}
                            </p>
                        </div>
                    </div>
                ))
            )}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
