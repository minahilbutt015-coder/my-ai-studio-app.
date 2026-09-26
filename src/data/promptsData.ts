import { PromptConfig } from '../types';

export interface PrebuiltPrompt {
  id: string;
  title: string;
  badge: string;
  description: string;
  targetUse: string;
  promptText: string;
}

export const PREBUILT_PROMPTS: PrebuiltPrompt[] = [
  {
    id: 'master-m3-auth',
    title: 'Master Production Material 3 Auth Screen',
    badge: 'Recommended',
    description: 'Complete prompt specifying Material Design 3, animated tabs, password visibility toggle, and live validation.',
    targetUse: 'Production Android Apps (Kotlin + M3)',
    promptText: `Act as a Senior Android Engineer specialized in modern Jetpack Compose and Material Design 3.

Create a production-grade, highly polished Authentication flow in Android using Kotlin and Jetpack Compose that seamlessly handles both Login and Registration forms.

### Architecture & Requirements:
1. **Material Design 3 (M3) Components & Tokens**:
   - Use \`androidx.compose.material3.*\` components exclusively (\`Scaffold\`, \`SnackbarHost\`, \`OutlinedTextField\`, \`Button\`, \`OutlinedButton\`, \`Checkbox\`, \`HorizontalDivider\`, \`CircularProgressIndicator\`).
   - Clean spacing scale (8dp, 16dp, 24dp) with rounded corner shapes (\`RoundedCornerShape(12.dp)\`).
   - Dynamic theming support with light and dark mode colors following Material 3 color roles (\`primary\`, \`surfaceVariant\`, \`error\`, \`onSurfaceVariant\`).

2. **Unified Screen with Animated Tabs**:
   - A single cohesive Composable \`AuthScreen\` featuring a top segmented tab switch between "Sign In" and "Create Account".
   - Smooth animated tab transitions using \`AnimatedContent\` with horizontal slide and crossfade animations (\`slideInHorizontally\` + \`fadeIn\`).

3. **Interactive Password Visibility Toggle (CRITICAL)**:
   - Both the Login and Registration password fields MUST support interactive password visibility toggling.
   - Use \`rememberSaveable { mutableStateOf(false) }\` so toggle state persists across screen rotation/configuration changes.
   - Swap \`visualTransformation\` dynamically:
     \`visualTransformation = if (isPasswordVisible) VisualTransformation.None else PasswordVisualTransformation()\`
   - Trailing \`IconButton\` showing \`Icons.Filled.Visibility\` when hidden, and \`Icons.Filled.VisibilityOff\` when visible, with accessible \`contentDescription\`.

4. **Forms Specification**:
   - **Login Form**:
     - Email (\`KeyboardType.Email\`, \`ImeAction.Next\`)
     - Password with visibility toggle (\`KeyboardType.Password\`, \`ImeAction.Done\`)
     - "Remember me" Checkbox and "Forgot password?" action button
     - Primary "Sign In" button with loading state indicator
     - Social login buttons ("Google", "GitHub") with \`OutlinedButton\`
   - **Registration Form**:
     - Full Name
     - Email Address
     - Password with visibility toggle
     - Live **Password Strength Indicator** with animated color bar (Weak / Fair / Good / Strong)
     - Confirm Password with its own independent visibility toggle & live match validation
     - "I agree to Terms & Privacy Policy" Checkbox
     - Primary "Create Account" button with loading state

5. **State Management & Validation**:
   - Provide an \`AuthViewModel\` using \`StateFlow<AuthUiState>\` with sealed interface \`AuthUiEvent\` and \`AuthEvent\` channels for single-event snackbars.
   - Robust form validation with inline \`isError\` and \`supportingText\` for instant feedback.
   - Handle soft keyboard focus transitions using \`LocalFocusManager\` and \`Modifier.imePadding()\`.

Provide complete, self-contained, and idiomatic Kotlin code ready to paste into Android Studio.`
  },
  {
    id: 'mvi-clean-arch',
    title: 'Clean Architecture MVI ViewModel Auth',
    badge: 'Clean Arch',
    description: 'Detailed prompt for enterprise apps with strict unidirectional data flow (UDF), domain use cases, and testing.',
    targetUse: 'Enterprise & Scalable Codebases',
    promptText: `Act as a Principal Android Architect.

Write a Jetpack Compose Authentication feature following strict Clean Architecture and MVI (Model-View-Intent) Unidirectional Data Flow principles for Android.

### Scope:
1. **Domain Layer**:
   - Sealed class \`AuthResult<T>\` (Success, Error, Loading).
   - Use Cases: \`ValidateEmailUseCase\`, \`ValidatePasswordUseCase\`, \`LoginUseCase\`, \`RegisterUseCase\`.
2. **Presentation Layer**:
   - \`AuthViewModel\` exposing immutable \`StateFlow<AuthState>\` and a Channel for \`AuthEffect\` (navigation, toast).
   - UI Composable using Material 3 with \`OutlinedTextField\` inputs.
   - Implement password visibility toggle state using \`rememberSaveable\` and \`PasswordVisualTransformation\` / \`VisualTransformation.None\`.
   - Provide interactive confirmation password matching and live password strength analysis.
3. **Accessibility & Usability**:
   - Semantics properties, clear error descriptions for TalkBack, and proper keyboard actions (\`ImeAction.Next\` and \`ImeAction.Done\`).

Include full Kotlin code and unit test examples for the validation use cases.`
  },
  {
    id: 'biometric-keychain',
    title: 'Biometric + Password M3 Compose Auth',
    badge: 'Security',
    description: 'Prompt including AndroidX BiometricPrompt fingerprint/face unlock and EncryptedSharedPreferences token storage.',
    targetUse: 'High-Security Banking & Fintech Apps',
    promptText: `Act as an Android Security and Jetpack Compose expert.

Generate an Android Jetpack Compose authentication screen that combines Material Design 3 email/password authentication (with visibility toggle) and Biometric Authentication (Fingerprint & Face Unlock) using the AndroidX Biometric library (\`BiometricPrompt\`).

### Key Specifications:
1. Jetpack Compose UI with Material 3 \`Scaffold\`, \`OutlinedTextField\` with password visibility toggle.
2. Quick Biometric Login CTA button with fingerprint glyph.
3. Integration with \`BiometricManager.canAuthenticate()\` and \`BiometricPrompt\` callback handling inside a Composable using \`rememberLauncherForActivityResult\` or FragmentActivity wrapper.
4. Secure token storage pattern using AndroidX Security \`EncryptedSharedPreferences\` or Jetpack DataStore with Tink encryption.
5. Error handling for cancelled biometric prompt, lockout, and fallback to password credentials.

Write clean, production-ready Kotlin code with gradle dependencies.`
  }
];

