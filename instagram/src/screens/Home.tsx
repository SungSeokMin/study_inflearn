import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import Stories from '../components/stories/Stories';
import Posts from '../components/posts/Posts';

interface HomeProps {}

const Home = ({}: HomeProps) => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.headerLogoText}>Instagram</Text>
        </View>

        <View style={styles.headerNavigation}>
          <FontAwesome
            name="plus-square-o"
            style={styles.headerNavigationSquare}
          />
          <Feather
            name="navigation"
            style={styles.headerNavigationDirectMessage}
          />
        </View>
      </View>

      <ScrollView>
        <Stories />

        <Posts />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  headerLogoText: {
    fontSize: 25,
    fontWeight: '500',
  },
  headerNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerNavigationSquare: {
    fontSize: 24,
    paddingHorizontal: 15,
  },
  headerNavigationDirectMessage: {
    fontSize: 24,
  },
});
