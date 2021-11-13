import React, { Component, useState } from "react";
import { Platform, StyleSheet, UIManager, Text, View, SafeAreaView, TouchableHighlight, ActivityIndicator, TextInput, TouchableOpacity, LayoutAnimation, Alert } from "react-native";

import auth, { firebase } from "@react-native-firebase/auth";
import LoginComponent from "./src/LoginComponent";
import SignUpComponent from "./src/SignUpComponent";
import styles from "./src/Styles";

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
      <View style={{ flex: 1 }}>
        {this.state.authenticated ? (
          <View style={styles.containerStyle}>
            <Text style={{ textAlign: "center" }}>email {firebase.auth().currentUser.email} </Text>

            <View style={styles.loginButtonContainerStyle}>
              <TouchableOpacity
                style={styles.loginButtonStyle}
                onPress={async () => {
                  await firebase.auth().signOut();
                }}
              >
                <Text style={styles.loginButtonTextStyle}> Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            {this.state.isLogin ? <LoginComponent /> : <SignUpComponent />}

            <View style={styles.loginButtonContainerStyle}>
              <TouchableOpacity style={styles.loginButtonStyle} onPress={() => this.setState(state => ({ isLogin: !state.isLogin }))}>
                <Text style={styles.loginButtonTextStyle}> {this.state.isLogin ? "New? Create account." : "Already have account? Log In"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const __filterError = error => {
  let message = "";
  let index = error.indexOf("]");
  message = error.substr(index + 1, error.length - 1);

  return message;
};

const __isValidEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};