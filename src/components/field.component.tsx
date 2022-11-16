import Reac, { useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { COLORS, FONTS } from '../constants';


interface FieldProps {}
interface TextProps {}

export default function Field ({}: FieldProps, ) {
  const [text, setText] = useState<TextProps | any>('');

  const bottomSheetRef = useRef(null);

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.text}> Alterar usuário selecionado </Text>
      <TextInput placeholder='Nome do usuário' value={text} onChangeText={() => setText(text)} />
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <Button mode='text'>Cancelar</Button>
      <Button mode='contained'>Salvar</Button>
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