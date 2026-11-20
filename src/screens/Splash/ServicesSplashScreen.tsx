import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';

export default function ServicesSplashScreen({ onNavigate }: { onNavigate: any }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNavigate('Home');
    }, 1200);
    return () => clearTimeout(timer);
  }, [onNavigate]);

  return (
    <View style={styles.splashContainer}>
      <Image
        source={require('../../../assets/logo.png')}
        style={styles.splashLogo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashLogo: {
    width: 220,
    height: 80,
  },
});
