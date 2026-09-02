import { CartItem, FoodItem } from '../types';

export const createId = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

export const createQrValue = (type: string, id: string, payload: string) =>
  JSON.stringify({ type, id, payload });

export const calculateCartTotal = (cart: CartItem[], items: FoodItem[]) =>
  cart.reduce((sum, cartItem) => {
    const menuItem = items.find(item => item.id === cartItem.itemId);
    return sum + (menuItem ? menuItem.price * cartItem.quantity : 0);
  }, 0);

export const calculatePrepMinutes = (cart: CartItem[], items: FoodItem[]) => {
  const maxPrep = cart.reduce((max, cartItem) => {
    const menuItem = items.find(item => item.id === cartItem.itemId);
    if (!menuItem) {
      return max;
    }
    const parsed = Number(menuItem.prepTime.split('-')[1]?.replace(/\D/g, '') ?? 0);
    return Math.max(max, parsed);
  }, 0);

  return maxPrep || 10;
};
