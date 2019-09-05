import React from 'react'
import Svg, { Circle } from 'react-native-svg'

const Brand = props => (
    <Svg {...props} width={120} height={120} fill="none">
        <Circle cx={30} cy={90} r={30} fill="#fff" />
        <Circle cx={59.828} cy={59.829} r={53.314} fill="#D73FDA" />
        <Circle cx={90} cy={30} r={30} fill="#fff" />
    </Svg>
);

export default Brand
