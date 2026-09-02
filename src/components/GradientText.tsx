import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Text } from 'react-native-svg';
import { gradients } from '../theme/colors';

type Props = {
  children: string;
  width: number;
  fontSize: number;
  style?: StyleProp<ViewStyle>;
};

export const GradientText = ({ children, width, fontSize, style }: Props) => (
  <View style={[{ width, height: fontSize * 1.28 }, style]}>
    <Svg width={width} height={fontSize * 1.28} viewBox={`0 0 ${width} ${fontSize * 1.28}`}>
      <Defs>
        <LinearGradient id="title-gradient" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor={gradients.primary[0]} />
          <Stop offset="0.52" stopColor={gradients.primary[1]} />
          <Stop offset="1" stopColor={gradients.primary[2]} />
        </LinearGradient>
      </Defs>
      <Text x={width / 2} y={fontSize} fill="url(#title-gradient)" fontSize={fontSize} fontWeight="800" textAnchor="middle">
        {children}
      </Text>
    </Svg>
  </View>
);
