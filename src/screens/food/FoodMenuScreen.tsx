import React, { useMemo, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FoodCard } from '../../components/FoodCard';
import { GradientButton } from '../../components/GradientButton';
import { Screen } from '../../components/Screen';
import { foodCategories, foodItems } from '../../data/content';
import { FoodStackParamList } from '../../navigation/types';
import { useAppContext } from '../../state/AppContext';
import { colors } from '../../theme/colors';
import { useLayout } from '../../theme/layout';

export const FoodMenuScreen = ({ navigation }: NativeStackScreenProps<FoodStackParamList, 'FoodMenu'>) => {
  const [category, setCategory] = useState(foodCategories[0].id);
  const { cart } = useAppContext();
  const visibleItems = useMemo(() => foodItems.filter(item => item.categoryId === category), [category]);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const { isTablet, isLandscape } = useLayout();
  const foodCardStyle = isTablet ? (isLandscape ? styles.foodCardLandscape : styles.foodCardTablet) : undefined;

  return (
    <Screen>
      <View style={styles.hero}>
        <Image source={foodItems[0].image} style={styles.heroImage} />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>Runway Dining</Text>
          <Text style={styles.heroSubtitle}>Premium culinary experiences designed for fashion week.</Text>
        </View>
      </View>
      <View style={styles.tabs}>
        {foodCategories.map(item => (
          <Pressable key={item.id} onPress={() => setCategory(item.id)} style={[styles.tab, category === item.id && styles.tabActive]}>
            <Text style={[styles.tabText, category === item.id && styles.tabTextActive]}>
              {item.title.replace('Runway ', '').replace('Couture ', '').replace('Designer ', '')}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.grid}>
        {visibleItems.map(item => {
          const inCart = cart.find(cartItem => cartItem.itemId === item.id)?.quantity ?? 0;
          return (
            <FoodCard
              key={item.id}
              item={item}
              onPress={() => navigation.navigate('FoodDetails', { itemId: item.id })}
              footer={
                <GradientButton
                  title={inCart ? `In Cart (${inCart})` : 'Add +'}
                  onPress={() => navigation.navigate('FoodDetails', { itemId: item.id })}
                  style={styles.foodButton}
                  secondary={Boolean(inCart)}
                />
              }
              style={foodCardStyle}
            />
          );
        })}
      </View>
      <GradientButton title={cartCount ? `Open Cart (${cartCount})` : 'Open Cart'} onPress={() => navigation.navigate('FoodCart')} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroImage: {
    width: '100%',
    height: 110,
  },
  heroOverlay: {
    padding: 14,
    gap: 6,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
  },
  heroSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
  },
  tabs: {
    flexDirection: 'row',
    gap: 8,
  },
  tab: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: colors.pink,
    borderColor: colors.pink,
  },
  tabText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
  tabTextActive: {
    color: colors.text,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  foodButton: {
    marginTop: 6,
  },
  foodCardTablet: {
    flexGrow: 0,
    flexBasis: '48.9%',
  },
  foodCardLandscape: {
    flexGrow: 0,
    flexBasis: '32.4%',
    minWidth: 0,
  },
});
