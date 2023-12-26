import { View, Text } from 'react-native'
import React from 'react'
import Recipes from './Recipes'
import Recipess from './Recipes22'

const DietPlan = ({ route }) => {

  const result = route.params?.calculatedCalorie

  return (
    <Recipess calculatedCalorie={result} />
  )
}

export default DietPlan