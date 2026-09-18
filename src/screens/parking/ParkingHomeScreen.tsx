import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GradientButton } from '../../components/GradientButton';
import { Screen } from '../../components/Screen';
import { parkingFloors } from '../../data/content';
import { ParkingStackParamList } from '../../navigation/types';
import { colors, withAlpha } from '../../theme/colors';

export const ParkingHomeScreen = ({ navigation }: NativeStackScreenProps<ParkingStackParamList, 'ParkingHome'>) => (
  <Screen>
    <View style={styles.header}>
      <Text style={styles.eyebrow}>Pickering Fashion Parkade</Text>
      <Text style={styles.title}>3 Floors · 96 Spaces</Text>
      <Text style={styles.subtitle}>Reserve in advance and arrive without stress</Text>
    </View>
    {parkingFloors.map(floor => {
      const available = floor.spaces.filter(space => space.status === 'available').length;
      const reserved = floor.spaces.length - available;
      return (
        <Pressable key={floor.floor} onPress={() => navigation.navigate('ParkingFloor', { floor: floor.floor })} style={styles.floorCard}>
          <Text style={styles.floorLabel}>Floor {floor.floor}</Text>
          <Text style={styles.floorTitle}>{floor.title}</Text>
          <Text style={styles.floorCount}>{available} available</Text>
          <Text style={styles.floorMeta}>{reserved} reserved · {floor.spaces.length} total</Text>
        </Pressable>
      );
    })}
    <GradientButton title="View Floor 2 Map" onPress={() => navigation.navigate('ParkingFloor', { floor: 2 })} />
  </Screen>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: withAlpha(colors.gold, 0.12),
    borderWidth: 1,
    borderColor: withAlpha(colors.gold, 0.2),
    borderRadius: 20,
    padding: 18,
    gap: 8,
  },
  eyebrow: {
    color: colors.champagne,
    textTransform: 'uppercase',
    fontWeight: '800',
    fontSize: 12,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
  },
  floorCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: 18,
    gap: 8,
  },
  floorLabel: {
    color: colors.textMuted,
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 12,
  },
  floorTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  floorCount: {
    color: colors.gold,
    fontWeight: '800',
  },
  floorMeta: {
    color: colors.textMuted,
  },
});
