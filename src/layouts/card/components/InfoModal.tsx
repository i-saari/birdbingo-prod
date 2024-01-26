import Box from "@mui/material/Box";
import {Link, Modal, Stack, SvgIcon, Typography} from "@mui/material";
import React from "react";
import {PersonIcon} from "../../../assets/icons/PersonIcon.tsx";
import {LocationIcon} from "../../../assets/icons/LocationIcon.tsx";
import {CalendarIcon} from "../../../assets/icons/CalendarIcon.tsx";

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

export const InfoModal: React.FC <{
    open: boolean,
    onClose: () => void,
    imageInfo: Image | undefined
}> = (props) => {
    return (
        <Modal
            open={props.open}
            onClose={props.onClose}
            aria-labelledby='modal-image'
            aria-describedby='modal-image-description'
        >
            <Box sx={modalStyle}>
                <img
                    style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain'
                        }}
                    srcSet={`${props.imageInfo?.img}`}
                    src={`${props.imageInfo?.img}`}
                    alt={props.imageInfo?.species_common}
                    loading="lazy"
                />
                <Link href={`https://ebird.org/species/${props.imageInfo?.species_code}`}
                      variant='h6' target='_blank' underline='none'>
                    {props.imageInfo?.species_common}
                </Link>
                <Stack direction='row' alignItems='center' gap={1}>
                    <SvgIcon>
                        <PersonIcon/>
                    </SvgIcon>
                    <Typography>
                        {`${props.imageInfo?.photographer}`}
                    </Typography>
                </Stack>
                <Stack direction='row' alignItems='center' gap={1}>
                    <SvgIcon>
                        <LocationIcon/>
                    </SvgIcon>
                    <Typography>
                        {`${props.imageInfo?.location}`}
                    </Typography>
                </Stack>
                <Stack direction='row' alignItems='center' gap={1}>
                    <SvgIcon>
                        <CalendarIcon/>
                    </SvgIcon>
                    <Typography>
                        {`Date: ${props.imageInfo?.date}`}
                    </Typography>
                </Stack>
                <Link href={props.imageInfo?.ml_link} variant='body1' target='_blank' underline='none'>
                    {`ML ${props.imageInfo?.ml_number}`}
                </Link>
                <br/>
                <Link href='https://www.birds.cornell.edu' variant='body1' target='_blank' underline='none'>
                    Cornell Lab
                </Link>
            </Box>
        </Modal>
    )
}