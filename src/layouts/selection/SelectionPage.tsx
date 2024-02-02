import {useEffect, useState} from "react";
import "leaflet/dist/leaflet.css"
import './css/Map.css'
import {
    Button,
    Box,
    CircularProgress,
    Stack, Alert, Typography,
} from "@mui/material";
import {useNavigate} from "react-router";
import {MapView} from "./components/MapView";
import {SizeButtons} from "./components/SizeButtons";

export const SelectionPage = () => {
    // const [date, setDate] = useState(0);
    const [region, setRegion] = useState('');
    const [size, setSize] = useState(3);
    // const [isCurrent, setIsCurrent] = useState(false);
    // trigger to find user's location
    const [locating, setLocating] = useState(false);
    const [showBoundaries, setShowBoundaries] = useState(false);
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);

    // get date from local storage on site load
    useEffect(() => {
        const storedSize = localStorage.getItem('size');
        const storedRegion = localStorage.getItem('region');

        if (storedSize && storedRegion) {
            setSize(parseInt(storedSize));
            setRegion(storedRegion);
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

    return (
        <Stack direction='column' height='calc(100vh - 64px)'>
            <Typography justifyContent='center' variant='h6' sx={{mt: 2, ml: 1}}>Pick your location</Typography>
            <Box width='100%'>
                <MapView
                    setRegion={setRegion}
                    locating={locating}
                    setLocating={setLocating}
                    showBoundaries={showBoundaries}
                />
                <Box sx={{
                    position: 'absolute',
                    top: 120,
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
            <Typography variant='h6' sx={{mt: 2, ml: 1}}>Choose your difficulty</Typography>
            <SizeButtons size={size} setSize={setSize}/>
            <Stack direction='row' spacing={2} justifyContent='center' mb={2}>
                <Button onClick={handleCreateButton} variant='contained'>Play</Button>
            </Stack>
            {showAlert && <Box display='flex' justifyContent='center'>
                <Alert severity='warning'>Please select land in North America</Alert>
            </Box>}

        </Stack>
    )
}