import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GradientButton } from '../../components/GradientButton';
import { Screen } from '../../components/Screen';
import { events } from '../../data/content';
import { EventsStackParamList } from '../../navigation/types';
import { colors, withAlpha } from '../../theme/colors';

export const EventDetailsScreen = ({ route, navigation }: NativeStackScreenProps<EventsStackParamList, 'EventDetails'>) => {
  const item = events.find(event => event.id === route.params.eventId);

  if (!item) {
    return null;
  }

  return (
    <Screen contentContainerStyle={styles.content}>
      <Text style={styles.back} onPress={() => navigation.goBack()}>
        Back
      </Text>
      <Image source={item.image} style={styles.image} />
      <View style={styles.badgeRow}>
        <Text style={styles.badge}>{item.category}</Text>
        <Text style={styles.badge}>{item.seatsLeft} seats</Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.details}>
        <Info label="Date" value={item.date} />
        <Info label="Time" value={item.time} />
        <Info label="Location" value={item.location} />
        <Info label="Available" value={`${item.seatsLeft} seats`} />
      </View>
      <Text style={styles.sectionTitle}>About This Event</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Visitor Information</Text>
        <Text style={styles.infoText}>Doors open 30 min before showtime</Text>
        <Text style={styles.infoText}>Dress code enforced at entry</Text>
        <Text style={styles.infoText}>Photography during runway is permitted</Text>
        <Text style={styles.infoText}>Accessible seating available on request</Text>
      </View>
      <GradientButton title="Reserve a Place" onPress={() => navigation.navigate('EventBookingForm', { eventId: item.id })} />
    </Screen>
  );
};

const Info = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoTile}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  content: {
    paddingTop: 46,
  },
  back: {
    color: colors.gold,
    fontSize: 16,
    fontWeight: '700',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 24,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    color: colors.text,
    backgroundColor: withAlpha(colors.gold, 0.24),
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    fontWeight: '700',
  },
  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: '800',
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  infoTile: {
    width: '47%',
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    gap: 6,
  },
  infoLabel: {
    color: colors.textMuted,
    textTransform: 'uppercase',
    fontSize: 11,
    fontWeight: '700',
  },
  infoValue: {
    color: colors.text,
    fontWeight: '700',
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  description: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 24,
  },
  infoBox: {
    backgroundColor: withAlpha(colors.gold, 0.08),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: withAlpha(colors.gold, 0.18),
    padding: 18,
    gap: 10,
  },
  infoTitle: {
    color: colors.gold,
    textTransform: 'uppercase',
    fontWeight: '800',
    fontSize: 12,
  },
  infoText: {
    color: colors.textMuted,
  },
});
