import { ImageSourcePropType } from 'react-native';

export type EventItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  dateTimeLabel: string;
  seatsLeft: number;
  location: string;
  category: string;
  image: ImageSourcePropType;
};

export type FoodCategoryId =
  | 'runway-bites'
  | 'couture-main-plates'
  | 'designer-desserts';

export type FoodItem = {
  id: string;
  categoryId: FoodCategoryId;
  title: string;
  description: string;
  price: number;
  prepTime: string;
  ingredients: string[];
  image: ImageSourcePropType;
};

export type VenueLocation = {
  id: string;
  title: string;
  description: string;
  hours: string;
  tag: string;
  image: ImageSourcePropType;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  gridLabel: string;
};

export type CartItem = {
  itemId: string;
  quantity: number;
};

export type EventBooking = {
  id: string;
  type: 'event';
  eventId: string;
  guests: number;
  date: string;
  time: string;
  notes: string;
  status: 'confirmed' | 'upcoming' | 'cancelled';
  qrValue: string;
  createdAt: string;
};

export type FoodOrder = {
  id: string;
  type: 'food';
  items: CartItem[];
  note: string;
  total: number;
  prepMinutes: number;
  status: 'received' | 'preparing' | 'ready';
  qrValue: string;
  createdAt: string;
};

export type ParkingBooking = {
  id: string;
  type: 'parking';
  floor: number;
  spaceId: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  status: 'confirmed' | 'upcoming' | 'cancelled';
  qrValue: string;
  createdAt: string;
};

export type BookingRecord = EventBooking | FoodOrder | ParkingBooking;

export type ParkingSpace = {
  id: string;
  row: string;
  number: number;
  status: 'available' | 'reserved';
};

export type ParkingFloor = {
  floor: number;
  title: string;
  spaces: ParkingSpace[];
};
