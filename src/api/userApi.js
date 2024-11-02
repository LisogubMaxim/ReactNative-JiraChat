import axios from "axios";

const getPersonalInformation = async (token) => {
  try {
    const information = await axios.get("https://api.atlassian.com/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    return information.data;
  } catch (error) {
    console.log("Error: " + error);
  }
};

export { getPersonalInformation };
