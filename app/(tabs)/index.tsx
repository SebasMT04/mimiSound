import { Audio } from 'expo-av';
import { useState } from 'react';
import { View, Pressable, Text, FlatList, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { MaterialIcons } from '@expo/vector-icons';

const numColumns = 3;
const screenWidth = Dimensions.get('window').width;
const buttonWidth = (screenWidth - 40) / numColumns - 10;

export default function App() {
  const [sound, setSound] = useState();
  const [customSoundCount, setCustomSoundCount] = useState(0);
  const [sounds, setSounds] = useState([
    { id: '1', file: require('../../assets/sounds/sound1.mp3'), label: 'Sound 1', isCustom: false },
    { id: '2', file: require('../../assets/sounds/sound2.mp3'), label: 'Sound 2', isCustom: false },
    { id: '3', file: require('../../assets/sounds/sound3.mp3'), label: 'Sound 3', isCustom: false },
  ]);

  async function playSound(soundFile) {
    if (!soundFile) return;

    if (sound) {
      await sound.unloadAsync();
    }

    const source = typeof soundFile === 'string' ? { uri: soundFile } : soundFile;

    try {
      const { sound: newSound } = await Audio.Sound.createAsync(source);
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error('Error al reproducir el sonido:', error);
    }
  }

  async function pickAudio() {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'audio/*' });

      if (!result || !result.assets || result.assets.length === 0) return;

      const newCustomSoundCount = customSoundCount + 1;

      const newSound = {
        id: Date.now().toString(),
        file: result.assets[0].uri,
        label: `Custom Sound ${newCustomSoundCount}`,
        isCustom: true,
      };

      setSounds((prevSounds) => [...prevSounds, newSound]);
      setCustomSoundCount(newCustomSoundCount);
    } catch (error) {
      console.error('Error al seleccionar el archivo:', error);
    }
  }

  return (
    //<ImageBackground source={require('../../assets/background.jpg')} style={styles.background}>
    //aqui se puede poner una imagen de fondo pero no se cual

      <View style={styles.container}>
        <FlatList
          data={sounds}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [
                styles.button,
                { width: buttonWidth, backgroundColor: item.isCustom ? '#ff9800' : '#4CAF50' },
                pressed && { opacity: 0.7 },
              ]}
              onPress={() => playSound(item.file)}
            >
              <MaterialIcons name="audiotrack" size={24} color="white" />
              <Text style={styles.buttonText}>{item.label}</Text>
            </Pressable>
          )}
        />
        <Pressable style={styles.uploadButton} onPress={pickAudio}>
          <MaterialIcons name="file-upload" size={24} color="white" />
          <Text style={styles.buttonText}>Upload Sound</Text>
        </Pressable>
      </View>
    //</ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    flexDirection: 'row',
    gap: 5,
    paddingHorizontal: 10,
  },
  uploadButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 200,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
