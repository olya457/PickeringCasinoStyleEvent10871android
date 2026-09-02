import React, { useRef, useState } from 'react';
import { FlatList, ImageBackground, ListRenderItemInfo, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { GradientButton } from '../components/GradientButton';
import { onboardingSlides } from '../data/content';
import { RootStackParamList } from '../navigation/types';
import { useAppContext } from '../state/AppContext';
import { colors } from '../theme/colors';
import { useLayout } from '../theme/layout';

export const OnboardingScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'Onboarding'>) => {
  const listRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);
  const { setOnboardingSeen } = useAppContext();
  const { width, height, isTablet, isLandscape } = useLayout();

  const finish = () => {
    setOnboardingSeen();
    navigation.replace('Main');
  };

  const handleContinue = () => {
    if (index === onboardingSlides.length - 1) {
      finish();
      return;
    }
    listRef.current?.scrollToIndex({ index: index + 1, animated: true });
  };

  const renderItem = ({ item }: ListRenderItemInfo<(typeof onboardingSlides)[number]>) => (
    <ImageBackground source={item.image} style={[styles.slide, { width, minHeight: height }]}>
      <LinearGradient colors={['rgba(5,5,8,0.18)', 'rgba(7,7,12,0.95)']} style={styles.overlay}>
        <View style={[styles.inner, isTablet && styles.innerTablet, isLandscape && styles.innerLandscape]}>
          <Pressable onPress={finish} style={styles.skip}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
          <View style={[styles.bottom, isTablet && styles.bottomTablet]}>
          <View style={styles.pagination}>
            {onboardingSlides.map((slide, itemIndex) => (
              <View key={slide.id} style={[styles.bar, itemIndex === index && styles.activeBar]} />
            ))}
          </View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <GradientButton title={item.buttonLabel} onPress={handleContinue} style={styles.button} />
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );

  return (
    <FlatList
      ref={listRef}
      data={onboardingSlides}
      horizontal
      pagingEnabled
      keyExtractor={item => item.id}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      extraData={width}
      onMomentumScrollEnd={event => setIndex(Math.round(event.nativeEvent.contentOffset.x / width))}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  inner: {
    flex: 1,
    width: '100%',
    paddingTop: 56,
    paddingHorizontal: 22,
    paddingBottom: 34,
  },
  innerTablet: {
    maxWidth: 1120,
    alignSelf: 'center',
    paddingHorizontal: 44,
    paddingTop: 42,
    paddingBottom: 42,
  },
  innerLandscape: {
    paddingTop: 28,
    paddingBottom: 28,
  },
  skip: {
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  skipText: {
    color: colors.text,
    fontWeight: '600',
  },
  bottom: {
    marginTop: 'auto',
    gap: 14,
  },
  bottomTablet: {
    maxWidth: 570,
  },
  pagination: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  bar: {
    width: 18,
    height: 3,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  activeBar: {
    width: 26,
    backgroundColor: colors.gold,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
    maxWidth: '88%',
  },
  description: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
    maxWidth: '92%',
  },
  button: {
    marginTop: 8,
  },
});
