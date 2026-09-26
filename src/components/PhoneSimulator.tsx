import React, { useState } from 'react';
import { Wifi, Battery, Signal, Zap, AlertCircle, CheckCircle2, RotateCcw } from 'lucide-react';
import { ThemeConfig, AuthTab, FormState, ValidationErrors, PasswordStrength } from '../types';
import { LoginFormComposable } from './LoginFormComposable';
import { RegisterFormComposable } from './RegisterFormComposable';
import { BiometricDialog } from './BiometricDialog';
import { ForgotPasswordDialog } from './ForgotPasswordDialog';
import { AndroidKeyboard } from './AndroidKeyboard';

interface PhoneSimulatorProps {
  theme: ThemeConfig;
  authTab: AuthTab;
  setAuthTab: (tab: AuthTab) => void;
  formState: FormState;
  errors: ValidationErrors;
  passwordStrength: PasswordStrength;
  isLoading: boolean;
  snackbarMessage: string | null;
  onDismissSnackbar: () => void;
  onUpdateField: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  onLoginSubmit: (e: React.FormEvent) => void;
  onRegisterSubmit: (e: React.FormEvent) => void;
  onForgotPassword: () => void;
  onBiometricSuccess: () => void;
  onSocialLogin: (provider: string) => void;
  showKeyboard: boolean;
  setShowKeyboard: (val: boolean) => void;
  onResetDemo: () => void;
  onAutofillDemo: () => void;
}

