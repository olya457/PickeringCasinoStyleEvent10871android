import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { parkingFloors } from '../../data/content';
import { ParkingStackParamList } from '../../navigation/types';
import { useAppContext } from '../../state/AppContext';
import { colors, withAlpha } from '../../theme/colors';

export const ParkingFloorScreen = ({ route, navigation }: NativeStackScreenProps<ParkingStackParamList, 'ParkingFloor'>) => {
  const floor = parkingFloors.find(item => item.floor === route.params.floor);
  const { bookings } = useAppContext();
  const [selected, setSelected] = useState<string | null>(null);
  const reservedSpaceIds = useMemo(
    () =>
      bookings
        .filter(
          (item): item is Extract<(typeof bookings)[number], { type: 'parking' }> =>
            item.type === 'parking' && item.floor === floor?.floor,
        )
        .map(item => item.spaceId),
    [bookings, floor?.floor],
  );

  if (!floor) {
    return null;
  }

  return (
    <Screen>
      <Text style={styles.back} onPress={() => navigation.goBack()}>
        Back
      </Text>
      <Text style={styles.title}>Floor {floor.floor} Map</Text>
      <View style={styles.legendRow}>
        <Legend color={colors.green} title="Available" />
        <Legend color={colors.red} title="Reserved" />
        <Legend color={colors.gold} title="Selected" />
      </View>
      <View style={styles.mapBox}>
        <Text style={styles.entrance}>Entrance / Exit</Text>
        {['A', 'B', 'C', 'D'].map(row => (
          <View key={row} style={styles.row}>
            <Text style={styles.rowLabel}>{row}</Text>
            <View style={styles.spaces}>
              {floor.spaces.filter(space => space.row === row).map(space => {
                const reserved = space.status === 'reserved' || reservedSpaceIds.includes(space.id);
                const selectedNow = selected === space.id;
                return (
                  <Pressable
                    key={space.id}
                    disabled={reserved}
                    onPress={() => setSelected(space.id)}
                    style={[styles.space, reserved && styles.reservedSpace, selectedNow && styles.selectedSpace]}
                  >
                    <Text style={[styles.spaceText, selectedNow && styles.selectedSpaceText]}>{space.number}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}
      </View>
      <Text style={styles.helper}>Tap an available space to select it</Text>
      {selected ? (
        <View style={styles.selectedCard}>
          <Text style={styles.selectedLabel}>Selected Space</Text>
          <Text style={styles.selectedTitle}>Space {selected}</Text>
          <Text style={styles.selectedMeta}>Floor {floor.floor}</Text>
          <Pressable style={styles.reserveButton} onPress={() => navigation.navigate('ParkingReserve', { floor: floor.floor, spaceId: selected })}>
            <Text style={styles.reserveText}>Reserve This Space</Text>
          </Pressable>
        </View>
      ) : null}
    </Screen>
  );
};

const Legend = ({ color, title }: { color: string; title: string }) => (
  <View style={styles.legend}>
    <View style={[styles.legendDot, { backgroundColor: color }]} />
    <Text style={styles.legendText}>{title}</Text>
  </View>
);

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
  legendRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },
  legendText: {
    color: colors.textMuted,
    fontSize: 12,
  },
  mapBox: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 12,
  },
  entrance: {
    alignSelf: 'flex-end',
    backgroundColor: withAlpha(colors.gold, 0.14),
    color: colors.gold,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rowLabel: {
    color: colors.textMuted,
    width: 12,
  },
  spaces: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    flex: 1,
  },
  space: {
    width: 34,
    height: 26,
    borderRadius: 8,
    backgroundColor: withAlpha(colors.green, 0.22),
    alignItems: 'center',
    justifyContent: 'center',
  },
  reservedSpace: {
    backgroundColor: withAlpha(colors.red, 0.38),
  },
  selectedSpace: {
    backgroundColor: withAlpha(colors.gold, 0.92),
  },
  spaceText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '800',
  },
  selectedSpaceText: {
    color: colors.textOnAccent,
  },
  helper: {
    color: colors.textMuted,
    textAlign: 'center',
  },
  selectedCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: withAlpha(colors.gold, 0.18),
    padding: 18,
    gap: 8,
  },
  selectedLabel: {
    color: colors.textMuted,
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 12,
  },
  selectedTitle: {
    color: colors.gold,
    fontSize: 28,
    fontWeight: '800',
  },
  selectedMeta: {
    color: colors.text,
  },
  reserveButton: {
    backgroundColor: colors.gold,
    borderRadius: 16,
    paddingVertical: 14,
    marginTop: 10,
    alignItems: 'center',
  },
  reserveText: {
    color: colors.textOnAccent,
    fontWeight: '800',
  },
});
