//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image,ScrollView } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
// import { Item } from "react-native/Libraries/Components/Picker/Picker";

// create a component
class MyClass extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, city: {}, weather: [],hour:[] };
  }

  async componentDidMount() {
    const id = this.props.navigation.getParam('id');
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?appid=b807789d6524ad85376b5961cc402be8&units=metric&id=${id}`
      );
      const responseJson = await response.json();
      alert(JSON.stringify(responseJson));
      if (responseJson) {
        this.setState({
          list: responseJson.list,
          city: responseJson.city,
          isLoading: false
        });
      }
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false });
      alert("error");
    }
  }


  
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    }
    return this.state.list.map(item => {
      return (
        <View><Text>{item.dt}</Text></View>
      )
    })
    return (
      <View style={styles.Header}>
        <Text style={{ fontSize: 30 }}>{this.state.city.name}</Text>
        <View>
          <ScrollView style={{ width: 300 }}>
            {this.state.list.map(item => {
              return item.weather.map(it => {
                return (
                  <View>
                    {/* <View>{this.timeStamp(item.dt, it.main)}</View> */}
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

    backgroundColor: "#ffbf00"
  },
  Header: {
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#ffbf00"
  }
});

//make this component available to the app
export default MyClass;
