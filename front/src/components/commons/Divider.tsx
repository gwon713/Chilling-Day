import React from 'react';
import styled from 'styled-components/native';

const StyledDivider = styled.View`
    width: 100%;
    height: ${({ height }: { height: number; color: string }) => `${height}px`};
    background-color: ${({ color }: { height: number; color: string }) => color};
`;

interface DividerProps {
    height?: number;
    color?: string;
}

const Divider = ({ height = 1, color = '#EFEFEF' }: DividerProps) => {
    return <StyledDivider height={height} color={color} />;
};

export default Divider;
