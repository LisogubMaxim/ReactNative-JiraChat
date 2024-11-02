import { useEffect, useRef, useState } from "react";
import styles from "./chatStyles";
import { ScrollView, Text, Image, View, Linking, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { getAllComments } from "../../api/projectApi";
import axios from "axios";

const Chat = () => {
  const access_token = useSelector((state) => state.auth.access_token);
  const cloudId = useSelector((state) => state.auth.cloudId);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [attachmentUris, setAttachmentUris] = useState({});
  const scrollViewRef = useRef(null);

  const fetchAttachment = async (url, token) => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });
      return URL.createObjectURL(response.data);
    } catch (error) {
      console.error("Error fetching attachment:", error);
      return null;
    }
  };

  useEffect(() => {
    if (comments.length > 0) {
      comments.forEach((comment) => {
        comment.attachments.forEach(async (attachment) => {
          if (!attachment.mimeType.startsWith("image/")) return;
          if (!attachmentUris[attachment.content]) {
            const uri = await fetchAttachment(attachment.content, access_token);
            setAttachmentUris((prevUris) => ({
              ...prevUris,
              [attachment.content]: uri,
            }));
          }
        });
      });
    }
  }, [comments, access_token]);

  const fetchComments = async () => {
    if (!access_token) return;

    const data = await getAllComments(cloudId, access_token);
    setComments(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchComments();

    const interval = setInterval(() => {
      fetchComments();
    }, 30000);

    return () => clearInterval(interval);
  }, [access_token]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [comments]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView ref={scrollViewRef}>
      {comments.map((comment, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.title}>IN PROJECT: {comment.projectName}</Text>
          <Text>BY: {comment.userName}</Text>
          <Text>IN CARD: {comment.cardName}</Text>
          <Text>WITH DESCRIPTION: {comment.description}</Text>
          <Text>ADDED COMMENT: {comment.commentText}</Text>
          <Text>ATTACHMENTS:</Text>
          {comment.attachments.map((attachment, idx) => (
            <View key={idx} style={{ marginVertical: 5 }}>
              {attachment.mimeType.startsWith("image/") ? (
                <Image source={{ uri: attachmentUris[attachment.content] }} style={{ width: 100, height: 100, borderRadius: 5 }} />
              ) : (
                <Text style={{ color: "blue" }} onPress={() => Linking.openURL(comment.jiraLink)}>
                  Посилання
                </Text>
              )}
            </View>
          ))}
          <Text style={{ color: "blue" }} onPress={() => Linking.openURL(comment.jiraLink)}>
            Jira link: {comment.jiraLink}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Chat;
