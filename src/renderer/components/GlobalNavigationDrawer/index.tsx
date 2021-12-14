import { Divider, IconButton } from '@mui/material';
import React from 'react';
import { Bookmarks, Downloads, Extensions, History, Settings } from '../Icons';
import { StyledDrawer } from './styles';

export const GlobalNavigationDrawer = () => {
    return (
        <StyledDrawer>
            <IconButton>
                <Bookmarks />
            </IconButton>
            <IconButton>
                <History />
            </IconButton>
            <IconButton>
                <Downloads />
            </IconButton>
            <Divider sx={{ width: 20, alignItems: 'center' }} />
            <IconButton>
                <Settings />
            </IconButton>
            <IconButton>
                <Extensions />
            </IconButton>
        </StyledDrawer>
    );
};