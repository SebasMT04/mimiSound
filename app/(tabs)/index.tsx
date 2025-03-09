import { Audio } from 'expo-av';
import { useState } from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [sound, setSound] = useState();
  const [sounds, setSounds] = useState([
    { id: '1', file: require('../../assets/sounds/sound1.mp3'), label: 'Sound 1' },
    { id: '2', file: require('../../assets/sounds/sound2.mp3'), label: 'Sound 2' },
    { id: '3', file: require('../../assets/sounds/sound3.mp3'), label: 'Sound 3' },
    { id: '4', file: require('../../assets/sounds/sound4.mp3'), label: 'Sound 4' },
    { id: '5', file: require('../../assets/sounds/sound5.mp3'), label: 'Sound 5' },
    { id: '6', file: require('../../assets/sounds/sound6.mp3'), label: 'Sound 6' },
    { id: '7', file: require('../../assets/sounds/sound7.mp3'), label: 'Sound 7' },
    { id: '8', file: require('../../assets/sounds/sound8.mp3'), label: 'Sound 8' },
    { id: '9', file: require('../../assets/sounds/sound9.mp3'), label: 'Sound 9' },
    { id: '10', file: require('../../assets/sounds/sound10.mp3'), label: 'Sound 10' },
    { id: '11', file: require('../../assets/sounds/sound11.mp3'), label: 'Sound 11' },
    { id: '12', file: require('../../assets/sounds/sound12.mp3'), label: 'Sound 12' },
    { id: '13', file: require('../../assets/sounds/sound13.mp3'), label: 'Sound 13' },
  ]);

  async function playSound(soundFile) {
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync(
      typeof soundFile === 'string' ? { uri: soundFile } : soundFile
    );
    setSound(newSound);
    await newSound.playAsync();
  }

  async function pickAudio() {
    const result = await DocumentPicker.getDocumentAsync({ type: 'audio/*' });
    if (result.canceled) return;

    const newSound = { id: Date.now().toString(), file: result.uri, label: result.name };
    setSounds((prevSounds) => [...prevSounds, newSound]);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={sounds}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.button} onPress={() => playSound(item.file)}>
            <Text style={styles.buttonText}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.uploadButton} onPress={pickAudio}>
        <Text style={styles.buttonText}>Upload Sound</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 20,
  },
  button: {
    backgroundColor: '#6200ea',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: 130,
    elevation: 5,
  },
  uploadButton: {
    backgroundColor: '#03dac6',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 200,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
