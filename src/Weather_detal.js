//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import {min} from 'react-native-reanimated';
// import { ScrollView } from "react-native-gesture-handler";
// import { Item } from "react-native/Libraries/Components/Picker/Picker";

// create a component
class MyClass extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true, 
      city: {},
       weather: [],
        // hour: [],
        convdataTime:" ",
      };
  }

  async componentDidMount() {
    const id = this.props.navigation.getParam('id');
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?appid=b807789d6524ad85376b5961cc402be8&units=metric&id=${id}`,
      );
      const responseJson = await response.json();
      // alert(JSON.stringify(responseJson));
      if (responseJson) {
        this.setState({
          list: responseJson.list,
          city: responseJson.city,
          isLoading: false,
        });
        // console.log(this.state.city);
      }
    } catch (error) {
      console.log(error);
      this.setState({isLoading: false});
      alert('error');
    }

    const lon = this.state.city.coord.lon;
    const lat = this.state.city.coord.lat;
    console.log(lon);
    console.log(lat);
    try {
      const responseWeather = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3de6162d3745365b168ade2bbe4e1d66`,
      );
      const responseJsonWeather = await responseWeather.json();
      // alert(JSON.stringify(responseJsonWeather));
      if (responseJsonWeather) {
        this.setState({
          weather: responseJsonWeather.weather,
          dt: responseJsonWeather.dt,
          isLoading: false,
        });
        // console.log(this.state.city);
      }
    } catch (error) {
      console.log(error);
      this.setState({isLoading: false});
      alert('error');
    }
  }

  convert = () => {
    // Unixtimestamp
    let unixtimestamp = this.state.dt;
console.log(unixtimestamp);
    // Months array
    let months_arr = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    // Convert timestamp to milliseconds
    let date = new Date(unixtimestamp * 1000);

    // Year
    let year = date.getFullYear();

    // Month
    let month = months_arr[date.getMonth()];

    // Day
    let day = date.getDate();

    // Hours
    let hours = date.getHours();

    // Minutes
    let minutes = '0' + date.getMinutes();

    // Seconds
    let seconds = '0' + date.getSeconds();
    let convdataTim =
    month +
    '-' +
    day +
    '-' +
    year +
    ' ' +
    hours +
    ':' +
    minutes.substr(-2) +
    ':' +
    seconds.substr(-2)
    console.log("hello"+convdataTim)
    // Display date time in MM-dd-yyyy h:m:s format
     this.setState({convdataTime : convdataTim
     });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    }
    // return this.state.list.map(item => {
    //   return (
    //     <View><Text>{item.dt}</Text></View>
    //   )
    // })
    return (
      <View style={styles.Header}>
        <Text style={{fontSize: 30}}>{this.state.city.name}</Text>
        <Text>lat : {this.state.city.coord.lat}</Text>
        <Text>long: {this.state.city.coord.lon}</Text>
        <Text>{"hello"+this.state.convdataTime}</Text>
        <View>
          <View>
            {this.state.weather.map((i) => {
              return <Text>Thoi tiet: {i.main}</Text>;
            })}
          </View>
          <ScrollView style={{width: 300}}>
            {this.state.list.map((item) => {
              return item.weather.map((it) => {
                return (
                  <View>
                    {/* <View>{this.timeStamp(item.dt, it.main)}</View> */}
                    {/* <Text>{item.dt_txt}</Text>
                    <Text>{item.dt_txt.split(' ')[0]}</Text>
                    <Text>{it.main}</Text> */}
                    <View>
                      {/* <Text>{item.dt_txt.split(" ")[0]}</Text> */}
                      {/* {this.DateFunction(item.dt_txt)} */}
                    </View>
                  </View>
                );
              });
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#ffbf00',
  },
  Header: {
    alignItems: 'center',
    // justifyContent: "center",
    backgroundColor: '#ffbf00',
  },
});

//make this component available to the app
export default MyClass;
