import React, { useState } from 'react';

interface CaptionResponse {
    captions: string[];
    hashtags: string[];
}

function App() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [style, setStyle] = useState<string>('Funny');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<CaptionResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setResult(null);
            setError(null);
        }
    };

    const handleSubmit = async () => {
        if (!file) return;

        setLoading(true);
        setError(null);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('style', style);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const response = await fetch(`${apiUrl}/api/generate_caption`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to generate captions');
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col font-sans text-white selection:bg-primary selection:text-dark">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center">
                <div className="flex items-center space-x-2 animate-float">
                    <span className="text-2xl font-bold font-display tracking-tight text-white">
                        Insta<span className="text-primary">Caption</span>
                    </span>
                </div>
                <div className="flex space-x-6">
                    <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Sign In</button>
                    <button className="bg-primary hover:bg-primary-hover text-dark px-5 py-2 rounded-full text-sm font-bold transition-all shadow-[0_0_15px_rgba(138,180,248,0.3)] hover:shadow-[0_0_25px_rgba(138,180,248,0.5)]">
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-center px-4 relative z-10 pt-20">

                {/* Hero Text */}
                <div className="text-center space-y-6 mb-16 animate-float-delayed">
                    <h1 className="text-6xl md:text-8xl font-bold font-display tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
                        Defy Gravity.
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
                        Elevate your social media presence with AI-powered captions that float above the noise.
                    </p>
                </div>

                {/* The "Anti-Gravity" Input Bar */}
                <div className="w-full max-w-4xl relative group animate-float">
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full opacity-20 group-hover:opacity-40 blur-xl transition duration-700"></div>

                    <div className="relative bg-surface/80 backdrop-blur-xl border border-white/10 rounded-full p-3 flex items-center shadow-2xl transition-transform transform group-hover:scale-[1.01]">

                        {/* Upload Button */}
                        <label className="flex-shrink-0 cursor-pointer">
                            <div className="flex items-center space-x-3 bg-dark/50 hover:bg-white/10 px-6 py-4 rounded-full transition-all border border-white/5 group/btn">
                                <svg className="w-5 h-5 text-primary group-hover/btn:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                <span className="text-sm font-medium text-gray-300 group-hover/btn:text-white transition-colors">
                                    {file ? file.name.substring(0, 15) + '...' : 'Upload Image'}
                                </span>
                            </div>
                            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                        </label>

                        {/* Style Selector */}
                        <div className="flex-grow px-4 relative">
                            <select
                                value={style}
                                onChange={(e) => setStyle(e.target.value)}
                                className="w-full bg-transparent text-white text-lg font-medium focus:outline-none cursor-pointer appearance-none text-center hover:text-primary transition-colors"
                            >
                                <option value="Funny" className="bg-surface text-gray-300">Funny & Witty</option>
                                <option value="Inspirational" className="bg-surface text-gray-300">Inspirational</option>
                                <option value="Short & Punchy" className="bg-surface text-gray-300">Short & Punchy</option>
                            </select>
                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        {/* Launch Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={!file || loading}
                            className="flex-shrink-0 bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent text-dark px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(138,180,248,0.4)] hover:shadow-[0_0_30px_rgba(197,138,249,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                        >
                            {loading ? (
                                <span className="flex items-center space-x-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Launching...</span>
                                </span>
                            ) : (
                                'Launch'
                            )}
                        </button>
                    </div>

                    {error && (
                        <div className="absolute -bottom-16 left-0 right-0 flex justify-center">
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-2 rounded-full text-sm backdrop-blur-md">
                                {error}
                            </div>
                        </div>
                    )}
                </div>

                {/* Results Section */}
                {(preview || result) && (
                    <div className="mt-24 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start animate-fade-in-up pb-20">

                        {/* Floating Image Card */}
                        <div className="relative group perspective-1000">
                            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            <div className="relative bg-surface/50 backdrop-blur-md border border-white/10 rounded-[2rem] p-4 shadow-2xl transform transition-transform duration-500 hover:rotate-1 hover:scale-[1.02]">
                                {preview && (
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-full h-auto rounded-2xl object-cover"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Floating Captions */}
                        <div className="space-y-6">
                            {result ? (
                                <>
                                    <div className="space-y-4">
                                        {result.captions.map((caption, idx) => (
                                            <div
                                                key={idx}
                                                className="group relative bg-surface/40 backdrop-blur-sm border border-white/5 hover:border-primary/30 rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-pointer"
                                                onClick={() => navigator.clipboard.writeText(caption)}
                                            >
                                                <p className="text-lg text-gray-200 font-light leading-relaxed">{caption}</p>
                                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded">Copy</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-3 pt-4">
                                        {result.hashtags.map((tag, idx) => (
                                            <span key={idx} className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-all cursor-default">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center animate-spin-slow">
                                        <span className="text-2xl">🪐</span>
                                    </div>
                                    <p className="text-gray-500 font-light">Waiting for launch sequence...</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
