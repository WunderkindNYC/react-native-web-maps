import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { withGoogleMap, GoogleMap } from "react-google-maps";
import Marker from "./Marker";
import Polyline from "./Polyline";

const GoogleMapContainer = withGoogleMap(props => (
  <GoogleMap {...props} ref={props.handleMapMounted} />
));

class MapView extends Component {
  state = {
    center: null
  };

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
      onRegionChange,
      onCenterChanged,
      onZoomChanged,
      onPress,
      options,
      onReady,
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
          defaultCenter: {
            lat: initialRegion.latitude,
            lng: initialRegion.longitude
          }
        };

    return (
      <View style={style}>
        <GoogleMapContainer
          onReady={onReady}
          handleMapMounted={this.handleMapMounted}
          onTilesLoaded={this.onMapReady}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
          {...centerProps}
          onDragStart={onRegionChange}
          onIdle={this.onDragEnd}
          onCenterChanged={onCenterChanged}
          onZoomChanged={onZoomChanged}
          zoom={zoom}
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
    height: "100%"
  }
});

export default MapView;
