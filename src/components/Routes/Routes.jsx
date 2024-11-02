import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";

import LogInPage from "../../pages/LogInPage";
import HomePage from "../../pages/HomePage";
import ChatPage from "../../pages/ChatPage";
import SettingsPage from "../../pages/SettingsPage";

import HomeSVG from "../../../assets/SVG/TabNavigator/HomeSVG";
import ChatSVG from "../../../assets/SVG/TabNavigator/ChatSVG";
import SettingSVG from "../../../assets/SVG/TabNavigator/SettingSVG";

const Routes = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const HomeTabs = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#FA8A34",
          tabBarInactiveTintColor: "#858C94",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomePage}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => <HomeSVG color={color} isFill={focused} />,
            tabBarLabel: "Home",
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatPage}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => <ChatSVG color={color} isFill={focused} />,
            tabBarLabel: "Chat",
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsPage}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => <SettingSVG color={color} isFill={focused} />,
            tabBarLabel: "Settings",
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <Stack.Navigator initialRouteName={isLoggedIn ? "HomeTab" : "LogIn"}>
          <Stack.Screen name="LogIn" component={LogInPage} options={{ headerShown: false }} />
          <Stack.Screen name="HomeTab" component={HomeTabs} options={{ headerShown: false }} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default Routes;
