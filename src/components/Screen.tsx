import React, { useEffect, useRef } from 'react';
import { Animated, Easing, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { useLayout } from '../theme/layout';

export const Screen = ({
  children,
  scroll = true,
  contentContainerStyle,
}: {
  children: React.ReactNode;
  scroll?: boolean;
  contentContainerStyle?: object;
}) => {
  const { horizontalPadding, contentMaxWidth } = useLayout();
  const entrance = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(entrance, {
      toValue: 1,
      duration: 260,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });

    animation.start();
    return () => animation.stop();
  }, [entrance]);

  const adaptiveContentStyle = {
    paddingHorizontal: horizontalPadding,
    width: '100%' as const,
    maxWidth: contentMaxWidth,
    alignSelf: 'center' as const,
  };

  const content = scroll ? (
    <ScrollView contentContainerStyle={[styles.content, adaptiveContentStyle, contentContainerStyle]} showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, adaptiveContentStyle, contentContainerStyle]}>{children}</View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <KeyboardAvoidingView style={styles.safeArea} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Animated.View
          style={[
            styles.animatedContent,
            {
              opacity: entrance,
              transform: [
                {
                  translateY: entrance.interpolate({
                    inputRange: [0, 1],
                    outputRange: [12, 0],
                  }),
                },
              ],
            },
          ]}
        >
          {content}
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  animatedContent: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingTop: 46,
    paddingBottom: 112,
    gap: 16,
  },
});
