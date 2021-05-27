import React from "react";
import {Page} from "../../CommonStyledComponents";
import LikedBooks from "../../Page/MyBooks/components/LikedBooks";
import UserBooks from "../../Page/MyBooks/components/UserBooks";

const MyBooks = () => {
    return (
        <Page>
            <UserBooks />
            <LikedBooks />
        </Page>
    )
};

export default MyBooks;