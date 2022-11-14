import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS, FONTS, SHADOWS } from '../constants/theme';
import { Card, Container, FlexRow, HLine } from '../styles';

import CustomButton from '../components/button.component';
import StarIcon from 'react-native-vector-icons/Entypo';
import DotIcon from 'react-native-vector-icons/Octicons';


const Home = () => {
  return (
    <Container>
      <Card style={SHADOWS.medium} >
        <FlexRow>
          <Text>appswefit/create-react-app</Text>
          <Image source={require('../assets/icons/wefit.png')} resizeMode='contain' style={{ width: 29, height: 29 }} />
        </FlexRow>

        <View style={{ width: '100%' }}>
          <HLine />
          <Text style={styles.text}>Yarn Workspaces Monorepo support for Create-React-App / React-Scripts.</Text>
        </View>
        <FlexRow>
          <View>
            <CustomButton title={'Favoritar'} onPress={() => console.log('pressed.')} />
          </View>
          <View style={styles.inline}>
            <StarIcon size={17} color={COLORS.star} name='star' />
            <Text style={styles.text}>0</Text>
          </View>
        <View style={styles.inline}>
          <DotIcon size={17} color={COLORS.red} name='dot-fill' />
          <Text style={styles.text}>Typescript</Text>
        </View>
        </FlexRow>
      </Card>
    </Container>

  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTS.interRegular,
    color: COLORS.grayText,
    lineHeight: 15,
    marginLeft: 8
  },
  inline: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Home;

