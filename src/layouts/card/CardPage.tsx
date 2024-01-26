import {getBirdImages} from "../../services/getBirdImages";
import React, {useEffect, useState} from "react";
import {Box, IconButton, ImageList, ImageListItem, ImageListItemBar, SvgIcon} from "@mui/material";
import {checkForWin} from "../../services/checkForWin";
import Confetti from 'react-confetti'
import {InfoModal} from "./components/InfoModal";
import {WinModal} from "./components/WinModal";
import {useNavigate} from "react-router";
import {ImageWithOverlay} from "./components/ImageWithOverlay";
import {CheckmarkIcon} from "../../assets/icons/CheckmarkIcon.tsx";
import {InfoIcon} from "../../assets/icons/InfoIcon.tsx";

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

export const CardPage = () => {
    const [date, setDate] = useState(0);
    const [region, setRegion] = useState('');
    const [size, setSize] = useState(3);
    const [loading, setLoading] = useState(true);
    // trigger to open bird image info modal
    const [openInfoModal, setOpenInfoModal] = useState(false);
    // array representing selection status of grid items - 0 means unselected, 1 means selected
    const [selection, setSelection] = useState<number[]>();
    // image info to populate info modal
    const [imageInfo, setImageInfo] = useState<Image>();
    // indicator of whether user has won
    const [won, setWon] = useState(false);
    // delay confetti until modal appears
    const [startConfetti, setStartConfetti] = useState(false);
    // indicator of user continuing after winning
    const [ignoreWin, setIgnoreWin] = useState(false);
    // array of image info for all birds in the card
    const [birds, setBirds] = useState<Image[]>();

    const [showTitles, setShowTitles] = useState(true);
    const [rowHeight, setRowHeight] = useState<number | 'auto' | undefined>();
    const [imageListWidth, setImageListWidth] = useState<number | 'auto' | undefined>();
    const navigate = useNavigate();

    // load game data from local storage on page refresh
    useEffect(() => {
        const storedDate = localStorage.getItem('date');
        const storedRegion = localStorage.getItem('region');
        const storedSize = localStorage.getItem('size');
        const storedSelection = localStorage.getItem('selection');
        const storedIgnoreWin = localStorage.getItem('ignoreWin');

        if (loading) {
            // states not yet set

            if (storedDate && storedRegion && storedSize) {
                // data was found, set game parameters
                setDate(parseInt(storedDate));
                setRegion(storedRegion);
                setSize(parseInt(storedSize));

                if (date > 0) {
                    // delay until date is read and set
                    if (date === Math.floor(new Date().getTime() / 8.64e7)) {
                        // data is for today's game, set selections
                        if (storedSelection) {
                            setSelection(JSON.parse(storedSelection));
                        } else {
                            setSelection(new Array(size * size).fill(0));
                        }
                        if (storedIgnoreWin) {
                            setIgnoreWin(Boolean(storedIgnoreWin));
                        }
                    } else {
                        // data is out of date, reset selections
                        setSelection(new Array(size * size).fill(0));
                        // update date
                        localStorage.setItem('date', String(Math.floor(new Date().getTime() / 8.64e7)));
                        setIgnoreWin(false);
                    }
                    // after region and size are set
                    setBirds(getBirdImages(region, size));
                    setLoading(false);
                }

            } else {
                // no data was found
                navigate('/');
            }
        }

    }, [date, loading, navigate, region, size]);


    useEffect(() => {
        // set image list width and row height
        const handleResize = () => {
            // subtract navbar height
            const containerHeight = window.innerHeight - 64;
            const containerWidth = window.innerWidth;
            const containerAspectRatio = (containerWidth / containerHeight);
            // setContainerAspectRatio(containerWidth / containerHeight);
            const gaps = 4 * (size - 1);

            // set image row height
            if (containerAspectRatio < 1) {
                // mobile in portrait
                setRowHeight(containerWidth / size)
            } else {
                setRowHeight((containerHeight - gaps) / size)
            }

            // set image list width
            if (containerAspectRatio > 3/2) {
                // mobile in landscape
                setImageListWidth(containerHeight * 1.5);
            } else {
                setImageListWidth(containerWidth);
            }

            // determine whether to show bird names
            if (containerWidth < 600 || containerHeight < 600) {
                setShowTitles(false);
            }
        }

        // trigger on resize
        handleResize(); // for initial render
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [size]);


    // update local storage whenever selection changes
    useEffect(() => {
        if (!loading) {
            localStorage.setItem('selection', JSON.stringify(selection));
        }
    }, [loading, selection]);

    const handleOpenInfoModal = (code: string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation();
        setImageInfo(birds?.find(b => b.species_code === code));
        setOpenInfoModal(true);
    };

    const handleCloseInfoModal = () => setOpenInfoModal(false);

    const handleImageClick = (index: number) => {
        if (selection) {
            const localSelected = selection;
            localSelected[index] = selection[index] === 0 ? 1 : 0;
            setSelection([...localSelected]);
            if (!ignoreWin) {
                setWon(checkForWin(selection, size));
            }
        }
    }

    // action if user chooses to continue playing current card
    const handleContinueCard = () => {
        setIgnoreWin(true);
        localStorage.setItem('ignoreWin', 'true');
        setWon(false);
    }

    const handleCloseWinModal = () => {
        setIgnoreWin(true);
        localStorage.setItem('ignoreWin', 'true');
        setWon(false);
    }

    // delay render until local storage is finished reading
    if (loading || !birds || !selection) return (
        <p>Loading</p>
    )

    return (
        <Box>
            {won && startConfetti &&
                <Confetti
                    numberOfPieces={200}
                    confettiSource={{
                        x: window.innerWidth / 2,
                        y: window.innerHeight,
                        w: 10,
                        h: 10
                    }}
                    initialVelocityY={25}
                    recycle={false}
                />
            }
            {/* Image grid */}
            <ImageList cols={size} rowHeight={rowHeight} sx={{
                width: imageListWidth,
                margin: 0
            }}>
                {birds.map((bird, index) => (
                    <ImageListItem key={index} onClick={() => handleImageClick(index)}>
                        <ImageWithOverlay bird={bird} checked={selection[index] === 1} />

                        {/*Green check when selected*/}
                        {selection[index] === 1 &&
                            <ImageListItemBar
                                position='top'
                                actionPosition='left'
                                sx={{background: 'transparent'}}
                                actionIcon={
                                    <IconButton>
                                        <SvgIcon>
                                            <CheckmarkIcon/>
                                        </SvgIcon>
                                    </IconButton>
                                }
                            />
                        }
                        {/* Show bird name if screen is wide */}
                        {showTitles ?
                            (
                                <ImageListItemBar
                                    sx={{
                                        "& .MuiImageListItemBar-title": { fontFamily: 'Arial' },
                                    }}
                                    title={bird.species_common}
                                    actionIcon={
                                        <IconButton
                                            sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                                            aria-label={`info about ${bird.species_common}`}
                                            onClick={(e) => handleOpenInfoModal(bird.species_code, e)}
                                        >
                                            <SvgIcon>
                                                <InfoIcon/>
                                            </SvgIcon>
                                        </IconButton>
                                    }
                                />
                            ) : (
                                <ImageListItemBar
                                    sx={{background: 'transparent'}}
                                    actionIcon={
                                        <IconButton
                                            sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                                            aria-label={`info about ${bird.species_common}`}
                                            onClick={(e) => handleOpenInfoModal(bird.species_code, e)}
                                        >
                                            <SvgIcon>
                                                <InfoIcon/>
                                            </SvgIcon>
                                        </IconButton>
                                    }
                                />
                            )
                        }
                    </ImageListItem>
                ))}
            </ImageList>
            <InfoModal open={openInfoModal} onClose={handleCloseInfoModal} imageInfo={imageInfo} />
            <WinModal open={won} onClose={handleCloseWinModal}
                      handleContinue={handleContinueCard} size={size}
                      setStartConfetti={setStartConfetti}/>
        </Box>
    )
}