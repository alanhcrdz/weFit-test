import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Container } from '../styles'
import { COLORS, FONTS } from '../constants';
import DotIcon from 'react-native-vector-icons/Octicons';
import LinkIcon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-paper';
import { Store } from '../redux/store';
import { IRepos } from '../redux/interfaces';
import { toggleFavAction, } from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';



// @ts-ignore
const Details = ({ navigation, route }) => {

    const { item, id, full_name, description, language, url, favorites } = route.params;
    const { state, dispatch } = useContext(Store);

    const isBookmarked = favorites.find((fav: IRepos) => fav.id == id)
   
    const removeBookMarks = async (key: IRepos | any) => {
        try {
          await AsyncStorage.removeItem('itemList');
          return true;
        } catch (error) {
          return false;
        }
      }

    return (
        <Container>
            <View>
                <Text style={[styles.title, { marginTop: 16 }]}>{full_name}</Text>
                <Text style={[styles.text, { marginTop: 16 }]}>{description}</Text>

            </View>
            <View style={styles.inline}>
                <DotIcon size={17} color={COLORS.red} name='dot-fill' />
                <Text style={styles.text}>{language}</Text>
            </View>
            <View style={styles.actions}>
                <Button
                    onPress={() => navigation.navigate('WebScreen', {
                        url
                    })}
                    labelStyle={{ color: '#1976D2' }}

                    icon={'link'}
                    mode='text'
                    contentStyle={{ flexDirection: 'row-reverse' }}
                >Ver repositório</Button>
                <Button
                    color={isBookmarked ? 'transparent' : '#FFD02C'}
                    labelStyle={{ color: '#000' }}
                    icon={isBookmarked ? 'star-outline' : 'star'}
                    mode={isBookmarked ? 'outlined' : 'contained'}
                    contentStyle={{
                        flexDirection: 'row-reverse',
                        height: 42,
                        borderWidth: isBookmarked ? 1 : 0,
                        borderRadius: 4,

                    }}
                    onPress={() => {
                        toggleFavAction(state, dispatch, item)
                        removeBookMarks(item);
                          
                    }}
                >{isBookmarked ? 'Desfavoritar' : 'Favoritar'}</Button>
            </View>
        </Container>
    )
}

export default Details

const styles = StyleSheet.create({
    title: {
        fontFamily: FONTS.interRegular,
        color: COLORS.black,
        marginLeft: 6
    },
    text: {
        fontFamily: FONTS.interRegular,
        color: COLORS.grayText,
        marginLeft: 6
    },
    inline: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 16,
    },
    actions: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        flex: 1
    }
})