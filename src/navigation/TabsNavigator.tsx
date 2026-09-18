import React from 'react';
import { Text, useWindowDimensions, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BookingDetailsScreen } from '../screens/bookings/BookingDetailsScreen';
import { BookingsScreen } from '../screens/bookings/BookingsScreen';
import { EventBookingFormScreen } from '../screens/events/EventBookingFormScreen';
import { EventBookingResultScreen } from '../screens/events/EventBookingResultScreen';
import { EventDetailsScreen } from '../screens/events/EventDetailsScreen';
import { EventsScreen } from '../screens/events/EventsScreen';
import { FoodCartScreen } from '../screens/food/FoodCartScreen';
import { FoodDetailsScreen } from '../screens/food/FoodDetailsScreen';
import { FoodMenuScreen } from '../screens/food/FoodMenuScreen';
import { FoodOrderResultScreen } from '../screens/food/FoodOrderResultScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { VenueLocationDetailsScreen } from '../screens/map/VenueLocationDetailsScreen';
import { VenueMapScreen } from '../screens/map/VenueMapScreen';
import { ParkingFloorScreen } from '../screens/parking/ParkingFloorScreen';
import { ParkingHomeScreen } from '../screens/parking/ParkingHomeScreen';
import { ParkingReserveScreen } from '../screens/parking/ParkingReserveScreen';
import { ParkingResultScreen } from '../screens/parking/ParkingResultScreen';
import { colors, withAlpha } from '../theme/colors';
import { BookingsStackParamList, EventsStackParamList, FoodStackParamList, MainTabParamList, MapStackParamList, ParkingStackParamList } from './types';

const Tabs = createBottomTabNavigator<MainTabParamList>();
const EventsStack = createNativeStackNavigator<EventsStackParamList>();
const FoodStack = createNativeStackNavigator<FoodStackParamList>();
const ParkingStack = createNativeStackNavigator<ParkingStackParamList>();
const MapStack = createNativeStackNavigator<MapStackParamList>();
const BookingsStack = createNativeStackNavigator<BookingsStackParamList>();

const stackOptions = {
  headerShown: false,
  contentStyle: { backgroundColor: colors.background },
};

const iconMap: Record<keyof MainTabParamList, string> = {
  HomeTab: '🏠',
  EventsTab: '🎟️',
  FoodTab: '🍽️',
  ParkingTab: '🚗',
  MapTab: '🗺️',
  BookingsTab: '📋',
};

const EventsNavigator = () => (
  <EventsStack.Navigator screenOptions={stackOptions}>
    <EventsStack.Screen name="EventsList" component={EventsScreen} />
    <EventsStack.Screen name="EventDetails" component={EventDetailsScreen} />
    <EventsStack.Screen name="EventBookingForm" component={EventBookingFormScreen} />
    <EventsStack.Screen name="EventBookingResult" component={EventBookingResultScreen} />
  </EventsStack.Navigator>
);

const FoodNavigator = () => (
  <FoodStack.Navigator screenOptions={stackOptions}>
    <FoodStack.Screen name="FoodMenu" component={FoodMenuScreen} />
    <FoodStack.Screen name="FoodDetails" component={FoodDetailsScreen} />
    <FoodStack.Screen name="FoodCart" component={FoodCartScreen} />
    <FoodStack.Screen name="FoodOrderResult" component={FoodOrderResultScreen} />
  </FoodStack.Navigator>
);

const ParkingNavigator = () => (
  <ParkingStack.Navigator screenOptions={stackOptions}>
    <ParkingStack.Screen name="ParkingHome" component={ParkingHomeScreen} />
    <ParkingStack.Screen name="ParkingFloor" component={ParkingFloorScreen} />
    <ParkingStack.Screen name="ParkingReserve" component={ParkingReserveScreen} />
    <ParkingStack.Screen name="ParkingResult" component={ParkingResultScreen} />
  </ParkingStack.Navigator>
);

const MapNavigator = () => (
  <MapStack.Navigator screenOptions={stackOptions}>
    <MapStack.Screen name="VenueMap" component={VenueMapScreen} />
    <MapStack.Screen name="VenueLocationDetails" component={VenueLocationDetailsScreen} />
  </MapStack.Navigator>
);

const BookingsNavigator = () => (
  <BookingsStack.Navigator screenOptions={stackOptions}>
    <BookingsStack.Screen name="BookingsList" component={BookingsScreen} />
    <BookingsStack.Screen name="BookingDetails" component={BookingDetailsScreen} />
  </BookingsStack.Navigator>
);

export const MainTabs = () => (
  <AdaptiveTabs />
);

const AdaptiveTabs = () => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 700;

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        position: 'absolute',
        left: isTablet ? 32 : 16,
        right: isTablet ? 32 : 16,
        bottom: 40,
        height: isTablet ? 72 : 64,
        paddingVertical: 0,
        backgroundColor: withAlpha(colors.surface, 0.96),
        borderWidth: 1,
        borderColor: withAlpha(colors.champagne, 0.16),
        borderRadius: 32,
        elevation: 0,
        shadowColor: '#000000',
        shadowOpacity: 0.28,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
      },
      tabBarItemStyle: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      tabBarIconStyle: {
        marginTop: 0,
        marginBottom: 0,
      },
      tabBarIcon: ({ focused }) => (
        <View style={{ opacity: focused ? 1 : 0.5, transform: [{ translateY: isTablet ? 9 : 8 }] }}>
          <Text style={{ fontSize: isTablet ? 26 : 22, lineHeight: isTablet ? 26 : 22 }}>
            {iconMap[route.name as keyof MainTabParamList]}
          </Text>
        </View>
      ),
    })}
    >
      <Tabs.Screen name="HomeTab" component={HomeScreen} />
      <Tabs.Screen name="EventsTab" component={EventsNavigator} />
      <Tabs.Screen name="FoodTab" component={FoodNavigator} />
      <Tabs.Screen name="ParkingTab" component={ParkingNavigator} />
      <Tabs.Screen name="MapTab" component={MapNavigator} />
      <Tabs.Screen name="BookingsTab" component={BookingsNavigator} />
    </Tabs.Navigator>
  );
};
