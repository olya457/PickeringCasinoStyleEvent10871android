import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors } from '../theme/colors';

export const FormField = ({ label, multiline, ...props }: TextInputProps & { label: string }) => (
  <View style={styles.wrapper}>
    <Text style={styles.label}>{label}</Text>
    <TextInput {...props} placeholderTextColor={colors.textMuted} multiline={multiline} style={[styles.input, multiline ? styles.multiline : undefined]} />
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },
  label: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    minHeight: 52,
    color: colors.text,
    paddingHorizontal: 14,
  },
  multiline: {
    minHeight: 110,
    paddingVertical: 14,
    textAlignVertical: 'top',
  },
});
