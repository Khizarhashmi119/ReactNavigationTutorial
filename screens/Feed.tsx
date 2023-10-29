import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import { IUser } from "../types/entities/user";
import { THomeParamList } from "../types/paramList/homeParamList";

import { globalStyles } from "../globalStyles";

const Feed = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState(true);
  const [isUsersRefreshing, setIsUsersRefreshing] = useState(false);

  const navigation = useNavigation<NavigationProp<THomeParamList>>();

  const getUsers = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers().finally(() => setIsUsersLoading(false));
  }, []);

  const handlePressUser = (userId: number) =>
    navigation.navigate("User", {
      userId,
    });

  const handleRefresh = () => {
    setIsUsersRefreshing(true);
    getUsers().finally(() => setIsUsersRefreshing(false));
  };

  if (isUsersLoading) {
    return null;
  }

  return (
    <View style={globalStyles.container}>
      <FlatList
        style={styles.usersContainer}
        contentContainerStyle={styles.usersContentContainer}
        keyExtractor={({ id }) => id.toString()}
        data={users}
        onRefresh={handleRefresh}
        renderItem={({ item, index }) => (
          <TouchableWithoutFeedback onPress={() => handlePressUser(item.id)}>
            <View style={styles.userContainer}>
              <Image
                style={styles.avatar}
                source={{
                  uri: `https://robohash.org/${item.username}?size=300x300&set=set1`,
                  // uri: `https://randomuser.me/api/portraits/men/${item.id}.jpg`,
                }}
              />
              <View style={styles.userInfoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.email}>{item.email}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
        refreshing={isUsersRefreshing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  usersContainer: {
    flex: 1,
    width: "100%",
  },
  usersContentContainer: {
    gap: 16,
    padding: 16,
  },
  userContainer: {
    alignItems: "center",
    borderColor: "#cccccc",
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1.5,
    flexDirection: "row",
    overflow: "hidden",
  },
  avatar: {
    height: "100%",
    padding: 16,
    width: "25%",
  },
  userInfoContainer: {
    flex: 1,
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    color: "#555555",
  },
});

export default Feed;
