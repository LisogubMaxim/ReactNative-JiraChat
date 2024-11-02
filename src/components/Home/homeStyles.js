import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  personalInformation: {
    alignItems: "center",
    gap: 5,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3, // Для Android
  },

  profileImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },

  text: {
    fontSize: 15,
  },
});

export default styles;
