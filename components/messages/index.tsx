import { useEffect, useState } from "react";
// import { InlineErrMsg } from "../components/global/inlineErrMsg";
// import getChatHistoryFn from "../lib/chat/getHistory";
// import { Res4ChatHistory } from "../typesAndInterfaces/chat/res4History";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, Text, View, TextInput } from "react-native";
import getUserIdFn from "../../lib/users/getUserId";
import { RootStackParamList } from "../../types/global/root";
import { ResGetUserId } from "../../types/users/resGetUserId";
import { globalStyles } from "../style/global";

interface Message {
  senderId: number;
  message: string;
  recipientId: string;
}

type Props = NativeStackScreenProps<RootStackParamList, "DynamicChat">;

function DynamicChat({ route }: Props) {
  const { recipient_id } = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  //   const [msgHistory, setMsgHistory] = useState<Res4ChatHistory>();
  const [inputMessage, setInputMessage] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [resUserId, setResUserId] = useState<ResGetUserId>();
  const [errMsg, setErrMsg] = useState("");

  console.log({ recipient_id });

  const websocket = new WebSocket(`ws://fav-work.loca.lt`);

  useEffect(() => {
    getUserIdFn({ setErrMsg })
      .then((res) => {
        setResUserId(res);
        // if (!res) {
        //   throw new Error("Missing recipient_id");
        // }
        // return getChatHistoryFn({
        //   fk_sender_id: resUserId,
        //   fk_recipient_id: Number(recipient_id),
        //   setErrMsg,
        // });
      })
      //   .then((res) => {
      //     setMsgHistory(res);
      //   })
      .catch((error) => {
        setErrMsg(error.message);
      });
  }, [recipient_id]);

  useEffect(() => {
    websocket.onmessage = function (event) {
      console.log({ event });
      const message = JSON.parse(event.data);
      console.log({ message });
      setMessages((prevMessages) => [...prevMessages, message]);
    };
    setWs(websocket);
  }, []);

  const sendMessage = () => {
    console.log({ inputMessage, recipient_id, resUserId });

    if (ws && inputMessage.trim() !== "") {
      if (!resUserId) {
        setErrMsg("Missing user_id");
        return;
      }
      const messageData = {
        senderId: resUserId.user_id,
        message: inputMessage,
        recipientId: recipient_id,
      };
      ws.send(JSON.stringify(messageData));
      setInputMessage("");
    }
  };

  //   const mappedHistory = msgHistory?.result.map((message) => {
  //     return (
  //       <View key={message.id}>
  //         <Text >
  //           {message.message}
  //         </Text>
  //         <hr />
  //       </View>
  //     );
  //   });

  return (
    <View style={globalStyles.mainBox}>
      {/* <h2>Chat with {first_name}</h2> */}
      {/* <View>{mappedHistory}</View> */}
      <View>
        {messages.map((message, index) => (
          <>
            <Text>{message.message}</Text>
          </>
        ))}
      </View>
      <View>
        <TextInput
          onChangeText={setInputMessage}
          placeholder="Type your message..."
          value={inputMessage}
        />
        <Pressable onPress={sendMessage}>
          <Text>Send</Text>
        </Pressable>
      </View>
      {/* {errMsg && <InlineErrMsg errMsg={errMsg} />} */}
    </View>
  );
}

export default DynamicChat;
