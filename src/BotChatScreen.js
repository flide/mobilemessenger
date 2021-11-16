import React from "react";
import { useEffect, useState,useCallback } from "react";
import { StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback, TouchableOpacity, FlatList,SafeAreaView } from "react-native";
import styles, { blue } from "./Styles";
import { GiftedChat , InputToolbar} from 'react-native-gifted-chat'
import AWS from 'aws-sdk/dist/aws-sdk-react-native'

import S3 from "aws-sdk/clients/s3";
import { Credentials } from "aws-sdk";

import DocumentPicker from 'react-native-document-picker'

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

	const getBlob = async (fileUri) => {
		const resp = await fetch(fileUri);
		const imageBody = await resp.blob();
		return imageBody;
	  };
	const uploadImageOnS3 = async (file) => {
		
		const access = new Credentials({
			accessKeyId: "AKIATSTLY6JRHHYESEF4",
			secretAccessKey: "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",
		  });
		  
		  const s3 = new S3({
			credentials: access,
			region: "eu-west-2", //"us-west-2"
			signatureVersion: "v4",
		  });
		const signedUrlExpireSeconds = 60 * 15;
		const url = await s3.getSignedUrlPromise("putObject", {
			Bucket: "mobilemessengers3",
			Key: file.name,
  			ContentType: file.type,
			Expires: signedUrlExpireSeconds
		  });
		  const imageBody = await getBlob(file.uri);
		  const response = await fetch(url, {
			method: "PUT",
			body: imageBody,
		  });
		  
		  console.log(response)
		  sendToLex("File Sent !!")


	 };


	const chooseImage = async () => {
		try {
			const res = await DocumentPicker.pick({
			  type: [DocumentPicker.types.images,DocumentPicker.types.pdf],
			})
			console.log(
				res
			)
			const file = {
				uri: res[0].uri,
				name: res[0].name,
				type: res[0].type,
			 };
			 uploadImageOnS3(file);
		  } catch (err) {
			if (DocumentPicker.isCancel(err)) {
			  // User cancelled the picker, exit any dialogs or menus and move on
			} else {
			  throw err
			}
		  }
	 };


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
		<View>
			<View style={{height:"90%"}}>
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{_id: 1,}}
			
    	/>
		</View>
		<View style={{ height:"10%", alignContent:"center", justifyContent:"center"}}>
		<TouchableOpacity onPress={() => chooseImage()}>
		<Text style={local_styles.uploadButton}>Upload a Document</Text>
		</TouchableOpacity>
		</View>
		</View>
		</TouchableWithoutFeedback>
		</SafeAreaView>
	);
}

const local_styles = StyleSheet.create({
	uploadButton: {
		padding:10,
		borderRadius: 10,
		borderColor: "rgba(57, 129, 233, 0.8)",
		borderWidth: 2,
		alignContent:"center",
		alignSelf:"center",
		justifyContent:"center"}
});