import { StyleSheet } from "react-native";
import { Platform } from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    // backgroundColor: '#151c1f',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  searchContainer: {
    position: 'absolute',
    top: Platform.OS === 'android' ? getStatusBarHeight() : 0,
    left: 10,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  searchInput: {
    width:'83%',
    flexDirection:'row',
    height: 40,
    borderColor: '#fff',
    borderRadius:10,
    backgroundColor: 'white',
    elevation: 10,
    padding:5,
    paddingRight:40,
    marginTop:40,
    marginLeft:40
  },
  searchButton: {
    padding: 7,
    position: 'absolute',
    right: 0,
    transform: [{ rotate: '90deg' }], 
  },
})