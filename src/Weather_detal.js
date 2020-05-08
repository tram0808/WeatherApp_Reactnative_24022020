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
    };
  }

  static navigationOptions = {
    header: null,


  };
  async componentDidMount() {
    const lon = this.props.navigation.getParam('lon');
    const lat = this.props.navigation.getParam('lat');
    // console.log(lon);
    // const id = this.props.navigation.getParam('id');
    // try {
    //   const response = await fetch(
    //     `http://api.openweathermap.org/data/2.5/forecast?appid=b807789d6524ad85376b5961cc402be8&units=metric&id=${id}`,
    //   );
    //   const responseJson = await response.json();
    //   // alert(JSON.stringify(responseJson));
    //   if (responseJson) {
    //     this.setState({
    //       list: responseJson.list,
    //       city: responseJson.city,
    //       isLoading: false,
    //     });
    //     console.log(this.state.city);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   this.setState({isLoading: false});
    //   alert('error');
    // }

    // const lon = this.state.city.coord.lon;
    // const lat = this.state.city.coord.lat;
    // console.log(lon);
    // console.log(lat);
    try {
      const responseWeather = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3de6162d3745365b168ade2bbe4e1d66&units=metric`,
      );
      const responseJsonWeather = await responseWeather.json();
      // alert(JSON.stringify(responseJsonWeather));
      if (responseJsonWeather) {
        this.setState({
          weather: responseJsonWeather.weather,
          dt: responseJsonWeather.dt,
          main: responseJsonWeather.main,
          city: responseJsonWeather.name,
          isLoading: false,
        });

        // console.log("huuj"+this.state.main.temp);
        // console.log(this.state.weather.map((item) => {return item.weather.description}));
      }
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false });
      alert('error');
    }
  };

  render() {
    const { main, isLoading, city, weather } = this.state
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
          {/* <View style={styles.date}>
             <Text style={styles.textDate}>{moment().format('Do MMMM YYYY')}</Text>
          </View> */}
          <View style={styles.icons}>
            <Text style={styles.textIcons}>Icon nè</Text>
          </View>
          <View style={styles.discription}>{weather.map((item) => {
            return (
              <Text style={styles.textDescription}>{item.main}</Text>
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
    flex:0.1,
  },
  body:{
    flex:0.8,
  },
  city: {
    flex:0.1,
    alignItems: 'center',
  },
  temp: {
    flex:0.2,
    alignItems: 'center',

  },
  discription: {
    flex:0.1,
    alignItems: 'center',
  },
  date:{
    flex:0.1,
    alignItems: 'center',
  },
  
  icons:{
    flex:0.2,
    alignItems: 'center',
  },
  textIcons:{
    
  },
  textCity: {
    fontSize: 40,
    fontWeight: "400",
    fontFamily: 'Cochin',
  },
  textDate:{
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
  footer:{
    flex:0.1,

},

});



export default MyClass;
