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

export const SelectionPage = () => {
    const [date, setDate] = useState(0);
    const [region, setRegion] = useState('');
    const [size, setSize] = useState(3);
    const [isCurrent, setIsCurrent] = useState(false);
    // trigger to find user's location
    const [locating, setLocating] = useState(false);
    const [showBoundaries, setShowBoundaries] = useState(false);
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);

    // get date from local storage on site load
    useEffect(() => {
        const storedDate = localStorage.getItem('date');

        // if date is found assess currency
        if (storedDate) {
            setDate(parseInt(storedDate));

            // delay until date is loaded
            if (date > 0) {
                if (date == Math.floor(new Date().getTime() / 8.64e7)) {
                    // data matches today's date
                    setIsCurrent(true);
                } else {
                    // out of date
                    setIsCurrent(false);
                }
            }
        }

    }, [date]);

    const handleCreateButton = () => {
        if (region == '') {
            setShowAlert(true);
        } else {
            setShowAlert(false);
            // record game setup
            localStorage.setItem('date', String(Math.floor(new Date().getTime() / 8.64e7)));
            localStorage.setItem('region', region);
            localStorage.setItem('size', String(size));

            // reset game selections
            localStorage.setItem('selection', JSON.stringify(new Array(size * size).fill(0)));
            localStorage.removeItem('ignoreWin');
            navigate('/card');
        }
    }

    const handleContinueButton = () => {
        navigate('/card');
    }

    const handleFindMeButton = () => {
        setLocating(prevState => !prevState);
    }

    // set size to default radio selection on page load
    useEffect(() => {
        setSize(3);
    }, []);

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
                    <Stack direction='row' spacing={2} >
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
                <Button onClick={handleCreateButton} variant='contained'>New Card</Button>
                <Button onClick={handleContinueButton} variant='contained' disabled={!isCurrent}>
                    Continue
                </Button>
            </Stack>
            {showAlert && <Box display='flex' justifyContent='center'>
                <Alert severity='warning'>Please select land in North America</Alert>
            </Box>}
        </Stack>
    )
}