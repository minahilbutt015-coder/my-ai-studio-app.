import React from 'react';
import { Eye, Shield, Layers, Sparkles, CheckCircle2, Box, Cpu } from 'lucide-react';

export const M3ComponentsGuide: React.FC = () => {
  const components = [
    {
      name: 'OutlinedTextField with Password Toggle',
      m3Role: 'Text Inputs',
      description:
        'Standard Material 3 outlined field featuring animated floating label, leading icon, error supporting text, and trailing IconButton dynamically toggling between VisualTransformation.None and PasswordVisualTransformation().',
      snippet: `OutlinedTextField(
    value = password,
    onValueChange = { password = it },
    visualTransformation = if (isPasswordVisible) 
        VisualTransformation.None 
    else 
        PasswordVisualTransformation(),
    trailingIcon = {
        IconButton(onClick = { isPasswordVisible = !isPasswordVisible }) {
            Icon(
                imageVector = if (isPasswordVisible) Icons.Filled.VisibilityOff else Icons.Filled.Visibility,
                contentDescription = if (isPasswordVisible) "Hide password" else "Show password"
            )
        }
    }
)`
    },
    {
      name: 'AnimatedContent Tab Switching',
      m3Role: 'Motion & Navigation',
      description:
        'Smooth horizontal slide-in and fade-in animations mimicking authentic Android transition specs when switching between Sign In and Registration.',
      snippet: `AnimatedContent(
    targetState = selectedTab,
    transitionSpec = {
        (slideInHorizontally(tween(300)) { it } + fadeIn()).togetherWith(
            slideOutHorizontally(tween(300)) { -it } + fadeOut()
        )
    }
) { tab ->
    when (tab) {
        AuthTab.LOGIN -> LoginForm(...)
        AuthTab.REGISTER -> RegisterForm(...)
    }
}`
    },
    {
      name: 'Password Strength Progress Indicator',
      m3Role: 'Feedback & Data Display',
      description:
        'Segmented linear progress bar driven by animateColorAsState, dynamically changing colors between MaterialTheme.colorScheme.error, warning amber, and primary blue.',
      snippet: `val activeColor by animateColorAsState(
    targetValue = when (strength) {
        1 -> MaterialTheme.colorScheme.error
        2 -> Color(0xFFF57C00)
        3 -> Color(0xFF388E3C)
        else -> MaterialTheme.colorScheme.primary
    }
)`
    },
    {
      name: 'Material 3 SnackbarHost',
      m3Role: 'Notifications & Alerts',
      description:
        'Standard Android notification snackbar hosted inside Scaffold, with dismiss action and automatic duration handling.',
      snippet: `Scaffold(
    snackbarHost = { SnackbarHost(snackbarHostState) }
) { innerPadding ->
    // Screen content
}`
    }
  ];

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          Material Design 3 Jetpack Compose Component Architecture
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
          How each Material Design component is modeled according to official Android Jetpack Compose specifications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {components.map((comp, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="text-xs font-bold text-slate-100">
                  {comp.name}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300">
                  {comp.m3Role}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                {comp.description}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-[11px] text-slate-300 overflow-x-auto">
              <pre>{comp.snippet}</pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
