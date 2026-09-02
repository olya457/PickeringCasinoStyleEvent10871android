export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  EventsTab: NavigatorScreenParams<EventsStackParamList> | undefined;
  FoodTab: NavigatorScreenParams<FoodStackParamList> | undefined;
  ParkingTab: NavigatorScreenParams<ParkingStackParamList> | undefined;
  MapTab: NavigatorScreenParams<MapStackParamList> | undefined;
  BookingsTab: NavigatorScreenParams<BookingsStackParamList> | undefined;
};

export type EventsStackParamList = {
  EventsList: undefined;
  EventDetails: { eventId: string };
  EventBookingForm: { eventId: string; bookingId?: string };
  EventBookingResult: { bookingId: string };
};

export type FoodStackParamList = {
  FoodMenu: undefined;
  FoodDetails: { itemId: string };
  FoodCart: { orderId?: string } | undefined;
  FoodOrderResult: { orderId: string };
};

export type ParkingStackParamList = {
  ParkingHome: undefined;
  ParkingFloor: { floor: number };
  ParkingReserve: { floor: number; spaceId: string; bookingId?: string };
  ParkingResult: { bookingId: string };
};

export type MapStackParamList = {
  VenueMap: undefined;
  VenueLocationDetails: { locationId: string };
};

export type BookingsStackParamList = {
  BookingsList: undefined;
  BookingDetails: { bookingId: string };
};
import { NavigatorScreenParams } from '@react-navigation/native';
