import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3, // for Android shadow
    flexDirection: "row",
    alignItems: "center",
  },

  projectInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },

  projectName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },

  projectDescription: {
    fontSize: 14,
    color: "#777777",
    marginTop: 4,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 25,
    backgroundColor: "#E0F7FA",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});

export default styles;
