import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ProgressBarAndroid, ScrollView, Alert, FlatList } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

const WorkoutPlan = () => {
  const navigation = useNavigation()
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentDay, setCurrentDay] = useState(1);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [thisWeekCompleted, setThisWeekCompleted] = useState(false)
  const [todaysWorkoutCompleted, setTodayWorkoutCompleted] = useState(false)
  const [dayCountdown, setDayCountdown] = useState(28)

  const handleDayPress = (week, day) => {
    if (!(week == currentWeek && day == currentDay)) {
      Alert.alert('Incomplete Workout', 'Complete previous days\' workout first.');
    }
    if(week <= currentWeek && day <= currentDay){
      console.warn('navigate to workout')

      setTodayWorkoutCompleted(true)
      isTodaysWorkoutCompleted()

      if(currentDay < 7) {
        setDayCountdown(dayCountdown - 1)
        setCurrentDay(currentDay + 1)
      }else {
        if(currentWeek < 4) {
          if(currentDay === 7 && todaysWorkoutCompleted){
            console.log('completed')
            setDayCountdown(dayCountdown - 1)
            setThisWeekCompleted(true)
          }
          setCurrentDay(1)
          setCurrentWeek(currentWeek + 1)
        }else {
          console.log('all')
          setDayCountdown(dayCountdown - 1)
          setThisWeekCompleted(true)
          areAllTrophiesGold()
        }
      }
    }
  };

  const isTodaysWorkoutCompleted = () => {
    if(todaysWorkoutCompleted && !(progressPercentage >= 100)){
      console.log('inside')
      const newPercentage = progressPercentage + (100 / 27)
      setProgressPercentage(newPercentage)
    }
  }

  const areAllTrophiesGold = () => {
    if(thisWeekCompleted && currentWeek === 4) {
      navigation.navigate('CongratulationScreen')
    }
  }

  const renderDays = (week) => {
    const days = [];
    for (let day = 1; day <= 7; day++) {
      const isCurrentDay = week === currentWeek && day === currentDay;
      const dayStyle = isCurrentDay ? styles.currentDay : null;
      const dayCompletedStyle = (week < currentWeek || (week === currentWeek && day < currentDay)) ? styles.currentDayCompleted : null
      // console.log('day',day)
      days.push(
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          key={day}
          style={[styles.dayContainer, dayStyle, dayCompletedStyle]}
          onPress={() => handleDayPress(week, day)}
          activeOpacity={0.8}
          // disabled={week > currentWeek || (week === currentWeek && day > currentDay)}
        >
          <Text style={styles.dayText}>{day}</Text>
        </TouchableOpacity>
        <Entypo name='chevron-right' size={20} color={'white'} style={{paddingHorizontal: 5}}/>
        {day === 7 && <MaterialCommunityIcons name='trophy' size={40} color={(week < currentWeek ) && thisWeekCompleted ? '#e1c564' : '#d3d3d3'} style={{paddingHorizontal: 5}} onPress={areAllTrophiesGold}/>}
        </View>
      );
    }

    return days;
  };

  const renderWeeks = () => {
    const weeks = [];
    for (let week = 1; week <= 4; week++) {
      const weekStyle = week === currentWeek ? styles.currentWeek : null;
      // console.log('week',week)
      weeks.push(
        <View key={week} style={[styles.weekContainer, weekStyle]}>
          <Text style={styles.weekTitle}>Week {week}</Text>
          <View style={styles.daysContainer}>{renderDays(week)}</View>
        </View>
      );
    }

    return weeks;
  };

  return (
    <View style={styles.container}>
        <View style={styles.progressTextContainer}>
            <Text style={styles.progressText}>{Math.max(dayCountdown, 0)} days remaining</Text>
            <Text style={styles.progressText}>{progressPercentage.toPrecision(3)}%</Text>
        </View>
      <ProgressBarAndroid
        styleAttr="Horizontal"
        indeterminate={false}
        progress={progressPercentage / 100}
        style={styles.progressBar}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.weeksContainer}>{renderWeeks()}</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#181818'
  },
  progressTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  progressText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  progressBar: {
    height: 10,
    marginVertical: 10,
  },
  weeksContainer: {
    gap: 10,
    height: '100%'
  },
  weekContainer: {
    height: 160,
    borderColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginBottom: 5,
    borderWidth: 2,
    rowGap: 10
  },
  currentWeek: {
    backgroundColor: '#333',
    borderColor: '#3b71f3'
  },
  weekTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white'
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 10,
    alignItems: 'center',
    paddingLeft: 14
  },
  dayContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  currentDay: {
    borderWidth: 2,
    borderColor: '#3b71f3',
    borderStyle: 'dashed'
  },
  currentDayCompleted: {
    borderStyle: 'solid',
    backgroundColor: '#3b71f3',
    borderColor: '#3b71f3',
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default WorkoutPlan;