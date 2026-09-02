import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import { EventCard } from '../components/EventCard';
import { GradientButton } from '../components/GradientButton';
import { InfoCard } from '../components/InfoCard';
import { Screen } from '../components/Screen';
import { SectionHeader } from '../components/SectionHeader';
import { events, homeBanner, homeHighlights } from '../data/content';
import { MainTabParamList } from '../navigation/types';
import { colors } from '../theme/colors';

export const HomeScreen = () => {
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();
  const featured = events[0];
  const openEvents = () => navigation.navigate('EventsTab', { screen: 'EventsList' });
  const openFeaturedEvent = () => navigation.navigate('EventsTab', { screen: 'EventDetails', params: { eventId: featured.id } });
  const quickAccess = [
    { title: 'Events', icon: '🎟️', color: 'rgba(243,199,54,0.12)', onPress: () => navigation.navigate('EventsTab') },
    { title: 'Food Court', icon: '🍽️', color: 'rgba(255,77,141,0.12)', onPress: () => navigation.navigate('FoodTab') },
    { title: 'Parking', icon: '🚗', color: 'rgba(124,77,255,0.12)', onPress: () => navigation.navigate('ParkingTab') },
    { title: 'Event Map', icon: '🗺️', color: 'rgba(42,210,123,0.12)', onPress: () => navigation.navigate('MapTab') },
    { title: 'My Bookings', icon: '📋', color: 'rgba(255,176,31,0.12)', wide: true, onPress: () => navigation.navigate('BookingsTab') },
  ];

  return (
    <Screen contentContainerStyle={styles.content}>
      <ImageBackground source={homeBanner.image} style={styles.hero} imageStyle={styles.heroImage}>
        <LinearGradient
          colors={['rgba(9,9,12,0.18)', 'rgba(9,9,12,0.96)']}
          pointerEvents="none"
          style={styles.heroOverlay}
        />
        <View style={styles.heroContent}>
          <Text style={styles.badge}>{homeBanner.badge}</Text>
          <Text style={styles.title}>{homeBanner.title}</Text>
          <Text style={styles.subtitle}>{homeBanner.subtitle}</Text>
          <GradientButton title="Explore Events" onPress={openEvents} style={styles.heroButton} />
        </View>
      </ImageBackground>

      <View style={styles.grid}>
        {homeHighlights.map(item => (
          <InfoCard key={item.label} label={item.label} value={item.value} />
        ))}
      </View>

      <SectionHeader eyebrow="Featured Show" title="Upcoming Event" action="See all" onAction={() => navigation.navigate('EventsTab')} />
      <EventCard item={featured} onPress={openFeaturedEvent} />

      <SectionHeader eyebrow="Quick Access" title="Explore Venue" />
      <View style={styles.quickGrid}>
        {quickAccess.map(card => (
          <Pressable key={card.title} onPress={card.onPress} style={[styles.quickCard, card.wide && styles.quickCardWide, { backgroundColor: card.color }]}>
            <Text style={styles.quickIcon}>{card.icon}</Text>
            <View style={styles.quickCopy}>
              <Text style={styles.quickTitle}>{card.title}</Text>
              <Text style={styles.quickHint}>Open</Text>
            </View>
            <Text style={styles.quickArrow}>›</Text>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingTop: 42,
  },
  hero: {
    minHeight: 430,
    borderRadius: 28,
    overflow: 'hidden',
  },
  heroImage: {
    borderRadius: 28,
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  heroContent: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    paddingBottom: 28,
    gap: 10,
  },
  badge: {
    alignSelf: 'flex-start',
    color: colors.gold,
    backgroundColor: 'rgba(243,199,54,0.14)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    fontWeight: '700',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 36,
    fontWeight: '800',
    maxWidth: '82%',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 16,
  },
  heroButton: {
    marginTop: 10,
    width: 190,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickCard: {
    width: '48.4%',
    minHeight: 104,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 10,
  },
  quickCardWide: {
    width: '100%',
  },
  quickIcon: {
    fontSize: 22,
  },
  quickCopy: {
    flex: 1,
  },
  quickTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  quickHint: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
  quickArrow: {
    color: colors.gold,
    fontSize: 28,
    lineHeight: 30,
  },
});
