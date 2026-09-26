export type ThemeMode = 'dark' | 'light';

export type ColorPalette = 'blue' | 'emerald' | 'coral' | 'violet' | 'amber';

export interface ThemeConfig {
  mode: ThemeMode;
  palette: ColorPalette;
  cornerRadius: 'sm' | 'md' | 'lg';
}

export type AuthTab = 'login' | 'register';

export interface FormState {
  // Login
  loginEmail: string;
  loginPassword: string;
  loginPasswordVisible: boolean;
  rememberMe: boolean;
  
  // Register
  registerName: string;
  registerEmail: string;
  registerPassword: string;
  registerPasswordVisible: boolean;
  registerConfirmPassword: string;
  registerConfirmPasswordVisible: boolean;
  agreeToTerms: boolean;
}

export interface ValidationErrors {
  loginEmail?: string;
  loginPassword?: string;
  registerName?: string;
  registerEmail?: string;
  registerPassword?: string;
  registerConfirmPassword?: string;
  agreeToTerms?: string;
}

export interface PasswordStrength {
  score: number; // 0 to 4
  label: 'Weak' | 'Fair' | 'Good' | 'Strong';
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

export interface EventLogItem {
  id: string;
  timestamp: string;
  name: string;
  payload: Record<string, any>;
}

export type CodeTab = 'AuthScreen' | 'LoginForm' | 'RegisterForm' | 'AuthViewModel' | 'Theme';

export interface PromptConfig {
  targetArchitecture: 'MVVM' | 'MVI';
  uiLibrary: 'Material 3 (M3)' | 'Material 2';
  stateHandling: 'rememberSaveable' | 'ViewModel + StateFlow';
  passwordFeatures: {
    toggleVisibility: boolean;
    strengthMeter: boolean;
    confirmPasswordMatch: boolean;
  };
  extraFeatures: {
    biometrics: boolean;
    socialAuth: boolean;
    forgotPasswordDialog: boolean;
    rememberMe: boolean;
  };
  navigation: 'Compose Navigation (Type-safe)' | 'Voyager' | 'None (Single Composable)';
}
