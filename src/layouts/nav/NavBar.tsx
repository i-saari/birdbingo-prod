import {AppBar, Box, IconButton, Toolbar} from "@mui/material";
import HelpIcon from '@mui/icons-material/Help';
import {useState} from "react";
import {HelpModal} from "./components/HelpModal";
import { Link } from "react-router-dom";
import Title from "../../assets/images/title.png";

export const NavBar = () => {
    const [openHelpModal, setOpenHelpModal] = useState(false);

    const handleOpenHelpModal = () => {
        setOpenHelpModal(true);
    }

    const handleCloseHelpModal: () => void = () => {
        setOpenHelpModal(false);
    }



    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position='fixed'
                elevation={0}
                style={{background: 'white'}}
                sx={{borderBottom: 4, borderColor: 'primary.main'}}
            >
                <Toolbar>
                    <Box sx={{mt: 1}}>
                        <Link to='/' style={{textDecoration: 'none'}}>
                            <img src={Title} alt='home' style={{ objectFit: 'contain', height: '40px' }}/>
                        </Link>
                    </Box>
                    <Box sx={{flexGrow: 1}}></Box>
                    <IconButton
                        size='large'
                        color='inherit'
                        onClick={handleOpenHelpModal}
                    ><HelpIcon/></IconButton>
                </Toolbar>
            </AppBar>
            <HelpModal open={openHelpModal} onClose={handleCloseHelpModal}/>
        </Box>
    )
}