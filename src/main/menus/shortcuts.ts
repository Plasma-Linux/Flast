import { includes } from '../../utils';
import { IS_LINUX, IS_MAC, IS_WINDOWS } from '../../utils/process';

export const Shortcuts = {
    TAB_ADD: 'CmdOrCtrl+T',
    TAB_REMOVE: 'CmdOrCtrl+W',
    TAB_DUPLICATE: 'CmdOrCtrl+Shift+D',
    TAB_RESTORE: 'CmdOrCtrl+Shift+T',
    TAB_PREVIOUS: 'Ctrl+Shift+Tab',
    TAB_NEXT: 'Ctrl+Tab',
    TAB_PIN: 'CmdOrCtrl+Shift+P',
    TAB_MUTE: 'CmdOrCtrl+M',
    WINDOW_ADD: 'CmdOrCtrl+N',
    WINDOW_REMOVE: 'CmdOrCtrl+Shift+W',
    WINDOW_INCOGNITO: 'CmdOrCtrl+Shift+N',
    EDIT_SHOW_EMOJI_PANEL: !IS_LINUX ? (IS_WINDOWS ? 'Meta+.' : 'Ctrl+Cmd+Space') : undefined,
    EDIT_UNDO: 'CmdOrCtrl+Z',
    EDIT_REDO: !IS_MAC ? 'Ctrl+Y' : 'Cmd+Shift+Z',
    EDIT_CUT: 'CmdOrCtrl+X',
    EDIT_COPY: 'CmdOrCtrl+C',
    EDIT_PASTE: 'CmdOrCtrl+V',
    EDIT_PASTE_AS_PLAIN_TEXT: 'CmdOrCtrl+Shift+V',
    EDIT_DELETE: 'Delete',
    EDIT_SELECT_ALL: 'CmdOrCtrl+A',
    ZOOM_IN_1: 'CmdOrCtrl+Plus',
    ZOOM_IN_2: 'CmdOrCtrl+NumAdd',
    ZOOM_OUT_1: 'CmdOrCtrl+-',
    ZOOM_OUT_2: 'CmdOrCtrl+NumSub',
    ZOOM_RESET_1: 'CmdOrCtrl+0',
    ZOOM_RESET_2: 'CmdOrCtrl+Num0',
    VIEW_SOURCE: 'CmdOrCtrl+U',
    DEVELOPER_TOOLS_1: 'CmdOrCtrl+Shift+I',
    DEVELOPER_TOOLS_2: 'F12',
    APPLICATION_DEVELOPER_TOOLS: 'CmdOrCtrl+Shift+F12',
    NAVIGATION_SEARCH: 'CmdOrCtrl+Shift+S',
    NAVIGATION_BACK: !IS_MAC ? 'Alt+Left' : 'Cmd+[',
    NAVIGATION_FORWARD: !IS_MAC ? 'Alt+Right' : 'Cmd+]',
    NAVIGATION_RELOAD_1: 'CmdOrCtrl+R',
    NAVIGATION_RELOAD_2: 'F5',
    NAVIGATION_RELOAD_IGNORING_CACHE: 'CmdOrCtrl+Shift+R',
    NAVIGATION_HOME: !IS_MAC ? 'Alt+Home' : 'Cmd+Shift+H',
    NAVIGATION_BOOKMARKS: 'CmdOrCtrl+B',
    NAVIGATION_HISTORY: !IS_MAC ? 'Ctrl+H' : 'Cmd+Y',
    NAVIGATION_DOWNLOADS: 'CmdOrCtrl+D',
    FULLSCREEN: !IS_MAC ? 'F11' : 'Cmd+Ctrl+F',
    TOOLBAR: !IS_MAC ? 'Shift+F11' : 'Cmd+Shift+F',
    SIDEBAR: 'Ctrl+Space',
    SAVE_AS: 'CmdOrCtrl+S',
    PRINT: 'CmdOrCtrl+P',
    FIND_1: 'CmdOrCtrl+F',
    FIND_2: 'F3',
    HELP: 'F1',
    FEEDBACK: 'Alt+Shift+I',
    OPEN_PROCESS_MANAGER: 'Shift+Esc',

    SETTINGS: 'CmdOrCtrl+,'
};

export const replaceShortcut = (key: string) => {
    const isMac = process.type === 'browser' ? IS_MAC : includes(require('platform').os?.family ?? '', 'OS X', true);
    return key.replace('CmdOrCtrl', isMac ? '􀆔' : 'Ctrl')
        .replace('Cmd', '􀆔')
        .replace('Ctrl', isMac ? '􀆍' : 'Ctrl')
        .replace('Alt', isMac ? '􀆕' : 'Alt')
        .replace('Shift', isMac ? '􀆝' : 'Shift')
        .replace('Esc', isMac ? '􀆧' : 'Esc')
        .replace('Escape', isMac ? '􀆧' : 'Escape')
        .replaceAll('+', isMac ? '' : '+');
};
