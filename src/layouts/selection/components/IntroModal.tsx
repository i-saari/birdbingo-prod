import {Box, Modal, Stack, Typography} from "@mui/material";
import React from "react";
import MapScreenshot from '../../../assets/images/map_screenshot.png';
import DifficultyScreenshot from '../../../assets/images/difficulty_screenshot.png';
import PlayScreenshot from '../../../assets/images/play_screenshot.png';
import CheckScreenshot from '../../../assets/images/checked_screenshot.png';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '80%',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 1,
    overflow: 'scroll'
};

/**
 * This component shows a modal with a guide on how to play.
 */
export const IntroModal: React.FC <{
    /** Trigger to open model */
    open: boolean,
    /** Action when modal is closed */
    onClose: () => void,
}> = (props) => {
    return (
        <Modal
            open={props.open}
            onClose={props.onClose}
            aria-labelledby='modal-intro'
            aria-describedby='modal-intro'
        >
            <Box sx={modalStyle}>
                <Stack spacing={1}>
                    <Typography variant='h6'>
                        How to play
                    </Typography>
                    <Typography>
                        1. Pick your location on the map or press Find Me
                    </Typography>
                    <img src={MapScreenshot} alt='Map screenshot'
                         style={{ objectFit: 'contain', height: '150px' }} />
                    <Typography>
                        2. Choose your bingo card size
                    </Typography>
                    <img src={DifficultyScreenshot} alt='Difficulty screenshot'
                         style={{ objectFit: 'contain', height: '100px' }} />
                    <Typography>
                        3. Press Play
                    </Typography>
                    <img src={PlayScreenshot} alt='Play screenshot'
                         style={{ objectFit: 'contain', height: '50px' }} />
                    <Typography>
                        4. Tap the birds as you see them to check them off. Check all the birds in a row, column,
                        or diagonal to win!
                    </Typography>
                    <img src={CheckScreenshot} alt='Check screenshot'
                         style={{ objectFit: 'contain', height: '100px' }} />
                </Stack>
            </Box>
        </Modal>
    )
}