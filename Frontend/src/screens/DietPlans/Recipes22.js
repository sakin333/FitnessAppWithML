import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import RecipeItem from './RecipeItem';
import CustomizedInput from '../../components/CustomizedInput/CustomizedInput';
import { Picker } from '@react-native-picker/picker'
import Slider from '@react-native-community/slider';
import AddItem from '../../components/addItem/AddItem'

const mealTypeItems = [
  {label: 'Breakfast', value: 'breakfast' },
  {label: 'Brunch', value: 'brunch' },
  {label: 'Lunch/Dinner', value: 'lunch/dinner' },
  {label: 'Snack', value: 'snack' },
]

const healthLabelsItems = [
  {label: 'Select Health Labels', value: '' },
  {label: 'Alcohol-Cocktail', value: 'alcohol-cocktail' },
  {label: 'Alcohol-Free', value: 'alcohol-free' },
  {label: 'Celery-Free', value: 'celery-free' },
  {label: 'Crustcean-Free', value: 'crustacean-free' },
  {label: 'Dairy-Free', value: 'dairy-free' },
  {label: 'Egg-Free', value: 'egg-free' },
  {label: 'Fish-Free', value: 'fish-free' },
  {label: 'Gluten-Free', value: 'gluten-free' },
  {label: 'Keto-Friendly', value: 'keto-friendly' },
  {label: 'Low Sugar', value: 'low-sugar' },
  {label: 'Lupine-Free', value: 'lupine-free' },
  {label: 'Mustard-Free', value: 'mustard-free' },
  {label: 'Peanut-Free', value: 'peanut-free' },
  {label: 'Pork-Free', value: 'pork-free' },
  {label: 'Red-Meat-Free', value: 'red-meat-free' },
  {label: 'Sesame-Free', value: 'sesame-free' },
  {label: 'Soy-Free', value: 'soy-free' },
  {label: 'Sugar-Conscious', value: 'sugar-conscious' },
  {label: 'Vegan', value: 'vegan' },
  {label: 'Vegetarian', value: 'vegetarian' },
  {label: 'Wheat-Free', value: 'wheat-free' },
]

const cuisineTypeItems = [
  {label: 'World', value: 'world'},
  {label: 'American', value: 'american'},
  {label: 'Asian', value: 'asian'},
  {label: 'British', value: 'british'},
  {label: 'Caribbean', value: 'caribbean'},
  {label: 'Central Europe', value: 'central europe'},
  {label: 'Chinese', value: 'chinese'},
  {label: 'Eastern Europe', value: 'eastern europe'},
  {label: 'French', value: 'french'},
  {label: 'Greek', value: 'greek'},
  {label: 'Indian', value: 'indian'},
  {label: 'Italian', value: 'italian'},
  {label: 'Japanese', value: 'japanese'},
  {label: 'Korean', value: 'korean'},
  {label: 'Kosher', value: 'kosher'},
  {label: 'Mediterranean', value: 'mediterranean'},
  {label: 'Mexican', value: 'mexican'},
  {label: 'Middle Eastern', value: 'middle eastern'},
  {label: 'Nordic', value: 'nordic'},
  {label: 'South American', value: 'south american'},
  {label: 'South East Asian', value: 'south east asian'},
]

