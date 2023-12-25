import { View, Text } from 'react-native'
import React from 'react'
import CircularProgress from 'react-native-circular-progress-indicator'

const CircularProgressBar = () => {
  return (
    <View>
      <CircularProgress 
        value={75}
        radius={70}
        duration={1000}
        maxValue={100}
        progressValueColor={'white'}
        activeStrokeColor={'white'}
        activeStrokeWidth={6}
        valueSuffix={'Kcal'}
        valueSuffixStyle={{
          fontSize: 16,
          marginTop: 5,
          paddingHorizontal: 5
        }}
        progressValueStyle={{
          fontSize: 30
        }}
      />
    </View>
  )
}

export default CircularProgressBar