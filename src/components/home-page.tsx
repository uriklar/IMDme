import * as React from "react";
//@ts-ignore
import debounce from "debounce";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { inject, observer } from "mobx-react";
import { IMovieStore } from "../stores/movie-store";
import MovieCard from "./movie-card";

interface HomePageProps {
  movieStore: IMovieStore;
  navigation: any;
}

interface HomePageState {
  query: string;
}

@inject("movieStore")
@observer
export default class HomePage extends React.Component<
  HomePageProps,
  HomePageState
> {
  public render() {
    const { movies, movieIds, error } = this.props.movieStore;
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.query}
          style={styles.input}
          onChangeText={(query: string) => {
            this.setState({ query });
            this.queryChanged(query);
          }}
          placeholder="What should we watch today?"
        />

        <View style={styles.moviesContainer}>
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <ScrollView>
              {movieIds.map((movieId: string) => (
                <MovieCard
                  key={movieId}
                  movie={movies[movieId]}
                  navigation={this.props.navigation}
                />
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    );
  }

  state: HomePageState = {
    query: ""
  };

  queryChanged = debounce((query: string) => {
    this.setState({ query });
    this.props.movieStore.fetchMovies(query);
  }, 250);
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    height: 40,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "white"
  },
  moviesContainer: {
    padding: 20
  },
  errorText: {
    color: "red",
    fontWeight: "bold"
  }
});
