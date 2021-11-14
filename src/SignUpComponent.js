import React, { Component, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableHighlight, ActivityIndicator, TextInput, Alert } from "react-native";
import auth, { firebase } from "@react-native-firebase/auth";
import styles, { blue } from "./Styles";

const SignUpComponent = ({ setAuthenticated } ) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");
  const [isValid, setValid] = useState(true);
  const __doSignUp = () => {
    if (!email) {
      setError("Email required *");
      setValid(false);
      return;
    } else if (!password && password.trim() && password.length > 6) {
      setError("Weak password, minimum 5 chars");
      setValid(false);
      return;
    } else if (!__isValidEmail(email)) {
      setError("Invalid Email");
      setValid(false);
      return;
    }

    __doCreateUser(email, password);
  };

  const __doCreateUser = async (email, password) => {
    try {
      let response = await auth().createUserWithEmailAndPassword(email, password);
      if (response && response.user) {
        Alert.alert("Success ✅", "Account created successfully");
        setAuthenticated(true)
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <SafeAreaView style={styles.containerStyle}>
      <View style={{ flex: 0.2 }}>{!!fetching && <ActivityIndicator color={blue} />}</View>
      <View style={styles.headerContainerStyle}>
        <Text style={styles.headerTitleStyle}> Sign Up </Text>
      </View>
      <View style={styles.formContainerStyle}>
        <TextInput
          label={"Email"}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.textInputStyle}
          placeholder="Mail address"
          onChangeText={text => {
            setError;
            setEmail(text);
          }}
          error={isValid}
        />

        <TextInput label={"Password"} secureTextEntry autoCapitalize="none" style={styles.textInputStyle} selectionColor={blue} placeholder="Password" error={isValid} onChangeText={text => setPassword(text)} />
      </View>
      {error ? (
        <View style={styles.errorLabelContainerStyle}>
          <Text style={styles.errorTextStyle}>{error}</Text>
        </View>
      ) : null}
      <View style={styles.signInButtonContainerStyle}>
        <TouchableHighlight style={styles.signInButtonStyle} onPress={__doSignUp} underlayColor={blue}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around"
            }}
          >
            <Text style={styles.signInButtonTextStyle}>Continue</Text>
          </View>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

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

export default SignUpComponent;