import BCRData from "../data/BCR.json";
// @ts-expect-error -- turf/dist does not correctly include declaration file
import { FeatureCollection, featureEach, booleanPointInPolygon, flatten, Feature} from "@turf/turf";

/**
 * Determines which BCR region contains the specified point
 * @param point - leaflet latlng objects in order [longitude, latitude]
 * @return BCR region containing point
 */
export const getRegionContainingPoint = (point: number[]) => {
    // const turf = require('@turf/turf');
    // const { FeatureCollection, featureEach, booleanPointInPolygon, flatten, Feature} = turf;

    let region = '';

    // Loop through geojson object and check if point is inside. Return region number
    featureEach(BCRData as typeof FeatureCollection, function (currentFeature: typeof Feature) {

        let containsPt = false;
        // convert geometry collection to feature collection
        const flattenedCollection = flatten(currentFeature);

        // loop through resulting collection
        featureEach(flattenedCollection, function (flattenedFeature: typeof Feature) {
            const ptInGeometry = booleanPointInPolygon(point, flattenedFeature);
            if (ptInGeometry) containsPt = true;
        })

        // get property value if point is found in feature
        if (containsPt) {
            const props = currentFeature.properties;
            if (props) {
                region = String(props['BCR']);
            }
        }
    })
    return region;
}