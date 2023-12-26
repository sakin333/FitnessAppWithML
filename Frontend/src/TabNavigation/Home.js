import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Header from '../components/Header/Header';
import Banner from '../components/Banners/Banner';

import exerciseGradientBanner from '../../assets/gradient1.jpg';
import dietGradientBanner from '../../assets/gradient2.jpg';
import progressGradientBanner from '../../assets/gradient3.jpg';

import exerciseBannerImage from '../../assets/exerciseGirl.png';
import dietBannerImage from '../../assets/diet.png';
import progressBannerImage from '../../assets/progress.png';

const ScreenHeight = Dimensions.get("window").height;

const titles = {
  exercise: 'Explore Workout Programs',
  diet: 'Discover Healthy Eating Plans',
  progress: 'Track Your Fitness Progress',
};

const Home = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Header />
        <View style={styles.banner}>
          <Banner
            imageBackground={exerciseGradientBanner}
            bannerImage={exerciseBannerImage}
            title={titles.exercise}
            type='EXERCISE'
            screenName='InputParameters'
          />
          <Banner
            imageBackground={dietGradientBanner}
            bannerImage={dietBannerImage}
            title={titles.diet}
            type='DIET'
            screenName='MaintainCalorie'
          />
          <Banner
            imageBackground={progressGradientBanner}
            bannerImage={progressBannerImage}
            title={titles.progress}
            type='PROGRESS'
            screenName='ProgressTracking'
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    alignItems: 'center',
    justifyContent: 'center',
    height: ScreenHeight,
  },
  banner: {
    borderWidth: 1,
    paddingHorizontal: 16,
    flex: 1,
    width: '100%',
  },
});

export default Home;
