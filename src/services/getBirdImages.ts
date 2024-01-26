import RegionFrequencies from '../data/RegionFrequencies.json'
import ImgData from '../data/imgData.json'
import seedrandom from "seedrandom";

interface Bird {
    "summer_rank": number;
    "winter_rank": number;
    "species_code": string;
}

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

export const getBirdImages = (region: string, size: number) => {

    // subtract time difference between UTC and PST so cards update in the night
    const utcToPst = 28800000
    const daysSinceEpoch = Math.floor((new Date().getTime() - utcToPst) / 8.64e7);
    // get daily random number generator
    const rng = seedrandom(String(daysSinceEpoch));

    // get list of birds in specified region
    const key: keyof typeof RegionFrequencies = region as keyof typeof RegionFrequencies;
    const regionList: Bird[] = RegionFrequencies[key];

    // set season from current month
    const month = new Date().getMonth();
    const season = (month >= 5 && month <= 10) ? 'summer_rank' : 'winter_rank';

    // sort birds by frequency in current season
    regionList.sort((a, b) => a[season] - b[season]);

    // array of possible bird indices to choose from - always top 25 in region
    const availableBirds = Array.from(Array(Math.floor(25)).keys())
    // most of the card will be top common birds
    const birdIdxs = availableBirds.splice(0, Math.floor(size * size * 0.8))
    // remainder is randomly drawn from birds not selected
    while(birdIdxs.length < size * size) {
        birdIdxs.push(availableBirds.splice(Math.floor(rng() * availableBirds.length), 1)[0])
    }
    // shuffle bird indices
    let i, j, temp;
    for (i = birdIdxs.length - 1; i > 0; i--) {
        j = Math.floor(rng() * (i + 1));
        temp = birdIdxs[i];
        birdIdxs[i] = birdIdxs[j];
        birdIdxs[j] = temp;
    }

    // get birds for bingo card
    const cardBirds = birdIdxs.map(i => regionList[i]);

    // get image data for selected birds
    const imgList: Image[] = []
    cardBirds.forEach((bird: Bird) => {
        imgList.push(ImgData.find(img => img.species_code === bird.species_code) as Image)
    })

    return imgList;
}