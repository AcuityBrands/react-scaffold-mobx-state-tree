/**
 * Map
 * 
 * Creates contrived map component.  This component is currently
 * fairly limited in configurability and scope.
 */
import * as React from "react";
import mapboxgl = require('mapbox-gl');

interface IMapProps {
  height?: number
}

export default class Map extends React.Component<IMapProps, null> {

  private map:mapboxgl.Map;

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGRicmFkc2hhdyIsImEiOiJQemtJRXhvIn0.zJBiAX860916-nQlwX839w';
    this.map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-87.61620, 41.86600],
      zoom: 15.99,
      pitch: 40,
      bearing: 20
    });
    this.map.on('load', this.loadMapData);
  }

  recenterMap = () => {
    this.map.flyTo({
      center: [-87.61620, 41.86600],
      zoom: 15.99,
      pitch: 40,
      bearing: 0
    });
  }

  loadMapData = () => {
    this.map.addLayer({
      'id': 'room-extrusion',
      'type': 'fill-extrusion',
      'source': {
        'type': 'geojson',
        'data': '/data/3d-data.geojson'
      },
      'paint': {
        // See the Mapbox Style Specification for details on data expressions.
        // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions

        // Get the fill-extrusion-color from the source 'color' property.
        'fill-extrusion-color': ['get', 'color'],

        // Get fill-extrusion-height from the source 'height' property.
        'fill-extrusion-height': ['get', 'height'],

        // Get fill-extrusion-base from the source 'base_height' property.
        'fill-extrusion-base': ['get', 'base_height'],

        // Make extrusions slightly opaque for see through indoor walls.
        'fill-extrusion-opacity': 0.5
      }
    });
  }

  render() {
    return (
      <div id='map-container' style={{ height: this.props.height }}></div>
    );
  }
}