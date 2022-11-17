import React, { useEffect, useContext, useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ListRenderItem,
  RefreshControl,
  Alert
} from 'react-native';
import { COLORS, FONTS, SHADOWS } from '../constants/theme';
import { Card, Container, FlexRow, HLine, ImageContainer } from '../styles';

import CustomButton from '../components/button.component';
import StarIcon from 'react-native-vector-icons/Entypo';
import DotIcon from 'react-native-vector-icons/Octicons';

import { IRepos } from '../redux/interfaces';
import { getRepos, toggleFavAction, } from '../redux/actions';
import { Store } from '../redux/store';
import { api } from '../services/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Home = () => {
  const { state, dispatch, user, setUser } = useContext(Store);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [storageDataList] = useState([]);



  const containerStyle = { backgroundColor: 'white', padding: 20, height: 300 };

  function wait(timeout: number) {
    return new Promise((resolve: any) => setTimeout(resolve, timeout));
  }
   /*  useEffect(() => {
    state.repos.length === 0 && getRepos(dispatch)
  }, []);  */

   const fetchRepos = async () => {
    try {
      setLoading(true);
      await api.get(`/${user}/repos`)
        .then((response) => {
          setRepos(response.data);
        })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  } 
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    fetchRepos();
  }, [setUser]);

  const saveBookMarks = async (item: Object) => {
    try {
      // @ts-ignore
      storageDataList.push(item);

      const output = JSON.stringify(storageDataList);

      await AsyncStorage.setItem('itemList', output)
    } catch (error) {

    }
  }
  const removeBookMarks = async () => {
    try {
      await AsyncStorage.removeItem('itemList')
    } catch (error) {
console.log(error)
    }
  }




  const LoadingBar = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size={24} color={COLORS.star} />
    </View>
  )

  const renderItem: ListRenderItem<IRepos> = ({ item }) => {
    return (
      <>
        <View style={[SHADOWS.medium, styles.card]} >
          <FlexRow>
            <Text style={{ maxWidth: '75%' }}>{item.full_name}</Text>

            <ImageContainer>
              <Image source={{ uri: item.owner?.avatar_url }}
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
                const isInFav = state.favorites.find((fav: IRepos) => fav.id === item.id)
                toggleFavAction(state, dispatch, item);
                if (!isInFav) {
                  saveBookMarks(item);
                } else {
                  removeBookMarks()
                }
               

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
        </View>


      </>


    )
  }




  return (
    <Container>
      {loading ?
        (
          <LoadingBar />
        ) : (
          <FlatList
            data={repos}
            renderItem={renderItem}
            keyExtractor={(item: IRepos | any) => item.id}
            bounces={false}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}

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
  },
  card: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginTop: 16,
    maxWidth: 359,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

})

// Exportação que permite ter o gesto aplicado
export default Home;

