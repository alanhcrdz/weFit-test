import React, { useEffect, useContext, useState, useCallback, memo } from 'react';
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
  const { state, dispatch, user } = useContext(Store);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [storageDataList, setStorageDataList] = useState([]);




  function wait(timeout: number) {
    return new Promise((resolve: any) => setTimeout(resolve, timeout));
  }

  useEffect(() => {
    async function initialize() {
      state.repos.length === 0 && await getRepos(dispatch);

      api.get(`/${user}/repos`).then((response) => {
        setRepos(state.repos);
      })
      setFavorites(state.favorites);
    }
    initialize()
  }, [repos]);


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);



  const saveBookMarks = async (item: Object | any) => {

    // remove item when add to favorites
    function removeValue(value: Object | any, index: number, array: IRepos | any) {

      if (value === item) {
        array.splice(index, 1)
        return true
      }
      return false

    }
    try {
      // @ts-ignore
      storageDataList.push(item);

      const output = JSON.stringify(storageDataList);

      await AsyncStorage.setItem('itemList', output)

    } catch (error) {
      console.log(error)
    } finally {
      // @ts-ignore
      repos.filter(removeValue)

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
            <Text style={{ maxWidth: '75%' }}>{item.owner?.login}/<Text style={styles.bold}>{item.name}</Text></Text>

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
              <CustomButton title={favorites.find((fav: IRepos) => fav.id === item.id) ? 'Desfavoritar' : 'Favoritar'} onPress={() => {
                const isInFav = favorites.find((fav: IRepos) => fav.id === item.id)
                toggleFavAction(state, dispatch, item);
                if (!isInFav) {
                  saveBookMarks(item);
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
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            removeClippedSubviews={true}
            updateCellsBatchingPeriod={100}
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
  bold: {
    fontFamily: FONTS.interBold,
    fontWeight: '400',
    lineHeight: 15,

    color: '#070707',
  }

})

// Exporta????o que permite ter o gesto aplicado
export default memo(Home);

