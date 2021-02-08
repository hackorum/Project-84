import { createDrawerNavigator } from "react-navigation-drawer";
import { TabNavigator } from "./TabNavigator";
import SettingsScreen from "../screens/SettingsScreen";
import Sidebar from "../components/Sidebar";
import MyBarterScreen from "../screens/MyBarterScreen";
import NotificationScreen from "../screens/NotificationScreen";

export const DrawerNavigator = createDrawerNavigator(
  {
    TabNavigator: {
      screen: TabNavigator,
      navigationOptions: {
        title: "Home",
      },
    },
    Settings: {
      screen: SettingsScreen,
    },
    MyBarters: {
      screen: MyBarterScreen,
      navigationOptions: {
        title: "My Barters",
      },
    },
    Notifications: {
      screen: NotificationScreen,
      navigationOptions: {
        title: "Notifications",
      },
    },
  },
  {
    contentComponent: Sidebar,
  },
  {
    initialRouteName: "Home",
  }
);
