import { useEffect, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesome6 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TextInput, TouchableOpacity } from 'react-native';
import {
  requestForegroundPermissionsAsync, // Solicita ao usuário a permissão para utilizar a localização
  getCurrentPositionAsync, // Quando autorizado nos retorna a posição do usuário
  geocodeAsync  // Funções para converter endereço em coordenadas
} from 'expo-location';
import { styles } from './src/styles/styles';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [location, setLocation] = useState(null);
  const [searchAddress, setSearchAddress] = useState('');

  const mapRef = useRef(null);

  // Solicita ao usuário a permissão para acessar a localização
  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();
    // Caso o resultado da variável 'granted' seja true, a posição atual é retonada para a variável 'currentPosition'
    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      const { coords: { latitude, longitude } } = currentPosition;
      setLocation({ latitude, longitude });
      console.log(`LOCALIZAÇÃO ATUAL =>`, currentPosition)
    }
  }

  // O conteúdo deste useEffect é executado automaticamente após a renderização da Screen
  useEffect(() => {
    requestLocationPermissions()
  }, []);

  // Este useEffect é renderizado a cada vez que houver uma mudança de estado no useState location
  useEffect(() => {
    mapRef.current?.animateCamera({
      pitch: 70,
      center: { latitude: location.latitude, longitude: location.longitude }
    })
  }, [location]);

  // Função para converter endereço em coordenadas, recebe o endeço digitado como parâmetro para pesquisa da latitude e longitude
  const searchCoordinates = async (address) => {
    try {
      const result = await geocodeAsync(address); // Função que retorna latid=tude e longitude com base no endereço informado pelo usuário
      // console.log('result', result);
      // Verifica se result e result.length é maior que zero
      if (result && result.length > 0) {
        // Desestruturação de objeto recuperando somente latitude e longitude
        const { latitude, longitude } = result[0];

        // Atualiza a localização no useState 
        setLocation({ latitude, longitude });

        // AnimateCamera é um método do MapView que permite a animação da câmera do mapa movendo-o para o locla pesquisado
        mapRef.current?.animateCamera({
          pitch: 70,
          center: { latitude, longitude }
        })
      } else {
        console.log('Endereço não encontrado');
      }
    } catch (error) {
      console.error('Erro ao converter endereço:', error);
    }
  };

  return (
    <SafeAreaView style={styles.androidSafeArea}>

      {/* // Renderiza o componente caso a variável esteja definida, ou seja, diferente de null. '&&' é um operador lógico utilizado em JavaScript para avaliação condicional. */}
      {
        location &&
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            // latitude e longitude delta refere-se a proximidade com o mapa
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }}
        >
          {/* Adiciona um amrcador ao mapa, informando a posição exata da localização */}
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude
            }}
          />
        </MapView>
      }
      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <TextInput
            style={{ flex: 1 }}
            placeholder="Digite o endereço"
            value={searchAddress}
            onChangeText={(text) => setSearchAddress(text)}
          />
          <TouchableOpacity style={styles.searchButton} onPress={() => searchCoordinates(searchAddress)}>
            <FontAwesome6 name='magnifying-glass' size={26} color='#BDC9DE' />
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style='auto' />
    </SafeAreaView>
  );
}


