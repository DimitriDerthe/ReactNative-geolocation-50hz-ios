/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
/*import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes
} from "react-native-sensors";*/
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';

export default class App extends React.Component {
  state = {
    error: null,
    position: {
        coords: {
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0.0019,
          longitudeDelta: 0.0019
        }
      },
  }
  componentDidMount() {
    Geolocation.watchPosition(info =>  this.setState({position: info}), this.state.error, {enableHighAccuracy: true, maximumAge: 1, timeout: 10000, distanceFilter: 0} );
    
    /*accelerometer.subscribe(({ x, y, z, timestamp }) =>
      alert({ x, y, z, timestamp })
    );*/
    setInterval(() => {
      let now = Date.now()
      let pi = Math.PI
      let Rt = 3964.037911746
      let updateInterval = 0.02
  
      let x = (this.state.position.coords.speed*2.8) * Math.sin(this.state.position.coords.heading*pi/180) * updateInterval / 3600;
      let y = (this.state.position.coords.speed*2.8) * Math.cos(this.state.position.coords.heading*pi/180) * updateInterval / 3600;
  
      let lat = this.state.position.coords.latitude + 180 / pi * y / Rt;
      let lon = this.state.position.coords.longitude + 180 / pi / Math.sin(this.state.position.coords.latitude*pi/180) * x / Rt;
      this.setState({position: {
          coords: {
            latitude: lat,
            longitude: lon,
            heading: this.state.position.coords.heading,
            speed: this.state.position.coords.speed,
            accuracy: this.state.position.coords.accuracy,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          },
          timestamp: Date.now()
        }}
      )
    }, 20);
  }


  render(){
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View>
            <MapView
              style={styles.map}
              region={this.state.position.coords}
            >
              <Marker.Animated
                coordinate={this.state.position.coords}
                image={require('./assets/car-solid.png')}
              />
            </MapView>

          </View>
          <View style={styles.sectionContainer}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>GPS position : {JSON.stringify(this.state.position.timestamp)}</Text>
                <Text style={styles.sectionDescription}>
                  Latitude: {JSON.stringify(this.state.position.coords.latitude.toFixed(10))}
                </Text>
                <Text style={styles.sectionDescription}>
                  Longitude: {JSON.stringify(this.state.position.coords.longitude.toFixed(10))}
                </Text>
                <Text style={styles.sectionDescription}>
                  Cap: {JSON.stringify(this.state.position.coords.heading)} -  Speed: {JSON.stringify(this.state.position.coords.speed*3.6)} Km/h
                </Text>
              </View>
            </View>
        </SafeAreaView>
      </Fragment>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 250,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  map: {
    flex:1,
    height: 500,
    ...StyleSheet.absoluteFillObject,
  },
});