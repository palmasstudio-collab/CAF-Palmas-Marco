import React, { useState, useRef } from 'react';
import { editImageFlash } from '../../services/geminiService';

export const ImageEditor: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/png');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultImages, setResultImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMimeType(file.type);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResultImages([]); // Reset results on new image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !selectedImage) return;

    setLoading(true);
    setError(null);

    try {
      const images = await editImageFlash(selectedImage, mimeType, prompt);
      setResultImages(images);
    } catch (err) {
      setError("Errore durante la modifica dell'immagine. Riprova.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Editor Intelligente</h2>
          <p className="text-sm text-gray-500">Modifica le tue immagini usando il linguaggio naturale con Gemini 2.5 Flash.</p>
        </div>

        <form onSubmit={handleEdit} className="space-y-6">
          {/* Image Upload Area */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Immagine Originale</label>
            <div 
              className={`
                mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors
                ${selectedImage ? 'border-blue-300 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
              `}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="space-y-1 text-center">
                {selectedImage ? (
                  <div className="relative">
                    <img src={selectedImage} alt="Preview" className="max-h-64 mx-auto rounded-md shadow-sm" />
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(null);
                        setResultImages([]);
                        if(fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ) : (
                  <>
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <span className="relative cursor-pointer bg-transparent rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                        Carica un file
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG fino a 10MB</p>
                  </>
                )}
                <input 
                  ref={fileInputRef}
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="edit-prompt" className="block text-sm font-medium text-gray-700 mb-1">Istruzioni di Modifica</label>
            <div className="relative">
              <input
                id="edit-prompt"
                type="text"
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-3 pl-10"
                placeholder='Esempio: "Aggiungi un filtro vintage" o "Rimuovi la persona sullo sfondo"'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || !prompt || !selectedImage}
              className={`
                w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white 
                ${loading || !prompt || !selectedImage ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
              `}
            >
              {loading ? 'Elaborazione...' : 'Applica Modifiche'}
            </button>
          </div>
        </form>
         {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">
            {error}
          </div>
        )}
      </div>

      {resultImages.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fade-in">
          <h3 className="text-md font-semibold text-gray-900 mb-4">Risultato</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Prima</p>
                 <img src={selectedImage!} alt="Original" className="w-full rounded-lg border border-gray-200" />
              </div>
              <div className="space-y-2">
                 <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Dopo</p>
                 {resultImages.map((img, idx) => (
                   <div key={idx} className="relative group">
                     <img src={img} alt={`Edited ${idx}`} className="w-full rounded-lg border border-gray-200 shadow-sm" />
                      <a 
                        href={img} 
                        download={`caf-edited-${Date.now()}.png`}
                        className="absolute bottom-2 right-2 bg-white/90 p-2 rounded-lg text-gray-700 shadow-sm hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      </a>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
