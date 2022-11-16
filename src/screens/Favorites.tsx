import { StyleSheet, FlatList, View, ActivityIndicator, Text, Image, ListRenderItem } from 'react-native'
import React, { useContext, useState } from 'react'
import { Card, Container, FlexRow, HLine, ImageContainer } from '../styles';
import { IRepos, IReposProps } from '../redux/interfaces'
import { Store } from '../redux/store'
import { getRepos, toggleFavAction } from '../redux/actions';
import { COLORS } from '../constants'
import { FONTS, SHADOWS } from '../constants/theme'
import CustomButton from '../components/button.component';
import StarIcon from 'react-native-vector-icons/Entypo';
import DotIcon from 'react-native-vector-icons/Octicons';


const Favorites = (): JSX.Element => {
  const { state, dispatch } = useContext(Store);
  const [isLoading, setIsLoading] = useState(false);



  const props: IReposProps = {
    repos: state.repos,
    store: { state, dispatch },
    toggleFavAction,
    favorites: state.favorites,
    showLoading: state.showLoading
  }
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
            <CustomButton title={'Desfavoritar'} onPress={() => toggleFavAction(state, dispatch, item)} />
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
      {state.favorites.length === 0 ?
        (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} >
            <Text style={styles.text}>
              Adicione repositórios para sua lista de favoritos.
            </Text>
          </View>
        ) :
        (
          <FlatList
            data={state.favorites}
            renderItem={renderItem}
            keyExtractor={(item: IRepos | any) => item.id}
            bounces={false}
            showsVerticalScrollIndicator={false}
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
  }
})

export default Favorites

