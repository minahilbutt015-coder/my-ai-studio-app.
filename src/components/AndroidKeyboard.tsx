import React from 'react';
import { Delete, CornerDownLeft, Space } from 'lucide-react';
import { ThemeConfig } from '../types';

interface AndroidKeyboardProps {
  isVisible: boolean;
  theme: ThemeConfig;
  onKeyPress: (char: string) => void;
  onBackspace: () => void;
  onSubmit: () => void;
  onClose: () => void;
}

export const AndroidKeyboard: React.FC<AndroidKeyboardProps> = ({
  isVisible,
  theme,
  onKeyPress,
  onBackspace,
  onSubmit,
  onClose
}) => {
  if (!isVisible) return null;

  const isDark = theme.mode === 'dark';

  const rows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ];

  return (
    <div
      className={`w-full p-2 border-t select-none transition-all duration-200 ${
        isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-slate-100/95 border-slate-200'
      }`}
    >
      {/* Top bar with Compose WindowInsets indicator */}
      <div className="flex items-center justify-between px-2 py-1 text-[10px] text-slate-400">
        <span>Gboard · WindowInsets.ime</span>
        <button
          onClick={onClose}
          className="text-[10px] text-indigo-400 hover:underline"
        >
          Hide Keyboard
        </button>
      </div>

      <div className="flex flex-col gap-1 mt-1">
        {/* Row 1 */}
        <div className="flex justify-center gap-1">
          {rows[0].map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => onKeyPress(key)}
              className={`h-9 flex-1 max-w-[32px] rounded-md font-medium text-xs flex items-center justify-center shadow-xs active:scale-90 transition-transform ${
                isDark ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-white text-slate-800 hover:bg-slate-50'
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex justify-center gap-1 px-2">
          {rows[1].map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => onKeyPress(key)}
              className={`h-9 flex-1 max-w-[32px] rounded-md font-medium text-xs flex items-center justify-center shadow-xs active:scale-90 transition-transform ${
                isDark ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-white text-slate-800 hover:bg-slate-50'
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        {/* Row 3 */}
        <div className="flex justify-center gap-1">
          {rows[2].map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => onKeyPress(key)}
              className={`h-9 flex-1 max-w-[32px] rounded-md font-medium text-xs flex items-center justify-center shadow-xs active:scale-90 transition-transform ${
                isDark ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-white text-slate-800 hover:bg-slate-50'
              }`}
            >
              {key}
            </button>
          ))}
          <button
            type="button"
            onClick={onBackspace}
            className={`h-9 px-2 rounded-md font-medium text-xs flex items-center justify-center shadow-xs active:scale-90 transition-transform ${
              isDark ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-700'
            }`}
          >
            <Delete className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Action Row */}
        <div className="flex justify-center gap-1.5 mt-0.5">
          <button
            type="button"
            onClick={() => onKeyPress('@')}
            className={`h-8 px-2.5 rounded-md text-xs font-mono ${
              isDark ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-700'
            }`}
          >
            @
          </button>
          <button
            type="button"
            onClick={() => onKeyPress('.')}
            className={`h-8 px-2.5 rounded-md text-xs font-mono ${
              isDark ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-700'
            }`}
          >
            .
          </button>
          <button
            type="button"
            onClick={() => onKeyPress(' ')}
            className={`h-8 flex-1 max-w-[140px] rounded-md text-xs flex items-center justify-center ${
              isDark ? 'bg-slate-800 text-slate-400' : 'bg-white text-slate-600'
            }`}
          >
            space
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="h-8 px-3 rounded-md text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1"
          >
            <CornerDownLeft className="w-3 h-3" />
            <span>Go</span>
          </button>
        </div>
      </div>
    </div>
  );
};
