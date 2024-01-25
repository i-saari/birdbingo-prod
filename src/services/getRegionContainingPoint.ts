import BCRData from "../data/BCR.json";
import * as turf from "@turf/turf"
import { FeatureCollection } from "@turf/turf";

export const getRegionContainingPoint = (point: number[]) => {
    let region = '';

    // Loop through geojson object and check if point is inside. Return region number
    turf.featureEach(BCRData as FeatureCollection, function (currentFeature, featureIndex) {

        let containsPt = false;
        // convert geometry collection to feature collection
        const flattenedCollection = turf.flatten(currentFeature);

        // loop through resulting collection
        turf.featureEach(flattenedCollection, function (flattenedFeature, flatIndex) {
            const ptInGeometry = turf.booleanPointInPolygon(point, flattenedFeature);
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