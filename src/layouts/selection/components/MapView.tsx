import {AttributionControl, GeoJSON, MapContainer, TileLayer} from "react-leaflet";
import BCRData from "../../../data/BCR.json";
import {Feature, GeoJsonObject} from "geojson";
import React from "react";
import L from "leaflet";
import {LocationMarker} from "./LocationMarker";

export const MapView: React.FC<{
    setRegion: React.Dispatch<React.SetStateAction<string>>,
    locating: boolean,
    setLocating: React.Dispatch<React.SetStateAction<boolean>>,
    showBoundaries: boolean
}> = (props) => {

    const geoStyle = {
        fillOpacity: 0,
        weight: 0.5,
        opacity: props.showBoundaries ? 100 : 0
    }

    const onEachRegion = (region: Feature, layer: L.Layer) => {
        const code = region.properties?.BCR;

        layer.on({
            click: () => {
                props.setRegion(code)
            }
        })
    }

    return(
        <div>
            <MapContainer center={[45, -95]} zoom={3} attributionControl={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>
                        contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <AttributionControl prefix={'Leaflet'}/>
                <GeoJSON
                    data={BCRData as GeoJsonObject}
                    style={geoStyle}
                    onEachFeature={onEachRegion}

                />
                <LocationMarker locating={props.locating} setLocating={props.setLocating} setRegion={props.setRegion} />
            </MapContainer>
        </div>
    )
}