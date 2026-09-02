import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { BookingQrCard } from '../../components/BookingQrCard';
import { GradientButton } from '../../components/GradientButton';
import { Screen } from '../../components/Screen';
import { events, foodItems } from '../../data/content';
import { BookingsStackParamList, EventsStackParamList, FoodStackParamList, MainTabParamList, ParkingStackParamList } from '../../navigation/types';
import { useAppContext } from '../../state/AppContext';
import { colors } from '../../theme/colors';

export const BookingDetailsScreen = ({ route, navigation }: NativeStackScreenProps<BookingsStackParamList, 'BookingDetails'>) => {
  const { bookings, removeBooking, setCart } = useAppContext();
  const eventNav = useNavigation<NativeStackNavigationProp<EventsStackParamList>>();
  const foodNav = useNavigation<NativeStackNavigationProp<FoodStackParamList>>();
  const parkingNav = useNavigation<NativeStackNavigationProp<ParkingStackParamList>>();
  const tabNav = useNavigation<BottomTabNavigationProp<MainTabParamList>>();
  const booking = bookings.find(item => item.id === route.params.bookingId);

  if (!booking) {
    return null;
  }

  const handleDelete = () => {
    Alert.alert('Delete booking?', 'This action cannot be undone.', [
      { text: 'Keep', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          removeBooking(booking.id);
          navigation.goBack();
        },
      },
    ]);
  };

  const handleEdit = () => {
    if (booking.type === 'event') {
      eventNav.navigate('EventBookingForm', { eventId: booking.eventId, bookingId: booking.id });
      return;
    }
    if (booking.type === 'food') {
      setCart(booking.items);
      foodNav.navigate('FoodCart', { orderId: booking.id });
      return;
    }
    parkingNav.navigate('ParkingReserve', { floor: booking.floor, spaceId: booking.spaceId, bookingId: booking.id });
  };

  return (
    <Screen>
      <Text style={styles.back} onPress={() => navigation.goBack()}>
        Back
      </Text>
      <Text style={styles.title}>Booking Details</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{getDetailTitle(booking)}</Text>
        {getLines(booking).map(line => (
          <Text key={line} style={styles.line}>{line}</Text>
        ))}
      </View>
      <BookingQrCard title="Your QR Code" subtitle="Use this QR code for access or pickup." value={booking.qrValue} />
      <GradientButton title="Edit Booking" onPress={handleEdit} />
      <GradientButton title="Delete Booking" secondary onPress={handleDelete} />
      <GradientButton title="Go to Home" secondary onPress={() => tabNav.navigate('HomeTab')} />
    </Screen>
  );
};

const getDetailTitle = (booking: ReturnType<typeof useAppContext>['bookings'][number]) => {
  if (booking.type === 'event') {
    return events.find(item => item.id === booking.eventId)?.title ?? 'Event Booking';
  }
  if (booking.type === 'food') {
    return 'Food Order';
  }
  return `Parking Space ${booking.spaceId}`;
};

const getLines = (booking: ReturnType<typeof useAppContext>['bookings'][number]) => {
  if (booking.type === 'event') {
    const event = events.find(item => item.id === booking.eventId);
    return [
      `Booking ID: ${booking.id}`,
      `Date: ${booking.date}`,
      `Time: ${booking.time}`,
      `Guests: ${booking.guests}`,
      `Location: ${event?.location ?? ''}`,
      `Notes: ${booking.notes || 'No special requests'}`,
    ];
  }
  if (booking.type === 'food') {
    const names = booking.items
      .map(item => {
        const found = foodItems.find(food => food.id === item.itemId);
        return found ? `${found.title} x${item.quantity}` : null;
      })
      .filter(Boolean)
      .join(', ');
    return [
      `Order ID: ${booking.id}`,
      `Items: ${names}`,
      `Estimated wait: ${booking.prepMinutes} min`,
      `Total: $${booking.total.toFixed(2)}`,
      `Note: ${booking.note || 'No note added'}`,
    ];
  }
  return [
    `Reservation ID: ${booking.id}`,
    `Space: Floor ${booking.floor}, ${booking.spaceId}`,
    `Start: ${booking.startDate} ${booking.startTime}`,
    `End: ${booking.endDate} ${booking.endTime}`,
  ];
};

const styles = StyleSheet.create({
  back: {
    color: colors.gold,
    fontSize: 16,
    fontWeight: '700',
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    gap: 10,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
  },
  line: {
    color: colors.textMuted,
    fontSize: 14,
  },
});
