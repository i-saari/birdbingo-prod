import {Box, Button, Modal, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import React from "react";

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

export const WinModal: React.FC <{
    open: boolean,
    onClose: () => void,
    handleContinue: () => void,
    size: number,
    setStartConfetti: React.Dispatch<React.SetStateAction<boolean>>
}> = (props) => {
    const navigate = useNavigate();
    props.setStartConfetti(true);

    return (
        <Modal
            open={props.open}
            onClose={props.onClose}
            aria-labelledby='modal-win'
            aria-describedby='modal-win'
        >
            <Box sx={modalStyle}>
                <Typography
                    variant="h4"
                    align="center"
                    color="text.primary"
                    gutterBottom>BINGO!
                </Typography>
                <Typography gutterBottom>
                    {`You've completed today's ${props.size}x${props.size} bingo card. Come back
                    tomorrow for a fresh arrangement.`}
                </Typography>
                <Typography gutterBottom>
                    Would you like to keep playing?
                </Typography>
                <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    sx={{ gap: 1 }}
                >
                    <Button onClick={() => navigate('/')} variant='contained'>Make New Card</Button>
                    <Button onClick={props.handleContinue} variant='contained'>Continue This Card</Button>
                </Box>
            </Box>
        </Modal>
    )
}