import React, { useState, useEffect } from 'react';
import { Fingerprint, CheckCircle, ShieldAlert, X } from 'lucide-react';
import { ThemeConfig } from '../types';

interface BiometricDialogProps {
  isOpen: boolean;
  theme: ThemeConfig;
  onClose: () => void;
  onSuccess: () => void;
}

export const BiometricDialog: React.FC<BiometricDialogProps> = ({
  isOpen,
  theme,
  onClose,
  onSuccess
}) => {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'success'>('idle');

  useEffect(() => {
    if (isOpen) {
      setScanState('idle');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isDark = theme.mode === 'dark';

  const handleSimulateTouch = () => {
    setScanState('scanning');
    setTimeout(() => {
      setScanState('success');
      setTimeout(() => {
        onSuccess();
      }, 700);
    }, 1100);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-xs flex flex-col justify-end p-3 animate-in fade-in duration-200">
      <div
        className={`w-full p-5 rounded-2xl shadow-2xl border transition-all ${
          isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Top grab bar */}
        <div className="w-10 h-1 bg-slate-500/30 rounded-full mx-auto mb-4" />

        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-base font-bold flex items-center gap-2">
              <Fingerprint className="w-5 h-5 text-indigo-400" />
              BiometricPrompt
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Confirm your screen lock or fingerprint to continue
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sensor graphic */}
        <div className="my-6 flex flex-col items-center justify-center">
          <button
            type="button"
            onClick={handleSimulateTouch}
            disabled={scanState !== 'idle'}
            className={`relative p-5 rounded-full transition-all cursor-pointer ${
              scanState === 'scanning'
                ? 'bg-indigo-500/20 ring-4 ring-indigo-500/40 animate-pulse'
                : scanState === 'success'
                ? 'bg-emerald-500/20 ring-4 ring-emerald-500/50'
                : 'bg-slate-500/10 hover:bg-slate-500/20 hover:scale-105 active:scale-95'
            }`}
          >
            {scanState === 'success' ? (
              <CheckCircle className="w-12 h-12 text-emerald-400 animate-in zoom-in" />
            ) : (
              <Fingerprint
                className={`w-12 h-12 transition-colors ${
                  scanState === 'scanning' ? 'text-indigo-400' : 'text-slate-400'
                }`}
              />
            )}
          </button>

          <span className="text-xs font-medium text-slate-400 mt-3">
            {scanState === 'idle' && 'Tap sensor to simulate fingerprint'}
            {scanState === 'scanning' && 'Authenticating credential...'}
            {scanState === 'success' && 'Fingerprint verified!'}
          </span>
        </div>

        {/* Android system actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-500/10">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-indigo-400 hover:underline"
          >
            Use Password
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-500/10 hover:bg-slate-500/20 text-slate-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
