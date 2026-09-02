import React from 'react';
import { Image, Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { FoodItem } from '../types';
import { colors } from '../theme/colors';
import { compactPrice } from '../utils/format';

export const FoodCard = ({
  item,
  onPress,
  footer,
  style,
}: {
  item: FoodItem;
  onPress: () => void;
  footer?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) => (
  <Pressable onPress={onPress} style={[styles.card, style]}>
    <Image source={item.image} style={styles.image} />
    <Text style={styles.price}>{compactPrice(item.price)}</Text>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.meta}>{item.prepTime}</Text>
    {footer}
  </Pressable>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    gap: 6,
  },
  image: {
    width: '100%',
    height: 118,
    borderRadius: 14,
  },
  price: {
    color: colors.gold,
    fontSize: 16,
    fontWeight: '800',
  },
  title: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  meta: {
    color: colors.textMuted,
    fontSize: 12,
  },
});
