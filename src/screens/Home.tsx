import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, ListRenderItem } from 'react-native';
import { COLORS, FONTS, SHADOWS, SIZES } from '../constants/theme';
import { Card, Container, FlexRow, HLine, ImageContainer } from '../styles';

import CustomButton from '../components/button.component';
import StarIcon from 'react-native-vector-icons/Entypo';
import DotIcon from 'react-native-vector-icons/Octicons';


import { IRepos, IReposProps } from '../redux/interfaces';

import { getRepos, toggleFavAction, } from '../redux/actions';
import { Store } from '../redux/store';


const Home = () => {
  const { state, dispatch } = useContext(Store);


  useEffect(() => {
    state.repos.length === 0 && getRepos(dispatch)
  }, []);


  const LoadingBar = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size={24} color={COLORS.star} />
    </View>
  )
  const renderItem: ListRenderItem<IRepos> = ({ item }) => {
    return (
      <Card style={SHADOWS.medium} >
        <FlexRow>
          <Text style={{ maxWidth: '75%' }}>{item.full_name}</Text>

          <ImageContainer>
            <Image source={{ uri: item.owner.avatar_url }}
              resizeMode='cover' style={styles.avatar} />
          </ImageContainer>
        </FlexRow>

        <View style={{ width: '100%' }}>
          <HLine />
          <Text style={styles.text}>{item.description ?? '-'}</Text>
        </View>
        <FlexRow>
          <View>
            <CustomButton title={state.favorites.find((fav: IRepos) => fav.id === item.id) ? 'Desfavoritar' : 'Favoritar'} onPress={() => {
              toggleFavAction(state, dispatch, item);
              }} />
          </View>
          <View style={styles.inline}>
            <StarIcon size={17} color={COLORS.star} name='star' />
            <Text style={styles.text}>{item.stargazers_count}</Text>
          </View>
          <View style={styles.inline}>
            <DotIcon size={17} color={COLORS.red} name='dot-fill' />
            <Text style={styles.text}>{item.language ?? '-'}</Text>
          </View>
        </FlexRow>
      </Card>
    )
  }


  return (
    <Container>
      {state.showLoading ?
        <LoadingBar /> :
        <FlatList
          data={state.repos}
          renderItem={renderItem}
          keyExtractor={(item: IRepos | any) => item.id}
          bounces={false}
          showsVerticalScrollIndicator={false}
        />}

    </Container>

  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTS.interRegular,
    color: COLORS.grayText,
    marginLeft: 8
  },
  inline: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: '100%',
    height: '100%',
  }
})

export default Home;

