import React, { Component, useState } from "react";
import { Platform, StyleSheet, UIManager, Text, View, SafeAreaView, TouchableHighlight, ActivityIndicator, TextInput, TouchableOpacity, LayoutAnimation, Alert } from "react-native";

import auth, { firebase } from "@react-native-firebase/auth";
import LoginHandlerComponent from "./src/LoginHandlerComponent";
import HomeScreen from "./src/HomeScreen";
import styles from "./src/Styles";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();


if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const tag = "FIREBASE";
export default class App extends Component {
  state = {
    isLogin: false,
    authenticated: false
  };
  componentDidMount() {
    this.__isTheUserAuthenticated();
  }

  __isTheUserAuthenticated = () => {
    let user = firebase.auth().currentUser;
    if (user) {
      console.log(tag, user);

      this.setState({ authenticated: true });
    } else {
      this.setState({ authenticated: false });
    }
  };

  render() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={this.state.authenticated ? "Home" : "Login"} screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen
          name="Login"
          component={LoginHandlerComponent}
          />
          <Stack.Screen
				  name="Home"
				  component={HomeScreen}
			    />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

