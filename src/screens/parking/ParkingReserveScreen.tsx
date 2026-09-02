import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FormField } from '../../components/FormField';
import { GradientButton } from '../../components/GradientButton';
import { Screen } from '../../components/Screen';
import { ParkingStackParamList } from '../../navigation/types';
import { useAppContext } from '../../state/AppContext';
import { colors } from '../../theme/colors';

export const ParkingReserveScreen = ({ route, navigation }: NativeStackScreenProps<ParkingStackParamList, 'ParkingReserve'>) => {
  const { bookings, upsertParkingBooking } = useAppContext();
  const existing = useMemo(
    () =>
      bookings.find(
        (item): item is Extract<(typeof bookings)[number], { type: 'parking' }> =>
          item.id === route.params.bookingId && item.type === 'parking',
      ),
    [bookings, route.params.bookingId],
  );
  const [startDate, setStartDate] = useState(existing?.startDate ?? 'Sep 5, 2026');
  const [startTime, setStartTime] = useState(existing?.startTime ?? '15:00');
  const [endDate, setEndDate] = useState(existing?.endDate ?? 'Sep 5, 2026');
  const [endTime, setEndTime] = useState(existing?.endTime ?? '22:00');

  return (
    <Screen>
      <Text style={styles.back} onPress={() => navigation.goBack()}>
        Back
      </Text>
      <Text style={styles.title}>Reserve Parking</Text>
      <View style={styles.spaceCard}>
        <Text style={styles.label}>Your Space</Text>
        <Text style={styles.space}>Space {route.params.spaceId}</Text>
        <Text style={styles.meta}>Floor {route.params.floor}</Text>
      </View>
      <FormField label="Start Date" value={startDate} onChangeText={setStartDate} />
      <FormField label="Start Time" value={startTime} onChangeText={setStartTime} />
      <FormField label="End Date" value={endDate} onChangeText={setEndDate} />
      <FormField label="End Time" value={endTime} onChangeText={setEndTime} />
      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Reservation Summary</Text>
        <Text style={styles.summaryText}>Floor: {route.params.floor}</Text>
        <Text style={styles.summaryText}>Space: {route.params.spaceId}</Text>
        <Text style={styles.summaryText}>Start: {startDate} at {startTime}</Text>
        <Text style={styles.summaryText}>End: {endDate} at {endTime}</Text>
      </View>
      <GradientButton
        title={existing ? 'Update Parking Reservation' : 'Confirm Parking Reservation'}
        onPress={() => {
          const booking = upsertParkingBooking({
            bookingId: route.params.bookingId,
            floor: route.params.floor,
            spaceId: route.params.spaceId,
            startDate,
            startTime,
            endDate,
            endTime,
          });
          navigation.replace('ParkingResult', { bookingId: booking.id });
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
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '800',
  },
  spaceCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  label: {
    color: colors.textMuted,
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: '700',
  },
  space: {
    color: '#A67DFF',
    fontSize: 28,
    fontWeight: '800',
  },
  meta: {
    color: colors.text,
  },
  summary: {
    backgroundColor: 'rgba(124,77,255,0.12)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(124,77,255,0.2)',
    padding: 18,
    gap: 8,
  },
  summaryTitle: {
    color: '#B58BFF',
    textTransform: 'uppercase',
    fontWeight: '800',
    fontSize: 12,
  },
  summaryText: {
    color: colors.textMuted,
  },
});
