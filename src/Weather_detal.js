//import liraries
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  ClippingRectangle,
} from 'react-native';
import getWeatherBackgroundImage from '../index';
import { min } from 'react-native-reanimated';
import moment from 'moment';
// import { ScrollView } from "react-native-gesture-handler";
// import { Item } from "react-native/Libraries/Components/Picker/Picker";

// create a component
const img = { uri: "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" };

class MyClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      city: {},
      weather: [],
      temp: "",
      main: {},
      convdataTime: " ",
      clouds: "",
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
      // alert(JSON.stringify(responseJsonWeather));
      if (responseJsonWeather) {
        responseJsonWeather.weather[0].main === "Clouds" ? this.setState({ clouds: "https://f0.pngfuel.com/png/319/4/weather-sticker-weather-png-clip-art.png"}) : null
        await this.setState({
          dt: responseJsonWeather.dt,
          main: responseJsonWeather.main,
          city: responseJsonWeather.name,
          isLoading: false,
        });
      }
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false });
    }
  };
  getWeather = (main) => {
    console.log("weather la: " + main)
    if (main === "Clouds") {
      // alert(main)
      this.setState({ clouds: "https://f0.pngfuel.com/png/319/4/weather-sticker-weather-png-clip-art.png"});
    }
  }
  render() {
    const { main, isLoading, city, weather } = this.state
    console.log(main)
    console.log(city)
    console.log(weather)
    console.log("a",this.state.clouds)
    if (isLoading) {
      return (
        <ImageBackground style={styles.container} source={img}>
          <View style={{ padding: 20 }}>
            <ActivityIndicator size="large" color="red" />
          </View>
        </ImageBackground>

      );
    }
    return (
      <ImageBackground style={styles.container} source={img}>
        <View style={styles.header}></View>
        <View style={styles.body}>
          <View style={styles.city}>
            <Text style={styles.textCity}>{city}</Text>
          </View >
          <View style={styles.date}>
             <Text style={styles.textDate}>{moment().format('Do MMMM YYYY')}</Text>
          </View>
          <View style={styles.icons}>
            <Text style={styles.textIcons}>Icon nè</Text>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: this.state.clouds, 
              }}
            />
          </View>

          <View style={styles.discription}>{weather.map((item) => {
            return (
              <View>
                <Text style={styles.textDescription}>{item.main}</Text>
                {/* {this.getWeather(item.main)} */}
              </View>
            )
          })}
          </View>
          <View style={styles.temp}>
            <Text style={styles.textTemp}>
              {Math.ceil(main.temp) + "°C"}
            </Text>
          </View>
        </View>
        <View style={styles.footer}></View>
     


      </ImageBackground>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.1,
  },
  body: {
    flex: 0.8,
  },
  city: {
    flex: 0.1,
    alignItems: 'center',
  },
  temp: {
    flex: 0.2,
    alignItems: 'center',

  },
  discription: {
    flex: 0.1,
    alignItems: 'center',
  },
  date: {
    flex: 0.1,
    alignItems: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  icons: {
    flex: 0.2,
    alignItems: 'center',
  },
  textIcons: {

  },
  textCity: {
    fontSize: 40,
    fontWeight: "400",
    fontFamily: 'Cochin',
  },
  textDate: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: 'Cochin',
  },
  textTemp: {
    fontSize: 100,
    fontWeight: 'normal',
    fontFamily: 'Cochin',
  },
  textDescription: {
    fontSize: 30,
    fontWeight: "500"
  },
  footer: {
    flex: 0.1,

  },

});



export default MyClass;
