import React, { useState } from 'react';
import { Mail, Check, X, Loader2 } from 'lucide-react';
import { ThemeConfig } from '../types';

interface ForgotPasswordDialogProps {
  isOpen: boolean;
  theme: ThemeConfig;
  defaultEmail: string;
  onClose: () => void;
  onSubmitReset: (email: string) => void;
}

export const ForgotPasswordDialog: React.FC<ForgotPasswordDialogProps> = ({
  isOpen,
  theme,
  defaultEmail,
  onClose,
  onSubmitReset
}) => {
  const [email, setEmail] = useState(defaultEmail || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const isDark = theme.mode === 'dark';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setTimeout(() => {
        onSubmitReset(email);
        setIsSent(false);
        onClose();
      }, 1200);
    }, 900);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className={`w-full max-w-xs p-5 rounded-2xl shadow-2xl border transition-all ${
          isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-500/10">
          <h4 className="text-sm font-bold">Reset Password</h4>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSent ? (
          <div className="py-6 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
              <Check className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-emerald-400">Reset instructions sent!</p>
            <p className="text-[11px] text-slate-400 mt-1">
              Check your inbox for a password reset token.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-3">
            <p className="text-xs text-slate-400">
              Enter your account email to receive a password recovery link.
            </p>

            <div
              className={`flex items-center px-3 py-2 border rounded-xl ${
                isDark ? 'border-slate-700 bg-slate-950/60' : 'border-slate-300 bg-white'
              }`}
            >
              <Mail className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-transparent text-xs outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !email}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send Link</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
