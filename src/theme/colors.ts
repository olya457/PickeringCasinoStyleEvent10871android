export const colors = {
  background: '#0D0B08',
  surface: '#191611',
  surfaceMuted: '#262019',
  border: '#493C2B',
  text: '#F8F1E5',
  textMuted: '#C0B39F',
  textOnAccent: '#171108',
  gold: '#D9B36C',
  champagne: '#F1D7A4',
  bronze: '#BC9158',
  taupe: '#B5A38A',
  sage: '#97B39B',
  rose: '#D49A88',
  blue: '#91ABB0',
  green: '#91B99B',
  red: '#E09589',
  disabled: '#40382D',
};

export const gradients = {
  primary: [colors.bronze, colors.champagne, colors.gold],
};

export const withAlpha = (hex: string, opacity: number) => {
  const value = parseInt(hex.slice(1), 16);
  return `rgba(${(value >> 16) & 255},${(value >> 8) & 255},${value & 255},${opacity})`;
};
