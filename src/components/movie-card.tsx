import * as React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { IMovie } from "../stores/movie-store";
import { ROUTES } from "../constants";

export interface MovieCardProps {
  movie: IMovie;
  navigation: any;
}

export default class MovieCard extends React.PureComponent<
  MovieCardProps,
  any
> {
  public render() {
    const { movie } = this.props;
    return (
      <TouchableOpacity style={styles.card} onPress={this.onMoviePress}>
        <Image source={{ uri: movie.Poster }} style={styles.image} />
        <View style={styles.details}>
          <Text>{movie.Title}</Text>
          <Text>{movie.Year}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  onMoviePress = () =>
    this.props.navigation.navigate(ROUTES.MOVIE, {
      movieId: this.props.movie.imdbID
    });
}

const styles = StyleSheet.create({
  card: {
    height: 200,
    shadowColor: "black",
    shadowOpacity: 0.1,
    backgroundColor: "white",
    marginBottom: 20,
    flexDirection: "row"
  },
  image: {
    flex: 1
  },
  details: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
