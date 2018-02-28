import * as React from "react";
import mapboxgl = require('mapbox-gl');

interface IMapProps {
  height?: number
}

export default class Map extends React.Component<IMapProps, null> {

  map:any;

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGRicmFkc2hhdyIsImEiOiJQemtJRXhvIn0.zJBiAX860916-nQlwX839w';
    const map = new mapboxgl.Map({
        container: 'map-container',
        style: 'mapbox://styles/mapbox/streets-v9'
    });
  }

  render() {
    return (
      <div id='map-container' style={{height:this.props.height}}></div>
    );
  }
}