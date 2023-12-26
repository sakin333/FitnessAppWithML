import { View, Text, TextInput, StyleSheet, ScrollView, ImageBackground } from 'react-native'
import React, { useState,useEffect } from 'react'

import CustomButton from '../../components/CustomButtons/CustomButton'
import CustomizedInput from '../../components/CustomizedInput/CustomizedInput'

import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const navigation = useNavigation()

useEffect(()=>{
    let data=AsyncStorage.getItem('user');
    if(data){
        navigation.navigate('HomeScreen')
    }
},[])

const onLogInPressed = async() => {
    let result = await fetch("http://192.168.1.67:4000/login", {
        method: "post",
        body: JSON.stringify({email,password}),
        headers: { "Content-Type": "application/json" },
      });
      result = await result.json();
    if(result.success===true){
        await AsyncStorage.setItem('user', JSON.stringify(result.user));
        navigation.navigate('Home')
    }
    else if(result.success===false){
        console.warn(result.error)
    }
    navigation.navigate('HomeScreen')
}

const onSignupPressed = () => {
    navigation.navigate("SignUp")
}

const onForgotPasswordPressed = () => {
    navigation.navigate("EmailInput")
}

  return (
    <ImageBackground source={require('../../../assets/push.jpg')} style={styles.backgroundImage}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
    <View style={styles.root}>
        <Text style={styles.title}>Log-in</Text>
        <CustomizedInput placeholder="Email"  value={email} setValue={setEmail} keyboardType="email-address" />
        <CustomizedInput placeholder="Password"  value={password} setValue={setPassword} secureTextEntry={true} />

        <CustomButton text="Log In" onPress={onLogInPressed} />

        <CustomButton text="Forgot Password?" onPress={onForgotPasswordPressed} type="TERTIARY" />

        <CustomButton text="Don't have an account? Sign Up" onPress={onSignupPressed} type="TERTIARY" />
    </View>
    </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
      },
    root: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 25,
        padding: 20,
        fontWeight: 'bold',
        color: 'white'
    },
})

export default Login