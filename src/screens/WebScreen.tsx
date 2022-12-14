import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { WebView } from 'react-native-webview'; 

// @ts-ignore
const WebScreen = ({route}) => {
    const { url } = route.params
  return (
    <WebView
      style={styles.container}
      source={{ uri: url}}
    />
  )
}

export default WebScreen

const styles = StyleSheet.create({
  container: {
  flex: 1
}})