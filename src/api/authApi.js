import axios from "axios";
import { CLIENT_ID, CLIENT_SECRET } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { setToken, clearToken, setCloudId } from "../redux/slices/authSlice";

const getToken = async (code) => {
  try {
    const token = await axios.post(
      "https://auth.atlassian.com/oauth/token",
      {
        grant_type: "authorization_code",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        redirect_uri: "myapp://Home",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(token.data.refresh_token);

    const { access_token, refresh_token } = token.data;

    return { access_token, refresh_token };
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};

const getCloudId = async (token) => {
  try {
    const response = await axios.get("https://api.atlassian.com/oauth/token/accessible-resources", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    return response.data[0].id;
  } catch (error) {
    console.error("Error fetching cloudId:", error);
  }
};

export { getToken, getCloudId };
