import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native';

import api from '../../services/api/api';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NovoCliente(){
    return(
        <SafeAreaView>
            <Text>Página para cadastro de clientes</Text>
        </SafeAreaView>
    )
}