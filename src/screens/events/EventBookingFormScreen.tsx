import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FormField } from '../../components/FormField';
import { GradientButton } from '../../components/GradientButton';
import { Screen } from '../../components/Screen';
import { events } from '../../data/content';
import { EventsStackParamList } from '../../navigation/types';
import { useAppContext } from '../../state/AppContext';
import { colors } from '../../theme/colors';

const timeSlots = ['17:00', '18:30', '20:00', '21:30'];

export const EventBookingFormScreen = ({ route, navigation }: NativeStackScreenProps<EventsStackParamList, 'EventBookingForm'>) => {
  const item = events.find(event => event.id === route.params.eventId);
  const { bookings, upsertEventBooking } = useAppContext();
  const existing = useMemo(
    () =>
      bookings.find(
        (booking): booking is Extract<(typeof bookings)[number], { type: 'event' }> =>
          booking.id === route.params.bookingId && booking.type === 'event',
      ),
    [bookings, route.params.bookingId],
  );
  const [guests, setGuests] = useState(existing?.guests ?? 2);
  const [date, setDate] = useState(existing?.date ?? item?.date ?? 'Sep 5, 2026');
  const [time, setTime] = useState(existing?.time ?? item?.time ?? timeSlots[0]);
  const [notes, setNotes] = useState(existing?.notes ?? '');

  if (!item) {
    return null;
  }

  return (
    <Screen>
      <Text style={styles.back} onPress={() => navigation.goBack()}>
        Back
      </Text>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>{item.title}</Text>
        <Text style={styles.summaryText}>{item.location}</Text>
      </View>
      <View style={styles.counter}>
        <Text style={styles.label}>Number of Guests</Text>
        <View style={styles.counterBox}>
          <Pressable onPress={() => setGuests(Math.max(1, guests - 1))} style={styles.counterButton}>
            <Text style={styles.counterText}>-</Text>
          </Pressable>
          <Text style={styles.counterValue}>{guests}</Text>
          <Pressable onPress={() => setGuests(guests + 1)} style={styles.counterButton}>
            <Text style={styles.counterText}>+</Text>
          </Pressable>
        </View>
      </View>
      <FormField label="Date" value={date} onChangeText={setDate} placeholder="Sep 5, 2026" />
      <View style={styles.timeBlock}>
        <Text style={styles.label}>Available Time Slots</Text>
        <View style={styles.slots}>
          {timeSlots.map(slot => (
            <Pressable key={slot} onPress={() => setTime(slot)} style={[styles.slot, time === slot && styles.slotActive]}>
              <Text style={[styles.slotText, time === slot && styles.slotTextActive]}>{slot}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <FormField label="Notes" value={notes} onChangeText={setNotes} placeholder="Accessibility needs, special requests..." multiline />
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Booking Summary</Text>
        <Text style={styles.summaryText}>Event: {item.title}</Text>
        <Text style={styles.summaryText}>Date: {date}</Text>
        <Text style={styles.summaryText}>Time: {time}</Text>
        <Text style={styles.summaryText}>Guests: {guests}</Text>
        <Text style={styles.summaryText}>Location: {item.location}</Text>
      </View>
      <GradientButton
        title={existing ? 'Update Reservation' : 'Confirm Reservation'}
        onPress={() => {
          const booking = upsertEventBooking({ bookingId: route.params.bookingId, eventId: item.id, guests, date, time, notes });
          navigation.replace('EventBookingResult', { bookingId: booking.id });
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  back: {
    color: colors.gold,
    fontSize: 16,
    fontWeight: '700',
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  summaryTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  summaryLabel: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  summaryText: {
    color: colors.textMuted,
    fontSize: 14,
  },
  counter: {
    gap: 8,
  },
  label: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  counterBox: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  counterButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
  },
  counterValue: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  timeBlock: {
    gap: 8,
  },
  slots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  slot: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  slotActive: {
    backgroundColor: colors.pink,
    borderColor: colors.pink,
  },
  slotText: {
    color: colors.text,
    fontWeight: '700',
  },
  slotTextActive: {
    color: colors.text,
  },
});
