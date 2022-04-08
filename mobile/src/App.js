import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from "expo-image-picker";

import logo from "./assets/icon.png";

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);
  async function openImagePickerAsync() {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted) {
      const { uri } = await ImagePicker.launchImageLibraryAsync();

      setSelectedImage(uri);
    } else {
      alert("Permission to access camera roll is required!");
    }
  }
  return (
    <View style={styles.container}>
      <Text style={{color: "red", fontSize: 40}}>seae</Text>
      <View>
        <Text>OOOI eae android</Text>
        {selectedImage ? <Text>Tem img: {selectedImage}</Text> : <Text>Não tem img</Text>}
        {
          selectedImage 
            ? <Image source={{ uri: selectedImage }} style={styles.thumbnail}/> 
            : <Text>Nenhuma imagem selecionada!</Text>
        }
        
      </View>

      <TouchableOpacity
        onPress={openImagePickerAsync}
        style={{ backgroundColor: "blue" }}
      >
        <Text>Clique aqui.</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

function handleClick(event, t, u, x) {
  console.log(event);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  }
});
