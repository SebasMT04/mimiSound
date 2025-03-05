import { Audio } from 'expo-av';
import { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';

const sounds = {
  sound1: require('../../assets/sounds/sound1.mp3'),
  sound2: require('../../assets/sounds/sound2.mp3'),
  sound3: require('../../assets/sounds/sound3.mp3'),
  sound4: require('../../assets/sounds/sound4.mp3'),
};

export default function App() {
  const [sound, setSound] = useState();

  async function playSound(soundFile) {
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync(soundFile);
    setSound(newSound);
    await newSound.playAsync();
  }

  return (
    <View style={styles.container}>
      <Button title="Play Sound 1" onPress={() => playSound(sounds.sound1)} />
      <Button title="Play Sound 2" onPress={() => playSound(sounds.sound2)} />
      <Button title="Play Sound 3" onPress={() => playSound(sounds.sound3)} />
      <Button title="Play Sound 4" onPress={() => playSound(sounds.sound4)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
