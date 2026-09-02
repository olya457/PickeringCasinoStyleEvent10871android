import React, { useMemo, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FormField } from '../../components/FormField';
import { GradientButton } from '../../components/GradientButton';
import { Screen } from '../../components/Screen';
import { foodItems } from '../../data/content';
import { FoodStackParamList } from '../../navigation/types';
import { useAppContext } from '../../state/AppContext';
import { colors } from '../../theme/colors';
import { calculateCartTotal, calculatePrepMinutes } from '../../utils/booking';
import { compactPrice } from '../../utils/format';

export const FoodCartScreen = ({ route, navigation }: NativeStackScreenProps<FoodStackParamList, 'FoodCart'>) => {
  const { cart, setCart, bookings, upsertFoodOrder } = useAppContext();
  const existing = useMemo(
    () =>
      bookings.find(
        (item): item is Extract<(typeof bookings)[number], { type: 'food' }> =>
          item.id === route.params?.orderId && item.type === 'food',
      ),
    [bookings, route.params?.orderId],
  );
  const currentCart = existing?.items ?? cart;
  const [note, setNote] = useState(existing?.note ?? '');
  const total = calculateCartTotal(currentCart, foodItems);
  const prepMinutes = calculatePrepMinutes(currentCart, foodItems);

  const updateQuantity = (itemId: string, delta: number) => {
    const next = currentCart
      .map(item => (item.itemId === itemId ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item))
      .filter(item => item.quantity > 0);
    setCart(next);
  };

  return (
    <Screen>
      <Text style={styles.back} onPress={() => navigation.goBack()}>
        Back
      </Text>
      <Text style={styles.title}>Your Cart</Text>
      {currentCart.length ? currentCart.map(cartItem => {
        const item = foodItems.find(foodItem => foodItem.id === cartItem.itemId);
        if (!item) {
          return null;
        }
        return (
          <View key={item.id} style={styles.itemRow}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemPrice}>{compactPrice(item.price)}</Text>
            </View>
            <View style={styles.qtyControl}>
              <Pressable onPress={() => updateQuantity(item.id, -1)} style={styles.qtyButton}>
                <Text style={styles.qtyButtonText}>-</Text>
              </Pressable>
              <Text style={styles.qtyValue}>{cartItem.quantity}</Text>
              <Pressable onPress={() => updateQuantity(item.id, 1)} style={styles.qtyButton}>
                <Text style={styles.qtyButtonText}>+</Text>
              </Pressable>
            </View>
          </View>
        );
      }) : (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        </View>
      )}
      <FormField label="Order Note" value={note} onChangeText={setNote} placeholder="Allergies, dietary preferences..." multiline />
      <View style={styles.summary}>
        <Text style={styles.summaryLabel}>Items: {currentCart.reduce((sum: number, item) => sum + item.quantity, 0)}</Text>
        <Text style={styles.summaryLabel}>Estimated Prep: {prepMinutes} min</Text>
        <Text style={styles.summaryTotal}>Total {compactPrice(total)}</Text>
      </View>
      <GradientButton
        title={existing ? `Update Order · ${compactPrice(total)}` : `Place Order · ${compactPrice(total)}`}
        disabled={!currentCart.length}
        onPress={() => {
          const order = upsertFoodOrder({ orderId: route.params?.orderId, items: currentCart, note });
          navigation.replace('FoodOrderResult', { orderId: order.id });
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
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    gap: 12,
  },
  itemImage: {
    width: 56,
    height: 56,
    borderRadius: 14,
  },
  itemInfo: {
    flex: 1,
    gap: 4,
  },
  itemTitle: {
    color: colors.text,
    fontWeight: '700',
  },
  itemPrice: {
    color: colors.gold,
    fontWeight: '800',
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
  },
  qtyButtonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  qtyValue: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    minWidth: 10,
    textAlign: 'center',
  },
  summary: {
    backgroundColor: 'rgba(243,199,54,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(243,199,54,0.18)',
    borderRadius: 18,
    padding: 16,
    gap: 10,
  },
  summaryLabel: {
    color: colors.textMuted,
  },
  summaryTotal: {
    color: colors.gold,
    fontSize: 18,
    fontWeight: '800',
  },
  empty: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyText: {
    color: colors.textMuted,
  },
});
