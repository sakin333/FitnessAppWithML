import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from '../screens/Login/Login'
import SignUp from '../screens/Signup/SignUp'
import EmailInput from '../screens/ResetPassword/EmailInput'
import ResetPassword from '../screens/ResetPassword/ResetPassword'
import OTPConfirmation from '../screens/VerifyOTP/OTPConfirmation'
import TabNavigator from '../TabNavigation/TabNavigator'
import WorkoutPrograms from '../screens/WorkoutPrograms/WorkoutPrograms'
import ProgressTracking from '../screens/ProgressTracking/ProgressTracking'
import ConnectedSmartWatchScreen from '../screens/SmartWatchStats/ConnectedSmartWatchScreen'
import InputParameters from '../screens/WorkoutPrograms/InputParameters'
import DietPlan from '../screens/DietPlans/DietPlan'
import SmartWatchDetails from '../screens/SmartWatchStats/SmartWatchDetails'
import StaticWorkout from '../screens/StaticWorkout/StaticWorkout'
import WorkoutHome from '../screens/WorkoutPrograms/WorkoutHome'
import WorkOutScreen from '../screens/WorkoutPrograms/WorkoutScreen'
import FitScreen from '../screens/WorkoutPrograms/FitScreen'
import RestScreen from '../screens/WorkoutPrograms/RestScreen'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name='LoginScreen' component={Login} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='EmailInput' component={EmailInput} />
        <Stack.Screen name='ResetPassword' component={ResetPassword} />
        <Stack.Screen name='OTPConfirmation' component={OTPConfirmation} />
        
        <Stack.Screen name='HomeScreen' component={TabNavigator} />
        <Stack.Screen name='InputParameters' component={InputParameters} />
        <Stack.Screen name='WorkoutPrograms' component={WorkoutPrograms} />
        <Stack.Screen name='DietPlan' component={DietPlan} />
        <Stack.Screen name='ProgressTracking' component={ProgressTracking} />
        <Stack.Screen name='SmartwatchConnected' component={ConnectedSmartWatchScreen} />
        <Stack.Screen name='SmartWatchDetails' component={SmartWatchDetails} />
        {/* <Stack.Screen name='SearchingForDevices' component={SearchingForDevices} /> */}

        <Stack.Screen name='StaticWorkout'  component={StaticWorkout} />
        <Stack.Screen name='WorkoutHome' component={WorkoutHome} />
        <Stack.Screen name='WorkOutScreen' component={WorkOutScreen} />
        <Stack.Screen name='FitScreen' component={FitScreen} />
        <Stack.Screen name='RestScreen' component={RestScreen} />
      </Stack.Navigator>
    )
}

export default StackNavigator

