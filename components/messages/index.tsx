import { useEffect, useState } from "react";
import getChatHistoryFn from "../../lib/chat/getHistory";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, Text, View, TextInput, StyleSheet } from "react-native";
import getUserIdFn from "../../lib/users/getUserId";
import { RootStackParamList } from "../../types/global/root";
import { ResGetUserId } from "../../types/users/resGetUserId";
import { globalStyles } from "../style/global";
import { Res4ChatHistory } from "../../types/chat/res4History";

interface Message {
  senderId: number;
  message: string;
  recipientId: string;
}

type Props = NativeStackScreenProps<RootStackParamList, "DynamicChat">;

function DynamicChat({ route }: Props) {
  const { recipient_id } = route.params;

  const [messages, setMessages] = useState<Message[]>([]);
  const [msgHistory, setMsgHistory] = useState<Res4ChatHistory>();
  const [inputMessage, setInputMessage] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [resUserId, setResUserId] = useState<ResGetUserId>();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const websocket = new WebSocket(`ws://fav-work.loca.lt`);
    websocket.onmessage = function (event) {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };
    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, []);

  useEffect(() => {
    getUserIdFn({ setErrMsg })
      .then((res) => {
        setResUserId(res);
      })
      .catch((error) => {
        setErrMsg(error.message);
      });
  }, []);

  useEffect(() => {
    if (resUserId) {
      getChatHistoryFn({
        fk_sender_id: resUserId.user_id,
        fk_recipient_id: recipient_id,
        setErrMsg,
      })
        .then((res) => {
          setMsgHistory(res);
        })
        .catch((error) => {
          setErrMsg(error.message);
        });
    }
  }, [resUserId, recipient_id]);

  const sendMessage = () => {
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

  const mappedHistory = msgHistory?.result.map((message) => (
    <View
      key={message.id}
      style={
        message.fk_sender_id === resUserId?.user_id
          ? styles.messageContainerSender
          : styles.messageContainerRecipient
      }
    >
      <Text style={styles.messageText}>{message.message}</Text>
    </View>
  ));

  return (
    <View style={globalStyles.mainBox}>
      {/* TODO: change to flatlist */}
      <View>{mappedHistory}</View>
      <View>
        {/* TODO: change to flatlist */}
        {messages.map((message, index) => (
          <View
            key={index}
            style={
              message.senderId === resUserId?.user_id
                ? styles.messageContainerSender
                : styles.messageContainerRecipient
            }
          >
            <Text style={styles.messageText}>{message.message}</Text>
          </View>
        ))}
      </View>
      <View>
        <TextInput
          onChangeText={setInputMessage}
          placeholder="Type your message..."
          value={inputMessage}
          style={styles.input}
        />
        <Pressable
          onPress={sendMessage}
          style={styles.sendButton}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </Pressable>
      </View>
      {errMsg && <Text style={styles.errorText}>{errMsg}</Text>}
    </View>
  );
}

export default DynamicChat;

const styles = StyleSheet.create({
  messageContainerSender: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
    borderRadius: 10,
    margin: 5,
    padding: 10,
  },
  messageContainerRecipient: {
    alignSelf: "flex-start",
    backgroundColor: "#ECECEC",
    borderRadius: 10,
    margin: 5,
    padding: 10,
  },
  messageText: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    margin: 10,
  },
});
