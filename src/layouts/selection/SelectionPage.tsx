import {useEffect, useState} from "react";
import "leaflet/dist/leaflet.css"
import './css/Map.css'
import {
    Button,
    Box,
    CircularProgress,
    Stack, Alert,
} from "@mui/material";
import {useNavigate} from "react-router";
import {MapView} from "./components/MapView";
import {SizeButtons} from "./components/SizeButtons";
import {IntroModal} from "./components/IntroModal";

/**
 * This component shows the homepage with a map, size buttons and Play button.
 */
export const SelectionPage = () => {
    const [region, setRegion] = useState('');
    const [size, setSize] = useState(3);
    const [showBoundaries, setShowBoundaries] = useState(false);
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [showIntro, setShowIntro] = useState(false);

    // trigger to find user's location
    const [locating, setLocating] = useState(false);

    // get date from local storage on site load
    useEffect(() => {
        const storedSize = localStorage.getItem('size');
        const storedRegion = localStorage.getItem('region');
        const storedIntro = localStorage.getItem('intro');

        if (storedSize && storedRegion) {
            setSize(parseInt(storedSize));
            setRegion(storedRegion);
        }

        if (!storedIntro) {
            setShowIntro(true);
            localStorage.setItem('intro','false');
        }

    }, []);

    const handleCreateButton = () => {
        if (region === '') {
            setShowAlert(true);
        } else {
            setShowAlert(false);

            // get previously stored game setup
            const storedDate = localStorage.getItem('date');
            const storedRegion = localStorage.getItem('region');
            const storedSize = localStorage.getItem('size');

            localStorage.setItem('date', String(Math.floor(new Date().getTime() / 8.64e7)));
            localStorage.setItem('region', region);
            localStorage.setItem('size', String(size));

            if (storedDate && storedRegion && storedSize) {
                if (parseInt(storedDate) !== Math.floor(new Date().getTime() / 8.64e7) ||
                    storedRegion !== region || parseInt(storedSize) !== size) {
                    // game setup doesn't match stored setup -> reset game
                    localStorage.setItem('selection', JSON.stringify(new Array(size * size).fill(0)));
                    localStorage.removeItem('ignoreWin');
                }
            }

            navigate('/card');
        }
    }

    const handleFindMeButton = () => {
        setLocating(prevState => !prevState);
    }

    const handleCloseIntroModal: () => void = () => {
        setShowIntro(false);
    }

    return (
        <Stack direction='column' height='calc(100vh - 64px)'>
            <Box width='100%'>
                <MapView
                    setRegion={setRegion}
                    locating={locating}
                    setLocating={setLocating}
                    showBoundaries={showBoundaries}
                />
                <Box sx={{
                    position: 'absolute',
                    top: 80,
                    left: 60,
                    zIndex: 1000
                }}>
                    <Stack direction='row' spacing={2}>
                        <Button onClick={() => setShowBoundaries(!showBoundaries)} variant='contained'>
                            {showBoundaries ? 'HIDE REGIONS' : 'SHOW REGIONS'}
                        </Button>
                        <Button onClick={handleFindMeButton} variant='contained'>Find me</Button>
                        {locating && <CircularProgress style={{width: '25px', height: '25px'}}/>}
                    </Stack>
                </Box>
            </Box>
            <SizeButtons size={size} setSize={setSize}/>
            <Stack direction='row' spacing={2} justifyContent='center' mb={2}>
                <Button onClick={handleCreateButton} variant='contained'>Play</Button>
            </Stack>
            {showAlert && <Box display='flex' justifyContent='center'>
                <Alert severity='warning'>Please select land in North America</Alert>
            </Box>}
            <IntroModal open={showIntro} onClose={handleCloseIntroModal} />
        </Stack>
    )
}