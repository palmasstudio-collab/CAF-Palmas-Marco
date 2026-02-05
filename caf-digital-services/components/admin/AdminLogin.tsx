import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: (password: string) => boolean;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(password);
    if (!success) {
      setError(true);
    }
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        <div className="text-center mb-6">
            <div className="w-16 h-16 bg-[#1A365D] rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#1A202C]">Area Admin</h2>
            <p className="text-gray-500 text-sm mt-2">Inserisci la password per accedere al pannello di controllo.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
             <input 
                type="password" 
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${error ? 'border-red-500 ring-red-100' : 'border-gray-300 focus:border-[#2B6CB0] focus:ring-blue-100'}`}
                placeholder="Password"
             />
             {error && <span className="text-red-500 text-xs mt-1 block">Password non corretta. Riprova.</span>}
          </div>
          <button 
            type="submit" 
            className="w-full bg-[#2B6CB0] text-white py-3 rounded-lg font-bold hover:bg-[#2C5282] transition-colors"
          >
            Accedi
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;