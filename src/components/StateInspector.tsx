import React from 'react';
import { Activity, Database, CheckCircle, AlertCircle, Eye, EyeOff, Trash2 } from 'lucide-react';
import { FormState, ValidationErrors, PasswordStrength, EventLogItem } from '../types';

interface StateInspectorProps {
  formState: FormState;
  errors: ValidationErrors;
  passwordStrength: PasswordStrength;
  eventLogs: EventLogItem[];
  onClearLogs: () => void;
}

export const StateInspector: React.FC<StateInspectorProps> = ({
  formState,
  errors,
  passwordStrength,
  eventLogs,
  onClearLogs
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
      {/* Left Column: Live Compose State Tree */}
      <div className="lg:col-span-6 flex flex-col gap-4">
        {/* rememberSaveable State Card */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-400" />
              <h3 className="text-xs font-semibold text-white">
                rememberSaveable {'{ mutableStateOf() }'}
              </h3>
            </div>
            <span className="text-[10px] font-mono text-indigo-300 px-2 py-0.5 rounded bg-indigo-500/10">
              Lifecycle Persistent
            </span>
          </div>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Login Password Visibility Toggle */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-mono text-[11px]">loginPasswordVisible</span>
                {formState.loginPasswordVisible ? (
                  <Eye className="w-3.5 h-3.5 text-indigo-400" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                )}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span
                  className={`font-mono text-xs font-bold ${
                    formState.loginPasswordVisible ? 'text-indigo-400' : 'text-slate-400'
                  }`}
                >
                  {String(formState.loginPasswordVisible)}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {formState.loginPasswordVisible ? 'VisualTransformation.None' : 'PasswordVisualTransformation()'}
                </span>
              </div>
            </div>

            {/* Register Password Visibility Toggle */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-mono text-[11px]">registerPasswordVisible</span>
                {formState.registerPasswordVisible ? (
                  <Eye className="w-3.5 h-3.5 text-indigo-400" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                )}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span
                  className={`font-mono text-xs font-bold ${
                    formState.registerPasswordVisible ? 'text-indigo-400' : 'text-slate-400'
                  }`}
                >
                  {String(formState.registerPasswordVisible)}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {formState.registerPasswordVisible ? 'Plain' : 'Masked'}
                </span>
              </div>
            </div>

            {/* Confirm Password Visibility Toggle */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-mono text-[11px]">confirmPasswordVisible</span>
                {formState.registerConfirmPasswordVisible ? (
                  <Eye className="w-3.5 h-3.5 text-indigo-400" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                )}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span
                  className={`font-mono text-xs font-bold ${
                    formState.registerConfirmPasswordVisible ? 'text-indigo-400' : 'text-slate-400'
                  }`}
                >
                  {String(formState.registerConfirmPasswordVisible)}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {formState.registerConfirmPasswordVisible ? 'Plain' : 'Masked'}
                </span>
              </div>
            </div>

            {/* Remember Me */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col justify-between">
              <span className="font-mono text-[11px] text-slate-400">rememberMe</span>
              <div className="mt-2 flex items-center justify-between">
                <span
                  className={`font-mono text-xs font-bold ${
                    formState.rememberMe ? 'text-emerald-400' : 'text-slate-400'
                  }`}
                >
                  {String(formState.rememberMe)}
                </span>
                <span className="text-[10px] text-slate-500">DataStore Sync</span>
              </div>
            </div>
          </div>
        </div>

        {/* ViewModel State Dump */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
            <h3 className="text-xs font-semibold text-white">
              StateFlow&lt;AuthUiState&gt; Current Values
            </h3>
            <span className="text-[10px] font-mono text-slate-400">
              Immutable Snapshot
            </span>
          </div>

          <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
            <pre>
{JSON.stringify(
  {
    loginEmail: formState.loginEmail,
    loginPasswordLength: formState.loginPassword.length,
    loginPasswordMasked: formState.loginPassword ? '•'.repeat(formState.loginPassword.length) : '',
    registerName: formState.registerName,
    registerEmail: formState.registerEmail,
    registerPasswordLength: formState.registerPassword.length,
    passwordStrengthScore: `${passwordStrength.score}/4 (${passwordStrength.label})`,
    passwordsMatch:
      formState.registerPassword.length > 0 &&
      formState.registerPassword === formState.registerConfirmPassword,
    agreeToTerms: formState.agreeToTerms,
    hasValidationErrors: Object.keys(errors).length > 0
  },
  null,
  2
)}
            </pre>
          </div>
        </div>
      </div>

      {/* Right Column: Live Event Log (Intent Stream) */}
      <div className="lg:col-span-6 flex flex-col bg-slate-900/90 rounded-2xl border border-slate-800 shadow-md overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-semibold text-white">
              Compose Event Bus (Sealed AuthUiEvent)
            </h3>
          </div>
          <button
            onClick={onClearLogs}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200"
          >
            <Trash2 className="w-3 h-3" />
            <span>Clear</span>
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto max-h-[500px] flex flex-col gap-2 font-mono text-xs">
          {eventLogs.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              No events triggered yet. Interact with the phone simulator!
            </div>
          ) : (
            eventLogs.map((log) => (
              <div
                key={log.id}
                className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start justify-between gap-3 text-[11px]"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-indigo-300">
                    {log.name}
                  </span>
                  <span className="text-slate-400 text-[10px]">
                    {JSON.stringify(log.payload)}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 shrink-0">
                  {log.timestamp}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
