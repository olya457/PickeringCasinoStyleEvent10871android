import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BookingQrCard } from '../../components/BookingQrCard';
import { GradientButton } from '../../components/GradientButton';
import { Screen } from '../../components/Screen';
import { foodItems } from '../../data/content';
import { FoodStackParamList, MainTabParamList } from '../../navigation/types';
import { useAppContext } from '../../state/AppContext';
import { colors } from '../../theme/colors';
import { compactPrice } from '../../utils/format';

export const FoodOrderResultScreen = ({ route, navigation }: NativeStackScreenProps<FoodStackParamList, 'FoodOrderResult'>) => {
  const tabsNavigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();
  const { bookings } = useAppContext();
  const order = bookings.find(
    (item): item is Extract<(typeof bookings)[number], { type: 'food' }> =>
      item.id === route.params.orderId && item.type === 'food',
  );

  if (!order) {
    return null;
  }

  const itemSummary = order.items
    .map(item => {
      const food = foodItems.find(menuItem => menuItem.id === item.itemId);
      return food ? `${food.title} x${item.quantity}` : null;
    })
    .filter(Boolean)
    .join(', ');

  return (
    <Screen>
      <View style={styles.center}>
        <Text style={styles.check}>✓</Text>
        <Text style={styles.title}>Order Placed!</Text>
        <Text style={styles.subtitle}>Your order is being prepared in the Food Court.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.orderId}>Order ID {order.id}</Text>
        <Text style={styles.line}>Items: {itemSummary}</Text>
        <Text style={styles.line}>Estimated wait: {order.prepMinutes} min</Text>
        <Text style={styles.line}>Total: {compactPrice(order.total)}</Text>
      </View>
      <BookingQrCard title="Pickup QR Code" subtitle="Present at the Food Court pickup counter" value={order.qrValue} />
      <GradientButton title="View My Bookings" onPress={() => tabsNavigation.navigate('BookingsTab')} />
      <GradientButton title="Back to Food Court" secondary onPress={() => navigation.popToTop()} />
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
  orderId: {
    color: colors.gold,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  line: {
    color: colors.textMuted,
  },
});
