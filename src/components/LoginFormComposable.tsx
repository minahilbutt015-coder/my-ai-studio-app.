import React from 'react';
import { Mail, Lock, Eye, EyeOff, X, Fingerprint, Loader2 } from 'lucide-react';
import { ThemeConfig, FormState, ValidationErrors } from '../types';

interface LoginFormComposableProps {
  formState: FormState;
  errors: ValidationErrors;
  theme: ThemeConfig;
  isLoading: boolean;
  onUpdateField: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  onSubmit: (e: React.FormEvent) => void;
  onForgotPassword: () => void;
  onBiometricClick: () => void;
  onSocialLogin: (provider: string) => void;
}

export const LoginFormComposable: React.FC<LoginFormComposableProps> = ({
  formState,
  errors,
  theme,
  isLoading,
  onUpdateField,
  onSubmit,
  onForgotPassword,
  onBiometricClick,
  onSocialLogin
}) => {
  const isDark = theme.mode === 'dark';

  // Palette color styles
  const getThemeClasses = () => {
    switch (theme.palette) {
      case 'emerald':
        return {
          primaryBg: 'bg-emerald-600 hover:bg-emerald-500 text-white',
          primaryBorder: 'focus-within:border-emerald-500',
          activeText: 'text-emerald-500',
          checkboxChecked: 'bg-emerald-600 border-emerald-600',
          glow: 'shadow-emerald-950/20'
        };
      case 'coral':
        return {
          primaryBg: 'bg-rose-600 hover:bg-rose-500 text-white',
          primaryBorder: 'focus-within:border-rose-500',
          activeText: 'text-rose-500',
          checkboxChecked: 'bg-rose-600 border-rose-600',
          glow: 'shadow-rose-950/20'
        };
      case 'violet':
        return {
          primaryBg: 'bg-violet-600 hover:bg-violet-500 text-white',
          primaryBorder: 'focus-within:border-violet-500',
          activeText: 'text-violet-400',
          checkboxChecked: 'bg-violet-600 border-violet-600',
          glow: 'shadow-violet-950/20'
        };
      case 'amber':
        return {
          primaryBg: 'bg-amber-600 hover:bg-amber-500 text-white',
          primaryBorder: 'focus-within:border-amber-500',
          activeText: 'text-amber-500',
          checkboxChecked: 'bg-amber-600 border-amber-600',
          glow: 'shadow-amber-950/20'
        };
      case 'blue':
      default:
        return {
          primaryBg: 'bg-blue-600 hover:bg-blue-500 text-white',
          primaryBorder: 'focus-within:border-blue-500',
          activeText: 'text-blue-500',
          checkboxChecked: 'bg-blue-600 border-blue-600',
          glow: 'shadow-blue-950/20'
        };
    }
  };

  const themeStyles = getThemeClasses();
  const radiusClass = theme.cornerRadius === 'sm' ? 'rounded-lg' : theme.cornerRadius === 'lg' ? 'rounded-2xl' : 'rounded-xl';

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 text-left">
      {/* Email OutlinedTextField Composable */}
      <div className="flex flex-col gap-1">
        <label className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          Email Address
        </label>
        <div
          className={`flex items-center px-3 py-2.5 border transition-all ${radiusClass} ${
            errors.loginEmail
              ? 'border-red-500 bg-red-500/5'
              : isDark
              ? `border-slate-700 bg-slate-900/60 ${themeStyles.primaryBorder}`
              : `border-slate-300 bg-white ${themeStyles.primaryBorder}`
          }`}
        >
          <Mail className={`w-4 h-4 mr-2.5 shrink-0 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
          <input
            type="email"
            value={formState.loginEmail}
            onChange={(e) => onUpdateField('loginEmail', e.target.value)}
            placeholder="alex.dev@android.com"
            className={`w-full bg-transparent text-sm outline-none placeholder:text-slate-400 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          />
          {formState.loginEmail && (
            <button
              type="button"
              onClick={() => onUpdateField('loginEmail', '')}
              className="p-1 text-slate-400 hover:text-slate-200"
              title="Clear"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        {errors.loginEmail && (
          <span className="text-[11px] text-red-500 font-medium px-1">
            {errors.loginEmail}
          </span>
        )}
      </div>

      {/* Password OutlinedTextField with Password Visibility Toggle State */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <label className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Password
          </label>
          <span className={`text-[10px] font-mono ${formState.loginPasswordVisible ? 'text-indigo-400' : 'text-slate-500'}`}>
            {formState.loginPasswordVisible ? 'VisualTransformation.None' : 'PasswordVisualTransformation()'}
          </span>
        </div>

        <div
          className={`relative flex items-center px-3 py-2.5 border transition-all ${radiusClass} ${
            errors.loginPassword
              ? 'border-red-500 bg-red-500/5'
              : isDark
              ? `border-slate-700 bg-slate-900/60 ${themeStyles.primaryBorder}`
              : `border-slate-300 bg-white ${themeStyles.primaryBorder}`
          }`}
        >
          <Lock className={`w-4 h-4 mr-2.5 shrink-0 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
          <input
            type={formState.loginPasswordVisible ? 'text' : 'password'}
            value={formState.loginPassword}
            onChange={(e) => onUpdateField('loginPassword', e.target.value)}
            placeholder="••••••••"
            className={`w-full bg-transparent text-sm outline-none placeholder:text-slate-400 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          />

          {/* Core requirement: Trailing toggle button with IconButton animation */}
          <button
            type="button"
            onClick={() => onUpdateField('loginPasswordVisible', !formState.loginPasswordVisible)}
            className={`p-1.5 rounded-full transition-all hover:bg-slate-500/10 active:scale-90 ${
              formState.loginPasswordVisible ? themeStyles.activeText : 'text-slate-400 hover:text-slate-200'
            }`}
            title={formState.loginPasswordVisible ? 'Hide password' : 'Show password'}
            aria-label={formState.loginPasswordVisible ? 'Hide password' : 'Show password'}
          >
            {formState.loginPasswordVisible ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        {errors.loginPassword && (
          <span className="text-[11px] text-red-500 font-medium px-1">
            {errors.loginPassword}
          </span>
        )}
      </div>

      {/* Remember Me and Forgot Password */}
      <div className="flex items-center justify-between pt-0.5">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={formState.rememberMe}
            onChange={(e) => onUpdateField('rememberMe', e.target.checked)}
            className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer"
          />
          <span className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Remember me
          </span>
        </label>

        <button
          type="button"
          onClick={onForgotPassword}
          className={`text-xs font-medium hover:underline ${themeStyles.activeText}`}
        >
          Forgot password?
        </button>
      </div>

      {/* Submit Button Composable */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-4 font-semibold text-sm transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer ${radiusClass} ${themeStyles.primaryBg}`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Signing in...</span>
          </>
        ) : (
          <span>Sign In</span>
        )}
      </button>

      {/* Biometrics Quick Action */}
      <button
        type="button"
        onClick={onBiometricClick}
        className={`w-full py-2.5 px-4 font-medium text-xs border border-dashed transition-all flex items-center justify-center gap-2 ${radiusClass} ${
          isDark
            ? 'border-slate-700 text-slate-300 hover:bg-slate-900/60 hover:border-slate-600'
            : 'border-slate-300 text-slate-700 hover:bg-slate-50'
        }`}
      >
        <Fingerprint className="w-4 h-4 text-emerald-400" />
        <span>Quick Unlock with Biometrics</span>
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 my-1">
        <div className={`h-px flex-1 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
        <span className={`text-[11px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          or continue with
        </span>
        <div className={`h-px flex-1 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
      </div>

      {/* Social Sign-in Buttons */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => onSocialLogin('Google')}
          className={`py-2 px-3 text-xs font-medium border flex items-center justify-center gap-2 transition-colors ${radiusClass} ${
            isDark
              ? 'border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-slate-200'
              : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
          }`}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Google</span>
        </button>

        <button
          type="button"
          onClick={() => onSocialLogin('GitHub')}
          className={`py-2 px-3 text-xs font-medium border flex items-center justify-center gap-2 transition-colors ${radiusClass} ${
            isDark
              ? 'border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-slate-200'
              : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
          }`}
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <span>GitHub</span>
        </button>
      </div>
    </form>
  );
};
