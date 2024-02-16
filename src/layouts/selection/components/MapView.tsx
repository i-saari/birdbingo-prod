import {AttributionControl, GeoJSON, MapContainer, TileLayer} from "react-leaflet";
import BCRData from "../../../data/BCR.json";
import {Feature, GeoJsonObject} from "geojson";
import React from "react";
import L from "leaflet";
import {LocationMarker} from "./LocationMarker";

/**
 * This component shows a map with BCR region polylines.
 */
export const MapView: React.FC<{
    /** Hook to set region according to location */
    setRegion: React.Dispatch<React.SetStateAction<string>>,
    /** Triggers geolocation */
    locating: boolean,
    /** Hook to reset locating trigger */
    setLocating: React.Dispatch<React.SetStateAction<boolean>>,
    /** Indicates whether to show region polylines */
    showBoundaries: boolean,
    /** Hook to indicate geolocation failure */
    setShowPermissionAlert: React.Dispatch<React.SetStateAction<boolean>>
}> = (props) => {

    const geoStyle = {
        fillOpacity: 0,
        weight: 0.5,
        opacity: props.showBoundaries ? 100 : 0
    }

    const onEachRegion = (region: Feature, layer: L.Layer) => {
        const code = String(region.properties?.BCR);

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
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <AttributionControl prefix={'<a href="https://leafletjs.com/">Leaflet</a>'}/>
                <GeoJSON
                    data={BCRData as GeoJsonObject}
                    style={geoStyle}
                    onEachFeature={onEachRegion}

                />
                <LocationMarker locating={props.locating}
                                setLocating={props.setLocating}
                                setRegion={props.setRegion}
                                setShowPermissionAlert={props.setShowPermissionAlert}
                />
            </MapContainer>
        </div>
    )
}