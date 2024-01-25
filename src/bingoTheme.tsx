import {createTheme, Shadows} from '@mui/material/styles';
import {lightBlue, lightGreen} from '@mui/material/colors';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: lightGreen[500],
        },
        secondary: {
            main: lightBlue[500],
        },
    },
    typography: {
        fontFamily: 'Roboto'
    },
    shadows: Array(25).fill('none') as Shadows

});

