import { IconButton } from '@mui/material';
import clsx from 'clsx';
import React, { useState } from 'react';
import { AppearanceSidebarState } from '../../../../../../interfaces/user';
import { BookmarksPanel } from '../../../../../components/BookmarksPanel';
import { DownloadsPanel } from '../../../../../components/DownloadsPanel';
import { HistoryPanel } from '../../../../../components/HistoryPanel';
import { Bookmarks, Download, History } from '../../../../../components/Icons';
import { ChevronLeft, ChevronRight } from '../../../../../components/Icons/arrow';
import { useUserConfigContext } from '../../../../../contexts/config';
import { useElectronAPI } from '../../../../../utils/electron';
import { VerticalTabContainer } from '../TabContainer';
import { StyledSidebar, StyledToolBarContainer } from './styles';

export const Sidebar = () => {
    const { windowApi } = useElectronAPI();

    const { config, setConfig } = useUserConfigContext();
    const { style, sidebar: { extended, state } } = config.appearance;

    const [panel, setPanel] = useState<AppearanceSidebarState>(state);

    const handleTogglePanelClick = (sidebarState: AppearanceSidebarState) => {
        const prevState = panel;
        const newState = prevState !== sidebarState ? sidebarState : 'tab_container';
        setPanel(newState);
        setConfig({ appearance: { sidebar: { state: newState } } });
        if (!extended && prevState === 'tab_container')
            windowApi.toggleSidebar();
    };

    const handleToggleSidebarClick = () => {
        windowApi.toggleSidebar();
        if (extended) {
            setPanel('tab_container');
            setConfig({ appearance: { sidebar: { state: 'tab_container' } } });
        }
    };

    return (
        <StyledSidebar className={clsx('sidebar', style === 'left' ? 'left' : 'right')} appearanceStyle={style}
                       extended={extended} panel={panel}>
            <VerticalTabContainer extended={extended && panel === 'tab_container'} />
            {panel === 'bookmarks' && <BookmarksPanel type="sidebar" />}
            {panel === 'history' && <HistoryPanel type="sidebar" />}
            {panel === 'downloads' && <DownloadsPanel type="sidebar" />}
            <StyledToolBarContainer className="tool-bar" extended={extended} panel={panel}>
                <IconButton onClick={() => handleTogglePanelClick('bookmarks')}>
                    <Bookmarks />
                </IconButton>
                <IconButton onClick={() => handleTogglePanelClick('history')}>
                    <History />
                </IconButton>
                <IconButton onClick={() => handleTogglePanelClick('downloads')}>
                    <Download />
                </IconButton>
                <IconButton
                    onClick={handleToggleSidebarClick}
                    sx={{
                        order: style === 'right' && extended && panel === 'tab_container' ? -1 : 0,
                        ml: style === 'left' && extended && panel === 'tab_container' ? 'auto' : 0,
                        mr: style === 'right' && extended && panel === 'tab_container' ? 'auto' : 0
                    }}>
                    {style === 'left' && (extended ? <ChevronLeft /> : <ChevronRight />)}
                    {style === 'right' && (extended ? <ChevronRight /> : <ChevronLeft />)}
                </IconButton>
            </StyledToolBarContainer>
        </StyledSidebar>
    );
};
