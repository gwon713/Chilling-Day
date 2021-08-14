# React Native boilerplate

## Installing dependencies
### Quick start
```
# Install the command line tools
$ npm install --global expo-cli

# Create a new project
$ expo init react-native-boilerplate 
```

Error: Expo Command Not Found
```
echo $PATH
export PATH=$PATH:~/.npm-global/bin
source ~/.bash_profile
```

### TypeScript setting
```
$ npm install typescript --save
$ npm install @types/react @types/react-native @types/expo --save-dev
```

### Styled-Components setting
```
$ npm install --save styled-components
$ npm install --save-dev babel-plugin-styled-components @types/styled-components @types/styled-components-react-native
```

### Babel settting
```
$ npm install metro-react-native-babel-preset
```
```
...
  "presets": ["module:metro-react-native-babel-preset"],
```

## Directory Structure
* assets
* src
    * components
    * screens
    * utils

### Navigation
```
$ npm install @react-navigation/native
$ npm install @react-navigation/stack react-native-gesture-handler
$ npm install @react-navigation/bottom-tabs
$ npm install @react-navigation/material-top-tabs react-native-tab-view react-native-pager-view
```