/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import { Provider } from "mobx-react";
import { ROUTES } from "./src/constants";
import { createStackNavigator } from "react-navigation";
import HomePage from "./src/components/home-page";
import MoviePage from "./src/components/movie-page";
import ActorPage from "./src/components/actor-page";
import MovieStore from "./src/stores/movie-store";

type Props = {};

const movieStore = new MovieStore();

const RootStack = createStackNavigator(
  {
    [ROUTES.HOME]: {
      screen: HomePage
    },
    [ROUTES.MOVIE]: {
      screen: MoviePage
    },
    [ROUTES.ACTOR]: {
      screen: ActorPage
    }
  },
  {
    initialRouteName: ROUTES.HOME
  }
);

export default class App extends Component<Props> {
  render() {
    return (
      <Provider movieStore={movieStore}>
        <RootStack />
      </Provider>
    );
  }
}
