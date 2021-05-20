import React from "react";
import {Page} from "components/CommonStyledComponents";
import LikedBooks from "components/Page/MyBooks/components/LikedBooks";
import UserBooks from "components/Page/MyBooks/components/UserBooks";

const MyBooks = () => {
    return (
        <Page>
            <UserBooks />
            <LikedBooks />
        </Page>
    )
};

export default MyBooks;