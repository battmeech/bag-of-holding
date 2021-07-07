import { Flex, FlexProps, Text } from "@chakra-ui/react";
import React from "react";
import { RiCopperCoinFill } from 'react-icons/ri';

export type CurrencyDenomination = 'gold' | 'silver' | 'copper'

export type CurrencyProps = {
    denomination: CurrencyDenomination,
    value: number
} & FlexProps

const colorMap: {[currency in CurrencyDenomination]: string} = {
    copper: '#c26737',
    silver: "c0c0c0",
    gold: "#D4AF37"
}


export const Currency: React.FC<CurrencyProps> = ({denomination, value, ...flexProps}) => {
    return (
        <Flex {...flexProps} display="flex" alignItems='center'>
            <RiCopperCoinFill color={colorMap[denomination]}/>
            <Text ml={1}>{value}</Text>
        </Flex>
    )
}
