//import liraries
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ImageBackground,
} from 'react-native';

import moment from 'moment';


class MyClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      city: {},
      weather: [],
      temp: "",
      main: {},
      clouds: "",
      uri1: ""
    };
  }

  static navigationOptions = {
    header: null,


  };
  async componentDidMount() {
    const lon = this.props.navigation.getParam('lon');
    const lat = this.props.navigation.getParam('lat');

    try {
      const responseWeather = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3de6162d3745365b168ade2bbe4e1d66&units=metric`,
      );
      const responseJsonWeather = await responseWeather.json();
      if (responseJsonWeather) {
        const weatherImage = responseJsonWeather.weather[0].main;
        switch (weatherImage) {
          case "Clear":
            this.setState({ clouds: "https://i.ibb.co/6PHdLRM/sunny-day.png", uri1: "https://i.ibb.co/QpvyPRL/OrangeGB.png" });
            break;
          case "Clouds":
            this.setState({ clouds: "https://i.ibb.co/J52XLWy/overcast-day.png", uri1: "https://i.ibb.co/8BGSBBS/BlueBG.png" });
            break;
          case "Rain":
            this.setState({ clouds: "https://i.ibb.co/PMYScqN/rainy-day.png", uri1: "https://i.ibb.co/ZB4vY3B/grayBG.png" });
            break;
        }
        await this.setState({
          weather: responseJsonWeather.weather,
          dt: responseJsonWeather.dt,
          main: responseJsonWeather.main,
          city: responseJsonWeather.name,
          isLoading: false,
        });
      }
    } catch (error) {
      ß
      console.log(error);
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { main, isLoading, city, weather } = this.state
    console.log(main)
    console.log(city)
    console.log(weather)
    console.log("a", this.state.clouds)
    if (isLoading) {
      return (
        <ImageBackground style={styles.container} source={{ uri: this.state.uri1 }}>
          <View style={{ padding: 40 }}>
            <ActivityIndicator size="large" color="red" />
          </View>
        </ImageBackground>

      );
    }
    return (
      <ImageBackground style={styles.container} source={{ uri: this.state.uri1 }}>
        <View style={styles.header}>
          <View style={styles.city}>
            <Text style={styles.nameCity}>{city}</Text>
          </View >
          <View style={styles.date}>
            <Text style={styles.textDate}>{moment().format('Do MMMM YYYY')}</Text>
          </View>
        </View>
        <View style={styles.body}>

          <View style={styles.imageWeather}>
            <Image
              style={styles.tinyLogo}
              resizeMode="contain"
              source={{
                uri: this.state.clouds,
              }}
            />
          </View>
          <View style={styles.temp}>
            <Text style={styles.textTemp}>
              {Math.ceil(main.temp) + "°C"}
            </Text>
          </View>
        </View>
      </ImageBackground>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  header: {
    flex: 0.4,

    alignItems: "center",
  },
  city: {
    top: 80,
    flex: 0.2,

  },
  date: {
    top: 70,
    flex: 0.2,

  },
  body: {
    top: -250,
    flex: 0.6,
  },

  temp: {
    top: 370,
    alignItems: 'center',

  },
  discription: {
    alignItems: 'center',
  },

  tinyLogo: {
    width: 270,
    height: 270,
  },
  imageWeather: {
    top: 150,
    flex: 0.2,
    alignItems: 'center',
  },
  
  nameCity: {
    fontSize: 40,
    fontWeight: "900",
      color: 'white'
  
  },
  textDate: {
    fontSize: 25,
    fontWeight: "900",
    fontFamily: 'Cochin',
    color: 'white'

  },
  textTemp: {
    fontSize: 50,
    fontWeight: 'normal',
    fontFamily: 'Cochin',
    color: 'white'

  },
  textDescription: {
    fontSize: 30,
    fontWeight: "500"
  },
  });



export default MyClass;
