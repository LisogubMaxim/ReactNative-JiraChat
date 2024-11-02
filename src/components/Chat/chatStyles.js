import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: "#666",
    marginVertical: 2,
  },
  attachmentTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    marginTop: 10,
  },
  imageContainer: {
    marginVertical: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  linkText: {
    color: "#007bff",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});

export default styles;
