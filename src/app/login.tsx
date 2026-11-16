import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Redirect } from 'expo-router';
import { useRef, useState, type ComponentRef } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { cardShadow, Palette, Radius } from '@/constants/theme';
import { useAuth } from '@/providers/auth-provider';

export default function LoginScreen() {
  const { user, signIn } = useAuth();
  const passwordRef = useRef<ComponentRef<typeof TextInput>>(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<'username' | 'password' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Redirect href="/tasks" />;
  }

  const handleSubmit = async () => {
    if (loading) return;

    Keyboard.dismiss();
    setError(null);
    setLoading(true);

    const message = await signIn(username, password);

    setLoading(false);

    if (message) {
      setError(message);
    }
  };

  return (
    <LinearGradient
      colors={['#FBF7EF', '#F9F3E8', '#F5EDDF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.6, y: 1 }}
      style={styles.gradient}>
      <View pointerEvents="none" style={styles.blobTop} />
      <View pointerEvents="none" style={styles.blobBottom} />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.flex}>
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles.logoWrap}>
              <LinearGradient
                colors={['#FBE2D8', '#F6CDBD']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.logo}>
                <Ionicons name="home" size={34} color={Palette.coralDeep} />
              </LinearGradient>
            </View>

            <Text style={styles.title}>FamilApp</Text>
            <Text style={styles.subtitle}>Organiza las tareas de tu hogar.</Text>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Inicia sesión</Text>
              <Text style={styles.cardSubtitle}>Accede para gestionar el día en familia.</Text>

              <Text style={styles.label}>Usuario</Text>
              <View style={[styles.inputWrap, focused === 'username' && styles.inputWrapFocused]}>
                <Ionicons
                  name="person-outline"
                  size={18}
                  color={focused === 'username' ? Palette.coralDeep : Palette.textMuted}
                />
                <TextInput
                  value={username}
                  onChangeText={setUsername}
                  onFocus={() => setFocused('username')}
                  onBlur={() => setFocused(null)}
                  placeholder="Tu usuario"
                  placeholderTextColor="#B3AEC0"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="username"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  style={styles.input}
                />
              </View>

              <Text style={[styles.label, styles.labelSpaced]}>Contraseña</Text>
              <View style={[styles.inputWrap, focused === 'password' && styles.inputWrapFocused]}>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color={focused === 'password' ? Palette.coralDeep : Palette.textMuted}
                />
                <TextInput
                  ref={passwordRef}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  placeholder="Tu contraseña"
                  placeholderTextColor="#B3AEC0"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="go"
                  onSubmitEditing={handleSubmit}
                  style={styles.input}
                />
                <Pressable
                  onPress={() => setShowPassword((visible) => !visible)}
                  hitSlop={10}
                  accessibilityLabel={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={19}
                    color={Palette.textMuted}
                  />
                </Pressable>
              </View>

              {error ? (
                <View style={styles.errorRow}>
                  <Ionicons name="alert-circle" size={15} color={Palette.danger} />
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              ) : null}

              <Pressable
                onPress={handleSubmit}
                disabled={loading}
                style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
                <LinearGradient
                  colors={['#F7B3A1', '#F0957F']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonInner}>
                  {loading ? (
                    <ActivityIndicator color={Palette.coralInk} />
                  ) : (
                    <>
                      <Text style={styles.buttonText}>Entrar</Text>
                      <Ionicons name="arrow-forward" size={18} color={Palette.coralInk} />
                    </>
                  )}
                </LinearGradient>
              </Pressable>

              <View style={styles.demoBox}>
                <Ionicons name="key-outline" size={15} color={Palette.sageStrong} />
                <Text style={styles.demoText}>
                  Demo: usuario <Text style={styles.demoStrong}>user</Text> · contraseña{' '}
                  <Text style={styles.demoStrong}>user</Text>
                </Text>
              </View>
            </View>

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>FamilApp</Text>
              <View style={styles.footerDot} />
              <Text style={styles.footerText}>Acceso demo</Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  blobTop: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#FBE3D9',
    opacity: 0.8,
    top: -80,
    right: -60,
  },
  blobBottom: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#F1E9DA',
    opacity: 0.6,
    bottom: -110,
    left: -80,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
    gap: 6,
  },
  logoWrap: {
    marginBottom: 10,
  },
  logo: {
    width: 74,
    height: 74,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    ...cardShadow,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.6,
    color: Palette.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: Palette.textMuted,
    textAlign: 'center',
    marginBottom: 22,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: Palette.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Palette.border,
    padding: 24,
    ...cardShadow,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Palette.text,
  },
  cardSubtitle: {
    fontSize: 13,
    color: Palette.textMuted,
    marginTop: 4,
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: Palette.textMuted,
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  labelSpaced: {
    marginTop: 16,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Palette.surfaceMuted,
    borderWidth: 1.5,
    borderColor: 'transparent',
    borderRadius: Radius.md,
    paddingHorizontal: 14,
    height: 52,
  },
  inputWrapFocused: {
    borderColor: '#F3C3B2',
    backgroundColor: '#FFFAF6',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Palette.text,
    height: '100%',
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 14,
  },
  errorText: {
    flex: 1,
    fontSize: 12.5,
    color: Palette.danger,
  },
  button: {
    marginTop: 22,
    borderRadius: Radius.md,
    overflow: 'hidden',
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  buttonInner: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Palette.coralInk,
  },
  demoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    backgroundColor: '#F5EFE4',
    borderRadius: Radius.pill,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginTop: 16,
  },
  demoText: {
    fontSize: 12.5,
    color: Palette.stoneStrong,
  },
  demoStrong: {
    fontWeight: '700',
    color: '#6B5346',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 26,
  },
  footerText: {
    fontSize: 12,
    color: Palette.textMuted,
  },
  footerDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: Palette.textMuted,
  },
});
