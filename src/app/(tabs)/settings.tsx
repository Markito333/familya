import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { cardShadow, Palette, Radius } from '@/constants/theme';
import { useAuth } from '@/providers/auth-provider';

export default function SettingsScreen() {
  const { user, signOut } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>TU CUENTA</Text>
        <Text style={styles.title}>Ajustes</Text>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>U</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.username}</Text>
            <Text style={styles.profileMeta}>Cuenta local de prueba</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Demo</Text>
          </View>
        </View>

        <View style={styles.rows}>
          <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: Palette.sky }]}>
              <Ionicons name="notifications-outline" size={17} color="#6C93B8" />
            </View>
            <Text style={styles.rowLabel}>Notificaciones</Text>
            <Text style={styles.rowValue}>Pronto</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: Palette.mint }]}>
              <Ionicons name="cloud-offline-outline" size={17} color={Palette.mintStrong} />
            </View>
            <Text style={styles.rowLabel}>Base de datos</Text>
            <Text style={styles.rowValue}>Sin conectar</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="information-circle-outline" size={17} color={Palette.coralDeep} />
          <Text style={styles.infoText}>
            Esta es una versión demo con datos locales. Pronto conectaremos Supabase para guardar
            todo en la nube.
          </Text>
        </View>

        <Pressable
          onPress={signOut}
          style={({ pressed }) => [styles.signOut, pressed && styles.signOutPressed]}>
          <Ionicons name="log-out-outline" size={18} color={Palette.coralDeep} />
          <Text style={styles.signOutText}>Cerrar sesión</Text>
        </Pressable>

        <Text style={styles.version}>FamilApp · v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 36,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.1,
    color: Palette.textMuted,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: Palette.text,
    marginTop: 4,
    marginBottom: 24,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: Palette.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Palette.border,
    padding: 16,
    ...cardShadow,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Palette.coralSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: Palette.coralDeep,
  },
  profileInfo: {
    flex: 1,
    gap: 3,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '700',
    color: Palette.text,
    textTransform: 'capitalize',
  },
  profileMeta: {
    fontSize: 12.5,
    color: Palette.textMuted,
  },
  tag: {
    backgroundColor: '#F1F4EE',
    borderRadius: Radius.pill,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
    color: Palette.stoneStrong,
  },
  rows: {
    backgroundColor: Palette.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Palette.border,
    paddingHorizontal: 16,
    marginTop: 20,
    ...cardShadow,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
  },
  rowIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    flex: 1,
    fontSize: 14.5,
    fontWeight: '500',
    color: Palette.text,
  },
  rowValue: {
    fontSize: 12.5,
    color: Palette.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: Palette.border,
    marginLeft: 46,
  },
  infoCard: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: Palette.surfaceTint,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Palette.border,
    padding: 16,
    marginTop: 20,
  },
  infoText: {
    flex: 1,
    fontSize: 12.5,
    lineHeight: 18,
    color: Palette.textMuted,
  },
  signOut: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Palette.coralSoft,
    borderRadius: Radius.md,
    height: 52,
    marginTop: 24,
    borderWidth: 1.5,
    borderColor: '#F6D3C6',
  },
  signOutPressed: {
    opacity: 0.75,
  },
  signOutText: {
    fontSize: 15,
    fontWeight: '600',
    color: Palette.coralDeep,
  },
  version: {
    textAlign: 'center',
    fontSize: 11,
    color: '#A6ADA5',
    marginTop: 22,
  },
});
