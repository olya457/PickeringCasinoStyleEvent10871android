import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradients } from '../theme/colors';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  secondary?: boolean;
  loading?: boolean;
};

export const GradientButton = ({ title, onPress, disabled, style, secondary, loading }: Props) => (
  <Pressable onPress={onPress} disabled={disabled || loading} style={[styles.pressable, style]}>
    <LinearGradient
      colors={secondary ? ['#23222E', '#23222E'] : disabled ? ['#44404F', '#44404F'] : gradients.primary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.button}
    >
      {loading ? (
        <View style={styles.content}>
          <ActivityIndicator color={colors.text} />
        </View>
      ) : (
        <View pointerEvents="none" style={styles.content}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
    </LinearGradient>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 16,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    width: '100%',
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  pressable: {
    alignSelf: 'stretch',
    height: 56,
    borderRadius: 16,
    overflow: 'hidden',
  },
});
