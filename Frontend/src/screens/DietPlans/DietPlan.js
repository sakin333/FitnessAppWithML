import { View, Text } from 'react-native'
import React from 'react'
import Recipes from './Recipes'
import Recipess from './Recipes22'

const DietPlan = ({ calculatedCalorie }) => {

  return (
    <Recipess calculatedCalorie={calculatedCalorie} />
  )
}

export default DietPlan