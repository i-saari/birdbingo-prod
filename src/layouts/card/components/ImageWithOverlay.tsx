import React from "react";

interface Image {
    "species_code": string;
    "ml_number": string;
    "img": string;
    "species_common": string;
    "photographer": string;
    "date": string;
    "location": string;
    "ml_link": string;
}

/**
 * This component shows the bird image with an optional dark overlay and checkmark.
 */
export const ImageWithOverlay: React.FC <{
    /** Bird image information */
    bird: Image,
    /** Indicator to show overlay with checkmark */
    checked: boolean
}> = (props) => {
    const overlayStyle: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: props.checked ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.0)',
    }

    return (
        <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
            <img
                srcSet={`${props.bird.img}`}
                src={`${props.bird.img}`}
                alt={props.bird.species_common}
                loading="lazy"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
            <div style={overlayStyle}></div>
        </div>
    )
}