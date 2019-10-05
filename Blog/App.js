import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import IndexScreen from './src/screens/IndexScreen';
import {BlogProvider} from './src/context/BlogContext';

const Navigator = createStackNavigator({
Index: IndexScreen
},
{
  initialRouteName: 'Index',
  defaultNavigationOptions: {
    title: 'Blogs'
  }
});

const App = createAppContainer(Navigator);

export default () => {
  return <BlogProvider>
    <App />
    </BlogProvider>;
};