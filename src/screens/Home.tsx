import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, ListRenderItem } from 'react-native';
import { COLORS, FONTS, SHADOWS, SIZES } from '../constants/theme';
import { Card, Container, FlexRow, HLine, ImageContainer } from '../styles';

import CustomButton from '../components/button.component';
import StarIcon from 'react-native-vector-icons/Entypo';
import DotIcon from 'react-native-vector-icons/Octicons';
import { api } from '../services/axios';


import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { Dispatch, IRepos, IState } from '../redux/interfaces';

import { getRepos, toggleFavAction } from '../redux/actions';
import { State, AppDispatch } from '../redux/store';


const Item = ({ data }: {data: IRepos}) => {
  
  return (
    <Card style={SHADOWS.medium} >
      <FlexRow>
        <Text style={{ maxWidth: '75%' }}>{data.full_name}</Text>

        <ImageContainer>
          <Image source={{ uri: data.owner.avatar_url }}
            resizeMode='cover' style={styles.avatar} />
        </ImageContainer>
      </FlexRow>

      <View style={{ width: '100%' }}>
        <HLine />
        <Text style={styles.text}>{data.description ?? '-'}</Text>
      </View>
      <FlexRow>
        <View>
          <CustomButton title={'Favoritar'} onPress={() => console.log('pressed.')} />
        </View>
        <View style={styles.inline}>
          <StarIcon size={17} color={COLORS.star} name='star' />
          <Text style={styles.text}>{data.stargazers_count}</Text>
        </View>
        <View style={styles.inline}>
          <DotIcon size={17} color={COLORS.red} name='dot-fill' />
          <Text style={styles.text}>{data.language ?? '-'}</Text>
        </View>
      </FlexRow>
    </Card>
  )
}

const Home = () => {
  //const [repos, setRepos] = useState<IReposProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const useAppDispatch: () => AppDispatch = useDispatch;
  const useAppSelector: TypedUseSelectorHook<State> = useSelector

  const { repos, favorites } = useAppSelector(
    (state: State | any ) => state.reposReducer
  );
  


  const fetchRepos = () => useAppDispatch();
  



   useEffect(() => {
    isMounted.current = true;
    fetchRepos();
    return () => {
      isMounted.current = false;
    }

  }, []) 

   /* const fetchRepos = async () => {
    try {
      setIsLoading(true)
      const url = '/alanhcrdz/repos';
      await api.get(url)
        .then((response) => {
          setRepos(response.data)
        })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }  */


  


  const LoadingBar = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size={24} color={COLORS.star} /> 
    </View>
  )
  const renderItem: ListRenderItem<IRepos> = ({ item }) => <Item data={item} />


  return (
    <Container>
      {isLoading ?
          <LoadingBar /> :
        <FlatList
          data={repos}
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