const Recipess = ({calculatedCalorie}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [calories, setCalories] = useState(calculatedCalorie)
  const [minCalories, setMinCalories] = useState(0)
  const [maxCalories, setMaxCalories] = useState(4000)

  const [selectedHealthLabel, setSelectedHealthLabel] = useState([])
  const [selectedMealType, setSelectedMealType] = useState([])
  const [selectedCuisineType, setSelectedCuisineType] = useState([])

  const handleRemove = (type, value) => {
    if (type === 'healthLabel') {
      setSelectedHealthLabel((prevLabels) => prevLabels.filter((label) => label.value !== value));
    } else if (type === 'cuisineType') {
      setSelectedCuisineType((prevTypes) => prevTypes.filter((type) => type.value !== value));
    } else if (type === 'mealType') {
      setSelectedMealType((prevTypes) => prevTypes.filter((type) => type.value !== value))
    }
  };

  const handleHealthLabel = (value) => {
      if(!selectedHealthLabel.some((item) => item.value === value)) {
        setSelectedHealthLabel([
            ...selectedHealthLabel,
            { label: healthLabelsItems.find(item => item.value === value).label , value: value}
        ])
      }
    console.log(value)
  }

  const handleMealType = (value) => {
    if(!selectedMealType.some((item) => item.value === value)) {
      setSelectedMealType([
          ...selectedMealType,
          { label: mealTypeItems.find(item => item.value === value).label, value: value}
      ])
    }
    console.log(value)
  }

  const handleCuisineType = (value) => {
      if(!selectedCuisineType.some((item) => item.value === value)) {
        setSelectedCuisineType([
            ...selectedCuisineType,
            {label: cuisineTypeItems.find(item => item.value === value).label, value: value}
        ])
      }
    console.log(value)
  }

  const handleCaloriesChange = (value) => {
    let minCaloriesValue = value-200
    let maxCaloriesValue = value+200
    setCalories(value)
    setMinCalories(minCaloriesValue)
    setMaxCalories(maxCaloriesValue)
  }

  const renderPickerItems = (items) =>
  items.map((item) => (
    <Picker.Item label={item.label} value={item.value} key={item.value} />
  ));

  const fetchRecipes = async () => {
    if(!searchQuery) {
      setError(true)
      return false
    } else {
      try {
          setLoading(true)

          const appId = '39810eb9';
          const appKey = 'e3fe97a525230ea92f5324613bf0f2d0';

          // const trimmedMealType = selectedMealType.trim()
          console.log(selectedHealthLabel)
          console.log(selectedCuisineType)
          let queryParams
          if(selectedHealthLabel.length===0 && selectedCuisineType.length===0 && selectedMealType===0) {
            console.log('inside if')
            queryParams = `type=public&q=${encodeURIComponent(searchQuery)}&app_id=${appId}&app_key=${appKey}&calories=${minCalories}-${maxCalories}`;      
          }else {
            console.log('inside else')
            queryParams = `type=public&q=${encodeURIComponent(searchQuery)}&app_id=${appId}&app_key=${appKey}&health=${selectedHealthLabel.map(item => item.value).join('&')}&cuisineType=${selectedCuisineType.map(item => item.value).join('&')}&mealType=${selectedMealType.map(item => item.value).join('&')}&calories=${minCalories}-${maxCalories}`;
          }

          let response = await fetch(`https://api.edamam.com/api/recipes/v2?${queryParams}`)
          
          if(!response.ok) {
              setLoading(false)
              throw new Error('Network response was not ok');
          }

          const data = await response.json();

          setFilteredRecipes(
            data.hits.filter((recipe) => {
              const labelMatch = recipe.recipe.label.toLowerCase().includes(searchQuery.toLowerCase());
              const caloriesMatch = recipe.recipe.calories <= calories 
          
              return labelMatch && caloriesMatch
            })
          );
          
          setSearchQuery('');
          setSelectedHealthLabel([]);
          setSelectedMealType([]);
          setSelectedCuisineType([]);
          setLoading(false)
      } catch (error) {
          setError(true)
          console.error('Error fetching request: ', error);
      } finally {
        setLoading(false)
      }
    }
  }


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
    {!searchQuery && (
      <Text style={{ color: 'red' }}>*Input Food Item</Text>
    )}

    <CustomizedInput value={searchQuery} setValue={(text) => setSearchQuery(text)} placeholder="Search for a food..." />

    {/* {!selectedHealthLabel.length===0 && <AddItem name="Health Label" type={selectedHealthLabel} onRemove={(value) => handleRemove('healthLabel', value)} />} */}
    <AddItem name="Health Label" type={selectedHealthLabel || []} onRemove={(value) => handleRemove('healthLabel', value)} />
    <Picker selectedValue={selectedHealthLabel} onValueChange={handleHealthLabel} style={styles.picker}>
      {renderPickerItems(healthLabelsItems)}
    </Picker>

    <AddItem name="Meal Type" type={selectedMealType || []} onRemove={(value) => handleRemove('mealType', value)} />
    <Picker selectedValue={selectedMealType} onValueChange={handleMealType} style={styles.picker}>
      {renderPickerItems(mealTypeItems)}
    </Picker>

    {/* {!selectedCuisineType.length===0 && <AddItem name="Cuisine Type" type={selectedCuisineType} onRemove={(value) => handleRemove('cuisineType', value)} />} */}
    <AddItem name="Cuisine Type" type={selectedCuisineType || []} onRemove={(value) => handleRemove('cuisineType', value)} />
    <Picker selectedValue={selectedCuisineType} onValueChange={handleCuisineType} style={styles.picker}>
      {renderPickerItems(cuisineTypeItems)}
    </Picker>

    <Text style={styles.label}>Calories: {calories} kcal</Text>
    <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={0}
        maximumValue={5000}
        value={calories}
        step={50}
        onValueChange={handleCaloriesChange}
    />

    <TouchableOpacity style={styles.searchButton} onPress={fetchRecipes}>
      <Text style={styles.searchButtonText}>Search</Text>
    </TouchableOpacity>

    {loading ? (
      <Text style={{ fontSize: 20, color: 'white' }}>Recipes loading...</Text>
    ) : (
      <>
        {!filteredRecipes.length ? (
          <Text style={{ fontSize: 20, color: 'white' }}>No recipes found</Text>
        ) : (
          <FlatList
            data={filteredRecipes}
            keyExtractor={(item) => item.recipe.uri}
            renderItem={({ item }) => (
                <RecipeItem recipe={item.recipe} />
            )}
          />
        )}
      </>
    )}
  </View>
  </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#181818'
    },
    input: {
      marginBottom: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      color: 'white'
    },
    searchButton: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    searchButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    picker: {
      height: 50,
      width: '100%',
      marginBottom: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      backgroundColor: 'white',
      paddingLeft: 10, 
    },
    label: {
      color: 'white',
      marginBottom: 10
    }
});

export default Recipess;
