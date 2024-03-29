import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { BookmarkData, OmitData } from '../../../../../interfaces/user';

export interface BookmarksProps {
    bookmarks: BookmarkData[];
    addBookmark: (data: OmitData<BookmarkData>) => void;
    removeBookmark: (id: string) => void;
    updateBookmark: (id: string, data: OmitData<BookmarkData>) => void;
    reloadBookmarks: () => void;
}

export const BookmarksContext = createContext<BookmarksProps>({
    bookmarks: [],
    addBookmark: () => {
    },
    removeBookmark: () => {
    },
    updateBookmark: () => {
    },
    reloadBookmarks: () => {
    }
});

export const useBookmarksContext = () => useContext(BookmarksContext);

interface BookmarksProviderProps {
    children?: ReactNode;
}

export const BookmarksProvider = ({ children }: BookmarksProviderProps) => {
    const context = useContext(BookmarksContext);

    const [userId, setUserId] = useState('');

    const [bookmarks, setBookmarks] = useState<BookmarkData[]>(context.bookmarks);

    useEffect(() => {
        window.flast.getUser().then(async (id) => {
            if (!id) return;
            setUserId(id);

            try {
                const bookmarkDataList = await window.flast.getBookmarks(id);
                setBookmarks(bookmarkDataList);
            } catch (e) {
                return;
            }
        });
    }, []);

    const addBookmark = async (data: OmitData<BookmarkData>) => {
        try {
            await window.flast.addBookmark(userId, data);
            await reloadBookmarks();
        } catch (e) {
            return;
        }
    };

    const removeBookmark = async (id: string) => {
        const result = await window.flast.removeBookmark(userId, id);
        if (result)
            await reloadBookmarks();
    };

    const updateBookmark = async (id: string, data: OmitData<BookmarkData>) => {
        try {
            const result = await window.flast.updateBookmark(userId, id, data);
            if (result)
                await reloadBookmarks();
        } catch (e) {
            return;
        }
    };

    const reloadBookmarks = async () => {
        try {
            const bookmarkDataList = await window.flast.getBookmarks(userId);
            setBookmarks(bookmarkDataList);
        } catch (e) {
            return;
        }
    };


    const value: BookmarksProps = { bookmarks, addBookmark, removeBookmark, updateBookmark, reloadBookmarks };

    return (
        <BookmarksContext.Provider value={value}>
            {children}
        </BookmarksContext.Provider>
    );
};
