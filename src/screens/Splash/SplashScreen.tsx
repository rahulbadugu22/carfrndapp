import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Colors } from '../../theme/colors';

export default function SplashScreen() {
  return (
    <View style={styles.splashContainer}>
      <Image
        source={require('../../../assets/logo.png')}
        style={styles.splashLogo}
        resizeMode="contain"
      />
      <View style={styles.taglineBox}>
        <Text style={styles.taglineText}>Smart Contact Vehicle Decal</Text>
      </View>
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
    width: 240,
    height: 90,
  },
  taglineBox: {
    marginTop: 16,
    backgroundColor: Colors.magentaLight,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.magentaBorder,
  },
  taglineText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.magenta,
    letterSpacing: 0.5,
  },
});
