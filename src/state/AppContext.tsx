import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { foodItems } from '../data/content';
import { BookingRecord, CartItem, EventBooking, FoodOrder, ParkingBooking } from '../types';
import { calculateCartTotal, calculatePrepMinutes, createId, createQrValue } from '../utils/booking';

type State = {
  hydrated: boolean;
  onboardingSeen: boolean;
  bookings: BookingRecord[];
  cart: CartItem[];
};

type EventBookingPayload = {
  eventId: string;
  guests: number;
  date: string;
  time: string;
  notes: string;
  bookingId?: string;
};

type FoodOrderPayload = {
  items: CartItem[];
  note: string;
  orderId?: string;
};

type ParkingPayload = {
  floor: number;
  spaceId: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  bookingId?: string;
};

type Action =
  | { type: 'HYDRATE'; payload: Partial<State> }
  | { type: 'SET_ONBOARDING_SEEN' }
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'UPSERT_EVENT_BOOKING'; payload: EventBookingPayload }
  | { type: 'UPSERT_FOOD_ORDER'; payload: FoodOrderPayload }
  | { type: 'UPSERT_PARKING_BOOKING'; payload: ParkingPayload }
  | { type: 'REMOVE_BOOKING'; payload: string };

type AppContextValue = State & {
  setOnboardingSeen: () => void;
  setCart: (items: CartItem[]) => void;
  upsertEventBooking: (payload: EventBookingPayload) => EventBooking;
  upsertFoodOrder: (payload: FoodOrderPayload) => FoodOrder;
  upsertParkingBooking: (payload: ParkingPayload) => ParkingBooking;
  removeBooking: (id: string) => void;
};

const initialState: State = {
  hydrated: false,
  onboardingSeen: false,
  bookings: [],
  cart: [],
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'HYDRATE':
      return { ...state, ...action.payload, hydrated: true };
    case 'SET_ONBOARDING_SEEN':
      return { ...state, onboardingSeen: true };
    case 'SET_CART':
      return { ...state, cart: action.payload };
    case 'UPSERT_EVENT_BOOKING': {
      const id = action.payload.bookingId ?? createId('EVT');
      const nextBooking: EventBooking = {
        id,
        type: 'event',
        eventId: action.payload.eventId,
        guests: action.payload.guests,
        date: action.payload.date,
        time: action.payload.time,
        notes: action.payload.notes,
        status: 'confirmed',
        qrValue: createQrValue('event', id, `${action.payload.eventId}:${action.payload.date}:${action.payload.time}`),
        createdAt: new Date().toISOString(),
      };
      return { ...state, bookings: [nextBooking, ...state.bookings.filter(item => item.id !== id)] };
    }
    case 'UPSERT_FOOD_ORDER': {
      const id = action.payload.orderId ?? createId('ORD');
      const nextOrder: FoodOrder = {
        id,
        type: 'food',
        items: action.payload.items,
        note: action.payload.note,
        total: calculateCartTotal(action.payload.items, foodItems),
        prepMinutes: calculatePrepMinutes(action.payload.items, foodItems),
        status: 'received',
        qrValue: createQrValue('food', id, JSON.stringify(action.payload.items)),
        createdAt: new Date().toISOString(),
      };
      return { ...state, bookings: [nextOrder, ...state.bookings.filter(item => item.id !== id)], cart: [] };
    }
    case 'UPSERT_PARKING_BOOKING': {
      const id = action.payload.bookingId ?? createId('PRK');
      const nextBooking: ParkingBooking = {
        id,
        type: 'parking',
        floor: action.payload.floor,
        spaceId: action.payload.spaceId,
        startDate: action.payload.startDate,
        startTime: action.payload.startTime,
        endDate: action.payload.endDate,
        endTime: action.payload.endTime,
        status: 'confirmed',
        qrValue: createQrValue('parking', id, `${action.payload.floor}:${action.payload.spaceId}`),
        createdAt: new Date().toISOString(),
      };
      return { ...state, bookings: [nextBooking, ...state.bookings.filter(item => item.id !== id)] };
    }
    case 'REMOVE_BOOKING':
      return { ...state, bookings: state.bookings.filter(item => item.id !== action.payload) };
    default:
      return state;
  }
};

const STORAGE_KEY = 'pickering-fashion-event-state';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const hydrate = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          dispatch({ type: 'HYDRATE', payload: JSON.parse(stored) });
          return;
        }
      } catch {}
      dispatch({ type: 'HYDRATE', payload: {} });
    };

    hydrate();
  }, []);

  useEffect(() => {
    if (!state.hydrated) {
      return;
    }
    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        onboardingSeen: state.onboardingSeen,
        bookings: state.bookings,
        cart: state.cart,
      }),
    ).catch(() => undefined);
  }, [state]);

  const value = useMemo<AppContextValue>(
    () => ({
      ...state,
      setOnboardingSeen: () => dispatch({ type: 'SET_ONBOARDING_SEEN' }),
      setCart: items => dispatch({ type: 'SET_CART', payload: items }),
      upsertEventBooking: payload => {
        const id = payload.bookingId ?? createId('EVT');
        const booking: EventBooking = {
          id,
          type: 'event',
          eventId: payload.eventId,
          guests: payload.guests,
          date: payload.date,
          time: payload.time,
          notes: payload.notes,
          status: 'confirmed',
          qrValue: createQrValue('event', id, `${payload.eventId}:${payload.date}:${payload.time}`),
          createdAt: new Date().toISOString(),
        };
        dispatch({ type: 'UPSERT_EVENT_BOOKING', payload: { ...payload, bookingId: id } });
        return booking;
      },
      upsertFoodOrder: payload => {
        const id = payload.orderId ?? createId('ORD');
        const order: FoodOrder = {
          id,
          type: 'food',
          items: payload.items,
          note: payload.note,
          total: calculateCartTotal(payload.items, foodItems),
          prepMinutes: calculatePrepMinutes(payload.items, foodItems),
          status: 'received',
          qrValue: createQrValue('food', id, JSON.stringify(payload.items)),
          createdAt: new Date().toISOString(),
        };
        dispatch({ type: 'UPSERT_FOOD_ORDER', payload: { ...payload, orderId: id } });
        return order;
      },
      upsertParkingBooking: payload => {
        const id = payload.bookingId ?? createId('PRK');
        const booking: ParkingBooking = {
          id,
          type: 'parking',
          floor: payload.floor,
          spaceId: payload.spaceId,
          startDate: payload.startDate,
          startTime: payload.startTime,
          endDate: payload.endDate,
          endTime: payload.endTime,
          status: 'confirmed',
          qrValue: createQrValue('parking', id, `${payload.floor}:${payload.spaceId}`),
          createdAt: new Date().toISOString(),
        };
        dispatch({ type: 'UPSERT_PARKING_BOOKING', payload: { ...payload, bookingId: id } });
        return booking;
      },
      removeBooking: id => dispatch({ type: 'REMOVE_BOOKING', payload: id }),
    }),
    [state],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
