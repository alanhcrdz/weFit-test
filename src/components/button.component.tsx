
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { StyledButton } from '../styles';
import StarIcon from 'react-native-vector-icons/Entypo';
import { COLORS, FONTS, SIZES } from '../constants';

interface CustomButtonProps {
    title: string,
    onPress: () => {} | any
}

export default function CustomButton  ({ title, onPress }: CustomButtonProps) {
    return (
        <StyledButton 
        labelStyle={{ fontWeight: '700' }}
        activeOpacity={0.7} 
        onPress={onPress}>
            <StarIcon size={17} color={COLORS.star} name='star' />
            <Text style={ styles.text }>{title}</Text>
        </StyledButton>
    )
};

const styles = StyleSheet.create({
    text: {
        color: COLORS.star,
        fontFamily: FONTS.interMedium,
        fontSize: SIZES.small,
        lineHeight: 15
    }
})


