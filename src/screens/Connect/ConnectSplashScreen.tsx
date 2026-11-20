import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';

export default function ConnectSplashScreen({ onNavigate }: { onNavigate: any }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNavigate('ConnectHome');
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
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashLogo: {
    width: 220,
    height: 80,
  },
});
