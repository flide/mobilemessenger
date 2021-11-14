import React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback, TouchableOpacity, FlatList,SafeAreaView } from "react-native";
import styles, { blue } from "./Styles";
import { firebase } from "@react-native-firebase/auth";

export default function HomeScreen({ setAuthenticated } ) {
	const interaction_options = ["Chat with Others", "Chat with Bot"];


	useEffect(() => {
		
	}, []);

	return (
		<SafeAreaView style={styles.containerStyle}>
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={{ flex: 1, height: "100%" }}>
				<Text style={local_styles.heading}>Home Screen
				</Text>
				<View style={{ marginTop: 50 }}>
					<FlatList
						data={interaction_options}
						horizontal={false}
						showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}
						renderItem={({ item }) => {
							return (
								<TouchableOpacity>
									<View style={local_styles.chatButton}>
										<Text style={local_styles.buttonText}>{item}</Text>
									</View>
								</TouchableOpacity>
							);
						}}
						keyExtractor={(item) => item.toString()}
						style={{}}
					/>
				</View>
				<TouchableOpacity style={styles.loginButtonStyle} onPress={async () => {
                  await firebase.auth().signOut();
				  setAuthenticated(false)
                }}>
                <Text style={[styles.loginButtonTextStyle,,{fontSize:20,marginTop:30}]}> Logout </Text>
              </TouchableOpacity>
			</View>
		</TouchableWithoutFeedback>
		</SafeAreaView>
	);
}

const local_styles = StyleSheet.create({
	heading: {
		alignSelf: "center",
		textAlign: "center",
		marginTop: 30,
		fontWeight: "bold",
		fontSize: 30,
	},
	TextInput: {
		alignSelf: "center",
		width: "100%",
		height: 45,
		borderRadius: 10,
		borderColor: "#e4e4e4",
		borderWidth: 1,
		paddingLeft: 10,
		marginTop: 10,
	},
	chatButton: {
		width: "80%",
		padding: 30,
		margin: 20,
		alignSelf: "center",
		borderRadius: 10,
		borderColor: "rgba(57, 129, 233, 0.8)",
		borderWidth: 2,
	},
	buttonText: {
		alignSelf: "center",
		fontSize: 17,
	},
});