export function buildCustomPrompt(config: PromptConfig): string {
  const parts: string[] = [];

  parts.push(`Act as a Senior Android Engineer. Create a production-ready Jetpack Compose application authentication interface in Kotlin with the following specifications:`);
  
  parts.push(`\n### 1. UI & Design System:`);
  parts.push(`- Framework: Jetpack Compose with **${config.uiLibrary}**.`);
  parts.push(`- Follow modern Material You design guidelines with dynamic color scheme support, rounded corners, and clear typographic hierarchy.`);
  parts.push(`- Provide both **Sign In** and **Registration** forms in a unified screen with a polished segmented tab switcher and smooth animated transition.`);

  parts.push(`\n### 2. Password & Security Experience:`);
  if (config.passwordFeatures.toggleVisibility) {
    parts.push(`- **Toggle State Password Visibility**: Implement an interactive trailing icon toggle on all password fields using \`rememberSaveable { mutableStateOf(false) }\`. Dynamically switch between \`PasswordVisualTransformation()\` and \`VisualTransformation.None\` with matching \`Icons.Filled.Visibility\` and \`Icons.Filled.VisibilityOff\` icons.`);
  }
  if (config.passwordFeatures.strengthMeter) {
    parts.push(`- **Password Strength Meter**: Include a real-time visual strength indicator (Weak, Fair, Good, Strong) for the registration form with animated color progress indicators.`);
  }
  if (config.passwordFeatures.confirmPasswordMatch) {
    parts.push(`- **Confirm Password Validation**: Include a confirm password field with independent visibility toggle and live match validation feedback.`);
  }

  parts.push(`\n### 3. Architecture & State Management:`);
  parts.push(`- Architecture Pattern: **${config.targetArchitecture}**.`);
  parts.push(`- State Handling: **${config.stateHandling}** with immutable UI state and distinct user intent events.`);
  parts.push(`- Real-time form validation with inline \`isError\` flags and \`supportingText\` for email format, password complexity, and required fields.`);

  const extras: string[] = [];
  if (config.extraFeatures.rememberMe) extras.push(`"Remember Me" persistence`);
  if (config.extraFeatures.forgotPasswordDialog) extras.push(`"Forgot Password" dialog/bottom sheet with email recovery`);
  if (config.extraFeatures.socialAuth) extras.push(`Social sign-in buttons (Google & GitHub) with Material 3 OutlinedButton`);
  if (config.extraFeatures.biometrics) extras.push(`Biometric authentication (Fingerprint / Face ID) prompt support`);

  if (extras.length > 0) {
    parts.push(`\n### 4. Additional Capabilities:`);
    extras.forEach(item => parts.push(`- ${item}`));
  }

  if (config.navigation !== 'None (Single Composable)') {
    parts.push(`\n### 5. Navigation:`);
    parts.push(`- Navigation Library: **${config.navigation}** with typed route definitions.`);
  }

  parts.push(`\n### Output Format:`);
  parts.push(`Provide clean, idiomatic, fully compilable Kotlin files with all necessary imports, composable functions, and ViewModel implementation ready to copy directly into Android Studio.`);

  return parts.join('\n');
}
