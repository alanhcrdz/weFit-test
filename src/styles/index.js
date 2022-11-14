import { View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { COLORS } from "../constants";
import { Divider } from 'react-native-paper';

export const Container = styled(View)`
padding: 16px;
flex: 1;
display: flex;
justify-content: flex-start;
background-color: #F6F6F5;
`;

export const Card = styled(View)`
    padding: 12px 16px 12px 16px;
    border-radius: 4px;
    gap: 16px;
    margin-top: 16px;
    max-width: 359px;
    width: 100%;

    height: auto;
    flex-direction: column;

    display: flex;
    align-items: center;
    background-color: #FFFFFF;

`;

export const FlexRow = styled(View)`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
`;

export const HLine = styled(Divider)`
    margin: 23px 0 16px 0;
`;

export const StyledButton = styled(TouchableOpacity)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 8px 10px;

    width: 103px;
    height: 36px;

    background-color: ${COLORS.iceCream}
    border-radius: 4px;
`;

export const ImageContainer = styled(View)`
width: 30px;
height: 30px;
overflow: hidden;
border-radius: 15px
`;



