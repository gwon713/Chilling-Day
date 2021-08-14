import React from 'react';
import { View, Text } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Home({ navigation }) {
    const username = '박상혁';

    return (
        <View>
            <Text>안녕하세요 {username}님</Text>
            <Text>오늘은 칠링데이입니다.</Text>
        </View>
    );
}
