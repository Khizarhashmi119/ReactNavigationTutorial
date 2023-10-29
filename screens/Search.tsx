import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { globalStyles } from "../globalStyles";
import { IUser } from "../types/entities/user";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [isUserLoading, setIsUserLoading] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (searchText) {
      timeout = setTimeout(() => {
        setIsUserLoading(true);

        fetch(
          `https://jsonplaceholder.typicode.com/users?q=${encodeURIComponent(
            searchText
          )}`
        )
          .then((res) => res.json())
          .then((data) => setUsers(data))
          .finally(() => setIsUserLoading(false));
      }, 1000);
    } else {
      setUsers([]);
    }

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [searchText]);

  const handlePressSearchScreen = () => Keyboard.dismiss();
  const handleChangeText = (text: string) => setSearchText(text);

  return (
    <TouchableWithoutFeedback onPress={handlePressSearchScreen}>
      <SafeAreaView style={[globalStyles.container, styles.container]}>
        <View style={styles.searchbox}>
          <FontAwesome name="search" size={24} color="#8b8c8d" />
          <TextInput placeholder="Search" onChangeText={handleChangeText} />
        </View>
        {!isUserLoading ? (
          users.length ? (
            <FlatList
              style={styles.usersContainer}
              contentContainerStyle={styles.usersContentContainer}
              keyExtractor={({ id }) => id.toString()}
              data={users}
              renderItem={({ item, index }) => (
                <TouchableWithoutFeedback
                // onPress={() => handlePressUser(item.id)}
                >
                  <View style={styles.userContainer}>
                    <Image
                      style={styles.avatar}
                      source={{
                        uri: `https://robohash.org/${item.username}?size=300x300&set=set1`,
                      }}
                    />
                    <Text style={styles.name}>{item.name}</Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          ) : (
            <View style={styles.noUsersContainer}>
              <Text style={styles.loader}>No users yet.</Text>
            </View>
          )
        ) : (
          <View style={styles.loaderContainer}>
            <Text style={styles.loader}>Loading...</Text>
          </View>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    paddingTop: 16,
  },
  searchbox: {
    backgroundColor: "#eaeaea",
    borderRadius: 4,
    flexDirection: "row",
    gap: 16,
    padding: 10,
    width: "90%",
  },
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
    flexDirection: "row",
  },
  avatar: {
    borderColor: "#cccccc",
    borderWidth: 1.5,
    borderRadius: 20,
    height: 40,
    width: 40,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
  noUsersContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  noUsers: {
    fontSize: 20,
    fontWeight: "700",
  },
  loaderContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  loader: {
    fontSize: 20,
    fontWeight: "700",
  },
});

export default Search;
