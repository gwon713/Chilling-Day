import React, { useMemo } from 'react';
import styled from 'styled-components/native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Circle } from 'react-native-svg';
import COLORS from 'constants/colors';
import { Text } from 'react-native';

const Icon = styled.Text`
    font-size: 80px;
`;

interface ProgressCircleProps {
    percent: number;
}

const ProgressCircle = ({ percent }: ProgressCircleProps) => {
    const emoji = useMemo(() => {
        if (percent < 25) {
            return '🌱';
        }

        if (percent < 50) {
            return '🌿';
        }

        if (percent < 75) {
            return '🪴';
        }

        return '🌲';
    }, [percent]);
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
                    <Text>{emoji}</Text>
                </Icon>
            )}
        </AnimatedCircularProgress>
    );
};

export default ProgressCircle;
