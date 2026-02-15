import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name='house.fill' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='Search'
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => (
            <Ionicons name='search' size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='Fav'
        options={{
          title: 'Fav',
          tabBarIcon: ({ color }) => (
            <Ionicons name='heart' size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='Profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <FontAwesome name='user-circle-o' size={24} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name='explore'
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name='paperplane.fill' color={color} />
          ),
        }}
      /> */}
    </Tabs>
  );
}
