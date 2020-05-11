import React, { Component } from "react";

import {
  ActivityIndicator,
  Text,
  View,
  TextInput,
  ScrollView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import countryList from '../country';

const img = { uri: "https://i.ibb.co/QpvyPRL/OrangeGB.png" };
export default class FetchExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      list: [],
      city: {},
      country: countryList,
      data: countryList,
      text: '',
    };
  }
  static navigationOptions = {


    title: "Weather",
    headerTitleStyle: {
      fontSize: 30,
      color: "black",
      fontWeight:'700',
    }


  };
  setSearchText(event) {
    let searchText = event.nativeEvent.text;
    this.setState({ text: searchText });
    let data = this.state.country;
    searchText = searchText.trim().toLowerCase();
    data = data.filter((item) => {
      return item.name.toLowerCase().match(searchText);
    });
    this.setState({
      data: data,
    });
  }

  onPressData = (lon, lat) => {
    console.log("dssd" + lon + "lat" + lat)
    this.props.navigation.navigate('Detal', { lon, lat });

  };

  render() {
    console.log(countryList);
    console.log(this.state.list);
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    }


    return (
      <View style={styles.container}>
        <ImageBackground style={styles.container} source={img}>
          <View style={styles.input}>
            <TextInput
              placeholder="Please input ...."
              style={styles.textInput}
              onChange={this.setSearchText.bind(this)}
            />
          </View>
          <View style={{ flex: 0.9, alignItems: 'center', }}>
            <ScrollView style={styles.listCountry} showsVerticalScrollIndicator={false}>
              {this.state.data.map((item) => {
                return (
                  <TouchableOpacity onPress={() => this.onPressData(item.coord.lon, item.coord.lat)}>
                    <Text style={styles.textCountry}>{item.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <View style={{ flex: 0.05 }}>

          </View>
        </ImageBackground>

      </View>

    )


  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
    alignContent: 'center',
  },
  textInput: {
    backgroundColor: "white",
    width: 380,
    height: 55,
    fontSize: 19,
    borderWidth: 1,
    borderColor: 'black',
    paddingLeft: 10,
    borderRadius: 10,
  },
  input: {
    flex: 0.1,
    alignItems: 'center',
    paddingTop: 10,
  },
  listCountry: {
    width: 300,
    height: 30,
  },
  textCountry: {
    color: 'white',
    fontSize: 25,
    fontWeight: '500'
  },
});
