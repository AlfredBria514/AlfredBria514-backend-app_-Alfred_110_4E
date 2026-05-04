"use client";

import { useState } from "react";

export default function Home() {
  const [dbStatus, setDbStatus] = useState<"idle" | "loading" | "connected" | "error">("idle");
  const [dbInfo, setDbInfo] = useState<any>(null);

  const [dataStatus, setDataStatus] = useState<"idle" | "loading" | "connected" | "error">("idle");
  const [dataInfo, setDataInfo] = useState<any>(null);

  const testConnection = async () => {
    setDbStatus("loading");
    try {
      const res = await fetch("/api/health");
      const data = await res.json();
      if (data.status === "ok" || data.status === "success") {
        setDbStatus("connected");
        setDbInfo(data);
      } else {
        setDbStatus("error");
        setDbInfo(data);
      }
    } catch (error) {
      setDbStatus("error");
      setDbInfo({ message: "Network error", error: String(error) });
    }
  };

  const testDataRoute = async () => {
    setDataStatus("loading");
    try {
      const res = await fetch("/api/siswa");
      const data = await res.json();
      if (data.status === "ok" || data.status === "success") {
        setDataStatus("connected");
        setDataInfo(data);
      } else {
        setDataStatus("error");
        setDataInfo(data);
      }
    } catch (error) {
      setDataStatus("error");
      setDataInfo({ message: "Network error", error: String(error) });
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-neutral-950 to-neutral-950 -z-10"></div>
      
      <div className="max-w-2xl w-full bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/50">
            <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-300">
              Siswa Service
            </h1>
            <p className="text-neutral-400 mt-1 text-sm font-medium">Microservice Architecture</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-neutral-900/50 p-5 rounded-2xl border border-neutral-800">
            <h2 className="text-lg font-semibold mb-2 text-neutral-200">Tujuan Service Ini</h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Service ini dikhususkan untuk mengelola <strong>Data Siswa (Students)</strong>. 
              Service ini menangani pendaftaran siswa, rekam akademik, dan informasi terkait siswa lainnya, beroperasi di Port <code className="bg-black/50 px-2 py-0.5 rounded text-indigo-300">3002</code>.
            </p>
          </div>

          <div className="bg-neutral-900/50 p-5 rounded-2xl border border-neutral-800">
            <h2 className="text-lg font-semibold mb-4 text-neutral-200">Test Konfigurasi & Koneksi</h2>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={testConnection}
                disabled={dbStatus === "loading"}
                className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 transition-all duration-300 rounded-xl font-medium shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
              >
                {dbStatus === "loading" ? "Loading..." : "Test Koneksi Neon DB"}
              </button>

              <button 
                onClick={testDataRoute}
                disabled={dataStatus === "loading"}
                className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 transition-all duration-300 rounded-xl font-medium shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2"
              >
                {dataStatus === "loading" ? "Loading..." : "Test Data Route"}
              </button>
            </div>

            {/* DB Health Response */}
            {dbStatus !== "idle" && (
              <div className={`mt-4 p-4 rounded-xl border transition-all duration-500 ${dbStatus === 'connected' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full ${dbStatus === 'connected' ? 'bg-emerald-400' : 'bg-red-400'} animate-pulse`}></div>
                  <span className="font-semibold text-sm uppercase tracking-wide">
                    {dbStatus === 'connected' ? 'Response Koneksi Database:' : 'Error Koneksi Database:'}
                  </span>
                </div>
                {dbInfo && (
                  <pre className="text-sm bg-black/40 p-4 rounded-lg overflow-x-auto text-emerald-300 mt-2 font-mono border border-white/5 whitespace-pre-wrap">
                    {dbInfo.message}
                  </pre>
                )}
              </div>
            )}

            {/* Data Route Response */}
            {dataStatus !== "idle" && (
              <div className={`mt-4 p-4 rounded-xl border transition-all duration-500 bg-indigo-500/10 border-indigo-500/20 text-indigo-400`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full bg-indigo-400 animate-pulse`}></div>
                  <span className="font-semibold text-sm uppercase tracking-wide">
                    Response Data Route:
                  </span>
                </div>
                {dataInfo && (
                  <pre className="text-sm bg-black/40 p-4 rounded-lg overflow-x-auto text-indigo-300 mt-2 font-mono border border-white/5 whitespace-pre-wrap">
                    {dataInfo.message}
                  </pre>
                )}
              </div>
            )}
          </div>

          <div className="bg-neutral-900/50 p-5 rounded-2xl border border-neutral-800">
            <h2 className="text-lg font-semibold mb-3 text-neutral-200">API Route Tersedia</h2>
            <div className="flex flex-col gap-2">
              <a href="/api/health" target="_blank" className="flex items-center justify-between p-3 bg-black/40 hover:bg-neutral-800 transition-colors rounded-xl border border-neutral-800/50 group">
                <span className="font-mono text-sm text-emerald-400">GET /api/health</span>
                <span className="text-xs text-neutral-500 group-hover:text-neutral-300 transition-colors">Test Koneksi Neon DB</span>
              </a>
              <a href="/api/siswa" target="_blank" className="flex items-center justify-between p-3 bg-black/40 hover:bg-neutral-800 transition-colors rounded-xl border border-neutral-800/50 group">
                <span className="font-mono text-sm text-indigo-400">GET /api/siswa</span>
                <span className="text-xs text-neutral-500 group-hover:text-neutral-300 transition-colors">Data Khusus Siswa</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
