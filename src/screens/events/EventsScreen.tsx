import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EventCard } from '../../components/EventCard';
import { Screen } from '../../components/Screen';
import { events } from '../../data/content';
import { EventsStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { useLayout } from '../../theme/layout';

const filters = ['All', 'Runway', 'Couture', 'Street', 'Designer'];

export const EventsScreen = ({ navigation }: NativeStackScreenProps<EventsStackParamList, 'EventsList'>) => {
  const [filter, setFilter] = useState('All');
  const visibleEvents = filter === 'All' ? events : events.filter(item => item.category === filter);
  const { isTablet } = useLayout();

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Fashion Events</Text>
        <Text style={styles.subtitle}>10 events · Sep 5-14</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll} contentContainerStyle={styles.filters}>
        {filters.map(item => (
          <Pressable key={item} onPress={() => setFilter(item)} style={[styles.filter, filter === item && styles.filterActive]}>
            <Text style={[styles.filterText, filter === item && styles.filterTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <View style={styles.eventsGrid}>
        {visibleEvents.map(item => (
          <EventCard key={item.id} item={item} onPress={() => navigation.navigate('EventDetails', { eventId: item.id })} style={isTablet ? styles.eventTablet : undefined} />
        ))}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.gold,
    marginTop: 6,
    fontSize: 14,
  },
  filters: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 2,
  },
  filtersScroll: {
    flexGrow: 0,
    height: 48,
  },
  eventsGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  eventTablet: {
    width: '48.9%',
  },
  filter: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterActive: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  filterText: {
    color: colors.textMuted,
    fontWeight: '700',
  },
  filterTextActive: {
    color: colors.background,
  },
});
