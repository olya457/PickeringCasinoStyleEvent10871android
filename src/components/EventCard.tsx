import React from 'react';
import { ImageBackground, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { EventItem } from '../types';
import { colors, withAlpha } from '../theme/colors';

export const EventCard = ({ item, onPress, style }: { item: EventItem; onPress: () => void; style?: StyleProp<ViewStyle> }) => (
  <Pressable onPress={onPress} style={[styles.card, style]}>
    <ImageBackground source={item.image} style={styles.image} imageStyle={styles.imageStyle}>
      <LinearGradient colors={['transparent', withAlpha(colors.background, 0.96)]} style={styles.overlay}>
        <View style={styles.badgeRow}>
          <Text style={styles.badge}>{item.category}</Text>
          <Text style={styles.availability}>{item.seatsLeft} seats</Text>
        </View>
        <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
        <Text style={styles.meta}>{item.dateTimeLabel}</Text>
        <Text style={styles.location}>{item.location}</Text>
      </LinearGradient>
    </ImageBackground>
  </Pressable>
);

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    minHeight: 228,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 20,
  },
  overlay: {
    padding: 16,
    gap: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    color: colors.text,
    backgroundColor: withAlpha(colors.gold, 0.34),
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '700',
  },
  availability: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: '800',
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 31,
  },
  meta: {
    color: colors.gold,
    fontSize: 14,
    fontWeight: '700',
  },
  location: {
    color: colors.textMuted,
    fontSize: 14,
  },
});
