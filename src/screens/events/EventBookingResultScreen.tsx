import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BookingQrCard } from '../../components/BookingQrCard';
import { GradientButton } from '../../components/GradientButton';
import { Screen } from '../../components/Screen';
import { events } from '../../data/content';
import { EventsStackParamList, MainTabParamList } from '../../navigation/types';
import { useAppContext } from '../../state/AppContext';
import { colors } from '../../theme/colors';

export const EventBookingResultScreen = ({ route, navigation }: NativeStackScreenProps<EventsStackParamList, 'EventBookingResult'>) => {
  const { bookings } = useAppContext();
  const tabsNavigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();
  const booking = bookings.find(
    (item): item is Extract<(typeof bookings)[number], { type: 'event' }> =>
      item.id === route.params.bookingId && item.type === 'event',
  );
  const event = events.find(item => item.id === booking?.eventId);

  if (!booking || !event) {
    return null;
  }

  return (
    <Screen>
      <View style={styles.center}>
        <Text style={styles.check}>✓</Text>
        <Text style={styles.title}>Reservation Confirmed!</Text>
        <Text style={styles.subtitle}>Your seat has been reserved successfully.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.bookingId}>Booking ID {booking.id}</Text>
        <Text style={styles.line}>{event.title}</Text>
        <Text style={styles.line}>Date: {booking.date}</Text>
        <Text style={styles.line}>Time: {booking.time}</Text>
        <Text style={styles.line}>Guests: {booking.guests}</Text>
        <Text style={styles.line}>Location: {event.location}</Text>
      </View>
      <BookingQrCard title="Admission QR Code" subtitle="Present at the venue entrance for admission" value={booking.qrValue} />
      <GradientButton title="View My Bookings" onPress={() => tabsNavigation.navigate('BookingsTab')} />
      <GradientButton title="Back to Events" secondary onPress={() => navigation.popToTop()} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    gap: 8,
    marginTop: 18,
  },
  check: {
    color: colors.green,
    fontSize: 54,
    fontWeight: '800',
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  bookingId: {
    color: colors.gold,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  line: {
    color: colors.textMuted,
  },
});
