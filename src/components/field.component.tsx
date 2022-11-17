import Reac, { useContext, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { COLORS, FONTS } from '../constants';
import { Store } from '../redux/store';


interface FieldProps {
  onUpdateUser: () => {}
}

export default function Field ({onUpdateUser}: FieldProps, ) {

  const { user, setUser } = useContext(Store);

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.text}> Alterar usuário selecionado </Text>
      <TextInput 
      autoCapitalize='none' 
      label={'Nome do usuário'}
      placeholder='Nome do usuário' value={user} onChangeText={(text) => setUser(text)} />
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <Button 
      labelStyle={{color: '#1976D2'}}
      onPress={onUpdateUser} 
      mode='text'>Cancelar</Button>
      <Button 
      style={{backgroundColor: '#1976D2', width: 174, borderRadius: 4}}
      onPress={onUpdateUser}
       mode='contained'>Salvar</Button>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  text: {
    fontFamily: FONTS.interRegular,
    color: COLORS.black,
    marginLeft: 6
},

})