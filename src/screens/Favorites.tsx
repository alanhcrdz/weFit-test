import React, { useContext, useEffect, useState, useCallback } from 'react'
import {
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,
  Text,
  Image,
  ListRenderItem,
  RefreshControl

} from 'react-native'
import { Card, Container, FlexRow, HLine, ImageContainer } from '../styles';
import { IRepos, IState } from '../redux/interfaces'
import { Store } from '../redux/store'
import { getRepos, loadingAction, toggleFavAction } from '../redux/actions';
import { COLORS } from '../constants'
import { FONTS, SHADOWS } from '../constants/theme'
import StarIcon from 'react-native-vector-icons/Entypo';
import DotIcon from 'react-native-vector-icons/Octicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';

const Favorites = ({ navigation }: any): JSX.Element => {
  const { state, } = useContext(Store);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);


  

  useEffect(() => {
    //retrieve
    async function initialize() {
      
        const data = await AsyncStorage.getItem('itemList')
       if (data !== null) {
        const output = JSON.parse(data);
        setFavorites(output);
      }   

    }
    initialize()
  }, [favorites])

  function wait(timeout: number) {
    return new Promise((resolve: any) => setTimeout(resolve, timeout));
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);

  const LoadingBar = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size={24} color={COLORS.star} />
    </View>
  )
  const renderItem: ListRenderItem<IRepos> = ({ item }) => {
    return (
      <Card activeOpacity={0.7}
        onPress={() => navigation.navigate('Details', {
          id: item.id,
          item,
          favorites,
          name: item.name,
          full_name: item.full_name,
          description: item.description,
          language: item.language,
          url: item.html_url,
          login: item.owner?.login,
        })}
        style={SHADOWS.medium} >
        <FlexRow>
          <Text style={{ maxWidth: '75%' }}>{item.owner.login}/<Text style={styles.bold}>{item.name}</Text></Text>

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
      {favorites.length < 1 ?
        (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <Text style={styles.text}>
              Adicione repositórios para sua lista de favoritos.
            </Text>
          </View>
        ) :
        isLoading ? (<LoadingBar />) :
          (
            <FlatList
              data={favorites}
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
  bold: {
    fontFamily: FONTS.interBold,
    fontWeight: '400',
    lineHeight: 15,

    color: '#070707',
  }

})

export default Favorites

