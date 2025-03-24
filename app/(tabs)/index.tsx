import { Audio } from 'expo-av';
import { useState } from 'react';
import { View, Pressable, Text, FlatList, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { MaterialIcons } from '@expo/vector-icons';

const numColumns = 5;
const screenWidth = Dimensions.get('window').width;
const buttonWidth = (screenWidth - 100) / numColumns - 10;

export default function App() {
  const [sound, setSound] = useState();
  const [customSoundCount, setCustomSoundCount] = useState(0);
  const [sounds, setSounds] = useState([
    { id: '1', file: require('../../assets/sounds/sound1.mp3'), label: 'Sound 1', isCustom: false },
    { id: '2', file: require('../../assets/sounds/sound2.mp3'), label: 'Sound 2', isCustom: false },
    { id: '3', file: require('../../assets/sounds/sound3.mp3'), label: 'Sound 3', isCustom: false },
    { id: '4', file: require('../../assets/sounds/sound4.mp3'), label: 'Sound 4', isCustom: false },
    { id: '5', file: require('../../assets/sounds/sound5.mp3'), label: 'Sound 5', isCustom: false },
    { id: '6', file: require('../../assets/sounds/sound6.mp3'), label: 'Sound 6', isCustom: false },
    { id: '7', file: require('../../assets/sounds/sound7.mp3'), label: 'Sound 7', isCustom: false },
    { id: '8', file: require('../../assets/sounds/sound8.mp3'), label: 'Sound 8', isCustom: false },
    { id: '9', file: require('../../assets/sounds/sound9.mp3'), label: 'Sound 9', isCustom: false },
    { id: '10', file: require('../../assets/sounds/sound10.mp3'), label: 'Sound 10', isCustom: false },
    { id: '11', file: require('../../assets/sounds/sound11.mp3'), label: 'Sound 11', isCustom: false },
    { id: '12', file: require('../../assets/sounds/sound12.mp3'), label: 'Sound 12', isCustom: false },
    { id: '13', file: require('../../assets/sounds/sound13.mp3'), label: 'Sound 13', isCustom: false },
    { id: '14', file: require('../../assets/sounds/sound14.mp3'), label: 'Sound 14', isCustom: false },
    { id: '15', file: require('../../assets/sounds/sound15.mp3'), label: 'Sound 15', isCustom: false },
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
    //<ImageBackground source={require('../../assets/images/background.jpg')} style={styles.background}>

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
    width: 80, 
    height: 70, 
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    flexDirection: 'column',
    marginHorizontal: 5,
    marginBottom: 10, 
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
    fontSize: 12, 
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});
