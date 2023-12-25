import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native';
import React, { useState } from 'react';
import RecipeItem from './RecipeItem';
import CustomizedInput from '../../components/CustomizedInput/CustomizedInput';
import { Picker } from '@react-native-picker/picker'

const mealTypeItems = [
  {label: 'All Meals', value: '' },
  {label: 'Breakfast', value: 'breakfast' },
  {label: 'Brunch', value: 'brunch' },
  {label: 'Lunch/Dinner', value: 'lunch/dinner' },
  {label: 'Snack', value: 'snack' },
]

const healthLabelsItems = [
  {label: 'None', value: '' },
  {label: 'Alcohol-Cocktail', value: 'alcohol-cocktail' },
  {label: 'Alcohol-Free', value: 'alcohol-free' },
  {label: 'Celery-Free', value: '	celery-free' },
  {label: 'Crustcean-Free', value: 'crustacean-free' },
  {label: 'Dairy-Free', value: 'dairy-free' },
  {label: 'Egg-Free', value: 'egg-free' },
  {label: 'Fish-Free', value: 'fish-free' },
  {label: 'Gluten-Free', value: 'gluten-free' },
  {label: 'Keto-Friendly', value: 'keto-friendly' },
  {label: '	Low Sugar', value: 'low-sugar' },
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

const cusineTypeItems = [
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

const Recipes = () => {

  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [selectedHealthLabel, setSelectedHealthLabel] = useState('')
  const [selectedMealType, setSelectedMealType] = useState('')
  const [selectedCusineType, setSelectedCusineType] = useState('')

  const handleHealthLabel = (value) => {
    setSelectedHealthLabel(value)
    console.log(value)
  }

  const handleMealType = (value) => {
    setSelectedMealType(value)
    console.log(value)
  }

  const handleCusineType = (value) => {
    setSelectedCusineType(value)
    console.log(value)
  }

  const fetchRecipes = async () => {
    // if(!searchQuery || !selectedHealthLabel || !selectedMealType || !selectedCusineType) {
    //   setError(true)
    //   return false
    // }else {
      try {
          setLoading(true)
          const appId = '39810eb9';
          const appKey = 'e3fe97a525230ea92f5324613bf0f2d0';

          // const encodedSearchQuery = encodeURIComponent(searchQuery)

          // const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${appId}&app_key=${appKey}&health=${selectedHealthLabel}&mealType=${selectedMealType}&cuisineType=${selectedCusineType}`)
          const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${appId}&app_key=${appKey}`)

          
          if(!response.ok) {
              setLoading(false)
              throw new Error('Network response was not ok');
          }

          const data = await response.json();

          setRecipes(data.hits);

          const filtered = data.hits.filter(recipe => {
              return recipe.recipe.label.toLowerCase().includes(searchQuery.toLowerCase())
          });

          setFilteredRecipes(filtered)
          setSearchQuery('');
          setSelectedHealthLabel('');
          setSelectedMealType('');
          setSelectedCusineType('');
          setLoading(false)
      } catch (error) {
          setLoading(false)
          setError(true)
          console.error('Error fetching request: ', error);
      }
    // }
  }


  return (
    <View style={styles.container}>
      {error && !searchQuery ? (
        <Text style={{color: 'red'}}>
          *Input Food Item
        </Text>
      ) : (
        ''
      )}
      <CustomizedInput
        value={searchQuery}
        setValue={(text) => setSearchQuery(text)}
        placeholder="Search for a food..."
      />

      {error && !selectedHealthLabel ? (
        <Text style={{color: 'red'}}>
          *Select Health Label
        </Text>
      ) : (
        ''
      )}
      <Picker
        selectedValue={selectedHealthLabel}
        onValueChange={handleHealthLabel}
        style={styles.picker}
      >
        {healthLabelsItems.map((item, index) => (
          <Picker.Item label={item.label} value={item.value} key={index} />
        ))}
      </Picker>

      {error && !selectedMealType ? (
        <Text style={{color: 'red'}}>
          *Select Meal Type
        </Text>
      ) : (
        ''
      )}
      <Picker
        selectedValue={selectedMealType}
        onValueChange={handleMealType}
        style={styles.picker}
      >
        {mealTypeItems.map((item, index) => (
          <Picker.Item label={item.label} value={item.value} key={index} />
        ))}
      </Picker>

      {error && !selectedCusineType ? (
        <Text style={{color: 'red'}}>
          *Select Cusine Type
        </Text>
      ) : (
        ''
      )}
      <Picker
        selectedValue={selectedCusineType}
        onValueChange={handleCusineType}
        style={styles.picker}
      >
        {cusineTypeItems.map((item, index) => (
          <Picker.Item label={item.label} value={item.value} key={index} />
        ))}
      </Picker>
      
      <TouchableOpacity style={styles.searchButton} onPress={fetchRecipes}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
      {loading ? <Text style={{fontSize: 20,color: 'white'}}>Recipes loading...</Text> : (
        <>
      {!error && filteredRecipes.length > 0 ? (
        <FlatList 
          data={filteredRecipes}
          keyExtractor={(item) => item.recipe.uri}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <RecipeItem recipe={item.recipe} />
            </TouchableOpacity>
          )}
        />
      ) : <Text style={{fontSize: 20, color: 'white'}}>No such recipes found</Text>}
      </>
    )}
    </View>
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
    }
});

export default Recipes;
