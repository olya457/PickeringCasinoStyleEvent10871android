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
      colors={disabled ? [colors.disabled, colors.disabled] : secondary ? [colors.surfaceMuted, colors.surfaceMuted] : gradients.primary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.button}
    >
      {loading ? (
        <View style={styles.content}>
          <ActivityIndicator color={disabled ? colors.textMuted : secondary ? colors.text : colors.textOnAccent} />
        </View>
      ) : (
        <View pointerEvents="none" style={styles.content}>
          <Text style={[styles.title, { color: disabled ? colors.textMuted : secondary ? colors.text : colors.textOnAccent }]}>{title}</Text>
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
