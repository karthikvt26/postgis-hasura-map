import * as React from "react";
import { Map, TileLayer, Marker, Circle, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useQuery } from '@apollo/react-hooks';
import './App.css';

import GraphQLOperation from './GraphQLOperation';

import { fetchRestaurantsPlain, fetchRestaurants } from './queries';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const defaultMarker = {
  name: 'Leela palace bangalore',
  lat: 12.9606,
  long: 77.6484,
};

const defaultZoom = 14;
const defaultRadius = 1000;
const options = {
  doubleClickZoom: true, 
  closePopupOnClick: true, 
  dragging: true, 
  zoomSnap: false, 
  zoomDelta: true, 
  trackResize: false,
  touchZoom: false,
  scrollWheelZoom: true,
  boxZoom: false,
};

const CustomCircle = (props) => {
  const circleRef = React.useRef(null);
  const { markerNode } = props;
  return (
    <Circle ref={circleRef} {...props}>
      {markerNode}
    </Circle>
  );
};

export const App = () => {
  const [markerInfo, updateOptions] = React.useState(defaultMarker);
  const variables = {
    ...{
      lat: markerInfo.lat,
      long: markerInfo.long,
      bound: defaultRadius,
    }
  };

  const {loading, error, data} = useQuery(fetchRestaurants, {
    variables: {
      ...variables
    }
  });

  const center = [markerInfo.lat, markerInfo.long];
  const renderCircleMarkers = () => {
      const center = [markerInfo.lat, markerInfo.long];
      const radius = defaultRadius;
      const markerNode = (
        <Marker position={center}>
          <Popup>
            {markerInfo.name || 'Mystery place'}
          </Popup>
        </Marker>
      );

      return (
        <CustomCircle center={center} radius={radius}>
          {markerNode}
        </CustomCircle>
      );
  };
  const renderBoundData = () => {
    if (loading) {
      return null;
    }
    if (error) {
      alert(error.toString());
      return null;
    }
    const center = [markerInfo.lat, markerInfo.long];
    const selectedMarker = (
      <Marker key="9999999999" position={center}>
        <Popup>
          {markerInfo.name}
        </Popup>
      </Marker>
    );
    const listOfMarkers = [selectedMarker];
    if (data && data.get_nearby_restaurants.length > 0) {
      const getMarkersList = () => {
        return data.get_nearby_restaurants.map((d, i) => {
          const center = [d.long, d.lat];
          const name = d.name;
          return (
            <Marker key={i} position={center}>
              <Popup>
                {name}
              </Popup>
            </Marker>
          );
        });
      };
      return listOfMarkers.concat(getMarkersList());
    }
    return listOfMarkers;
  };
  const updateMarker = (e) => {
    const { lat, lng } = e.latlng;
    updateOptions({
      name: 'Custom marker',
      lat,
      long: lng
    });
  };
  return (
    <div className="App">
      <Map onClick={updateMarker} center={center} zoom={defaultZoom} style={{width: '65%'}} { ...options }>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {renderCircleMarkers()}
        {renderBoundData()}
      </Map>
      <GraphQLOperation request={fetchRestaurantsPlain} variables={variables} response={data && data.get_nearby_restaurants} />
    </div>
  )
}

export default App;
