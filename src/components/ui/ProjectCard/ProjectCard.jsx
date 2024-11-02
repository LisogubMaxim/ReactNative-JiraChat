import { Image, Text, View } from "react-native";
import styles from "./projectCardStyles";
import { SvgUri } from "react-native-svg";

const ProjectCard = ({ name, img }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <SvgUri uri={img} width={48} height={48} style={styles.icon} />
      </View>
      <View style={styles.projectInfo}>
        <Text style={styles.projectName}>{name}</Text>
        {/* <Text style={styles.projectDescription}>Project details or description here</Text> */}
      </View>
    </View>
  );
};

export default ProjectCard;
