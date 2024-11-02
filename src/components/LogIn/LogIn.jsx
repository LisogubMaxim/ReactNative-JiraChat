import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as AuthSession from "expo-auth-session";
import { setToken, clearToken, setCloudId } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { CLIENT_ID, CLIENT_SECRET } from "@env";
import { useNavigation } from "@react-navigation/native";

import { getToken, getCloudId } from "../../api/authApi";

import styles from "./logInStyles";

const YOUR_USER_BOUND_VALUE = "sss";

const LogIn = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: [
        "read:me",
        "read:account",
        "read:jira-user",
        "read:jira-work",
        "offline_access",
        "read:issue:jira",
        "read:attachment:jira",
        "read:comment:jira",
      ],
      redirectUri: "myapp://Home",
      usePKCE: false,
      state: YOUR_USER_BOUND_VALUE,
      extraParams: {
        audience: "api.atlassian.com",
        prompt: "consent",
      },
    },
    {
      authorizationEndpoint: "https://auth.atlassian.com/authorize",
    }
  );

  useEffect(() => {
    if (response?.type !== "success") return;
    const fetch = async () => {
      try {
        const { code } = response.params;

        const { access_token, refresh_token } = await getToken(code);
        const cloudId = await getCloudId(access_token);

        dispatch(setToken({ access_token: access_token, refresh_token: refresh_token }));
        dispatch(setCloudId(cloudId));

        navigation.reset({
          index: 0,
          routes: [{ name: "HomeTab" }],
        });
      } catch (error) {
        console.error("Error during authentication:", error);
        dispatch(clearToken());
      }
    };

    fetch();
  }, [response]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (request) {
            promptAsync();
          }
        }}
      >
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogIn;
