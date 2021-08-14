import React from 'react';
import styled from 'styled-components/native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Circle } from 'react-native-svg';
import COLORS from 'constants/colors';
import { Text } from 'react-native';

const Icon = styled.Text`
    font-size: 80;
`;

interface ProgressCircleProps {
    percent: number;
}

const ProgressCircle = ({ percent }: ProgressCircleProps) => {
    return (
        <AnimatedCircularProgress
            rotation={0}
            size={200}
            width={1}
            fill={percent}
            tintColor={COLORS.MAIN}
            renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="3" fill={COLORS.MAIN} />}>
            {() => (
                <Icon>
                    <Text>🪴</Text>
                </Icon>
            )}
        </AnimatedCircularProgress>
    );
};

export default ProgressCircle;
