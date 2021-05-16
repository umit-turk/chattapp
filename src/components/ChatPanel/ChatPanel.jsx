import React, { useState, useRef, useEffect } from "react";
import {
  Segment,
  Header,
  Icon,
  Comment,
  Form,
  Input,
  Button,
} from "semantic-ui-react";
import { useFirebase } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useFirebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import Message from "./Message";

const { uuid } = require("uuidv4");

const ChatPanel = ({ currentChannel }) => {
  useFirebaseConnect([
    {
      path: `/messages/${currentChannel.key}`,
      storeAs: "channelMessages",
    },
  ]);
  const firebase = useFirebase();
  const profile = useSelector((state) => state.firebase.profile);
  const currentUserUid = useSelector((state) => state.firebase.auth.uid);
  const channelMessages = useSelector(
    (state) => state.firebase.ordered.channelMessages
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [content, setContent] = useState("");

  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  //scroll ayarı için.Birşey yazdığımız anda otomatik olarak aşşağı iniyor.
  useEffect(() => {
    messagesEndRef.current.scrollIntoView({
      behaviour: "smooth",
      block: "end",
    });
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (content !== "") {
      const message = {
        content,
        timestamp: firebase.database.ServerValue.TIMESTAMP, //bu mesaj server'a kaydolduğu zaman otomatik olarak timestamp olacak
        user: {
          id: currentUserUid,
          name: profile.name,
          avatar: profile.avatar,
        },
      };

      firebase.push(`messages/${currentChannel.key}`, message).then(() => {
        setContent("");
      });
    }
  };

  const uploadMedia = (event) => {
    const file = event.target.files[0];
    if (file) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(`chat/public/${uuid()}.jpg`);

      return fileRef
        .put(file)
        .then((snap) => {
          fileRef.getDownloadURL().then((downloadURL) => {
            sendMediaMessage(downloadURL);
          });
        })
        .catch((err) => {
          console.log("error uploading file", err);
        });
    }
  };

  const sendMediaMessage = (url) => {
    const message = {
      image: url,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: currentUserUid,
        name: profile.name,
        avatar: profile.avatar,
      },
    };
    firebase.push(`messages/${currentChannel.key}`, message).then(() => {
      console.log("Media message sent");
    });
  };
  const filterMessages = () => {
    const regex = new RegExp(searchTerm, "gi");

    const searchResults = [...channelMessages].reduce((acc, message) => {
      if (
        (message.value.content && message.value.content.match(regex)) ||
        (message.value.user && message.value.user.name.match(regex))
      ) {
        acc.push(message);
      }

      return acc;
    }, []);

    return searchResults;
  };

  const renderedMessages =
    searchTerm !== "" ? filterMessages() : channelMessages;

  return (
    <>
      {/* Messages Heade */}
      <Segment clearing>
        <Header as="h3" floated="left">
          <span>
            <Icon name="hashtag" />
            {currentChannel.name}
          </span>
        </Header>

        {/* Search Messages */}
        <Header as="h3" floated="right">
          <Input
            size="mini"
            icon="search"
            name="searchTerm"
            placeholder="Mesajlarda ara..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </Header>
      </Segment>

      {/* Messages */}
      <Segment style={{ position: "fixed", top: 55, bottom: 70, width: "81%" }}>
        <Comment.Group
          style={{ height: "80vh", overflowY: "auto", maxWidth: "100%" }}
        >
          {renderedMessages &&
            renderedMessages.map(({ key, value }) => (
              <Message key={key} message={value} />
            ))}

          <div ref={messagesEndRef}></div>
        </Comment.Group>
      </Segment>
      {/* Send New Message */}
      <Segment
        style={{
          position: "fixed",
          bottom: 0,
          width: "85%",
          display: "flex",
        }}
      >
        <Button icon onClick={() => fileInputRef.current.click()}>
          <Icon name="add" />
          <input
            type="file"
            name="file"
            ref={fileInputRef}
            onChange={uploadMedia}
          />
        </Button>

        <Form onSubmit={handleSubmit} style={{ flex: "1"}}>
          <Input
            fluid
            name="message"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            labelPosition="left"
            placeholder={`#${currentChannel.name} kanalına mesaj gönder `}
          />
        </Form>
      </Segment>
    </>
  );
};

export default ChatPanel;
