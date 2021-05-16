import React, { useState } from "react";
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

const ChatPanel = ({ currentChannel }) => {
  const firebase = useFirebase();
  const profile = useSelector((state) => state.firebase.profile);
  const currentUserUid = useSelector((state) => state.firebase.auth.uid);

  const [searchTerm, setSearchTerm] = useState("");
  const [content, setContent] = useState("");

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
        ></Comment.Group>
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
        <Button icon>
          <Icon name="add" />
        </Button>

        <Form onSubmit={handleSubmit} style={{ flex: "1" }}>
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
