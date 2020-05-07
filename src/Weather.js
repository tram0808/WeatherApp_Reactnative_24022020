import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import countryList from '../country';
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

  setSearchText(event) {
    let searchText = event.nativeEvent.text;
    this.setState({text: searchText});
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
  onPressData = (id) => {
    this.props.navigation.navigate('Detal', {id});
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
        <View style={{flex: 1, padding: 20}}>
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
      <View
        style={{
          flex: 1,
          padding: 20,
          alignContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffbf00',
        }}>
        <View style={{flex:0.1}}>
          <TextInput
            placeholder="Please input ...."
            style={{
              width: 380,
              height: 55,
              fontSize: 19,
              borderWidth: 1,
              borderColor: 'black',
              paddingLeft: 10,
            }}
            onChange={this.setSearchText.bind(this)}
          />
        </View>
        <View style={{flex:0.21}}>
          <ScrollView style={{marginTop: 12, width: 300, height: 30}}>
            {this.state.data.map((item) => {
              return (
                <TouchableOpacity onPress={() => this.onPressData(item.id)}>
                  <Text style={{fontSize: 20}}>{item.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View style={{flex:0.69}}>

        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffbf00',
  },
});
