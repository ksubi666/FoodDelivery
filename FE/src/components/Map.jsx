'use-client';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  Polygon,
} from 'react-leaflet';
import { useEffect, useState } from 'react';

const Map = () => {
  const [geoData, setGeoData] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      setGeoData({ lat: latitude, lng: longitude });
    });
  }, []);
  const multiPolygon = [
    [
      [47.890664, 106.909683],
      [47.888873, 106.927263],
      [47.888466, 106.938995],
      [47.891815, 106.937849],
      [47.899776, 106.930936],
      [47.903374, 106.943579],
      [47.908061, 106.943296],
      [47.912658, 106.943587],
      [47.918906, 106.943386],
      [47.927237, 106.941169],
      [47.929304, 106.934951],
      [47.929929, 106.92743],
      [47.928189, 106.905371],
      [47.921535, 106.900103],
      [47.915236, 106.894494],
      [47.903926, 106.892839],
      [47.889684, 106.89313],
      [47.889757, 106.901531],
    ],
  ];
  return (
    geoData && (
      <>
        <MapContainer
          center={geoData && [geoData?.lat, geoData?.lng]}
          zoom={14}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
            url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=6x4bjJJpQrYpFrpEGg0H"
          />
          {geoData && (
            <Marker position={[geoData.lat, geoData.lng]}>
              <Tooltip
                direction="bottom"
                offset={[-16, 30]}
                opacity={1}
                permanent
              >
                Your location
              </Tooltip>
            </Marker>
          )}
          <Polygon
            pathOptions={{ color: '#18BA51' }}
            positions={multiPolygon}
            className="outline-none"
          >
            <Tooltip sticky>ХҮРГЭЛТИЙН БҮС</Tooltip>
          </Polygon>
        </MapContainer>
      </>
    )
  );
};
export default Map;
