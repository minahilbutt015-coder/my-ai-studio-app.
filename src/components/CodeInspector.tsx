import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, CheckCircle2 } from 'lucide-react';
import { COMPOSE_CODE_SNIPPETS } from '../data/composeCode';
import { CodeTab } from '../types';

export const CodeInspector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CodeTab>('AuthScreen');
  const [copied, setCopied] = useState(false);

  const currentSnippet = COMPOSE_CODE_SNIPPETS[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([currentSnippet.code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = currentSnippet.filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const tabs: { id: CodeTab; label: string }[] = [
    { id: 'AuthScreen', label: 'AuthScreen.kt' },
    { id: 'LoginForm', label: 'LoginForm.kt' },
    { id: 'RegisterForm', label: 'RegisterForm.kt' },
    { id: 'AuthViewModel', label: 'AuthViewModel.kt' },
    { id: 'Theme', label: 'Theme.kt' }
  ];

  return (
    <div className="flex flex-col h-full bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden text-left shadow-xl">
      {/* Top File Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-slate-800 text-indigo-300 font-semibold border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors cursor-pointer"
            title="Download file"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Kotlin Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Description Header */}
      <div className="px-4 py-2 bg-indigo-950/20 border-b border-indigo-900/20 text-xs text-indigo-200 flex items-center justify-between">
        <span className="font-mono text-slate-400 text-[11px]">
          {currentSnippet.filename} · AndroidX Compose M3
        </span>
        <span className="text-[11px] text-slate-400">
          {currentSnippet.description}
        </span>
      </div>

      {/* Code Editor Body with line numbers */}
      <div className="flex-1 overflow-auto p-4 font-mono text-xs text-slate-300 leading-relaxed bg-slate-950/80">
        <pre className="overflow-x-auto whitespace-pre">
          <code>
            {currentSnippet.code.split('\n').map((line, idx) => (
              <div key={idx} className="table-row hover:bg-slate-800/30">
                <span className="table-cell select-none text-right pr-4 text-slate-600 text-[11px] w-8">
                  {idx + 1}
                </span>
                <span className="table-cell pl-1">{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>

      {/* Compose Best Practice Highlights */}
      <div className="p-3 bg-slate-900/90 border-t border-slate-800 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>
            Uses <code className="text-indigo-300">rememberSaveable</code> for password visibility retention across screen rotations.
          </span>
        </div>
        <div className="text-[11px] text-slate-500 font-mono">
          androidx.compose.material3:material3:1.3.1
        </div>
      </div>
    </div>
  );
};
