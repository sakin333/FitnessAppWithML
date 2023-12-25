import { View, Text } from 'react-native'
import React from 'react'
import Home from './WorkoutHome'

const WorkoutPrograms = ({ route }) => {

  const result = route.params?.result

  return (
    <View>
      <Text>WorkoutPrograms</Text>
      {/* {result && (
        <View>
          <Text style={{fontSize: 32, textAlign: 'center'}}>Intensity: {result.Intensity}</Text>
        </View>
      )} */}
      <Home />
    </View>
  )
}

export default WorkoutPrograms