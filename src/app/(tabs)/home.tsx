import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HeroIcon, type HeroIconName } from '@/components/hero-icon';
import { cardShadow, Palette, Radius } from '@/constants/theme';
import { useAuth } from '@/providers/auth-provider';

const summary = {
  money: 1240,
  pendingTasks: 0,
  completedTasks: 0,
  members: 1,
  monthlyExpenses: 1130,
  categories: 6,
  activities: [
    {
      id: '1',
      time: '09:00',
      title: 'Reunión familiar',
      tag: 'Casa',
      icon: 'users' as HeroIconName,
      background: Palette.sky,
      color: Palette.skyStrong,
    },
    {
      id: '2',
      time: '18:30',
      title: 'Cena juntos',
      tag: 'Comida',
      icon: 'heart' as HeroIconName,
      background: Palette.mint,
      color: Palette.mintStrong,
    },
  ],
};

const money = (value: number) => `$${value.toLocaleString('es-ES')}`;

type TileProps = {
  icon: HeroIconName;
  value: string;
  label: string;
  caption: string;
  background: string;
  color: string;
  onPress: () => void;
};

function Tile({ icon, value, label, caption, background, color, onPress }: TileProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.tile,
        { backgroundColor: background },
        pressed && styles.pressed,
      ]}>
      <View style={styles.tileTop}>
        <View style={styles.tileIcon}>
          <HeroIcon name={icon} size={16} color={color} strokeWidth={2} />
        </View>
        <HeroIcon name="chevron-right" size={13} color={Palette.textMuted} />
      </View>
      <Text style={styles.tileValue}>{value}</Text>
      <Text style={styles.tileLabel}>{label}</Text>
      <Text style={styles.tileCaption}>{caption}</Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const name = user?.username ?? 'familia';
  const initial = name.charAt(0).toUpperCase();
  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.eyebrow}>{today.toUpperCase()}</Text>
            <Text style={styles.title}>Hola, {name}</Text>
            <Text style={styles.subtitle}>Resumen de tu hogar</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
        </View>

        <Pressable
          onPress={() => router.push('/expenses')}
          style={({ pressed }) => [styles.moneyCard, pressed && styles.pressed]}>
          <View style={styles.moneyTop}>
            <View style={styles.moneyIcon}>
              <HeroIcon name="wallet" size={18} color={Palette.coralDeep} strokeWidth={2} />
            </View>
            <Text style={styles.moneyLabel}>Dinero actual</Text>
            <HeroIcon name="chevron-right" size={14} color={Palette.coralDeep} />
          </View>
          <Text style={styles.moneyValue}>{money(summary.money)}</Text>
          <View style={styles.moneyBottom}>
            <Text style={styles.moneyCaption}>Disponible este mes</Text>
            <View style={styles.moneyChip}>
              <Text style={styles.moneyChipText}>+$320 este mes</Text>
            </View>
          </View>
        </Pressable>

        <View style={styles.gridRow}>
          <Tile
            icon="clipboard-document-check"
            value={String(summary.pendingTasks)}
            label="Tareas pendientes"
            caption="Todo al día"
            background={Palette.mint}
            color={Palette.mintStrong}
            onPress={() => router.push('/tasks')}
          />
          <Tile
            icon="users"
            value={String(summary.members)}
            label="Familia"
            caption="miembro activo"
            background={Palette.sky}
            color={Palette.skyStrong}
            onPress={() => router.push('/family')}
          />
        </View>

        <View style={styles.activitiesCard}>
          <View style={styles.activitiesHeader}>
            <View style={styles.activitiesTitleRow}>
              <HeroIcon name="calendar-days" size={17} color={Palette.coralDeep} strokeWidth={2} />
              <Text style={styles.activitiesTitle}>Actividades para hoy</Text>
            </View>
            <View style={styles.activitiesCount}>
              <Text style={styles.activitiesCountText}>{summary.activities.length}</Text>
            </View>
          </View>
          {summary.activities.map((activity) => (
            <View key={activity.id} style={styles.activityRow}>
              <View style={[styles.activityIcon, { backgroundColor: activity.background }]}>
                <HeroIcon name={activity.icon} size={16} color={activity.color} strokeWidth={2} />
              </View>
              <View style={styles.activityText}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityTag}>{activity.tag}</Text>
              </View>
              <View style={styles.activityTime}>
                <Text style={styles.activityTimeText}>{activity.time}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.gridRow}>
          <Tile
            icon="wallet"
            value={money(summary.monthlyExpenses)}
            label="Gastos del mes"
            caption={`${summary.categories} categorías`}
            background="#F3E8D6"
            color="#8A6E3F"
            onPress={() => router.push('/expenses')}
          />
          <Tile
            icon="check-circle"
            value={String(summary.completedTasks)}
            label="Completadas"
            caption="esta semana"
            background={Palette.stone}
            color={Palette.stoneStrong}
            onPress={() => router.push('/tasks')}
          />
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
    padding: 20,
    paddingBottom: 36,
  },
  pressed: {
    opacity: 0.85,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 22,
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
  eyebrow: {
    fontSize: 10.5,
    fontWeight: '600',
    letterSpacing: 1.1,
    color: Palette.textMuted,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: Palette.text,
  },
  subtitle: {
    fontSize: 13,
    color: Palette.textMuted,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Palette.coralSoft,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#F6D3C6',
  },
  avatarText: {
    fontSize: 17,
    fontWeight: '700',
    color: Palette.coralDeep,
  },
  moneyCard: {
    backgroundColor: Palette.coralSoft,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: '#F6D3C6',
    padding: 18,
    marginBottom: 12,
    ...cardShadow,
  },
  moneyTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  moneyIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moneyLabel: {
    flex: 1,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.9,
    textTransform: 'uppercase',
    color: Palette.coralDeep,
  },
  moneyValue: {
    fontSize: 32,
    fontWeight: '700',
    color: Palette.coralInk,
    marginTop: 10,
  },
  moneyBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },
  moneyCaption: {
    flex: 1,
    fontSize: 12,
    color: '#8C5B4B',
  },
  moneyChip: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: Radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  moneyChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: Palette.coralDeep,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  tile: {
    flex: 1,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Palette.border,
    padding: 14,
    ...cardShadow,
  },
  tileTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tileIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileValue: {
    fontSize: 23,
    fontWeight: '700',
    color: Palette.text,
    marginTop: 10,
  },
  tileLabel: {
    fontSize: 12.5,
    fontWeight: '600',
    color: Palette.text,
  },
  tileCaption: {
    fontSize: 11,
    color: Palette.textMuted,
    marginTop: 2,
  },
  activitiesCard: {
    backgroundColor: Palette.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Palette.border,
    padding: 16,
    marginBottom: 12,
    ...cardShadow,
  },
  activitiesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  activitiesTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  activitiesTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Palette.text,
  },
  activitiesCount: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Palette.coralSoft,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  activitiesCountText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: Palette.coralDeep,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
  },
  activityIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityText: {
    flex: 1,
    gap: 1,
  },
  activityTitle: {
    fontSize: 13.5,
    fontWeight: '600',
    color: Palette.text,
  },
  activityTag: {
    fontSize: 11.5,
    color: Palette.textMuted,
  },
  activityTime: {
    backgroundColor: Palette.surfaceMuted,
    borderRadius: Radius.sm,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  activityTimeText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: Palette.text,
  },
});
