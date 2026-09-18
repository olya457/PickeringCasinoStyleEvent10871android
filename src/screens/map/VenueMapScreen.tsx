import React, { useState } from 'react';
import { DimensionValue, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { venueLocations } from '../../data/content';
import { MapStackParamList } from '../../navigation/types';
import { colors, withAlpha } from '../../theme/colors';

const markers: { id: string; x: DimensionValue; y: DimensionValue; color: string; label: string }[] = [
  { id: 'main-entrance', x: '26%', y: '82%', color: colors.gold, label: '1' },
  { id: 'runway-hall', x: '34%', y: '52%', color: colors.rose, label: '2' },
  { id: 'designer-showroom', x: '66%', y: '45%', color: colors.sage, label: '3' },
  { id: 'fashion-exhibition-zone', x: '54%', y: '26%', color: colors.sage, label: '4' },
  { id: 'food-court', x: '77%', y: '64%', color: colors.taupe, label: '5' },
  { id: 'vip-lounge', x: '14%', y: '28%', color: colors.bronze, label: '6' },
  { id: 'backstage-area', x: '22%', y: '54%', color: colors.textMuted, label: '7' },
  { id: 'photo-media-zone', x: '46%', y: '14%', color: colors.blue, label: '8' },
  { id: 'networking-lounge', x: '66%', y: '60%', color: colors.rose, label: '9' },
  { id: 'parking-area', x: '84%', y: '78%', color: colors.textMuted, label: '10' },
];

export const VenueMapScreen = ({ navigation }: NativeStackScreenProps<MapStackParamList, 'VenueMap'>) => {
  const [selectedId, setSelectedId] = useState<string>('fashion-exhibition-zone');
  const selected = venueLocations.find(item => item.id === selectedId) ?? venueLocations[0];

  return (
    <Screen>
      <Text style={styles.title}>Venue Map</Text>
      <Text style={styles.subtitle}>Tap any location marker to see details</Text>
      <View style={styles.mapCanvas}>
        <View style={[styles.zone, styles.zoneVip]} />
        <View style={[styles.zone, styles.zoneRunway]} />
        <View style={[styles.zone, styles.zoneExhibition]} />
        <View style={[styles.zone, styles.zoneDining]} />
        {markers.map(marker => (
          <Pressable key={marker.id} onPress={() => setSelectedId(marker.id)} style={[styles.marker, { left: marker.x, top: marker.y, backgroundColor: marker.color }, selectedId === marker.id && styles.markerSelected]}>
            <Text style={styles.markerText}>{marker.label}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.legendRow}>
        {[
          ['Entry', colors.gold],
          ['Show', colors.rose],
          ['Exhibition', colors.sage],
          ['Dining', colors.taupe],
          ['VIP', colors.bronze],
          ['Restricted', colors.textMuted],
        ].map(([title, color]) => (
          <View key={title} style={styles.legend}>
            <View style={[styles.legendDot, { backgroundColor: color }]} />
            <Text style={styles.legendText}>{title}</Text>
          </View>
        ))}
      </View>
      <Pressable style={styles.preview} onPress={() => navigation.navigate('VenueLocationDetails', { locationId: selected.id })}>
        <Text style={styles.previewTag}>{selected.tag}</Text>
        <Text style={styles.previewTitle}>{selected.title}</Text>
        <Text style={styles.previewHours}>{selected.hours}</Text>
        <Text style={styles.previewDescription} numberOfLines={2}>{selected.description}</Text>
        <Text style={styles.previewCta}>View Details</Text>
      </Pressable>
      {venueLocations.map((location, index) => (
        <Pressable key={location.id} onPress={() => setSelectedId(location.id)} style={styles.locationRow}>
          <View style={[styles.indexCircle, { backgroundColor: markers[index]?.color ?? colors.gold }]}>
            <Text style={styles.indexText}>{index + 1}</Text>
          </View>
          <View style={styles.locationText}>
            <Text style={styles.locationTitle}>{location.title}</Text>
            <Text style={styles.locationHours}>{location.hours}</Text>
          </View>
          <Text style={styles.locationTag}>{location.tag}</Text>
        </Pressable>
      ))}
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
  },
  mapCanvas: {
    height: 360,
    borderRadius: 26,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    position: 'relative',
  },
  zone: {
    position: 'absolute',
    borderRadius: 18,
    borderWidth: 1,
  },
  zoneVip: {
    left: '5%',
    top: '6%',
    width: '26%',
    height: '22%',
    backgroundColor: withAlpha(colors.bronze, 0.08),
    borderColor: withAlpha(colors.bronze, 0.18),
  },
  zoneRunway: {
    left: '5%',
    top: '34%',
    width: '35%',
    height: '30%',
    backgroundColor: withAlpha(colors.rose, 0.08),
    borderColor: withAlpha(colors.rose, 0.18),
  },
  zoneExhibition: {
    left: '42%',
    top: '8%',
    width: '43%',
    height: '38%',
    backgroundColor: withAlpha(colors.green, 0.08),
    borderColor: withAlpha(colors.green, 0.18),
  },
  zoneDining: {
    left: '56%',
    top: '54%',
    width: '34%',
    height: '22%',
    backgroundColor: withAlpha(colors.taupe, 0.08),
    borderColor: withAlpha(colors.taupe, 0.18),
  },
  marker: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: withAlpha(colors.champagne, 0.18),
  },
  markerSelected: {
    borderColor: colors.text,
    transform: [{ scale: 1.16 }],
  },
  markerText: {
    color: colors.textOnAccent,
    fontSize: 11,
    fontWeight: '800',
  },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },
  legendText: {
    color: colors.textMuted,
    fontSize: 12,
  },
  preview: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 8,
  },
  previewTag: {
    alignSelf: 'flex-start',
    color: colors.text,
    backgroundColor: withAlpha(colors.gold, 0.24),
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '700',
  },
  previewTitle: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '800',
  },
  previewHours: {
    color: colors.gold,
    fontWeight: '800',
  },
  previewDescription: {
    color: colors.textMuted,
  },
  previewCta: {
    color: colors.textOnAccent,
    backgroundColor: colors.gold,
    borderRadius: 14,
    paddingVertical: 14,
    overflow: 'hidden',
    textAlign: 'center',
    fontWeight: '800',
    marginTop: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  indexCircle: {
    width: 30,
    height: 30,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indexText: {
    color: colors.textOnAccent,
    fontWeight: '800',
    fontSize: 12,
  },
  locationText: {
    flex: 1,
  },
  locationTitle: {
    color: colors.text,
    fontWeight: '700',
  },
  locationHours: {
    color: colors.textMuted,
    marginTop: 4,
    fontSize: 12,
  },
  locationTag: {
    color: colors.textMuted,
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 11,
    fontWeight: '700',
  },
});
