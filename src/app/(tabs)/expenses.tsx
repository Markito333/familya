import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DonutChart } from '@/components/donut-chart';
import { HeroIcon, type HeroIconName } from '@/components/hero-icon';
import { cardShadow, Palette, Radius } from '@/constants/theme';

type Category = {
  key: string;
  label: string;
  value: number;
  color: string;
  iconBg: string;
  iconColor: string;
  icon: HeroIconName;
};

const CATEGORIES: Category[] = [
  {
    key: 'food',
    label: 'Alimentación',
    value: 420,
    color: '#B9DFB6',
    iconBg: '#E9F4E6',
    iconColor: '#4F7A4C',
    icon: 'shopping-cart',
  },
  {
    key: 'transport',
    label: 'Transporte',
    value: 180,
    color: '#B8D3EC',
    iconBg: '#E8F0F8',
    iconColor: '#41688A',
    icon: 'truck',
  },
  {
    key: 'home',
    label: 'Hogar',
    value: 260,
    color: '#ECD9B8',
    iconBg: '#F7F0E2',
    iconColor: '#8A6E3F',
    icon: 'home-modern',
  },
  {
    key: 'leisure',
    label: 'Ocio',
    value: 120,
    color: '#D9CEEC',
    iconBg: '#F0EBF8',
    iconColor: '#6A5A8F',
    icon: 'puzzle-piece',
  },
  {
    key: 'health',
    label: 'Salud',
    value: 90,
    color: '#EFC9C9',
    iconBg: '#FAEAEA',
    iconColor: '#9A5A5A',
    icon: 'heart',
  },
  {
    key: 'other',
    label: 'Otros',
    value: 60,
    color: '#DCE2DE',
    iconBg: '#F0F3F1',
    iconColor: '#66716A',
    icon: 'ellipsis-horizontal',
  },
];

const TOTAL = CATEGORIES.reduce((sum, category) => sum + category.value, 0);

const money = (value: number) =>
  `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

const monthLabel = (() => {
  const month = new Date().toLocaleDateString('es-ES', { month: 'long' });
  return month.charAt(0).toUpperCase() + month.slice(1);
})();

export default function ExpensesScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>FINANZAS</Text>
        <Text style={styles.title}>Gastos</Text>
        <Text style={styles.subtitle}>Resumen de este mes</Text>

        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.chartLabel}>TOTAL DEL MES</Text>
              <Text style={styles.chartTotal}>{money(TOTAL)}</Text>
            </View>
            <View style={styles.monthPill}>
              <HeroIcon
                name="calendar-days"
                size={14}
                color={Palette.coralDeep}
                strokeWidth={2}
              />
              <Text style={styles.monthText}>{monthLabel}</Text>
            </View>
          </View>

          <View style={styles.donutWrap}>
            <DonutChart data={CATEGORIES} />
            <View style={styles.donutCenter} pointerEvents="none">
              <Text style={styles.donutValue}>{money(TOTAL)}</Text>
              <Text style={styles.donutCaption}>{CATEGORIES.length} categorías</Text>
            </View>
          </View>

          <View style={styles.legend}>
            {CATEGORIES.map((category) => (
              <View key={category.key} style={styles.legendItem}>
                <View style={[styles.legendIcon, { backgroundColor: category.iconBg }]}>
                  <HeroIcon
                    name={category.icon}
                    size={14}
                    color={category.iconColor}
                    strokeWidth={2}
                  />
                </View>
                <View style={styles.legendText}>
                  <Text style={styles.legendLabel} numberOfLines={1}>
                    {category.label}
                  </Text>
                  <Text style={styles.legendValue}>
                    {Math.round((category.value / TOTAL) * 100)}%
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Gastos por categoría</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{CATEGORIES.length}</Text>
          </View>
        </View>

        <View style={styles.listCard}>
          {CATEGORIES.map((category, index) => {
            const percentage = (category.value / TOTAL) * 100;

            return (
              <View key={category.key} style={[styles.row, index > 0 && styles.rowBorder]}>
                <View style={styles.rowTop}>
                  <View style={[styles.rowIcon, { backgroundColor: category.iconBg }]}>
                    <HeroIcon
                      name={category.icon}
                      size={16}
                      color={category.iconColor}
                      strokeWidth={2}
                    />
                  </View>
                  <Text style={styles.rowLabel}>{category.label}</Text>
                  <Text style={styles.rowAmount}>{money(category.value)}</Text>
                </View>
                <View style={styles.track}>
                  <View
                    style={[styles.fill, { flex: percentage, backgroundColor: category.color }]}
                  />
                  <View style={{ flex: 100 - percentage }} />
                </View>
              </View>
            );
          })}
        </View>

        <Text style={styles.footnote}>Datos de ejemplo. Se conectarán a Supabase.</Text>
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
    marginBottom: 20,
  },
  chartCard: {
    backgroundColor: Palette.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Palette.border,
    padding: 18,
    ...cardShadow,
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chartLabel: {
    fontSize: 10.5,
    fontWeight: '600',
    letterSpacing: 0.8,
    color: Palette.textMuted,
  },
  chartTotal: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.4,
    color: Palette.text,
    marginTop: 3,
  },
  monthPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Palette.coralSoft,
    borderRadius: Radius.pill,
    paddingVertical: 7,
    paddingHorizontal: 11,
  },
  monthText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: Palette.coralDeep,
  },
  donutWrap: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  donutCenter: {
    position: 'absolute',
    alignItems: 'center',
  },
  donutValue: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.4,
    color: Palette.text,
  },
  donutCaption: {
    fontSize: 11,
    color: Palette.textMuted,
    marginTop: 2,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
    marginTop: 20,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: Palette.border,
  },
  legendItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendIcon: {
    width: 26,
    height: 26,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendText: {
    flex: 1,
  },
  legendLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: Palette.text,
  },
  legendValue: {
    fontSize: 11,
    color: Palette.textMuted,
    marginTop: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 26,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Palette.text,
  },
  countBadge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Palette.coralSoft,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  countText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: Palette.coralDeep,
  },
  listCard: {
    backgroundColor: Palette.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Palette.border,
    paddingHorizontal: 16,
    ...cardShadow,
  },
  row: {
    paddingVertical: 14,
  },
  rowBorder: {
    borderTopWidth: 1,
    borderTopColor: Palette.border,
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    flex: 1,
    fontSize: 14.5,
    fontWeight: '500',
    color: Palette.text,
  },
  rowAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: Palette.text,
  },
  track: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    backgroundColor: Palette.surfaceMuted,
    overflow: 'hidden',
    marginTop: 10,
  },
  fill: {
    borderRadius: 4,
  },
  footnote: {
    fontSize: 11,
    color: Palette.textMuted,
    textAlign: 'center',
    marginTop: 16,
  },
});
