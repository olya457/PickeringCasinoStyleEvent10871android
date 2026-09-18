import React, { useEffect, useRef } from 'react';
import { Animated, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { WebView } from 'react-native-webview';
import { brandingAssets } from '../assets';
import { GradientText } from '../components/GradientText';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { useLayout } from '../theme/layout';

type Props = Partial<NativeStackScreenProps<RootStackParamList, 'Splash'>> & {
  bootOnly?: boolean;
};

export const SplashScreen = ({ navigation, bootOnly }: Props) => {
  const pulse = useRef(new Animated.Value(0.7)).current;
  const { width, isTablet } = useLayout();
  const logoSize = Math.min(width - (isTablet ? 200 : 96), isTablet ? 300 : 218);
  const titleWidth = Math.min(width - 44, isTablet ? 520 : 360);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.7, duration: 900, useNativeDriver: true }),
      ]),
    ).start();
  }, [pulse]);

  useEffect(() => {
    if (bootOnly || !navigation) {
      return;
    }
    const timer = setTimeout(() => navigation.replace('Onboarding'), 4000);
    return () => clearTimeout(timer);
  }, [bootOnly, navigation]);

  return (
    <ImageBackground source={brandingAssets.heroVenue} style={styles.background}>
      <LinearGradient colors={['rgba(6,6,10,0.1)', 'rgba(6,6,10,0.86)']} style={styles.overlay}>
        <View style={styles.content}>
          <View style={[styles.logoCard, { width: logoSize, height: logoSize }]}>
            <Animated.View style={{ transform: [{ scale: pulse }] }}>
              <Image source={brandingAssets.appMark} style={[styles.logo, { width: (logoSize - 28) * 1.7, height: (logoSize - 28) * 1.7 }]} />
            </Animated.View>
          </View>
          <GradientText width={titleWidth} fontSize={isTablet ? 48 : 36} style={styles.title}>
            Pickering
          </GradientText>
          <Text style={styles.subtitle}>Style Event</Text>
          <View style={styles.loaderWrap}>
            <View style={[styles.dot, { backgroundColor: colors.gold }]} />
            <View style={[styles.dot, { backgroundColor: colors.pink }]} />
            <View style={[styles.dot, { backgroundColor: colors.purple }]} />
          </View>
          <Text style={styles.loadingText}>Loading</Text>
          {!bootOnly ? (
            <View style={styles.webViewWrapper}>
              <WebView
                originWhitelist={['*']}
                scrollEnabled={false}
                source={{
                  html: `<html><body style="margin:0;background:transparent;display:flex;align-items:center;justify-content:center;"><div style="width:180px;height:4px;background:rgba(255,255,255,0.12);border-radius:999px;overflow:hidden;"><div style="width:60px;height:4px;background:linear-gradient(90deg,#FFB01F,#FF4D6D,#8E5CFF);border-radius:999px;animation:move 1.2s infinite;"></div></div><style>@keyframes move{0%{transform:translateX(-60px)}100%{transform:translateX(180px)}}</style></body></html>`,
                }}
                style={styles.webView}
              />
            </View>
          ) : null}
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCard: {
    borderRadius: 34,
    backgroundColor: 'rgba(13,12,20,0.34)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 22,
  },
  logo: {
    resizeMode: 'contain',
  },
  title: {
    alignSelf: 'center',
    marginTop: 20,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 24,
    marginTop: 6,
    textAlign: 'center',
  },
  loaderWrap: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 28,
  },
  dot: {
    width: 20,
    height: 4,
    borderRadius: 999,
  },
  loadingText: {
    color: colors.textMuted,
    marginTop: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'center',
  },
  webViewWrapper: {
    width: 200,
    height: 36,
    marginTop: 12,
    alignSelf: 'center',
  },
  webView: {
    backgroundColor: 'transparent',
  },
});
