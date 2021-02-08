import firebase from "firebase";
import React, { Component } from "react";
import { StyleSheet, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import AppHeader from "../components/AppHeader";
import db from "../config";

export default class NotificationScreen extends Component {
  state = {
    allNotifications: [],
  };
  getNotifications = () => {
    this.allNotifications = db
      .collection("allNotifications")
      .where("targetedUserId", "==", firebase.auth().currentUser.email)
      .where("notificationStatus", "==", "unread")
      .onSnapshot((snapshot) => {
        let allNotifications = [];
        snapshot.forEach((doc) => {
          let data = doc.data();
          data.docId = doc.id;
          allNotifications.push(data);
          this.setState({
            allNotifications: allNotifications,
          });
        });
      });
  };
  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item, index }) => {
    return (
      <ListItem key={index} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.itemName}</ListItem.Title>
          <ListItem.Subtitle>{item.message}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };
  componentDidMount() {
    this.getNotifications();
  }
  componentWillUnmount() {
    this.allNotifications();
  }
  render() {
    return (
      <>
        <AppHeader
          title="Notifications"
          navigation={this.props.navigation}
          removeBell
        />
        <FlatList
          data={this.state.allNotifications}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
