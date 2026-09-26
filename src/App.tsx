/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { PhoneSimulator } from './components/PhoneSimulator';
import { Material3Controls } from './components/Material3Controls';
import { CodeInspector } from './components/CodeInspector';
import { PromptStudio } from './components/PromptStudio';
import { StateInspector } from './components/StateInspector';
import { M3ComponentsGuide } from './components/M3ComponentsGuide';
import { PREBUILT_PROMPTS } from './data/promptsData';
import {
  ThemeConfig,
  AuthTab,
  FormState,
  ValidationErrors,
  PasswordStrength,
  EventLogItem
} from './types';
import {
  Smartphone,
  Code2,
  Sparkles,
  Layers,
  Activity,
  CheckCircle2,
  Copy,
  ChevronRight,
  Shield,
  Eye
} from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'simulator' | 'code' | 'prompt' | 'inspector'>('simulator');
  const [promptCopied, setPromptCopied] = useState(false);

  // Material 3 Theme state
  const [theme, setTheme] = useState<ThemeConfig>({
    mode: 'dark',
    palette: 'blue',
    cornerRadius: 'md'
  });

  // Current active auth tab in simulator
  const [authTab, setAuthTab] = useState<AuthTab>('login');

  // Unified Form State matching Jetpack Compose rememberSaveable & AuthUiState
  const [formState, setFormState] = useState<FormState>({
    loginEmail: 'alex.dev@android.com',
    loginPassword: 'ComposePassword123!',
    loginPasswordVisible: false,
    rememberMe: true,

    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPasswordVisible: false,
    registerConfirmPassword: '',
    registerConfirmPasswordVisible: false,
    agreeToTerms: false
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(
    'Tip: Click the Eye icon on the password field to toggle password visibility!'
  );
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [eventLogs, setEventLogs] = useState<EventLogItem[]>([
    {
      id: 'init-1',
      timestamp: new Date().toLocaleTimeString(),
      name: 'LaunchedEffect(Unit)',
      payload: { message: 'Screen initialized with Material 3 Theme' }
    }
  ]);

  // Log intent event
  const logEvent = (name: string, payload: Record<string, any>) => {
    const newLog: EventLogItem = {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toLocaleTimeString(),
      name,
      payload
    };
    setEventLogs((prev) => [newLog, ...prev.slice(0, 40)]);
  };

  // Field updater
  const handleUpdateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setFormState((prev) => ({ ...prev, [key]: value }));

    // Clear specific error
    if (errors[key as keyof ValidationErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key as keyof ValidationErrors];
        return next;
      });
    }

    if (key.includes('PasswordVisible')) {
      logEvent('OnTogglePasswordVisibility', { field: key, isVisible: value });
    } else if (key === 'rememberMe' || key === 'agreeToTerms') {
      logEvent('OnCheckboxToggled', { field: key, checked: value });
    }
  };

  // Real-time password strength calculation
  const passwordStrength: PasswordStrength = useMemo(() => {
    const pwd = formState.registerPassword;
    if (!pwd) {
      return {
        score: 0,
        label: 'Weak',
        hasMinLength: false,
        hasUppercase: false,
        hasNumber: false,
        hasSpecial: false
      };
    }

    const hasMinLength = pwd.length >= 8;
    const hasUppercase = /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[^A-Za-z0-9]/.test(pwd);

    let score = 0;
    if (hasMinLength) score++;
    if (hasUppercase) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;

    let label: PasswordStrength['label'] = 'Weak';
    if (score === 2) label = 'Fair';
    if (score === 3) label = 'Good';
    if (score === 4) label = 'Strong';

    return {
      score,
      label,
      hasMinLength,
      hasUppercase,
      hasNumber,
      hasSpecial
    };
  }, [formState.registerPassword]);

  // Login submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: ValidationErrors = {};

    if (!formState.loginEmail.trim() || !formState.loginEmail.includes('@')) {
      newErrors.loginEmail = 'Enter a valid email address';
    }
    if (!formState.loginPassword) {
      newErrors.loginPassword = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      logEvent('ValidationFailed', newErrors);
      setSnackbarMessage('Please resolve the highlighted errors.');
      return;
    }

    setIsLoading(true);
    logEvent('SubmitLogin', { email: formState.loginEmail, rememberMe: formState.rememberMe });

    setTimeout(() => {
      setIsLoading(false);
      setSnackbarMessage(`Signed in successfully as ${formState.loginEmail}`);
      logEvent('AuthSuccess', { status: 'Authenticated', email: formState.loginEmail });
    }, 1200);
  };

  // Register submission
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: ValidationErrors = {};

    if (!formState.registerName.trim()) {
      newErrors.registerName = 'Please enter your full name';
    }
    if (!formState.registerEmail.trim() || !formState.registerEmail.includes('@')) {
      newErrors.registerEmail = 'Valid work email is required';
    }
    if (formState.registerPassword.length < 8) {
      newErrors.registerPassword = 'Password must be at least 8 characters';
    }
    if (formState.registerPassword !== formState.registerConfirmPassword) {
      newErrors.registerConfirmPassword = 'Passwords do not match';
    }
    if (!formState.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      logEvent('RegisterValidationFailed', newErrors);
      setSnackbarMessage('Please fill all required fields correctly.');
      return;
    }

    setIsLoading(true);
    logEvent('SubmitRegister', { email: formState.registerEmail, name: formState.registerName });

    setTimeout(() => {
      setIsLoading(false);
      setSnackbarMessage('Account created! Welcome to ComposeAuth.');
      logEvent('RegisterSuccess', { status: 'Registered', email: formState.registerEmail });
      setAuthTab('login');
    }, 1500);
  };

  // Copy Master Prompt shortcut in header
  const handleCopyMasterPrompt = () => {
    const master = PREBUILT_PROMPTS[0].promptText;
    navigator.clipboard.writeText(master);
    setPromptCopied(true);
    setSnackbarMessage('Master Jetpack Compose Prompt copied to clipboard!');
    setTimeout(() => setPromptCopied(false), 2500);
  };

  // Demo autofill
  const handleAutofillDemo = () => {
    if (authTab === 'login') {
      setFormState((prev) => ({
        ...prev,
        loginEmail: 'alex.developer@android.com',
        loginPassword: 'JetpackCompose2026!',
        loginPasswordVisible: false,
        rememberMe: true
      }));
      setSnackbarMessage('Filled demo login credentials!');
    } else {
      setFormState((prev) => ({
        ...prev,
        registerName: 'Sarah Connor',
        registerEmail: 'sarah.connor@sky.io',
        registerPassword: 'SecuredPassword@2026',
        registerPasswordVisible: false,
        registerConfirmPassword: 'SecuredPassword@2026',
        registerConfirmPasswordVisible: false,
        agreeToTerms: true
      }));
      setSnackbarMessage('Filled demo registration form!');
    }
    setErrors({});
    logEvent('DemoAutofill', { tab: authTab });
  };

  // Reset demo
  const handleResetDemo = () => {
    setFormState({
      loginEmail: '',
      loginPassword: '',
      loginPasswordVisible: false,
      rememberMe: false,
      registerName: '',
      registerEmail: '',
      registerPassword: '',
      registerPasswordVisible: false,
      registerConfirmPassword: '',
      registerConfirmPasswordVisible: false,
      agreeToTerms: false
    });
    setErrors({});
    setSnackbarMessage('Form state reset.');
    logEvent('FormReset', {});
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Bar following Top Bar Contract */}
      <Header
        activeView={activeView}
        onSelectView={setActiveView}
        onCopyPrompt={handleCopyMasterPrompt}
        promptCopied={promptCopied}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
        {/* Navigation Tabs Bar for Mobile/Tablet */}
        <div className="flex md:hidden items-center justify-between p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <button
            onClick={() => setActiveView('simulator')}
            className={`flex-1 py-1.5 rounded-lg text-center font-medium ${
              activeView === 'simulator' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveView('code')}
            className={`flex-1 py-1.5 rounded-lg text-center font-medium ${
              activeView === 'code' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            Kotlin
          </button>
          <button
            onClick={() => setActiveView('prompt')}
            className={`flex-1 py-1.5 rounded-lg text-center font-medium ${
              activeView === 'prompt' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            Prompts
          </button>
          <button
            onClick={() => setActiveView('inspector')}
            className={`flex-1 py-1.5 rounded-lg text-center font-medium ${
              activeView === 'inspector' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            State
          </button>
        </div>

        {/* View 1: Device Simulator & Live Material 3 Controls */}
        {activeView === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Device Simulator */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center">
              <PhoneSimulator
                theme={theme}
                authTab={authTab}
                setAuthTab={(tab) => {
                  setAuthTab(tab);
                  logEvent('OnTabSelected', { tab });
                }}
                formState={formState}
                errors={errors}
                passwordStrength={passwordStrength}
                isLoading={isLoading}
                snackbarMessage={snackbarMessage}
                onDismissSnackbar={() => setSnackbarMessage(null)}
                onUpdateField={handleUpdateField}
                onLoginSubmit={handleLoginSubmit}
                onRegisterSubmit={handleRegisterSubmit}
                onForgotPassword={() => {
                  setSnackbarMessage('Password reset link sent!');
                  logEvent('ForgotPasswordSubmitted', { email: formState.loginEmail });
                }}
                onBiometricSuccess={() => {
                  setSnackbarMessage('Biometric fingerprint verified! Signed in.');
                  logEvent('BiometricAuthSuccess', { method: 'BiometricPrompt' });
                }}
                onSocialLogin={(provider) => {
                  setSnackbarMessage(`Authenticating with ${provider}...`);
                  logEvent('SocialLoginClicked', { provider });
                }}
                showKeyboard={showKeyboard}
                setShowKeyboard={setShowKeyboard}
                onResetDemo={handleResetDemo}
                onAutofillDemo={handleAutofillDemo}
              />
            </div>

            {/* Right: Material 3 Customizer & Technical Highlights */}
            <div className="lg:col-span-5 flex flex-col gap-4 text-left">
              {/* Feature Highlights Hero */}
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <h2 className="text-sm font-bold text-white tracking-tight">
                    Jetpack Compose Auth Architecture
                  </h2>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Interactive simulation of Material Design 3 authentication in Android. Test the dynamic password visibility toggle, confirm password validation, live password entropy meter, and Material You theming.
                </p>

                <div className="mt-4 flex flex-col gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">Password Toggle State:</span>
                    <span className="font-mono text-indigo-400 font-semibold">
                      {formState.loginPasswordVisible || formState.registerPasswordVisible
                        ? 'VisualTransformation.None'
                        : 'PasswordVisualTransformation()'}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">State Persistence:</span>
                    <span className="font-mono text-emerald-400 font-semibold">
                      rememberSaveable {'{ mutableStateOf() }'}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setActiveView('prompt')}
                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View AI Prompt Templates</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setActiveView('code')}
                    className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <span>Inspect Kotlin Code</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Material 3 Tokens Control Panel */}
              <Material3Controls theme={theme} onChangeTheme={setTheme} />

              {/* Architecture Quick Notes */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-slate-200 font-semibold">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>Production Android Checklist</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
                  <li>Password masked with bullets by default for privacy</li>
                  <li>Eye icon uses proper TalkBack accessible contentDescription</li>
                  <li>Keyboard IME options automatically move focus with LocalFocusManager</li>
                  <li>Smooth 300ms AnimatedContent transition between tabs</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* View 2: Jetpack Compose Kotlin Code Inspector */}
        {activeView === 'code' && (
          <div className="flex flex-col gap-6">
            <div className="h-[750px]">
              <CodeInspector />
            </div>
            <M3ComponentsGuide />
          </div>
        )}

        {/* View 3: Master AI Prompt Studio */}
        {activeView === 'prompt' && (
          <PromptStudio onCopySuccess={() => setSnackbarMessage('Prompt copied to clipboard!')} />
        )}

        {/* View 4: Live Compose State & Event Inspector */}
        {activeView === 'inspector' && (
          <StateInspector
            formState={formState}
            errors={errors}
            passwordStrength={passwordStrength}
            eventLogs={eventLogs}
            onClearLogs={() => setEventLogs([])}
          />
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="mt-auto py-6 border-t border-slate-800/80 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span>ComposeAuth Studio</span>
            <span>·</span>
            <span>Android Jetpack Compose & Material Design 3</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setActiveView('prompt')}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              AI Prompt Studio
            </button>
            <button
              onClick={() => setActiveView('code')}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Kotlin Files
            </button>
            <button
              onClick={() => setActiveView('simulator')}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Device Simulator
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
