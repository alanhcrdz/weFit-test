import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, SHADOWS, SIZES } from '../constants/theme';
import { Card, Container, FlexRow, HLine, ImageContainer } from '../styles';

import CustomButton from '../components/button.component';
import StarIcon from 'react-native-vector-icons/Entypo';
import DotIcon from 'react-native-vector-icons/Octicons';
import { api } from '../services/axios';

interface ReposProps {
  id: number,
  full_name: string,
  description: string,
  owner: {
    avatar_url: string,
  },
  stargazers_count: number,
  language: string,
  html_url: string
}




const Home = () => {
  const [repos, setRepos] = useState<ReposProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    isMounted.current = true;
    fetchRepos();
    return () => {
      isMounted.current = false;
    }

  }, [])

  const fetchRepos = async () => {
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
  }


  const renderItem = ({ item }) => {
    return (
      <Card style={SHADOWS.medium} >
        <FlexRow>
          <Text style={{ maxWidth: '75%' }}>{item.owner.login}/
            <Text style={{ fontWeight: '700'}}>{item.name}</Text>
          </Text>
          <ImageContainer>
            <Image source={{ uri: item.owner.avatar_url }}
              resizeMode='cover' style={styles.avatar} />
          </ImageContainer>
        </FlexRow>

        <View style={{ width: '100%' }}>
          <HLine />
          <Text style={styles.text}>{item.description?? '-'}</Text>
        </View>
        <FlexRow>
          <View>
            <CustomButton title={'Favoritar'} onPress={() => console.log('pressed.')} />
          </View>
          <View style={styles.inline}>
            <StarIcon size={17} color={COLORS.star} name='star' />
            <Text style={styles.text}>{item.stargazers_count}</Text>
          </View>
          <View style={styles.inline}>
            <DotIcon size={17} color={COLORS.red} name='dot-fill' />
            <Text style={styles.text}>{item.language?? '-'}</Text>
          </View>
        </FlexRow>
      </Card>
    )
  }



  return (
    <Container>
      {isLoading ?
        <ActivityIndicator size={24} color={COLORS.star} /> :

        <FlatList
          data={repos}
          renderItem={renderItem}
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

