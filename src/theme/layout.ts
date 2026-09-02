import { useWindowDimensions } from 'react-native';

export const tabletBreakpoint = 700;
export const contentMaxWidth = 1120;

export const useLayout = () => {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= tabletBreakpoint;

  return {
    width,
    height,
    isTablet,
    isLandscape: width > height,
    horizontalPadding: isTablet ? 28 : 16,
    contentMaxWidth,
  };
};
