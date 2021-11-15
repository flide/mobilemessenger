import React from "react";
import { useEffect, useState,useCallback } from "react";
import { StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback, TouchableOpacity, FlatList,SafeAreaView } from "react-native";
import styles, { blue } from "./Styles";
import { GiftedChat } from 'react-native-gifted-chat'

export default function BotChatScreen({  } ) {
    const [messages, setMessages] = useState([]);

	useEffect(() => {
		
	}, []);
    useEffect(() => {
        setMessages([
          {
            _id: 1,
            text: 'Hello Bot',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        ])
      }, [])
      const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      }, [])

	return (
		<SafeAreaView style={styles.containerStyle}>
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{_id: 1,}}
    />
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
