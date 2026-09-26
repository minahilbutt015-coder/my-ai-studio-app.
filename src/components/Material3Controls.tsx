import React from 'react';
import { Sun, Moon, Palette, Sliders, Sparkles } from 'lucide-react';
import { ThemeConfig, ColorPalette } from '../types';

interface Material3ControlsProps {
  theme: ThemeConfig;
  onChangeTheme: (theme: ThemeConfig) => void;
}

export const Material3Controls: React.FC<Material3ControlsProps> = ({
  theme,
  onChangeTheme
}) => {
  const palettes: { id: ColorPalette; name: string; hex: string }[] = [
    { id: 'blue', name: 'Google Blue', hex: '#3B82F6' },
    { id: 'emerald', name: 'Emerald', hex: '#10B981' },
    { id: 'coral', name: 'Sunset Coral', hex: '#F43F5E' },
    { id: 'violet', name: 'Deep Violet', hex: '#8B5CF6' },
    { id: 'amber', name: 'Amber Gold', hex: '#F59E0B' }
  ];

  return (
    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-indigo-400" />
          <h3 className="text-xs font-semibold text-slate-200">
            Material 3 Theme & Tokens
          </h3>
        </div>
        <span className="text-[11px] text-slate-500 font-mono">
          MaterialTheme.colorScheme
        </span>
      </div>

      <div className="mt-3 flex flex-col gap-3">
        {/* Dynamic Color Palette */}
        <div>
          <label className="text-[11px] font-medium text-slate-400 block mb-1.5">
            Dynamic Material You Scheme
          </label>
          <div className="flex items-center gap-2">
            {palettes.map((p) => (
              <button
                key={p.id}
                onClick={() => onChangeTheme({ ...theme, palette: p.id })}
                className={`group relative flex items-center justify-center p-1 rounded-full transition-all cursor-pointer ${
                  theme.palette === p.id
                    ? 'ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-900 scale-110'
                    : 'opacity-70 hover:opacity-100 hover:scale-105'
                }`}
                title={p.name}
              >
                <div
                  className="w-5 h-5 rounded-full shadow-xs"
                  style={{ backgroundColor: p.hex }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Light / Dark Mode Toggle */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] font-medium text-slate-400">
            System Theme Mode
          </span>
          <div className="flex items-center p-0.5 rounded-lg bg-slate-800 border border-slate-700/60">
            <button
              onClick={() => onChangeTheme({ ...theme, mode: 'light' })}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                theme.mode === 'light'
                  ? 'bg-slate-100 text-slate-900 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Light</span>
            </button>
            <button
              onClick={() => onChangeTheme({ ...theme, mode: 'dark' })}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                theme.mode === 'dark'
                  ? 'bg-slate-900 text-slate-100 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
              <span>Dark</span>
            </button>
          </div>
        </div>

        {/* Corner Radius Shapes */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
          <span className="text-[11px] font-medium text-slate-400">
            Shape Corner Radius
          </span>
          <div className="flex items-center gap-1.5">
            {(['sm', 'md', 'lg'] as const).map((r) => (
              <button
                key={r}
                onClick={() => onChangeTheme({ ...theme, cornerRadius: r })}
                className={`px-2 py-0.5 text-[11px] font-mono rounded border transition-colors cursor-pointer ${
                  theme.cornerRadius === r
                    ? 'bg-indigo-600 text-white border-indigo-500'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                {r === 'sm' ? '8dp' : r === 'md' ? '12dp' : '16dp'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
