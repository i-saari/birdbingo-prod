import React from "react";
import Box from "@mui/material/Box";
import {Modal, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";


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

export const HelpModal: React.FC <{
    open: boolean,
    onClose: () => void,
}> = (props) => {

    return(
        <Modal
            open={props.open}
            onClose={props.onClose}
            aria-labelledby='modal-help'
            aria-describedby='modal-help'
        >
            <Box sx={modalStyle}>
                <Stack spacing={1}>
                    <Typography variant='h5' >
                        Welcome to Bird Bingo!
                    </Typography>
                    <Typography variant='h6'>
                        How to play
                    </Typography>
                    <Typography>
                        To get started, select your location on the map, or press Find Me to automatically get
                        your location. Then select the size of your bingo card by clicking on the birds below the
                        map. Finally, click New Card to start a new game. If you have already started a card today,
                        you can continue playing it by clicking Continue. Cards are rearranged with new birds every
                        night so check back tomorrow for a new game.
                    </Typography>
                    <Typography>
                        Click or tap on the birds to check them off as you see them during your day. If you check off
                        a full row, column or diagonal, you win! You then have the option to keep checking off birds on
                        that card or to start a new card. You can click the info button in the bottom right corner of each
                        image to view the photographer credit.
                    </Typography>
                    <Typography variant='h6'>
                        How it works
                    </Typography>
                    <Typography>
                        Bird Bingo uses the North American Bird Conservation Initiative regions to divide North America
                        into areas of similar ecological characteristics. Bird observation data available at eBird.com
                        by the Cornell Lab of Ornithology is used to determine the most common birds in each region for
                        the current season. Each bingo card is populated with a mix of the most common birds and a
                        random selection of rarer birds from that region. You can click the Show Regions button to see
                        the regions on the map. Bird photos are supplied by the Macaulay Library.
                    </Typography>
                </Stack>
            </Box>
        </Modal>
    )
}