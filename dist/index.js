Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='src/index.js';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactNative=require('react-native');var _reactGoogleMaps=require('react-google-maps');var _Marker=require('./Marker');var _Marker2=_interopRequireDefault(_Marker);var _Polyline=require('./Polyline');var _Polyline2=_interopRequireDefault(_Polyline);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var GoogleMapContainer=(0,_reactGoogleMaps.withGoogleMap)(function(props){return _react2.default.createElement(_reactGoogleMaps.GoogleMap,_extends({},props,{ref:props.handleMapMounted,__source:{fileName:_jsxFileName,lineNumber:8}}));});var MapView=function(_Component){_inherits(MapView,_Component);function MapView(){var _ref;var _temp,_this,_ret;_classCallCheck(this,MapView);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=MapView.__proto__||Object.getPrototypeOf(MapView)).call.apply(_ref,[this].concat(args))),_this),_this.state={center:null},_this.handleMapMounted=function(map){_this.map=map;},_this.onMapReady=function(){_this.props.onMapReady&&_this.props.onMapReady();},_this.onDragEnd=function(){var onRegionChangeComplete=_this.props.onRegionChangeComplete;if(_this.map&&onRegionChangeComplete){var center=_this.map.getCenter();onRegionChangeComplete({latitude:center.lat(),longitude:center.lng()});}},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(MapView,[{key:'animateToRegion',value:function animateToRegion(coordinates){this.setState({center:{lat:coordinates.latitude,lng:coordinates.longitude}});}},{key:'render',value:function render(){var _props=this.props,region=_props.region,initialRegion=_props.initialRegion,onRegionChange=_props.onRegionChange,onCenterChanged=_props.onCenterChanged,onZoomChanged=_props.onZoomChanged,onPress=_props.onPress,options=_props.options,_props$zoom=_props.zoom,zoom=_props$zoom===undefined?15:_props$zoom;var center=this.state.center;var style=this.props.style||styles.container;var centerProps=region?{center:{lat:region.latitude,lng:region.longitude}}:center?{center:center}:{defaultCenter:{lat:initialRegion.latitude,lng:initialRegion.longitude}};return _react2.default.createElement(_reactNative.View,{style:style,__source:{fileName:_jsxFileName,lineNumber:70}},_react2.default.createElement(GoogleMapContainer,_extends({handleMapMounted:this.handleMapMounted,onTilesLoaded:this.onMapReady,containerElement:_react2.default.createElement('div',{style:{height:'100%'},__source:{fileName:_jsxFileName,lineNumber:74}}),mapElement:_react2.default.createElement('div',{style:{height:'100%'},__source:{fileName:_jsxFileName,lineNumber:75}})},centerProps,{onDragStart:onRegionChange,onIdle:this.onDragEnd,onCenterChanged:onCenterChanged,onZoomChanged:onZoomChanged,zoom:zoom,onClick:onPress,options:options,__source:{fileName:_jsxFileName,lineNumber:71}}),this.props.children));}}]);return MapView;}(_react.Component);MapView.Marker=_Marker2.default;MapView.Polyline=_Polyline2.default;var styles=_reactNative.StyleSheet.create({container:{height:'100%'}});exports.default=MapView;