import ImgData from '../data/imgData.json'
import {IconButton, ImageList, ImageListItem, ImageListItemBar} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {lightGreen} from "@mui/material/colors";
import InfoIcon from "@mui/icons-material/Info";
import React, {useState} from "react";
import {InfoModal} from "./card/components/InfoModal";

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

export const AllBirds = () => {
    const [openInfoModal, setOpenInfoModal] = useState(false);
    const [imageInfo, setImageInfo] = useState<Image>();

    const allBirds: Image[] = ImgData;

    const handleOpenInfoModal = (code: string, index: number, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation();
        setImageInfo(allBirds?.find(b => b.species_code === code));
        setOpenInfoModal(true);
    };

    const handleCloseInfoModal = () => setOpenInfoModal(false);

    return (
        <main>
            <ImageList cols={5} rowHeight={200}>
                {allBirds.map((bird, index) => (
                    <ImageListItem key={index}>
                        <img
                            srcSet={`${bird.img}`}
                            src={`${bird.img}`}
                            alt={bird.species_common}
                            loading="lazy"
                            style={{objectFit: 'cover', width: '100%', height: '100%'}}
                        />

                        <ImageListItemBar
                            sx={{
                                "& .MuiImageListItemBar-title": {fontFamily: 'Arial'},
                            }}
                            title={bird.species_common}
                            actionIcon={
                                <IconButton
                                    sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                                    aria-label={`info about ${bird.species_common}`}
                                    onClick={(e) => handleOpenInfoModal(bird.species_code, index, e)}
                                >
                                    <InfoIcon/>
                                </IconButton>
                            }
                        />


                    </ImageListItem>
                ))}
            </ImageList>
            <InfoModal open={openInfoModal} onClose={handleCloseInfoModal} imageInfo={imageInfo}/>
        </main>
    )
}