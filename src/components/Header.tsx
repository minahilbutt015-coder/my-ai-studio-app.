import React from 'react';
import { Smartphone, Code2, Sparkles, Copy, Check } from 'lucide-react';

interface HeaderProps {
  activeView: 'simulator' | 'code' | 'prompt' | 'inspector';
  onSelectView: (view: 'simulator' | 'code' | 'prompt' | 'inspector') => void;
  onCopyPrompt: () => void;
  promptCopied: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onSelectView,
  onCopyPrompt,
  promptCopied
}) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3.5 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Zone 1: Single text element wordmark */}
      <a 
        href="#" 
        onClick={(e) => { e.preventDefault(); onSelectView('simulator'); }}
        className="flex items-center gap-2.5 text-slate-100 group"
      >
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/30 transition-colors">
          <Smartphone className="w-4 h-4" />
        </div>
        <span className="text-base font-bold tracking-tight text-white">
          ComposeAuth Studio
        </span>
      </a>

      {/* Zone 2: 4-6 clean text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
        <button
          onClick={() => onSelectView('simulator')}
          className={`transition-colors hover:text-slate-100 ${
            activeView === 'simulator' ? 'text-indigo-400 font-semibold' : ''
          }`}
        >
          Device Preview
        </button>
        <button
          onClick={() => onSelectView('code')}
          className={`transition-colors hover:text-slate-100 ${
            activeView === 'code' ? 'text-indigo-400 font-semibold' : ''
          }`}
        >
          Compose Kotlin Code
        </button>
        <button
          onClick={() => onSelectView('prompt')}
          className={`transition-colors hover:text-slate-100 ${
            activeView === 'prompt' ? 'text-indigo-400 font-semibold' : ''
          }`}
        >
          AI Prompt Studio
        </button>
        <button
          onClick={() => onSelectView('inspector')}
          className={`transition-colors hover:text-slate-100 ${
            activeView === 'inspector' ? 'text-indigo-400 font-semibold' : ''
          }`}
        >
          State Inspector
        </button>
      </nav>

      {/* Zone 3: 1-2 primary actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={onCopyPrompt}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 active:scale-95 transition-all shadow-sm shadow-indigo-950 whitespace-nowrap cursor-pointer"
        >
          {promptCopied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-300" />
              <span>Prompt Copied!</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
              <span>Copy Master Prompt</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
