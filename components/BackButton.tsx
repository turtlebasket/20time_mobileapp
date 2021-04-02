import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import IconButtonTransparent from "./IconButtonTransparent";

export default function BackButton() {
  const navigation = useNavigation();
  return (
    <IconButtonTransparent color={Colors.green1} icon={faArrowLeft} onPress={() => {
      navigation.goBack();
    }}/>
  );
}