import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BookingQrCard } from '../../components/BookingQrCard';
import { GradientButton } from '../../components/GradientButton';
import { Screen } from '../../components/Screen';
import { MainTabParamList, ParkingStackParamList } from '../../navigation/types';
import { useAppContext } from '../../state/AppContext';
import { colors } from '../../theme/colors';

export const ParkingResultScreen = ({ route, navigation }: NativeStackScreenProps<ParkingStackParamList, 'ParkingResult'>) => {
  const { bookings } = useAppContext();
  const tabsNavigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();
  const booking = bookings.find(
    (item): item is Extract<(typeof bookings)[number], { type: 'parking' }> =>
      item.id === route.params.bookingId && item.type === 'parking',
  );

  if (!booking) {
    return null;
  }

  return (
    <Screen>
      <View style={styles.center}>
        <Text style={styles.check}>P</Text>
        <Text style={styles.title}>Parking Reserved!</Text>
        <Text style={styles.subtitle}>Your space is secured for the event.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.orderId}>Reservation ID {booking.id}</Text>
        <Text style={styles.line}>Space: Floor {booking.floor}, {booking.spaceId}</Text>
        <Text style={styles.line}>Start: {booking.startDate} {booking.startTime}</Text>
        <Text style={styles.line}>End: {booking.endDate} {booking.endTime}</Text>
      </View>
      <BookingQrCard title="Parking QR Code" subtitle="Scan at the parkade entry barrier" value={booking.qrValue} />
      <GradientButton title="View My Bookings" onPress={() => tabsNavigation.navigate('BookingsTab')} />
      <GradientButton title="Back to Parking" secondary onPress={() => navigation.popToTop()} />
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
    color: colors.bronze,
    fontSize: 46,
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
  orderId: {
    color: colors.champagne,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  line: {
    color: colors.textMuted,
  },
});
