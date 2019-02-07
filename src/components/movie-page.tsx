import * as React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { inject, observer } from "mobx-react";
import { IMovieStore } from "../stores/movie-store";
import { ROUTES } from "../constants";

export interface MoviePageProps {
  movieStore: IMovieStore;
  navigation: any;
}

@inject("movieStore")
@observer
export default class MoviePage extends React.Component<MoviePageProps, any> {
  public render() {
    const id = this.props.navigation.getParam("movieId", null);
    const movie = this.props.movieStore.movies[id];

    if (!movie) {
      return null;
    }

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Title: {movie.Title}</Text>
        <Text>Year: {movie.Year}</Text>

        <View>
          {movie.Director ? (
            <View>
              <Text>Director: {movie.Director}</Text>
              {movie.Actors && (
                <View style={{ marginTop: 20 }}>
                  <Text>Actors:</Text>
                  {movie.Actors.split(",").map(actor => (
                    <TouchableOpacity
                      key={actor}
                      onPress={() =>
                        this.props.navigation.navigate(ROUTES.ACTOR, {
                          name: actor
                        })
                      }
                    >
                      <Text>{actor}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </View>
    );
  }

  state = {
    loading: true
  };

  componentDidMount() {
    const id = this.props.navigation.getParam("movieId", null);

    if (id) {
      this.props.movieStore.fetchMovie(id);
    }
  }
}
