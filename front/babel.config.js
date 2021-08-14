module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
        plugins: [
            'babel-plugin-styled-components',
            [
                'module-resolver',
                {
                    alias: {
                        components: './src/components',
                        utils: './src/utils',
                        screens: './src/screens',
                        constants: './src/constants',
                        navigators: './src/navigators',
                    },
                },
            ],
        ],
    };
};
