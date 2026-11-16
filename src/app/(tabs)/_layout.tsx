import { Redirect, Tabs } from 'expo-router';

import { HeroIcon } from '@/components/hero-icon';
import { Palette } from '@/constants/theme';
import { useAuth } from '@/providers/auth-provider';

export default function TabsLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Palette.coralDeep,
        tabBarInactiveTintColor: '#9AA29B',
        tabBarStyle: {
          backgroundColor: Palette.surface,
          borderTopWidth: 0,
          paddingTop: 6,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <HeroIcon name="home" size={size} color={String(color)} />
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tareas',
          tabBarIcon: ({ color, size }) => (
            <HeroIcon name="clipboard-document-check" size={size} color={String(color)} />
          ),
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: 'Gastos',
          tabBarIcon: ({ color, size }) => (
            <HeroIcon name="wallet" size={size} color={String(color)} />
          ),
        }}
      />
      <Tabs.Screen
        name="family"
        options={{
          title: 'Familia',
          tabBarIcon: ({ color, size }) => (
            <HeroIcon name="users" size={size} color={String(color)} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ color, size }) => (
            <HeroIcon name="cog-6-tooth" size={size} color={String(color)} />
          ),
        }}
      />
    </Tabs>
  );
}
