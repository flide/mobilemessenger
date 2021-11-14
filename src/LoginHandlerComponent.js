import React, { useEffect,useState } from "react";
import { Platform, StyleSheet, UIManager, Text, View, SafeAreaView, TouchableHighlight, ActivityIndicator, TextInput, TouchableOpacity, LayoutAnimation, Alert } from "react-native";

import auth, { firebase } from "@react-native-firebase/auth";
import LoginComponent from "./LoginComponent";
import SignUpComponent from "./SignUpComponent";
import styles from "./Styles";
import HomeScreen from "./HomeScreen";


const tag = "FIREBASE";

const LoginHandlerComponent = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    

    useEffect(() => {
		isTheUserAuthenticated();
	}, []);
    
      const isTheUserAuthenticated = () => {
        let user = firebase.auth().currentUser;
        if (user) {
          console.log(tag, user);
    
          setAuthenticated(true);
        } else {
        setAuthenticated(false);
        }
      };
        return(
        <View style={{ flex: 1 }}>
        {authenticated ? (
          <HomeScreen setAuthenticated={setAuthenticated}></HomeScreen>
        ) : (
          <View style={{ flex: 1 }}>
            {isLogin ? <LoginComponent setAuthenticated={setAuthenticated}/> : <SignUpComponent  setAuthenticated={setAuthenticated}/>}

            <View style={styles.loginButtonContainerStyle}>
              <TouchableOpacity style={styles.loginButtonStyle} onPress={() => setIsLogin(!isLogin)}>
                <Text style={styles.loginButtonTextStyle}> {isLogin ? "New? Create account." : "Already have account? Log In"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
          )

}

export default LoginHandlerComponent;