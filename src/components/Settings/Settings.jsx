import { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import { clearToken } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import styles from "./settingsStyles";

const Settings = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
        },
        {
          text: "Log Out",
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: "LogIn" }],
            });
            dispatch(clearToken());
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Settings</Text> */}
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;
