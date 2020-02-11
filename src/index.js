import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { GoogleMap } from '@react-google-maps/api';
import Marker from './Marker';
import Polyline from './Polyline';

const GoogleMapContainer = React.memo(props => {
  return <GoogleMap {...props} onLoad={props.handleMapMounted} />;
});

class MapView extends Component {
  state = {
    center: null
  };

  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: props.initialRegion.latitude,
        lng: props.initialRegion.longitude
      }
    };
  }

  handleMapMounted = map => {
    this.map = map;
  };

  onMapReady = () => {
    this.props.onMapReady && this.props.onMapReady();
  };

  animateToRegion(coordinates) {
    this.setState({
      center: { lat: coordinates.latitude, lng: coordinates.longitude }
    });
  }

  onDragEnd = () => {
    const { onRegionChangeComplete } = this.props;
    if (this.map && onRegionChangeComplete) {
      const center = this.map.getCenter();
      onRegionChangeComplete({
        latitude: center.lat(),
        longitude: center.lng()
      });
    }
  };

  render() {
    const {
      region,
      initialRegion,
      onCenterChanged,
      onPress,
      options,
      zoom = 15
    } = this.props;
    const { center } = this.state;
    const style = this.props.style || styles.container;

    const centerProps = region
      ? {
          center: {
            lat: region.latitude,
            lng: region.longitude
          }
        }
      : center
      ? { center }
      : {
          center: {
            lat: initialRegion.latitude,
            lng: initialRegion.longitude
          }
        };

    return (
      <View style={style}>
        <GoogleMapContainer
          {...centerProps}
          handleMapMounted={this.handleMapMounted}
          onTilesLoaded={this.onMapReady}
          mapContainerStyle={{ height: '100%' }}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
          zoom={zoom}
          onCenterChanged={onCenterChanged}
          // onDragStart={onRegionChange}
          onClick={onPress}
          options={options}
        >
          {this.props.children}
        </GoogleMapContainer>
      </View>
    );
  }
}

MapView.Marker = Marker;
MapView.Polyline = Polyline;

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
});

export default MapView;
