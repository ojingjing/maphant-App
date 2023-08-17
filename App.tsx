import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import React, { useEffect, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Spinner from "react-native-loading-spinner-overlay";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider, useSelector } from "react-redux";

import MainScreen from "./src/App/Index";
import Login from "./src/App/Login/Index";
import { ThemeContext } from "./src/App/Style/ThemeContext";
import reduxStore from "./src/storage/reduxStore";
import UIStore from "./src/storage/UIStore";
import UserStorage from "./src/storage/UserStorage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
aimport { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import React, { useEffect, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Spinner from "react-native-loading-spinner-overlay";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider, useSelector } from "react-redux";

import MainScreen from "./src/App/Index";
import Login from "./src/App/Login/Index";
import { ThemeContext } from "./src/App/Style/ThemeContext";
import reduxStore from "./src/storage/reduxStore";
import UIStore from "./src/storage/UIStore";
import UserStorage from "./src/storage/UserStorage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  await Notifications.setNotificationChannelAsync("default", {
    name: "default",
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#FF231F7C",
  });

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
}

const App = () => {
  const isLogged = useSelector(UserStorage.isUserLoggedInSelector);
  const showLoadingOverlay = useSelector(UIStore.isLoadingUIVisibleSelector);
  const isUserDataLoading = useSelector(UserStorage.isUserDataLoadingSelector);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    UserStorage.loadUserDataOnStartUp();

    registerForPushNotificationsAsync().then(token => alert(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      alert(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      // @ts-ignore
      Notifications.removeNotificationSubscription(notificationListener.current);
      // @ts-ignore
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [isUserDataLoading]);

  if (isUserDataLoading) return <Spinner visible={true} textContent={"Loading..."} />;

  return <>{isLogged || isUserDataLoading ? <MainScreen /> : <Login />}</>;
};

const AppWrapper = () => {
  const isDarkModeContext = React.useState(false);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <RootSiblingParent>
          <SafeAreaProvider>
            <Provider store={reduxStore}>
              <NavigationContainer theme={isDarkModeContext[0] ? DarkTheme : DefaultTheme}>
                <ThemeContext.Provider value={isDarkModeContext}>
                  <App />
                </ThemeContext.Provider>
              </NavigationContainer>
            </Provider>
          </SafeAreaProvider>
        </RootSiblingParent>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default AppWrapper;

async function registerForPushNotificationsAsync() {
  await Notifications.setNotificationChannelAsync("default", {
    name: "default",
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#FF231F7C",
  });

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
}

const App = () => {
  const isLogged = useSelector(UserStorage.isUserLoggedInSelector);
  const showLoadingOverlay = useSelector(UIStore.isLoadingUIVisibleSelector);
  const isUserDataLoading = useSelector(UserStorage.isUserDataLoadingSelector);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    UserStorage.loadUserDataOnStartUp();

    registerForPushNotificationsAsync().then(token => alert(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      alert(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      // @ts-ignore
      Notifications.removeNotificationSubscription(notificationListener.current);
      // @ts-ignore
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [isUserDataLoading]);

  if (isUserDataLoading) return <Spinner visible={true} textContent={"Loading..."} />;

  return <>{isLogged || isUserDataLoading ? <MainScreen /> : <Login />}</>;
};

const AppWrapper = () => {
  const isDarkModeContext = React.useState(false);

  return (
<<<<<<<<< Temporary merge branch 1
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <Tab.Navigator>
        <Tab.Screen
          name="홈"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: () => <AntDesign name="home" size={30} color="#5299EB" />,
          }}
        />
        <Tab.Screen
          name="게시판"
          component={BoardListStack}
          options={{
            headerShown: false,
            tabBarIcon: () => <FontAwesome5 name="list-ul" size={30} color="#5299EB" />,
          }}
        />
        {/* <Tab.Screen name="쪽지" component={Mail} options={{ headerShown: false, tabBarIcon: () => <Entypo name="chat" size={30} color="black" /> }} /> */}
        <Tab.Screen
          name="Mail"
          component={Mail}
          options={{
            headerShown: false,
            tabBarIcon: () => <AntDesign name="mail" size={24} color="#5299EB" />,
          }}
        />
        <Tab.Screen
          name="내 정보"
          component={Mypage}
          options={{
            headerShown: false,
            tabBarIcon: () => <Ionicons name="person-outline" size={30} color="#5299EB" />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
||||||||| f1d9158b
    <SafeAreaProvider>
      <RootSiblingParent>
        <Provider store={reduxStore}>
          <NavigationContainer theme={theme}>
            <App />
          </NavigationContainer>
        </Provider>
      </RootSiblingParent>
    </SafeAreaProvider>
=========
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <RootSiblingParent>
          <SafeAreaProvider>
            <Provider store={reduxStore}>
              <NavigationContainer theme={isDarkModeContext[0] ? DarkTheme : DefaultTheme}>
                <ThemeContext.Provider value={isDarkModeContext}>
                  <App />
                </ThemeContext.Provider>
              </NavigationContainer>
            </Provider>
          </SafeAreaProvider>
        </RootSiblingParent>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
>>>>>>>>> Temporary merge branch 2
  );
};

export default AppWrapper;
