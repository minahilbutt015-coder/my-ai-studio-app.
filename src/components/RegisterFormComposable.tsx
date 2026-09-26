import React from 'react';
import { User, Mail, Lock, Eye, EyeOff, Check, X, Loader2 } from 'lucide-react';
import { ThemeConfig, FormState, ValidationErrors, PasswordStrength } from '../types';

interface RegisterFormComposableProps {
  formState: FormState;
  errors: ValidationErrors;
  theme: ThemeConfig;
  passwordStrength: PasswordStrength;
  isLoading: boolean;
  onUpdateField: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSocialLogin: (provider: string) => void;
}

export const RegisterFormComposable: React.FC<RegisterFormComposableProps> = ({
  formState,
  errors,
  theme,
  passwordStrength,
  isLoading,
  onUpdateField,
  onSubmit,
  onSocialLogin
}) => {
  const isDark = theme.mode === 'dark';

  const getThemeClasses = () => {
    switch (theme.palette) {
      case 'emerald':
        return {
          primaryBg: 'bg-emerald-600 hover:bg-emerald-500 text-white',
          primaryBorder: 'focus-within:border-emerald-500',
          activeText: 'text-emerald-500'
        };
      case 'coral':
        return {
          primaryBg: 'bg-rose-600 hover:bg-rose-500 text-white',
          primaryBorder: 'focus-within:border-rose-500',
          activeText: 'text-rose-500'
        };
      case 'violet':
        return {
          primaryBg: 'bg-violet-600 hover:bg-violet-500 text-white',
          primaryBorder: 'focus-within:border-violet-500',
          activeText: 'text-violet-400'
        };
      case 'amber':
        return {
          primaryBg: 'bg-amber-600 hover:bg-amber-500 text-white',
          primaryBorder: 'focus-within:border-amber-500',
          activeText: 'text-amber-500'
        };
      case 'blue':
      default:
        return {
          primaryBg: 'bg-blue-600 hover:bg-blue-500 text-white',
          primaryBorder: 'focus-within:border-blue-500',
          activeText: 'text-blue-500'
        };
    }
  };

  const themeStyles = getThemeClasses();
  const radiusClass = theme.cornerRadius === 'sm' ? 'rounded-lg' : theme.cornerRadius === 'lg' ? 'rounded-2xl' : 'rounded-xl';

  // Strength bar color helper
  const getStrengthBarColor = (score: number) => {
    switch (score) {
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-amber-500';
      case 3:
        return 'bg-blue-500';
      case 4:
        return 'bg-emerald-500';
      default:
        return 'bg-slate-600';
    }
  };

  const getStrengthTextColor = (score: number) => {
    switch (score) {
      case 1:
        return 'text-red-500';
      case 2:
        return 'text-amber-500';
      case 3:
        return 'text-blue-500';
      case 4:
        return 'text-emerald-500';
      default:
        return 'text-slate-500';
    }
  };

  const isPasswordsMatching =
    formState.registerPassword.length > 0 &&
    formState.registerConfirmPassword.length > 0 &&
    formState.registerPassword === formState.registerConfirmPassword;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3.5 text-left">
      {/* Full Name OutlinedTextField */}
      <div className="flex flex-col gap-1">
        <label className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          Full Name
        </label>
        <div
          className={`flex items-center px-3 py-2 border transition-all ${radiusClass} ${
            errors.registerName
              ? 'border-red-500 bg-red-500/5'
              : isDark
              ? `border-slate-700 bg-slate-900/60 ${themeStyles.primaryBorder}`
              : `border-slate-300 bg-white ${themeStyles.primaryBorder}`
          }`}
        >
          <User className={`w-4 h-4 mr-2.5 shrink-0 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
          <input
            type="text"
            value={formState.registerName}
            onChange={(e) => onUpdateField('registerName', e.target.value)}
            placeholder="Sarah Connor"
            className={`w-full bg-transparent text-sm outline-none placeholder:text-slate-400 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          />
        </div>
        {errors.registerName && (
          <span className="text-[11px] text-red-500 font-medium px-1">
            {errors.registerName}
          </span>
        )}
      </div>

      {/* Work Email OutlinedTextField */}
      <div className="flex flex-col gap-1">
        <label className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          Work Email
        </label>
        <div
          className={`flex items-center px-3 py-2 border transition-all ${radiusClass} ${
            errors.registerEmail
              ? 'border-red-500 bg-red-500/5'
              : isDark
              ? `border-slate-700 bg-slate-900/60 ${themeStyles.primaryBorder}`
              : `border-slate-300 bg-white ${themeStyles.primaryBorder}`
          }`}
        >
          <Mail className={`w-4 h-4 mr-2.5 shrink-0 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
          <input
            type="email"
            value={formState.registerEmail}
            onChange={(e) => onUpdateField('registerEmail', e.target.value)}
            placeholder="sarah@techcorp.io"
            className={`w-full bg-transparent text-sm outline-none placeholder:text-slate-400 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          />
        </div>
        {errors.registerEmail && (
          <span className="text-[11px] text-red-500 font-medium px-1">
            {errors.registerEmail}
          </span>
        )}
      </div>

      {/* Create Password with Visibility Toggle Composable */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <label className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Create Password
          </label>
          <span className={`text-[10px] font-mono ${formState.registerPasswordVisible ? 'text-indigo-400' : 'text-slate-500'}`}>
            {formState.registerPasswordVisible ? 'VisualTransformation.None' : 'PasswordVisualTransformation()'}
          </span>
        </div>

        <div
          className={`flex items-center px-3 py-2 border transition-all ${radiusClass} ${
            errors.registerPassword
              ? 'border-red-500 bg-red-500/5'
              : isDark
              ? `border-slate-700 bg-slate-900/60 ${themeStyles.primaryBorder}`
              : `border-slate-300 bg-white ${themeStyles.primaryBorder}`
          }`}
        >
          <Lock className={`w-4 h-4 mr-2.5 shrink-0 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
          <input
            type={formState.registerPasswordVisible ? 'text' : 'password'}
            value={formState.registerPassword}
            onChange={(e) => onUpdateField('registerPassword', e.target.value)}
            placeholder="Min 8 characters"
            className={`w-full bg-transparent text-sm outline-none placeholder:text-slate-400 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          />
          {/* Toggle Button */}
          <button
            type="button"
            onClick={() => onUpdateField('registerPasswordVisible', !formState.registerPasswordVisible)}
            className={`p-1.5 rounded-full transition-all hover:bg-slate-500/10 active:scale-90 ${
              formState.registerPasswordVisible ? themeStyles.activeText : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle password visibility"
          >
            {formState.registerPasswordVisible ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Real-time Material 3 Password Strength Indicator Composable */}
        {formState.registerPassword.length > 0 && (
          <div className="flex flex-col gap-1 mt-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                Password Strength
              </span>
              <span className={`font-semibold ${getStrengthTextColor(passwordStrength.score)}`}>
                {passwordStrength.label}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    step <= passwordStrength.score
                      ? getStrengthBarColor(passwordStrength.score)
                      : isDark
                      ? 'bg-slate-800'
                      : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
            {/* Criteria checklist */}
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] mt-0.5 text-slate-400">
              <span className={`flex items-center gap-1 ${passwordStrength.hasMinLength ? 'text-emerald-400' : ''}`}>
                {passwordStrength.hasMinLength ? <Check className="w-3 h-3" /> : '•'} 8+ chars
              </span>
              <span className={`flex items-center gap-1 ${passwordStrength.hasUppercase ? 'text-emerald-400' : ''}`}>
                {passwordStrength.hasUppercase ? <Check className="w-3 h-3" /> : '•'} Uppercase
              </span>
              <span className={`flex items-center gap-1 ${passwordStrength.hasNumber ? 'text-emerald-400' : ''}`}>
                {passwordStrength.hasNumber ? <Check className="w-3 h-3" /> : '•'} Number
              </span>
              <span className={`flex items-center gap-1 ${passwordStrength.hasSpecial ? 'text-emerald-400' : ''}`}>
                {passwordStrength.hasSpecial ? <Check className="w-3 h-3" /> : '•'} Symbol
              </span>
            </div>
          </div>
        )}

        {errors.registerPassword && (
          <span className="text-[11px] text-red-500 font-medium px-1">
            {errors.registerPassword}
          </span>
        )}
      </div>

      {/* Confirm Password OutlinedTextField with independent Visibility Toggle */}
      <div className="flex flex-col gap-1">
        <label className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          Confirm Password
        </label>
        <div
          className={`flex items-center px-3 py-2 border transition-all ${radiusClass} ${
            errors.registerConfirmPassword
              ? 'border-red-500 bg-red-500/5'
              : isPasswordsMatching
              ? 'border-emerald-500/80 bg-emerald-500/5'
              : isDark
              ? `border-slate-700 bg-slate-900/60 ${themeStyles.primaryBorder}`
              : `border-slate-300 bg-white ${themeStyles.primaryBorder}`
          }`}
        >
          <Lock className={`w-4 h-4 mr-2.5 shrink-0 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
          <input
            type={formState.registerConfirmPasswordVisible ? 'text' : 'password'}
            value={formState.registerConfirmPassword}
            onChange={(e) => onUpdateField('registerConfirmPassword', e.target.value)}
            placeholder="Re-type password"
            className={`w-full bg-transparent text-sm outline-none placeholder:text-slate-400 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          />
          {isPasswordsMatching && (
            <span className="text-emerald-500 mr-1" title="Passwords match">
              <Check className="w-4 h-4" />
            </span>
          )}
          <button
            type="button"
            onClick={() =>
              onUpdateField('registerConfirmPasswordVisible', !formState.registerConfirmPasswordVisible)
            }
            className={`p-1.5 rounded-full transition-all hover:bg-slate-500/10 active:scale-90 ${
              formState.registerConfirmPasswordVisible
                ? themeStyles.activeText
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle confirm password visibility"
          >
            {formState.registerConfirmPasswordVisible ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        {errors.registerConfirmPassword && (
          <span className="text-[11px] text-red-500 font-medium px-1">
            {errors.registerConfirmPassword}
          </span>
        )}
      </div>

      {/* Terms and Privacy Checkbox */}
      <div className="flex flex-col gap-0.5">
        <label className="flex items-start gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={formState.agreeToTerms}
            onChange={(e) => onUpdateField('agreeToTerms', e.target.checked)}
            className="w-4 h-4 mt-0.5 rounded text-blue-600 focus:ring-0 cursor-pointer"
          />
          <span className={`text-[11px] leading-snug ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            I agree to the <span className={themeStyles.activeText}>Terms of Service</span> and{' '}
            <span className={themeStyles.activeText}>Privacy Policy</span>.
          </span>
        </label>
        {errors.agreeToTerms && (
          <span className="text-[11px] text-red-500 font-medium px-1">
            {errors.agreeToTerms}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-4 font-semibold text-sm transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer ${radiusClass} ${themeStyles.primaryBg}`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Creating account...</span>
          </>
        ) : (
          <span>Create Account</span>
        )}
      </button>

      {/* Social Sign-in Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-1">
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
