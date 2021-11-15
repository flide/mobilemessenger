import React from "react";
import { useEffect, useState,useCallback } from "react";
import { StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback, TouchableOpacity, FlatList,SafeAreaView } from "react-native";
import styles, { blue } from "./Styles";
import { GiftedChat } from 'react-native-gifted-chat'
import AWS from 'aws-sdk/dist/aws-sdk-react-native'

// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'ap-southeast-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-southeast-1:445cf4ff-ac82-4e8b-a397-16719d2a0959',
});

let lexRunTime = new AWS.LexRuntime()
let lexBotName = 'mobileMessengerFileUploaderBot'
let lexUserId = 'mobileMessengerFileUploaderBot' + Date.now()
let giftedChatBot = { _id: 2, name: 'React Native', avatar: 'https://placeimg.com/140/140/any', }

export default function BotChatScreen({  } ) {
    const [messages, setMessages] = useState([]);

	let sendToLex = (message) => {
		let params = {
			botAlias: '$LATEST',
			botName: lexBotName,
			inputText: message,
			userId: lexUserId,
		};
		lexRunTime.postText(params, (err, data) => {
			if (err) {
				// TODO SHOW ERROR ON MESSAGES.
				console.log("error posting to lex " + err);
			}
			if (data) {
				showResponse(data.message);
			}
		});
	};

	let showResponse = (lexResponse) => {
		setMessages(previousMessages => GiftedChat.append(previousMessages,
			[
				{
					_id: Math.round(Math.random() * 1000000),
					text: lexResponse,
					createdAt: new Date(),
					user: giftedChatBot,
				},
			]
		));
	};

    useEffect(() => {
        setMessages([
          {
            _id: 1,
            text: 'Hey Hi!!, I am new here but I can help you upload a file if you want',
            createdAt: new Date(),
            user: giftedChatBot,
          },
        ])
      }, [])
      const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
		sendToLex(messages[0].text)
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