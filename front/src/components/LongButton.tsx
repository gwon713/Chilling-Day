import COLORS from 'constants/colors';
import styled from 'styled-components/native';


export const LongButtonContainer = styled.TouchableOpacity`
    margin-top: 20px;
    width: 160px;
    height: 44px;
    background-color: white;
    border: 1px solid ${COLORS.MAIN};
    border-radius: 200px;

    display: flex;
    align-items: center;
    justify-content: center;
`;
export const LongButtonText = styled.Text`
    font-weight: 700;
    color: ${COLORS.MAIN};
`;
