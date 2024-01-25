import React, {useEffect, useState} from 'react';
import {Marker, useMapEvents} from "react-leaflet";
import { LatLngExpression } from "leaflet";
import L from "leaflet"
import {getRegionContainingPoint} from "../../../services/getRegionContainingPoint";
import MarkerIcon from "../../../assets/images/marker-icon.png";

export const LocationMarker: React.FC<{
    locating: boolean,
    setLocating: any,
    setRegion: any
}> = (props) => {
    const [position, setPosition] = useState<LatLngExpression>([0,0]);
    const [showMarker, setShowMarker] = useState(false);

    const icon = L.icon( {
        iconUrl: MarkerIcon,
        iconAnchor: [12, 41],
    });

    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
            setShowMarker(true);
        },
        locationfound(e) {
            setPosition(e.latlng);
            setShowMarker(true);
            props.setRegion(getRegionContainingPoint([e.latlng.lng, e.latlng.lat]));
            map.flyTo(e.latlng, 8);
            props.setLocating(false);
        },
        locationerror() {
            props.setLocating(false);
            setShowMarker(false);
        }
    })

    useEffect(() => {
        if (props.locating) {
            map.locate();
        }
    }, [props.locating]);

    return(
        showMarker ? <Marker position={position} icon={icon} /> : <></>
    )
}