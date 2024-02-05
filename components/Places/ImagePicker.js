import { Alert, Button, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";

export default function ImagePicker() {
  const [cameraPermissionsImformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermission() {
    if (cameraPermissionsImformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionsImformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        `Insufficient Permission`,
        "You need to grant camera permission first"
      );
      return false;
    }
    return true;
  }

  async function takeImageHandeler() {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
      CameraType: "back",
    });
    console.log(image);
  }

  return (
    <View>
      <View></View>

      <Button title="take Image" onPress={takeImageHandeler} />
    </View>
  );
}