export const PhoneSimulator: React.FC<PhoneSimulatorProps> = ({
  theme,
  authTab,
  setAuthTab,
  formState,
  errors,
  passwordStrength,
  isLoading,
  snackbarMessage,
  onDismissSnackbar,
  onUpdateField,
  onLoginSubmit,
  onRegisterSubmit,
  onForgotPassword,
  onBiometricSuccess,
  onSocialLogin,
  showKeyboard,
  setShowKeyboard,
  onResetDemo,
  onAutofillDemo
}) => {
  const [isBiometricOpen, setIsBiometricOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const isDark = theme.mode === 'dark';

  // Palette primary accents for brand mark and tabs
  const getTabColors = () => {
    switch (theme.palette) {
      case 'emerald':
        return {
          brandBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
          tabActive: 'text-emerald-400',
          indicator: 'bg-emerald-500',
          badge: 'bg-emerald-500/10 text-emerald-300'
        };
      case 'coral':
        return {
          brandBg: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
          tabActive: 'text-rose-400',
          indicator: 'bg-rose-500',
          badge: 'bg-rose-500/10 text-rose-300'
        };
      case 'violet':
        return {
          brandBg: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
          tabActive: 'text-violet-400',
          indicator: 'bg-violet-500',
          badge: 'bg-violet-500/10 text-violet-300'
        };
      case 'amber':
        return {
          brandBg: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
          tabActive: 'text-amber-400',
          indicator: 'bg-amber-500',
          badge: 'bg-amber-500/10 text-amber-300'
        };
      case 'blue':
      default:
        return {
          brandBg: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
          tabActive: 'text-blue-400',
          indicator: 'bg-blue-500',
          badge: 'bg-blue-500/10 text-blue-300'
        };
    }
  };

  const tabColors = getTabColors();

  // Keyboard character dispatcher
  const handleKeyboardChar = (char: string) => {
    if (authTab === 'login') {
      onUpdateField('loginEmail', formState.loginEmail + char);
    } else {
      onUpdateField('registerEmail', formState.registerEmail + char);
    }
  };

  const handleKeyboardBackspace = () => {
    if (authTab === 'login') {
      onUpdateField('loginEmail', formState.loginEmail.slice(0, -1));
    } else {
      onUpdateField('registerEmail', formState.registerEmail.slice(0, -1));
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Device Toolbar Quick Controls */}
      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={onAutofillDemo}
          className="px-2.5 py-1 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-md transition-colors cursor-pointer"
        >
          Auto-fill Demo Data
        </button>
        <button
          onClick={onResetDemo}
          className="p-1 text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-md transition-colors"
          title="Reset Form"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setShowKeyboard(!showKeyboard)}
          className={`px-2.5 py-1 text-xs font-medium border rounded-md transition-colors cursor-pointer ${
            showKeyboard
              ? 'bg-indigo-600/30 border-indigo-500/50 text-indigo-300'
              : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
          }`}
        >
          {showKeyboard ? 'Hide Soft Keyboard' : 'Simulate Keyboard'}
        </button>
      </div>

      {/* Android Device Outer Bezel Frame */}
      <div className="relative w-[360px] sm:w-[380px] h-[780px] rounded-[44px] bg-slate-900 border-[7px] border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden ring-1 ring-slate-700/60">
        {/* Device Top Speaker Slit & Front Camera Punch Hole */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-14 h-1 bg-slate-800 rounded-full z-40" />
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-slate-950 rounded-full ring-1 ring-slate-800 z-40" />

        {/* Android Status Bar */}
        <div
          className={`shrink-0 h-10 px-6 pt-2 flex items-center justify-between text-xs select-none z-30 transition-colors ${
            isDark ? 'bg-slate-950 text-slate-300' : 'bg-slate-50 text-slate-700'
          }`}
        >
          <span className="font-semibold text-[11px] tracking-tight">9:41</span>
          <div className="flex items-center gap-1.5 opacity-80">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Jetpack Compose Screen Viewport (Scaffold container) */}
        <div
          className={`relative flex-1 overflow-y-auto flex flex-col justify-between transition-colors ${
            isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
          }`}
        >
          {/* Main Composable Content */}
          <div className="p-5 flex flex-col items-center">
            {/* Top Brand Identity Surface */}
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs mb-3 transition-colors ${tabColors.brandBg}`}
            >
              <Zap className="w-6 h-6 fill-current" />
            </div>

            <h1 className="text-xl font-bold tracking-tight">
              {authTab === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className={`text-xs mt-1 text-center max-w-[260px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {authTab === 'login'
                ? 'Sign in to access your Android workspace'
                : 'Build faster with modern Jetpack Compose'}
            </p>

            {/* Material 3 Segmented TabRow Composable */}
            <div
              className={`relative w-full grid grid-cols-2 p-1 rounded-2xl mt-5 mb-5 border transition-all ${
                isDark ? 'bg-slate-900/80 border-slate-800/80' : 'bg-slate-200/70 border-slate-300/80'
              }`}
            >
              <button
                type="button"
                onClick={() => setAuthTab('login')}
                className={`py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  authTab === 'login'
                    ? isDark
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'bg-white text-slate-900 shadow-sm'
                    : isDark
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthTab('register')}
                className={`py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  authTab === 'register'
                    ? isDark
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'bg-white text-slate-900 shadow-sm'
                    : isDark
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Animated Form Body */}
            <div className="w-full">
              {authTab === 'login' ? (
                <LoginFormComposable
                  formState={formState}
                  errors={errors}
                  theme={theme}
                  isLoading={isLoading}
                  onUpdateField={onUpdateField}
                  onSubmit={onLoginSubmit}
                  onForgotPassword={() => setIsForgotPasswordOpen(true)}
                  onBiometricClick={() => setIsBiometricOpen(true)}
                  onSocialLogin={onSocialLogin}
                />
              ) : (
                <RegisterFormComposable
                  formState={formState}
                  errors={errors}
                  theme={theme}
                  passwordStrength={passwordStrength}
                  isLoading={isLoading}
                  onUpdateField={onUpdateField}
                  onSubmit={onRegisterSubmit}
                  onSocialLogin={onSocialLogin}
                />
              )}
            </div>
          </div>

          {/* Jetpack Compose Material 3 SnackbarHost Simulation */}
          {snackbarMessage && (
            <div className="sticky bottom-2 mx-3 z-40 animate-in slide-in-from-bottom-3 duration-200">
              <div
                className={`px-3.5 py-2.5 rounded-xl shadow-lg border flex items-center justify-between text-xs ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-100'
                    : 'bg-slate-900 border-slate-800 text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="line-clamp-1">{snackbarMessage}</span>
                </div>
                <button
                  type="button"
                  onClick={onDismissSnackbar}
                  className="ml-2 font-semibold text-indigo-400 hover:text-indigo-300 text-[11px]"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {/* Dialog Overlays */}
          <BiometricDialog
            isOpen={isBiometricOpen}
            theme={theme}
            onClose={() => setIsBiometricOpen(false)}
            onSuccess={() => {
              setIsBiometricOpen(false);
              onBiometricSuccess();
            }}
          />

          <ForgotPasswordDialog
            isOpen={isForgotPasswordOpen}
            theme={theme}
            defaultEmail={formState.loginEmail}
            onClose={() => setIsForgotPasswordOpen(false)}
            onSubmitReset={onForgotPassword}
          />

          {/* Android Soft Keyboard Simulation */}
          <AndroidKeyboard
            isVisible={showKeyboard}
            theme={theme}
            onKeyPress={handleKeyboardChar}
            onBackspace={handleKeyboardBackspace}
            onSubmit={() => setShowKeyboard(false)}
            onClose={() => setShowKeyboard(false)}
          />
        </div>

        {/* Android Gesture Navigation Bar Pill */}
        <div
          className={`shrink-0 h-5 flex items-center justify-center select-none z-30 transition-colors ${
            isDark ? 'bg-slate-950' : 'bg-slate-50'
          }`}
        >
          <div className="w-24 h-1 bg-slate-500/40 rounded-full" />
        </div>
      </div>
    </div>
  );
};
