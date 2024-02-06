import { View, Text, Image } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'



export default function CustomDrawer(props) {
    return (
        <DrawerContentScrollView {...props}>
            <View style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop:30
            }}>
                <Image
                    source={require('../assets/perfil.png')}
                    style={{ width: 70, height: 70 }}>
                </Image>
                <Text style={{
                    fontSize:18, marginTop:10, marginBottom:35
                }}>Bem vindo</Text>
            </View>

            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )
}