import React, {useEffect, useState} from 'react';
import {Marker, useMapEvents} from "react-leaflet";
import { LatLngExpression } from "leaflet";
import L from "leaflet"
import {getRegionContainingPoint} from "../../../services/getRegionContainingPoint";
import MarkerIcon from "../../../assets/images/marker-icon.png";

/**
 * This component controls the map location marker. Includes geolocation logic.
 */
export const LocationMarker: React.FC<{
    /** Triggers geolocation */
    locating: boolean,
    /** Hook to reset locating trigger */
    setLocating: React.Dispatch<React.SetStateAction<boolean>>,
    /** Hook to set region according to location */
    setRegion: React.Dispatch<React.SetStateAction<string>>
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
            localStorage.setItem('position', JSON.stringify(e.latlng));
        },
        locationfound(e) {
            setPosition(e.latlng);
            setShowMarker(true);
            localStorage.setItem('position', JSON.stringify(e.latlng));
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
        } else {
            const storedPosition = localStorage.getItem('position');
            if (storedPosition) {
                setPosition(JSON.parse(storedPosition));
                setShowMarker(true);
            }
        }
    }, [map, props.locating]);

    return(
        showMarker ? <Marker position={position} icon={icon} /> : <></>
    )
}