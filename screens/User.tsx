import { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

import { THomeParamList } from "../types/paramList/homeParamList";
import { IUser } from "../types/entities/user";

import { globalStyles } from "../globalStyles";

const User = () => {
  const route = useRoute<RouteProp<THomeParamList, "User">>();
  
  const [user, setUser] = useState<IUser | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://jsonplaceholder.typicode.com/users?id=${route.params.userId}`
    )
      .then((res) => res.json())
      .then((data) => setUser(data[0]))
      .finally(() => setIsUserLoading(false));
  }, []);

  if (isUserLoading && !user) {
    return null;
  }

  return (
    <View style={globalStyles.container}>
      <Image
        style={styles.avatar}
        source={{
          uri: `https://robohash.org/${user?.username}?size=300x300&set=set1`,
          // uri: `https://randomuser.me/api/portraits/men/${user?.id}.jpg`,
        }}
      />
      <Text style={styles.name}>{user?.name}</Text>
      <Text style={styles.email}>{user?.email}</Text>
      <Text style={styles.phone}>{user?.phone}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    borderColor: "#cccccc",
    borderWidth: 1.5,
    borderRadius: 75,
    height: 150,
    marginBottom: 16,
    width: 150,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  email: {
    color: "#555555",
    fontSize: 20,
    marginTop: 10,
  },
  phone: {
    color: "#555555",
    fontSize: 20,
    marginTop: 10,
  },
});

export default User;
