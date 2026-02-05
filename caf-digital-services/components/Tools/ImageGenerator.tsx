import React, { useState } from 'react';
import { generateImagePro, checkAndSelectApiKey } from '../../services/geminiService';
import { ImageSize } from '../../types';

export const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<ImageSize>('1K');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError(null);

    try {
      // API Key check required for Pro model
      await checkAndSelectApiKey();
      
      const images = await generateImagePro(prompt, size);
      setGeneratedImages(images);
    } catch (err) {
      setError("Si è verificato un errore durante la generazione. Assicurati di aver selezionato una chiave API valida.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Generazione Immagini Pro</h2>
          <p className="text-sm text-gray-500">Utilizza il modello Gemini 3 Pro per creare immagini ad alta risoluzione (fino a 4K).</p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">Descrizione Immagine</label>
            <textarea
              id="prompt"
              rows={3}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-3"
              placeholder="Descrivi l'immagine che vuoi generare in dettaglio..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Risoluzione</label>
            <div className="flex gap-4">
              {(['1K', '2K', '4K'] as ImageSize[]).map((s) => (
                <label key={s} className={`
                  relative flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg cursor-pointer border transition-all
                  ${size === s ? 'bg-blue-50 border-blue-500 text-blue-700 ring-1 ring-blue-500' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}
                `}>
                  <input
                    type="radio"
                    name="size"
                    value={s}
                    checked={size === s}
                    onChange={() => setSize(s)}
                    className="sr-only"
                  />
                  <span>{s}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || !prompt}
              className={`
                w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white 
                ${loading || !prompt ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}
              `}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Elaborazione in corso...
                </span>
              ) : 'Genera Immagine'}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">
            {error}
          </div>
        )}
      </div>

      {generatedImages.length > 0 && (
        <div className="grid grid-cols-1 gap-6">
          {generatedImages.map((img, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="aspect-square w-full rounded-lg overflow-hidden bg-gray-100 border border-gray-100">
                <img src={img} alt={`Generated ${idx}`} className="w-full h-full object-contain" />
              </div>
              <div className="mt-4 flex justify-end">
                <a 
                  href={img} 
                  download={`caf-generated-${Date.now()}.png`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Scarica PNG
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
