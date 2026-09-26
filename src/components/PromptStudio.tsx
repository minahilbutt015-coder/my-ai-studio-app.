import React, { useState } from 'react';
import { Sparkles, Copy, Check, SlidersHorizontal, BookOpen, Layers, ShieldCheck, Terminal, Cpu } from 'lucide-react';
import { PREBUILT_PROMPTS, buildCustomPrompt } from '../data/promptsData';
import { PromptConfig } from '../types';

interface PromptStudioProps {
  onCopySuccess?: () => void;
}

export const PromptStudio: React.FC<PromptStudioProps> = ({ onCopySuccess }) => {
  const [selectedPromptId, setSelectedPromptId] = useState<string>('master-m3-auth');
  const [copied, setCopied] = useState(false);
  const [isCustomMode, setIsCustomMode] = useState(false);

  // Custom Prompt Builder state
  const [customConfig, setCustomConfig] = useState<PromptConfig>({
    targetArchitecture: 'MVVM',
    uiLibrary: 'Material 3 (M3)',
    stateHandling: 'ViewModel + StateFlow',
    passwordFeatures: {
      toggleVisibility: true,
      strengthMeter: true,
      confirmPasswordMatch: true
    },
    extraFeatures: {
      biometrics: true,
      socialAuth: true,
      forgotPasswordDialog: true,
      rememberMe: true
    },
    navigation: 'Compose Navigation (Type-safe)'
  });

  const activePromptText = isCustomMode
    ? buildCustomPrompt(customConfig)
    : PREBUILT_PROMPTS.find((p) => p.id === selectedPromptId)?.promptText || '';

  const activePromptTitle = isCustomMode
    ? 'Custom Tailored Jetpack Compose Auth Prompt'
    : PREBUILT_PROMPTS.find((p) => p.id === selectedPromptId)?.title || '';

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(activePromptText);
    setCopied(true);
    if (onCopySuccess) onCopySuccess();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 text-left">
      {/* Top Banner introducing the Prompt Studio */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-indigo-950/40 border border-indigo-500/20 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Jetpack Compose LLM Prompt Architect
              </span>
              <span className="text-xs text-slate-400">
                Ready for Claude 3.7, ChatGPT 4o, Gemini 2.5/3
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Production Jetpack Compose Auth Prompts
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Engineered prompts to generate production-ready Material Design 3 login and registration flows with dynamic password visibility toggles, live strength indicators, and clean state handling in Kotlin.
            </p>
          </div>

          <button
            onClick={handleCopyPrompt}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Prompt Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Active Prompt</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Prompt Selector / Customizer on Left, Full Prompt Display on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Preset Templates & Custom Builder Toggles */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Mode Switcher */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setIsCustomMode(false)}
              className={`py-2 rounded-lg transition-all cursor-pointer ${
                !isCustomMode
                  ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Curated Prompts
            </button>
            <button
              onClick={() => setIsCustomMode(true)}
              className={`py-2 rounded-lg transition-all cursor-pointer ${
                isCustomMode
                  ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Interactive Builder
            </button>
          </div>

          {!isCustomMode ? (
            /* Curated Presets */
            <div className="flex flex-col gap-2.5">
              {PREBUILT_PROMPTS.map((prompt) => (
                <button
                  key={prompt.id}
                  onClick={() => setSelectedPromptId(prompt.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedPromptId === prompt.id
                      ? 'bg-slate-900 border-indigo-500/60 shadow-md ring-1 ring-indigo-500/20'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-100">
                      {prompt.title}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300">
                      {prompt.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal line-clamp-2">
                    {prompt.description}
                  </p>
                  <div className="mt-2 text-[10px] text-slate-500 font-mono">
                    Target: {prompt.targetUse}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            /* Custom Prompt Builder Toggles */
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-4 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1.5">
                  Target Architecture
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['MVVM', 'MVI'] as const).map((arch) => (
                    <button
                      key={arch}
                      onClick={() => setCustomConfig({ ...customConfig, targetArchitecture: arch })}
                      className={`py-1.5 px-2 rounded-lg font-mono text-[11px] border transition-colors cursor-pointer ${
                        customConfig.targetArchitecture === arch
                          ? 'bg-indigo-600 text-white border-indigo-500'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                    >
                      {arch}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1.5">
                  State Management
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['ViewModel + StateFlow', 'rememberSaveable'] as const).map((state) => (
                    <button
                      key={state}
                      onClick={() => setCustomConfig({ ...customConfig, stateHandling: state })}
                      className={`py-1.5 px-2 rounded-lg text-[10px] font-mono border transition-colors cursor-pointer truncate ${
                        customConfig.stateHandling === state
                          ? 'bg-indigo-600 text-white border-indigo-500'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                    >
                      {state}
                    </button>
                  ))}
                </div>
              </div>

              {/* Password Features */}
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1.5">
                  Password & Security Features
                </label>
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={customConfig.passwordFeatures.toggleVisibility}
                      onChange={(e) =>
                        setCustomConfig({
                          ...customConfig,
                          passwordFeatures: {
                            ...customConfig.passwordFeatures,
                            toggleVisibility: e.target.checked
                          }
                        })
                      }
                      className="rounded text-indigo-600"
                    />
                    <span className="text-[11px] text-slate-300">
                      Toggle Password Visibility State
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={customConfig.passwordFeatures.strengthMeter}
                      onChange={(e) =>
                        setCustomConfig({
                          ...customConfig,
                          passwordFeatures: {
                            ...customConfig.passwordFeatures,
                            strengthMeter: e.target.checked
                          }
                        })
                      }
                      className="rounded text-indigo-600"
                    />
                    <span className="text-[11px] text-slate-300">
                      Live Password Strength Indicator
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={customConfig.passwordFeatures.confirmPasswordMatch}
                      onChange={(e) =>
                        setCustomConfig({
                          ...customConfig,
                          passwordFeatures: {
                            ...customConfig.passwordFeatures,
                            confirmPasswordMatch: e.target.checked
                          }
                        })
                      }
                      className="rounded text-indigo-600"
                    />
                    <span className="text-[11px] text-slate-300">
                      Confirm Password Match Validation
                    </span>
                  </label>
                </div>
              </div>

              {/* Additional Options */}
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1.5">
                  Extra Material 3 Integrations
                </label>
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={customConfig.extraFeatures.biometrics}
                      onChange={(e) =>
                        setCustomConfig({
                          ...customConfig,
                          extraFeatures: {
                            ...customConfig.extraFeatures,
                            biometrics: e.target.checked
                          }
                        })
                      }
                      className="rounded text-indigo-600"
                    />
                    <span className="text-[11px] text-slate-300">
                      Biometric Prompt (Fingerprint / Face)
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={customConfig.extraFeatures.socialAuth}
                      onChange={(e) =>
                        setCustomConfig({
                          ...customConfig,
                          extraFeatures: {
                            ...customConfig.extraFeatures,
                            socialAuth: e.target.checked
                          }
                        })
                      }
                      className="rounded text-indigo-600"
                    />
                    <span className="text-[11px] text-slate-300">
                      Social Auth Buttons (Google, GitHub)
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={customConfig.extraFeatures.forgotPasswordDialog}
                      onChange={(e) =>
                        setCustomConfig({
                          ...customConfig,
                          extraFeatures: {
                            ...customConfig.extraFeatures,
                            forgotPasswordDialog: e.target.checked
                          }
                        })
                      }
                      className="rounded text-indigo-600"
                    />
                    <span className="text-[11px] text-slate-300">
                      Forgot Password Recovery Dialog
                    </span>
                  </label>
                </div>
              </div>

              {/* Navigation */}
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Compose Navigation
                </label>
                <select
                  value={customConfig.navigation}
                  onChange={(e) =>
                    setCustomConfig({
                      ...customConfig,
                      navigation: e.target.value as any
                    })
                  }
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200 outline-none"
                >
                  <option value="Compose Navigation (Type-safe)">Compose Navigation (Type-safe 2.8+)</option>
                  <option value="Voyager">Voyager Multiplatform Navigation</option>
                  <option value="None (Single Composable)">Single Self-Contained Composable</option>
                </select>
              </div>
            </div>
          )}

          {/* Quick Prompting Tips */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-slate-400 text-xs">
            <h4 className="font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Android LLM Engineering Pro-Tip
            </h4>
            <p className="text-[11px] leading-relaxed">
              Always instruct the model to use <code className="text-indigo-300">rememberSaveable</code> instead of basic <code className="text-indigo-300">remember</code> for password visibility state, otherwise rotating the device will reset password visibility!
            </p>
          </div>
        </div>

        {/* Right Column: Code-like Prompt Viewer */}
        <div className="lg:col-span-8 flex flex-col bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-semibold text-slate-200">
                {activePromptTitle}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-slate-500">
                ~{Math.round(activePromptText.length / 4)} tokens · {activePromptText.length} chars
              </span>
              <button
                onClick={handleCopyPrompt}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Prompt</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Prompt Body */}
          <div className="flex-1 p-5 overflow-auto font-mono text-xs text-slate-300 leading-relaxed bg-slate-950/70 whitespace-pre-wrap select-all">
            {activePromptText}
          </div>

          {/* Quick instructions on how to use */}
          <div className="p-3.5 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
            <span>
              💡 Paste directly into your preferred AI chat or agent to get full Android Studio Kotlin code.
            </span>
            <span className="font-mono text-indigo-400">
              Kotlin 2.0+ · Jetpack Compose 1.7+ · Material 3
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
