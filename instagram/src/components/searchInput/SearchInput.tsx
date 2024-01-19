import React from 'react';

import { StyleSheet, TextInput, View } from 'react-native';

import Ionic from 'react-native-vector-icons/Ionicons';

const SearchInput = () => {
  return (
    <View style={styles.container}>
      <Ionic style={styles.searchIcon} name="search" />

      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        placeholderTextColor="#909090"
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    position: 'relative',
  },
  searchIcon: {
    fontSize: 18,
    position: 'absolute',
    left: 25,
    opacity: 0.6,
    zIndex: 1,
  },
  searchInput: {
    width: '94%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    paddingLeft: 40,
    fontSize: 15,
    backgroundColor: '#EBEBEB',
    borderRadius: 10,
  },
});
