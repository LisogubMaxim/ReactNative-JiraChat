import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../../redux/slices/authSlice";

import AsyncStorage from "@react-native-async-storage/async-storage";

import ProjectCard from "../ui/ProjectCard/ProjectCard";

import { getPersonalInformation } from "../../api/userApi";
import { getUserProjects } from "../../api/projectApi";

import styles from "./homeStyles";

const Home = () => {
  //
  const dispatch = useDispatch();
  //

  const [personalInformation, setPersonalInformation] = useState(null);
  const [projects, setProjects] = useState(null);

  const [loading, setLoading] = useState(true);
  const access_token = useSelector((state) => state.auth.access_token);
  const cloudId = useSelector((state) => state.auth.cloudId);

  useEffect(() => {
    // dispatch(clearToken());
    if (!access_token || !cloudId) return;

    const fetch = async () => {
      const information = await getPersonalInformation(access_token);
      setPersonalInformation(information);

      const projectResponse = await getUserProjects(cloudId, access_token);
      setProjects(projectResponse);

      setLoading(false);
    };

    fetch();
  }, [access_token, cloudId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.personalInformation}>
        <Image source={{ uri: personalInformation.picture }} style={styles.profileImage} />
        <Text style={styles.text}>{personalInformation.email}</Text>
        <Text style={styles.text}>{personalInformation.name}</Text>
      </View>
      <View>
        {projects.map((project) => (
          <ProjectCard key={project.key} name={project.name} img={project.avatarUrls["48x48"]} />
        ))}
      </View>
    </View>
  );
};

export default Home;
