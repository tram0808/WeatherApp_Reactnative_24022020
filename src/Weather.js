import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import countryList from '../country';

const img = { uri: "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" };
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
    header: null,


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

  //   async componentDidMount() {
  //     this.setState({isLoading:true})
  //     try {
  //       const response = await fetch(
  //         `http://api.openweathermap.org/data/2.5/forecast?appid=b807789d6524ad85376b5961cc402be8&units=metric&id=${id}`
  //       );
  //       const responseJson = await response.json();
  //       alert(JSON.stringify(responseJson));
  //       if (responseJson) {
  //         this.setState({
  //           list: responseJson.list,
  //           city: responseJson.city,
  //           isLoading: false
  //         });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       this.setState({ isLoading: false });
  //       alert("error");
  //     }
  //   }
  onPressData = (lon, lat) => {
    console.log("dssd" + lon + "lat" + lat)
    this.props.navigation.navigate('Detal', { lon, lat });
    // this.setState({isLoading:true})
    // try {
    //   const response = await fetch(
    //     `http://api.openweathermap.org/data/2.5/forecast?appid=b807789d6524ad85376b5961cc402be8&units=metric&id=${id}`
    //   );
    //   const responseJson = await response.json();
    //   alert(JSON.stringify(responseJson));
    //   if (responseJson) {
    //     this.setState({
    //       list: responseJson.list,
    //       city: responseJson.city,
    //       isLoading: false
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    //   this.setState({ isLoading: false });
    //   alert("error");
    // }
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

    // get list weather
    // return this.state.list.map(item => {
    //   return item.weather.map(it=> {
    //     return (
    //       <View><Text>{it.main}</Text></View>
    //     )
    //   })
    // });
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
            <ScrollView style={styles.listCountry}>
              {this.state.data.map((item) => {
                return (
                  <TouchableOpacity onPress={() => this.onPressData(item.coord.lon, item.coord.lat)}>
                    <Text style={styles.textCountry}>{item.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <View style={{ flex:0.05  }}>

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
    marginTop: 12,
    width: 300,
    height: 30,
  },
  textCountry: {

    fontSize: 25,
    fontWeight: '300'
  },
});
