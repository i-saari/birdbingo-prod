
import React from "react";
import Owl from "../../../assets/images/owl.png";
import Tern from "../../../assets/images/tern.png";
import Egret from "../../../assets/images/egret.png";
import {Box, Stack, ToggleButton, ToggleButtonGroup} from "@mui/material";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

export const SizeButtons: React.FC <{size: number, setSize: any}> = (props) => {
    // indicator if user is using wide screen
    const largeScreen = useMediaQuery('(min-width:600px)');

    const sizeOptions = [
        {
            title: 'Owl',
            img: Owl,
            subtitle: '3x3',
            value: 3
        },
        {
            title: 'Tern',
            img: Tern,
            subtitle: '4x4',
            value: 4
        },
        {
            title: 'Egret',
            img: Egret,
            subtitle: '5x5',
            value: 5
        }
    ]

    const handleSizeChange = (
        event: React.MouseEvent<HTMLElement>,
        newSize: number | null,
    ) => {
        props.setSize(newSize);
    };

    return(
        <Box  justifyContent='center' alignItems='center'  mb={2} >
            <ToggleButtonGroup
                value={props.size}
                exclusive
                onChange={handleSizeChange}
                fullWidth
            >
            {sizeOptions.map((option, index) => (
                <ToggleButton value={option.value} color='primary' key={index}>
                    <Stack direction='column' justifyContent='center' height='100%' display='flex'>
                        <Typography variant='h5' sx={{textTransform: 'none'}}>{option.title}</Typography>
                        <img src={option.img} alt={option.subtitle}
                             style={{ objectFit: 'contain', height: largeScreen? '100px' : '50px' }}/>
                        <Typography sx={{textTransform: 'none'}}>{option.subtitle}</Typography>
                    </Stack>
                </ToggleButton>
            ))}
            </ToggleButtonGroup>
        </Box>
    )
}
