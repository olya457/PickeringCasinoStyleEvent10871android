import React, { useMemo, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GradientButton } from '../../components/GradientButton';
import { Screen } from '../../components/Screen';
import { foodItems } from '../../data/content';
import { FoodStackParamList } from '../../navigation/types';
import { useAppContext } from '../../state/AppContext';
import { colors } from '../../theme/colors';
import { compactPrice } from '../../utils/format';

export const FoodDetailsScreen = ({ route, navigation }: NativeStackScreenProps<FoodStackParamList, 'FoodDetails'>) => {
  const item = foodItems.find(foodItem => foodItem.id === route.params.itemId);
  const { cart, setCart } = useAppContext();
  const existingQty = useMemo(() => cart.find(cartItem => cartItem.itemId === item?.id)?.quantity ?? 0, [cart, item]);
  const [quantity, setQuantity] = useState(existingQty || 1);

  if (!item) {
    return null;
  }

  return (
    <Screen>
      <Text style={styles.back} onPress={() => navigation.goBack()}>
        Back
      </Text>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>{compactPrice(item.price)}</Text>
      <Text style={styles.meta}>{item.prepTime}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.ingredientsTitle}>Ingredients</Text>
      <View style={styles.tags}>
        {item.ingredients.map(ingredient => (
          <View key={ingredient} style={styles.tag}>
            <Text style={styles.tagText}>{ingredient}</Text>
          </View>
        ))}
      </View>
      <View style={styles.counterBox}>
        <Pressable onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.counterButton}>
          <Text style={styles.counterText}>-</Text>
        </Pressable>
        <Text style={styles.counterValue}>{quantity}</Text>
        <Pressable onPress={() => setQuantity(quantity + 1)} style={styles.counterButton}>
          <Text style={styles.counterText}>+</Text>
        </Pressable>
      </View>
      <Text style={styles.total}>Total: {compactPrice(item.price * quantity)}</Text>
      <GradientButton
        title={`Add to Cart · ${compactPrice(item.price * quantity)}`}
        onPress={() => {
          const nextCart = cart.filter(cartItem => cartItem.itemId !== item.id);
          nextCart.push({ itemId: item.id, quantity });
          setCart(nextCart);
          navigation.navigate('FoodCart');
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
  image: {
    width: '100%',
    height: 240,
    borderRadius: 24,
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '800',
  },
  price: {
    color: colors.gold,
    fontSize: 24,
    fontWeight: '800',
  },
  meta: {
    color: colors.textMuted,
  },
  description: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 24,
  },
  ingredientsTitle: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 18,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: colors.surface,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagText: {
    color: colors.textMuted,
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
  total: {
    color: colors.gold,
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'right',
  },
});
