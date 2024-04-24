// import React, { useState } from 'react';
// import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import * as Camera from 'expo-camera';

// const MultiImagePicker = () => {
//     const [imageUris, setImageUris] = useState<string[]>([]);

//   const pickImages = async () => {
//     const { status } = await Camera.requestCameraPermissionsAsync();
//     if (status !== 'granted') {
//       alert('Sorry, we need camera roll permissions to make this work!');
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       allowsMultipleSelection: true,
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     });

//     if (!result.canceled) {
//       setImageUris(result.assets.map((asset) => asset.uri));
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.button} onPress={pickImages}>
//         <Text style={styles.buttonText}>Pick Images</Text>
//       </TouchableOpacity>
//       {imageUris.length > 0 && (
//         <View style={styles.imageContainer}>
//           {imageUris.map((uri, index) => (
//             <Image key={index} source={{ uri }} style={styles.image} />
//           ))}
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   button: {
//     backgroundColor: '#008CBA',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   imageContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginTop: 10,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     margin: 5,
//   },
// });

// export default MultiImagePicker;

import * as ImagePicker from "expo-image-picker";
import { Button, Image, StyleSheet, View } from "react-native";
type Props = {
  formPostImg: string;
  setFormPostImg: React.Dispatch<React.SetStateAction<string>>;
};
export default function MultiImagePicker({
  formPostImg,
  setFormPostImg,
}: Props) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormPostImg(result.assets[0].uri);
      console.log({ formPostImg: formPostImg });
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Pick an image from camera roll"
        onPress={pickImage}
      />
      {formPostImg && (
        <Image
          source={{ uri: formPostImg }}
          style={styles.image}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
