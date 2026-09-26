export const COMPOSE_CODE_SNIPPETS: Record<string, { filename: string; language: string; description: string; code: string }> = {
  AuthScreen: {
    filename: 'AuthScreen.kt',
    language: 'kotlin',
    description: 'Main Composable orchestrating Material 3 Scaffold, TabRow, and animated transitions between Login and Registration',
    code: `package com.example.composeauth.ui

import androidx.compose.animation.*
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel

enum class AuthTab(val title: String) {
    LOGIN("Sign In"),
    REGISTER("Create Account")
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AuthScreen(
    modifier: Modifier = Modifier,
    authViewModel: AuthViewModel = viewModel(),
    onAuthSuccess: (String) -> Unit = {}
) {
    val uiState by authViewModel.uiState.collectAsState()
    val snackbarHostState = remember { SnackbarHostState() }
    val scrollState = rememberScrollState()

    var selectedTab by rememberSaveable { mutableStateOf(AuthTab.LOGIN) }

    // Listen for one-time navigation or snackbar events
    LaunchedEffect(Unit) {
        authViewModel.events.collect { event ->
            when (event) {
                is AuthEvent.ShowSnackbar -> {
                    snackbarHostState.showSnackbar(
                        message = event.message,
                        withDismissAction = true
                    )
                }
                is AuthEvent.NavigateToHome -> onAuthSuccess(event.userEmail)
            }
        }
    }

    Scaffold(
        modifier = modifier.fillMaxSize(),
        snackbarHost = { SnackbarHost(snackbarHostState) },
        containerColor = MaterialTheme.colorScheme.background
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .verticalScroll(scrollState)
                .padding(horizontal = 24.dp, vertical = 16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Spacer(modifier = Modifier.height(24.dp))

            // App Brand Header
            Surface(
                modifier = Modifier
                    .size(64.dp)
                    .clip(RoundedCornerShape(16.dp)),
                color = MaterialTheme.colorScheme.primaryContainer,
                tonalElevation = 4.dp
            ) {
                Box(contentAlignment = Alignment.Center) {
                    Text(
                        text = "⚡",
                        style = MaterialTheme.typography.headlineMedium
                    )
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            Text(
                text = if (selectedTab == AuthTab.LOGIN) "Welcome back" else "Create your account",
                style = MaterialTheme.typography.headlineSmall,
                color = MaterialTheme.colorScheme.onBackground
            )

            Text(
                text = if (selectedTab == AuthTab.LOGIN) 
                    "Enter your credentials to access your account" 
                else 
                    "Get started with a free developer workspace",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.padding(top = 4.dp, bottom = 24.dp)
            )

            // Material 3 Segmented Tab Selector
            Surface(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(16.dp)),
                color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f)
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(4.dp)
                ) {
                    AuthTab.values().forEach { tab ->
                        val isSelected = selectedTab == tab
                        Surface(
                            modifier = Modifier
                                .weight(1f)
                                .clip(RoundedCornerShape(12.dp)),
                            color = if (isSelected) 
                                MaterialTheme.colorScheme.surface 
                            else 
                                androidx.compose.ui.graphics.Color.Transparent,
                            tonalElevation = if (isSelected) 2.dp else 0.dp,
                            onClick = { selectedTab = tab }
                        ) {
                            Box(
                                modifier = Modifier.padding(vertical = 10.dp),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = tab.title,
                                    style = MaterialTheme.typography.labelLarge,
                                    color = if (isSelected) 
                                        MaterialTheme.colorScheme.primary 
                                    else 
                                        MaterialTheme.colorScheme.onSurfaceVariant
                                )
                            }
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            // Animated Form Switcher (AnimatedContent with slide & fade)
            AnimatedContent(
                targetState = selectedTab,
                transitionSpec = {
                    if (targetState == AuthTab.REGISTER) {
                        (slideInHorizontally(tween(300)) { it } + fadeIn()).togetherWith(
                            slideOutHorizontally(tween(300)) { -it } + fadeOut()
                        )
                    } else {
                        (slideInHorizontally(tween(300)) { -it } + fadeIn()).togetherWith(
                            slideOutHorizontally(tween(300)) { it } + fadeOut()
                        )
                    }
                },
                label = "AuthFormTransition"
            ) { currentTab ->
                when (currentTab) {
                    AuthTab.LOGIN -> {
                        LoginForm(
                            uiState = uiState,
                            onEvent = authViewModel::onEvent,
                            onForgotPassword = {
                                authViewModel.onEvent(AuthUiEvent.OnForgotPasswordClicked)
                            }
                        )
                    }
                    AuthTab.REGISTER -> {
                        RegisterForm(
                            uiState = uiState,
                            onEvent = authViewModel::onEvent
                        )
                    }
                }
            }
        }
    }
}`
  },

  LoginForm: {
    filename: 'LoginForm.kt',
    language: 'kotlin',
    description: 'Material 3 Login form composable featuring password visibility toggle, outlined text fields, validation and social sign-in',
    code: `package com.example.composeauth.ui

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusDirection
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp

@Composable
fun LoginForm(
    uiState: AuthUiState,
    onEvent: (AuthUiEvent) -> Unit,
    onForgotPassword: () -> Unit,
    modifier: Modifier = Modifier
) {
    val focusManager = LocalFocusManager::current
    
    // Toggle state for password visibility (rememberSaveable survives configuration change)
    var isPasswordVisible by rememberSaveable { mutableStateOf(false) }

    Column(
        modifier = modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Email OutlinedTextField
        OutlinedTextField(
            value = uiState.loginEmail,
            onValueChange = { onEvent(AuthUiEvent.OnLoginEmailChanged(it)) },
            modifier = Modifier.fillMaxWidth(),
            label = { Text("Email address") },
            placeholder = { Text("alex.dev@android.com") },
            leadingIcon = {
                Icon(
                    imageVector = Icons.Default.Email,
                    contentDescription = "Email Icon",
                    tint = MaterialTheme.colorScheme.onSurfaceVariant
                )
            },
            singleLine = true,
            isError = uiState.loginEmailError != null,
            supportingText = {
                uiState.loginEmailError?.let {
                    Text(text = it, color = MaterialTheme.colorScheme.error)
                }
            },
            keyboardOptions = KeyboardOptions(
                keyboardType = KeyboardType.Email,
                imeAction = ImeAction.Next
            ),
            keyboardActions = KeyboardActions(
                onNext = { focusManager.moveFocus(FocusDirection.Down) }
            ),
            shape = RoundedCornerShape(12.dp)
        )

        // Password OutlinedTextField with Password Visibility Toggle State
        OutlinedTextField(
            value = uiState.loginPassword,
            onValueChange = { onEvent(AuthUiEvent.OnLoginPasswordChanged(it)) },
            modifier = Modifier.fillMaxWidth(),
            label = { Text("Password") },
            placeholder = { Text("••••••••") },
            leadingIcon = {
                Icon(
                    imageVector = Icons.Default.Lock,
                    contentDescription = "Password Icon",
                    tint = MaterialTheme.colorScheme.onSurfaceVariant
                )
            },
            // THE CORE REQUIREMENT: Dynamic VisualTransformation based on toggle state
            visualTransformation = if (isPasswordVisible) {
                VisualTransformation.None
            } else {
                PasswordVisualTransformation()
            },
            // Material 3 IconButton trailing toggle
            trailingIcon = {
                val icon = if (isPasswordVisible) Icons.Filled.VisibilityOff else Icons.Filled.Visibility
                val description = if (isPasswordVisible) "Hide password" else "Show password"

                IconButton(
                    onClick = { isPasswordVisible = !isPasswordVisible }
                ) {
                    Icon(
                        imageVector = icon,
                        contentDescription = description,
                        tint = if (isPasswordVisible) 
                            MaterialTheme.colorScheme.primary 
                        else 
                            MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            },
            singleLine = true,
            isError = uiState.loginPasswordError != null,
            supportingText = {
                uiState.loginPasswordError?.let {
                    Text(text = it, color = MaterialTheme.colorScheme.error)
                }
            },
            keyboardOptions = KeyboardOptions(
                keyboardType = KeyboardType.Password,
                imeAction = ImeAction.Done
            ),
            keyboardActions = KeyboardActions(
                onDone = {
                    focusManager.clearFocus()
                    onEvent(AuthUiEvent.SubmitLogin)
                }
            ),
            shape = RoundedCornerShape(12.dp)
        )

        // Remember Me & Forgot Password Row
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.padding(start = 2.dp)
            ) {
                Checkbox(
                    checked = uiState.rememberMe,
                    onCheckedChange = { onEvent(AuthUiEvent.OnRememberMeChanged(it)) }
                )
                Text(
                    text = "Remember me",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onBackground
                )
            }

            TextButton(onClick = onForgotPassword) {
                Text(
                    text = "Forgot password?",
                    style = MaterialTheme.typography.labelLarge,
                    color = MaterialTheme.colorScheme.primary
                )
            }
        }

        // Primary Submit Button with Loading Indicator
        Button(
            onClick = {
                focusManager.clearFocus()
                onEvent(AuthUiEvent.SubmitLogin)
            },
            modifier = Modifier
                .fillMaxWidth()
                .height(52.dp),
            enabled = !uiState.isLoading,
            shape = RoundedCornerShape(12.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = MaterialTheme.colorScheme.primary,
                contentColor = MaterialTheme.colorScheme.onPrimary
            )
        ) {
            if (uiState.isLoading) {
                CircularProgressIndicator(
                    modifier = Modifier.size(24.dp),
                    strokeWidth = 2.5.dp,
                    color = MaterialTheme.colorScheme.onPrimary
                )
            } else {
                Text(
                    text = "Sign In",
                    style = MaterialTheme.typography.titleMedium
                )
            }
        }

        // Divider
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            HorizontalDivider(modifier = Modifier.weight(1f))
            Text(
                text = "or continue with",
                style = MaterialTheme.typography.labelMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.padding(horizontal = 16.dp)
            )
            HorizontalDivider(modifier = Modifier.weight(1f))
        }

        // Social Outlined Buttons
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            OutlinedButton(
                onClick = { onEvent(AuthUiEvent.SocialLogin("Google")) },
                modifier = Modifier.weight(1f).height(48.dp),
                shape = RoundedCornerShape(12.dp)
            ) {
                Text("Google")
            }
            OutlinedButton(
                onClick = { onEvent(AuthUiEvent.SocialLogin("GitHub")) },
                modifier = Modifier.weight(1f).height(48.dp),
                shape = RoundedCornerShape(12.dp)
            ) {
                Text("GitHub")
            }
        }
    }
}`
  },

  RegisterForm: {
    filename: 'RegisterForm.kt',
    language: 'kotlin',
    description: 'Registration composable with password & confirm password visibility toggles, live strength meter, and terms checkbox',
    code: `package com.example.composeauth.ui

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.focus.FocusDirection
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp

@Composable
fun RegisterForm(
    uiState: AuthUiState,
    onEvent: (AuthUiEvent) -> Unit,
    modifier: Modifier = Modifier
) {
    val focusManager = LocalFocusManager::current

    // Dual visibility toggle states
    var isPasswordVisible by rememberSaveable { mutableStateOf(false) }
    var isConfirmPasswordVisible by rememberSaveable { mutableStateOf(false) }

    Column(
        modifier = modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Full Name OutlinedTextField
        OutlinedTextField(
            value = uiState.registerName,
            onValueChange = { onEvent(AuthUiEvent.OnRegisterNameChanged(it)) },
            modifier = Modifier.fillMaxWidth(),
            label = { Text("Full name") },
            placeholder = { Text("Jane Doe") },
            leadingIcon = {
                Icon(Icons.Default.Person, "Name", tint = MaterialTheme.colorScheme.onSurfaceVariant)
            },
            singleLine = true,
            isError = uiState.registerNameError != null,
            supportingText = {
                uiState.registerNameError?.let { Text(it, color = MaterialTheme.colorScheme.error) }
            },
            keyboardOptions = KeyboardOptions(imeAction = ImeAction.Next),
            keyboardActions = KeyboardActions(onNext = { focusManager.moveFocus(FocusDirection.Down) }),
            shape = RoundedCornerShape(12.dp)
        )

        // Email Address OutlinedTextField
        OutlinedTextField(
            value = uiState.registerEmail,
            onValueChange = { onEvent(AuthUiEvent.OnRegisterEmailChanged(it)) },
            modifier = Modifier.fillMaxWidth(),
            label = { Text("Work email") },
            placeholder = { Text("jane@example.com") },
            leadingIcon = {
                Icon(Icons.Default.Email, "Email", tint = MaterialTheme.colorScheme.onSurfaceVariant)
            },
            singleLine = true,
            isError = uiState.registerEmailError != null,
            supportingText = {
                uiState.registerEmailError?.let { Text(it, color = MaterialTheme.colorScheme.error) }
            },
            keyboardOptions = KeyboardOptions(
                keyboardType = KeyboardType.Email,
                imeAction = ImeAction.Next
            ),
            keyboardActions = KeyboardActions(onNext = { focusManager.moveFocus(FocusDirection.Down) }),
            shape = RoundedCornerShape(12.dp)
        )

        // Password with Visibility Toggle & Strength Calculation
        OutlinedTextField(
            value = uiState.registerPassword,
            onValueChange = { onEvent(AuthUiEvent.OnRegisterPasswordChanged(it)) },
            modifier = Modifier.fillMaxWidth(),
            label = { Text("Create password") },
            leadingIcon = {
                Icon(Icons.Default.Lock, "Password", tint = MaterialTheme.colorScheme.onSurfaceVariant)
            },
            visualTransformation = if (isPasswordVisible) VisualTransformation.None else PasswordVisualTransformation(),
            trailingIcon = {
                val icon = if (isPasswordVisible) Icons.Filled.VisibilityOff else Icons.Filled.Visibility
                IconButton(onClick = { isPasswordVisible = !isPasswordVisible }) {
                    Icon(
                        imageVector = icon,
                        contentDescription = "Toggle password visibility",
                        tint = if (isPasswordVisible) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            },
            singleLine = true,
            isError = uiState.registerPasswordError != null,
            supportingText = {
                uiState.registerPasswordError?.let { Text(it, color = MaterialTheme.colorScheme.error) }
            },
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password, imeAction = ImeAction.Next),
            keyboardActions = KeyboardActions(onNext = { focusManager.moveFocus(FocusDirection.Down) }),
            shape = RoundedCornerShape(12.dp)
        )

        // Material 3 Password Strength Indicator Bar
        if (uiState.registerPassword.isNotEmpty()) {
            PasswordStrengthBar(strength = uiState.passwordStrength)
        }

        // Confirm Password with Independent Visibility Toggle
        OutlinedTextField(
            value = uiState.registerConfirmPassword,
            onValueChange = { onEvent(AuthUiEvent.OnRegisterConfirmPasswordChanged(it)) },
            modifier = Modifier.fillMaxWidth(),
            label = { Text("Confirm password") },
            leadingIcon = {
                Icon(Icons.Default.Lock, "Confirm Password", tint = MaterialTheme.colorScheme.onSurfaceVariant)
            },
            visualTransformation = if (isConfirmPasswordVisible) VisualTransformation.None else PasswordVisualTransformation(),
            trailingIcon = {
                val icon = if (isConfirmPasswordVisible) Icons.Filled.VisibilityOff else Icons.Filled.Visibility
                IconButton(onClick = { isConfirmPasswordVisible = !isConfirmPasswordVisible }) {
                    Icon(
                        imageVector = icon,
                        contentDescription = "Toggle confirm password visibility",
                        tint = if (isConfirmPasswordVisible) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            },
            singleLine = true,
            isError = uiState.registerConfirmPasswordError != null,
            supportingText = {
                uiState.registerConfirmPasswordError?.let { Text(it, color = MaterialTheme.colorScheme.error) }
            },
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password, imeAction = ImeAction.Done),
            keyboardActions = KeyboardActions(onDone = {
                focusManager.clearFocus()
                onEvent(AuthUiEvent.SubmitRegister)
            }),
            shape = RoundedCornerShape(12.dp)
        )

        // Terms & Privacy Checkbox
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Checkbox(
                checked = uiState.agreeToTerms,
                onCheckedChange = { onEvent(AuthUiEvent.OnAgreeToTermsChanged(it)) }
            )
            Text(
                text = "I agree to Terms of Service & Privacy Policy",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onBackground
            )
        }
        uiState.agreeToTermsError?.let {
            Text(
                text = it,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.error,
                modifier = Modifier.padding(start = 12.dp)
            )
        }

        // Submit Button
        Button(
            onClick = {
                focusManager.clearFocus()
                onEvent(AuthUiEvent.SubmitRegister)
            },
            modifier = Modifier
                .fillMaxWidth()
                .height(52.dp),
            enabled = !uiState.isLoading,
            shape = RoundedCornerShape(12.dp)
        ) {
            if (uiState.isLoading) {
                CircularProgressIndicator(
                    modifier = Modifier.size(24.dp),
                    strokeWidth = 2.5.dp,
                    color = MaterialTheme.colorScheme.onPrimary
                )
            } else {
                Text("Create Account", style = MaterialTheme.typography.titleMedium)
            }
        }
    }
}

@Composable
fun PasswordStrengthBar(
    strength: Int, // 0 to 4
    modifier: Modifier = Modifier
) {
    val labels = listOf("Very Weak", "Weak", "Fair", "Strong", "Excellent")
    val colors = listOf(
        MaterialTheme.colorScheme.error,
        Color(0xFFF57C00), // Amber
        Color(0xFFFBC02D), // Yellow
        Color(0xFF388E3C), // Emerald
        MaterialTheme.colorScheme.primary
    )

    val activeColor by animateColorAsState(
        targetValue = colors.getOrElse(strength) { MaterialTheme.colorScheme.error },
        label = "StrengthColor"
    )

    Column(modifier = modifier.fillMaxWidth()) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(
                text = "Password Strength",
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            Text(
                text = labels.getOrElse(strength) { "Weak" },
                style = MaterialTheme.typography.labelSmall,
                color = activeColor
            )
        }
        Spacer(modifier = Modifier.height(4.dp))
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            for (i in 0 until 4) {
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .height(4.dp)
                        .clip(RoundedCornerShape(2.dp))
                        .background(
                            if (i < strength) activeColor else MaterialTheme.colorScheme.surfaceVariant
                        )
                )
            }
        }
    }
}`
  },

  AuthViewModel: {
    filename: 'AuthViewModel.kt',
    language: 'kotlin',
    description: 'Android ViewModel managing StateFlow UI state, form validation, sealed events, and async submission',
    code: `package com.example.composeauth.ui

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch

data class AuthUiState(
    // Login
    val loginEmail: String = "",
    val loginPassword: String = "",
    val rememberMe: Boolean = false,
    val loginEmailError: String? = null,
    val loginPasswordError: String? = null,

    // Register
    val registerName: String = "",
    val registerEmail: String = "",
    val registerPassword: String = "",
    val registerConfirmPassword: String = "",
    val passwordStrength: Int = 0,
    val agreeToTerms: Boolean = false,
    val registerNameError: String? = null,
    val registerEmailError: String? = null,
    val registerPasswordError: String? = null,
    val registerConfirmPasswordError: String? = null,
    val agreeToTermsError: String? = null,

    // Shared
    val isLoading: Boolean = false
)

sealed interface AuthUiEvent {
    data class OnLoginEmailChanged(val value: String) : AuthUiEvent
    data class OnLoginPasswordChanged(val value: String) : AuthUiEvent
    data class OnRememberMeChanged(val value: Boolean) : AuthUiEvent
    object SubmitLogin : AuthUiEvent
    object OnForgotPasswordClicked : AuthUiEvent

    data class OnRegisterNameChanged(val value: String) : AuthUiEvent
    data class OnRegisterEmailChanged(val value: String) : AuthUiEvent
    data class OnRegisterPasswordChanged(val value: String) : AuthUiEvent
    data class OnRegisterConfirmPasswordChanged(val value: String) : AuthUiEvent
    data class OnAgreeToTermsChanged(val value: Boolean) : AuthUiEvent
    object SubmitRegister : AuthUiEvent

    data class SocialLogin(val provider: String) : AuthUiEvent
}

sealed interface AuthEvent {
    data class ShowSnackbar(val message: String) : AuthEvent
    data class NavigateToHome(val userEmail: String) : AuthEvent
}

class AuthViewModel : ViewModel() {

    private val _uiState = MutableStateFlow(AuthUiState())
    val uiState: StateFlow<AuthUiState> = _uiState.asStateFlow()

    private val _events = Channel<AuthEvent>()
    val events = _events.receiveAsFlow()

    fun onEvent(event: AuthUiEvent) {
        when (event) {
            is AuthUiEvent.OnLoginEmailChanged -> {
                _uiState.update { it.copy(loginEmail = event.value, loginEmailError = null) }
            }
            is AuthUiEvent.OnLoginPasswordChanged -> {
                _uiState.update { it.copy(loginPassword = event.value, loginPasswordError = null) }
            }
            is AuthUiEvent.OnRememberMeChanged -> {
                _uiState.update { it.copy(rememberMe = event.value) }
            }
            is AuthUiEvent.SubmitLogin -> handleLogin()
            is AuthUiEvent.OnForgotPasswordClicked -> {
                viewModelScope.launch {
                    _events.send(AuthEvent.ShowSnackbar("Password reset link sent to your email"))
                }
            }

            is AuthUiEvent.OnRegisterNameChanged -> {
                _uiState.update { it.copy(registerName = event.value, registerNameError = null) }
            }
            is AuthUiEvent.OnRegisterEmailChanged -> {
                _uiState.update { it.copy(registerEmail = event.value, registerEmailError = null) }
            }
            is AuthUiEvent.OnRegisterPasswordChanged -> {
                val strength = calculatePasswordStrength(event.value)
                _uiState.update { 
                    it.copy(
                        registerPassword = event.value, 
                        passwordStrength = strength, 
                        registerPasswordError = null 
                    ) 
                }
            }
            is AuthUiEvent.OnRegisterConfirmPasswordChanged -> {
                _uiState.update { 
                    it.copy(registerConfirmPassword = event.value, registerConfirmPasswordError = null) 
                }
            }
            is AuthUiEvent.OnAgreeToTermsChanged -> {
                _uiState.update { it.copy(agreeToTerms = event.value, agreeToTermsError = null) }
            }
            is AuthUiEvent.SubmitRegister -> handleRegister()

            is AuthUiEvent.SocialLogin -> {
                viewModelScope.launch {
                    _events.send(AuthEvent.ShowSnackbar("Authenticating with \${event.provider}..."))
                }
            }
        }
    }

    private fun handleLogin() {
        val state = _uiState.value
        val emailError = if (state.loginEmail.isBlank() || !android.util.Patterns.EMAIL_ADDRESS.matcher(state.loginEmail).matches()) {
            "Valid email address is required"
        } else null

        val passwordError = if (state.loginPassword.isBlank()) {
            "Password cannot be empty"
        } else null

        if (emailError != null || passwordError != null) {
            _uiState.update { it.copy(loginEmailError = emailError, loginPasswordError = passwordError) }
            return
        }

        viewModelScope.launch {
            _uiState.update { it.copy(isLoading = true) }
            delay(1200) // Simulating network latency
            _uiState.update { it.copy(isLoading = false) }
            _events.send(AuthEvent.NavigateToHome(state.loginEmail))
        }
    }

    private fun handleRegister() {
        val state = _uiState.value
        var hasError = false
        var nameErr: String? = null
        var emailErr: String? = null
        var pwdErr: String? = null
        var confirmErr: String? = null
        var termsErr: String? = null

        if (state.registerName.trim().length < 2) {
            nameErr = "Please enter your full name"
            hasError = true
        }

        if (!android.util.Patterns.EMAIL_ADDRESS.matcher(state.registerEmail).matches()) {
            emailErr = "Please enter a valid email address"
            hasError = true
        }

        if (state.registerPassword.length < 8) {
            pwdErr = "Password must be at least 8 characters"
            hasError = true
        }

        if (state.registerPassword != state.registerConfirmPassword) {
            confirmErr = "Passwords do not match"
            hasError = true
        }

        if (!state.agreeToTerms) {
            termsErr = "You must agree to the Terms of Service"
            hasError = true
        }

        if (hasError) {
            _uiState.update {
                it.copy(
                    registerNameError = nameErr,
                    registerEmailError = emailErr,
                    registerPasswordError = pwdErr,
                    registerConfirmPasswordError = confirmErr,
                    agreeToTermsError = termsErr
                )
            }
            return
        }

        viewModelScope.launch {
            _uiState.update { it.copy(isLoading = true) }
            delay(1500)
            _uiState.update { it.copy(isLoading = false) }
            _events.send(AuthEvent.ShowSnackbar("Account created successfully! Welcome aboard."))
        }
    }

    private fun calculatePasswordStrength(password: String): Int {
        if (password.isEmpty()) return 0
        var score = 0
        if (password.length >= 8) score++
        if (password.any { it.isUpperCase() }) score++
        if (password.any { it.isDigit() }) score++
        if (password.any { !it.isLetterOrDigit() }) score++
        return score
    }
}`
  },

  Theme: {
    filename: 'Theme.kt',
    language: 'kotlin',
    description: 'Material 3 ColorScheme, Typography and Shapes matching modern Google Material You design',
    code: `package com.example.composeauth.ui.theme

import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext

private val DarkColorScheme = darkColorScheme(
    primary = Color(0xFFA8C7FA),
    onPrimary = Color(0xFF062E6F),
    primaryContainer = Color(0xFF0842A0),
    onPrimaryContainer = Color(0xFFD3E3FD),
    secondary = Color(0xFF7FCFFF),
    background = Color(0xFF111318),
    surface = Color(0xFF191C20),
    surfaceVariant = Color(0xFF44474E),
    onSurfaceVariant = Color(0xFFC4C6D0),
    error = Color(0xFFFFB4AB),
    onError = Color(0xFF690005)
)

private val LightColorScheme = lightColorScheme(
    primary = Color(0xFF0B57D0),
    onPrimary = Color(0xFFFFFFFF),
    primaryContainer = Color(0xFFD3E3FD),
    onPrimaryContainer = Color(0xFF041E49),
    secondary = Color(0xFF00639B),
    background = Color(0xFFF8F9FA),
    surface = Color(0xFFFFFFFF),
    surfaceVariant = Color(0xFFE1E2EC),
    onSurfaceVariant = Color(0xFF44474E),
    error = Color(0xFFBA1A1A),
    onError = Color(0xFFFFFFFF)
)

@Composable
fun ComposeAuthTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = true,
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        }
        darkTheme -> DarkColorScheme
        else -> LightColorScheme
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography(),
        shapes = Shapes(),
        content = content
    )
}`
  }
};
