import { StyleSheet, Text, View } from 'react-native'
import { React, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'

const Search = () => {
  const [searchText, setSearchText] = useState();


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search</Text>

      <TextInput
        placeholder='Search'
        style={styles.search}
        value={searchText} onChangeText={(text) => setSearchText(text)}>

      </TextInput>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: "black",
    marginTop: 7,
    marginLeft: 10,
    padding: 7,
  },
  search: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    color: 'grey',
    margin: 10,
    borderWidth: 1
  }
})