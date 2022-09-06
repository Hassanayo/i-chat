import ChatListTop from "../../components/ChatListTop/ChatListTop";
import ChatScreen from "../../components/ChatScreen/ChatScreen";
import InputBar from "../../components/InputBar/InputBar";
import TopBar from "../../components/TopBar/TopBar";
import User from "../../components/User/User";
import styles from "./chatApp.module.scss";
import { LayoutWrapper } from "../../components/Layout/Layout";
import { useMessages } from "../../context/MessageContext";
export default function ChatApp() {
  const {users, chat, selectUser, text, sendMessage, setText, messages, setMessages, senderId} = useMessages()
  
  return (
    <LayoutWrapper>
      <div className={styles.chatBody}>
        <div className={styles.leftBar}>
          <ChatListTop />
          {users.map((user, i) => (
            <User key={i} user={user} selectUser={selectUser} />
          ))}
        </div>
        <div className={styles.rightBar}>
          {chat ? (
            <>
              <TopBar chat={chat} />
              <div className={styles.chatArea}>
                <ChatScreen
                  messages={messages}
                  senderId={senderId}
                  receiverId={chat.uid}
                  setMessages={setMessages}
                />
              </div>{" "}
                <InputBar
                  sendMessage={sendMessage}
                  text={text}
                  setText={setText}
                />
            </>
          ) : (
            <p>Select a user to start a conversation</p>
          )}
        </div>
      </div>
    </LayoutWrapper>
  );
}
