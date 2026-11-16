import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { cardShadow, Palette, Radius } from '@/constants/theme';
import { useAuth } from '@/providers/auth-provider';

type StatTone = 'peach' | 'mint';

const toneStyles: Record<StatTone, { background: string; icon: string; accent: string }> = {
  peach: { background: '#F5EFE4', icon: 'time-outline', accent: Palette.stoneStrong },
  mint: { background: '#EDF7E6', icon: 'checkmark-circle-outline', accent: Palette.mintStrong },
};

function StatCard({ tone, value, label }: { tone: StatTone; value: string; label: string }) {
  const config = toneStyles[tone];

  return (
    <View style={[styles.statCard, { backgroundColor: config.background }]}>
      <View style={styles.statIconWrap}>
        <Ionicons name={config.icon as never} size={16} color={config.accent} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function TasksScreen() {
  const { user } = useAuth();

  const today = new Date()
    .toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })
    .toUpperCase();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.eyebrow}>{today}</Text>
            <Text style={styles.greeting}>Hola, {user?.username}</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>U</Text>
          </View>
        </View>

        <Text style={styles.tagline}>Todo tranquilo por aquí. Vamos a organizar el día.</Text>

        <View style={styles.statsRow}>
          <StatCard tone="peach" value="0" label="Pendientes" />
          <StatCard tone="mint" value="0" label="Completadas" />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tareas de hoy</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>0</Text>
          </View>
        </View>

        <View style={styles.emptyCard}>
          <LinearGradient
            colors={['#FBE7DF', '#F7D8CB']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.emptyIcon}>
            <Ionicons name="checkmark-done" size={30} color={Palette.coralDeep} />
          </LinearGradient>
          <Text style={styles.emptyTitle}>Aún no hay tareas</Text>
          <Text style={styles.emptyText}>
            Muy pronto podrás crear y compartir tareas con tu familia.
          </Text>
          <View style={styles.soonPill}>
            <Ionicons name="sparkles" size={12} color={Palette.coralDeep} />
            <Text style={styles.soonText}>Próximamente</Text>
          </View>
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
    paddingTop: 12,
    paddingBottom: 36,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    flex: 1,
    gap: 4,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.1,
    color: Palette.textMuted,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: Palette.text,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Palette.coralSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: Palette.coralDeep,
    textTransform: 'uppercase',
  },
  tagline: {
    fontSize: 13.5,
    color: Palette.textMuted,
    marginTop: 8,
    marginBottom: 22,
    maxWidth: 300,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 22,
  },
  statCard: {
    flex: 1,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Palette.border,
    padding: 12,
    gap: 1,
    ...cardShadow,
  },
  statIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Palette.text,
  },
  statLabel: {
    fontSize: 11.5,
    color: Palette.textMuted,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Palette.text,
  },
  countBadge: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Palette.coralSoft,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 7,
  },
  countText: {
    fontSize: 12,
    fontWeight: '700',
    color: Palette.coralDeep,
  },
  emptyCard: {
    backgroundColor: Palette.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Palette.border,
    paddingVertical: 30,
    paddingHorizontal: 24,
    alignItems: 'center',
    gap: 8,
    ...cardShadow,
  },
  emptyIcon: {
    width: 62,
    height: 62,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Palette.text,
  },
  emptyText: {
    fontSize: 13,
    color: Palette.textMuted,
    textAlign: 'center',
    lineHeight: 19,
    maxWidth: 260,
  },
  soonPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Palette.surfaceMuted,
    borderRadius: Radius.pill,
    paddingVertical: 7,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  soonText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: Palette.coralDeep,
  },
});
