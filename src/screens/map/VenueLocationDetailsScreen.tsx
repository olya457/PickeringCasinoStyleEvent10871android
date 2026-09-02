import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { venueLocations } from '../../data/content';
import { MapStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';

export const VenueLocationDetailsScreen = ({ route, navigation }: NativeStackScreenProps<MapStackParamList, 'VenueLocationDetails'>) => {
  const item = venueLocations.find(location => location.id === route.params.locationId);

  if (!item) {
    return null;
  }

  return (
    <Screen>
      <Text style={styles.back} onPress={() => navigation.goBack()}>
        Back
      </Text>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.tag}>{item.tag}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.hours}>{item.hours}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>Access Information</Text>
        <Text style={styles.infoText}>{item.gridLabel}</Text>
      </View>
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
    height: 260,
    borderRadius: 24,
  },
  tag: {
    alignSelf: 'flex-start',
    color: colors.text,
    backgroundColor: 'rgba(124,77,255,0.24)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: '800',
  },
  hours: {
    color: colors.gold,
    fontWeight: '800',
  },
  description: {
    color: colors.textMuted,
    lineHeight: 24,
    fontSize: 15,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    gap: 8,
  },
  infoLabel: {
    color: '#B58BFF',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  infoText: {
    color: colors.text,
  },
});
