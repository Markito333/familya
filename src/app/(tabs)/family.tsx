import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { cardShadow, Palette, Radius } from '@/constants/theme';
import { useAuth } from '@/providers/auth-provider';

export default function FamilyScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>TU HOGAR</Text>
        <Text style={styles.title}>Familia</Text>
        <Text style={styles.subtitle}>Las personas que hacen hogar contigo.</Text>

        <View style={styles.familyCard}>
          <LinearGradient
            colors={['#FBE6DC', '#F4D9CC']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.familyIcon}>
            <Ionicons name="people" size={26} color={Palette.coralDeep} />
          </LinearGradient>
          <View style={styles.familyInfo}>
            <Text style={styles.familyName}>Mi familia</Text>
            <Text style={styles.familyMeta}>1 miembro</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Admin</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Miembros</Text>
          <Text style={styles.sectionCount}>1</Text>
        </View>

        <View style={styles.memberCard}>
          <View style={styles.memberAvatar}>
            <Text style={styles.memberInitial}>U</Text>
          </View>
          <View style={styles.memberInfo}>
            <Text style={styles.memberName}>{user?.username}</Text>
            <Text style={styles.memberRole}>Tú · Administrador</Text>
          </View>
          <Ionicons name="checkmark-circle" size={20} color={Palette.mintStrong} />
        </View>

        <View style={styles.inviteCard}>
          <View style={styles.inviteHeader}>
            <Ionicons name="key-outline" size={16} color={Palette.coralDeep} />
            <Text style={styles.inviteTitle}>Código de invitación</Text>
          </View>
          <Text style={styles.inviteCode}>— — — — — —</Text>
          <Text style={styles.inviteHint}>
            Podrás invitar a tu familia con un código cuando conectemos la base de datos.
          </Text>
        </View>

        <View style={styles.soonBox}>
          <Ionicons name="sparkles" size={13} color={Palette.coralDeep} />
          <Text style={styles.soonText}>Más funciones de familia próximamente</Text>
        </View>
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
  },
  subtitle: {
    fontSize: 13.5,
    color: Palette.textMuted,
    marginTop: 6,
    marginBottom: 24,
  },
  familyCard: {
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
  familyIcon: {
    width: 54,
    height: 54,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  familyInfo: {
    flex: 1,
    gap: 3,
  },
  familyName: {
    fontSize: 16,
    fontWeight: '700',
    color: Palette.text,
  },
  familyMeta: {
    fontSize: 12.5,
    color: Palette.textMuted,
  },
  tag: {
    backgroundColor: '#F1F4EE',
    borderRadius: Radius.pill,
    paddingVertical: 6,
    paddingHorizontal: 11,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
    color: Palette.stoneStrong,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 28,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Palette.text,
  },
  sectionCount: {
    fontSize: 12,
    fontWeight: '700',
    color: Palette.coralDeep,
    backgroundColor: Palette.coralSoft,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    textAlign: 'center',
    lineHeight: 22,
    overflow: 'hidden',
    paddingHorizontal: 6,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Palette.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Palette.border,
    padding: 14,
    ...cardShadow,
  },
  memberAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Palette.coralSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberInitial: {
    fontSize: 16,
    fontWeight: '700',
    color: Palette.coralDeep,
  },
  memberInfo: {
    flex: 1,
    gap: 2,
  },
  memberName: {
    fontSize: 15,
    fontWeight: '600',
    color: Palette.text,
  },
  memberRole: {
    fontSize: 12,
    color: Palette.textMuted,
  },
  inviteCard: {
    marginTop: 22,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#DEE6D6',
    backgroundColor: '#FBFCF8',
    padding: 18,
    alignItems: 'center',
    gap: 6,
  },
  inviteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  inviteTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Palette.coralDeep,
  },
  inviteCode: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 4,
    color: Palette.text,
    marginVertical: 2,
  },
  inviteHint: {
    fontSize: 11.5,
    color: Palette.textMuted,
    textAlign: 'center',
    lineHeight: 17,
    maxWidth: 280,
  },
  soonBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 18,
  },
  soonText: {
    fontSize: 11.5,
    color: Palette.coralDeep,
    fontWeight: '500',
  },
});
