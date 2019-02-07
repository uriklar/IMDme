import * as React from "react";
import { View, Text } from "react-native";

export interface ActorPageProps {
  navigation: any;
}

export default class ActorPage extends React.Component<ActorPageProps, any> {
  public render() {
    const actorName = this.props.navigation.getParam("name", null);

    if (!actorName) {
      return null;
    }

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "purple" }}>
          {actorName}
        </Text>
      </View>
    );
  }
}
