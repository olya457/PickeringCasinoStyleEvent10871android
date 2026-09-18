import React, { useMemo, useState } from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { events, foodItems } from '../../data/content';
import { BookingsStackParamList } from '../../navigation/types';
import { useAppContext } from '../../state/AppContext';
import { colors } from '../../theme/colors';
import { BookingRecord } from '../../types';
import { venueAssets } from '../../assets';

const filters = ['All', 'Events', 'Food', 'Parking'];

export const BookingsScreen = ({ navigation }: NativeStackScreenProps<BookingsStackParamList, 'BookingsList'>) => {
  const { bookings } = useAppContext();
  const [filter, setFilter] = useState('All');

  const visible = useMemo(() => {
    switch (filter) {
      case 'Events':
        return bookings.filter(item => item.type === 'event');
      case 'Food':
        return bookings.filter(item => item.type === 'food');
      case 'Parking':
        return bookings.filter(item => item.type === 'parking');
      default:
        return bookings;
    }
  }, [bookings, filter]);

  return (
    <Screen>
      <Text style={styles.title}>My Bookings</Text>
      <View style={styles.filters}>
        {filters.map(item => (
          <Pressable key={item} onPress={() => setFilter(item)} style={[styles.filter, filter === item && styles.filterActive]}>
            <Text style={[styles.filterText, filter === item && styles.filterTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </View>
      {visible.map(item => (
        <Pressable key={item.id} style={styles.card} onPress={() => navigation.navigate('BookingDetails', { bookingId: item.id })}>
          <Image source={getThumbnail(item)} style={styles.thumb} resizeMode="cover" />
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{getTitle(item)}</Text>
            <Text style={styles.cardMeta}>{getSubtitle(item)}</Text>
            <Text style={styles.cardMetaSecondary}>{getSecondary(item)}</Text>
          </View>
          <Text style={[styles.status, getStatusStyle(item)]}>{getStatus(item)}</Text>
        </Pressable>
      ))}
      {!visible.length ? <Text style={styles.empty}>No bookings yet.</Text> : null}
    </Screen>
  );
};

const getTitle = (item: BookingRecord) => {
  if (item.type === 'event') {
    return events.find(event => event.id === item.eventId)?.title ?? 'Event Booking';
  }
  if (item.type === 'food') {
    return 'Food Order';
  }
  return `Parking Space ${item.spaceId}`;
};

const getThumbnail = (item: BookingRecord): ImageSourcePropType => {
  if (item.type === 'event') {
    return events.find(event => event.id === item.eventId)?.image ?? venueAssets.runwayHall;
  }
  if (item.type === 'food') {
    return foodItems.find(food => food.id === item.items[0]?.itemId)?.image ?? venueAssets.foodCourt;
  }
  return venueAssets.parkingArea;
};

const getSubtitle = (item: BookingRecord) => {
  if (item.type === 'event') {
    return `${item.date} · ${item.time}`;
  }
  if (item.type === 'food') {
    return `Food Order · ${new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  }
  return `${item.startDate} · ${item.startTime}-${item.endTime}`;
};

const getSecondary = (item: BookingRecord) => {
  if (item.type === 'event') {
    return `${item.guests} Guests`;
  }
  if (item.type === 'food') {
    return item.items
      .map(orderItem => {
        const found = foodItems.find(food => food.id === orderItem.itemId);
        return found ? `${found.title} x${orderItem.quantity}` : null;
      })
      .filter(Boolean)
      .join(', ');
  }
  return `Floor ${item.floor}, Space ${item.spaceId}`;
};

const getStatus = (item: BookingRecord) => item.status.toUpperCase();

const getStatusStyle = (item: BookingRecord) => ({
  color:
    item.type === 'food'
      ? item.status === 'ready'
        ? colors.green
        : item.status === 'preparing'
          ? colors.gold
          : colors.bronze
      : item.status === 'cancelled'
        ? colors.red
        : item.status === 'confirmed'
          ? colors.green
          : colors.bronze,
});

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
  },
  filters: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  filter: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterActive: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  filterText: {
    color: colors.text,
    fontWeight: '700',
  },
  filterTextActive: {
    color: colors.background,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
  },
  thumb: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: colors.surfaceMuted,
  },
  cardInfo: {
    flex: 1,
    gap: 4,
  },
  cardTitle: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 18,
  },
  cardMeta: {
    color: colors.textMuted,
    fontSize: 13,
  },
  cardMetaSecondary: {
    color: colors.textMuted,
    fontSize: 13,
  },
  status: {
    fontSize: 11,
    fontWeight: '800',
  },
  empty: {
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 24,
  },
});
