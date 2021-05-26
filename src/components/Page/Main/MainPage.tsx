import React from "react";
import {Page} from "../../CommonStyledComponents";
import NewBooks from "../../Page/Main/NewBooks";
import UserBooks from "../../Page/Main/UserBooks";

export const MainPage = () => {
    return (
        <Page>
            <NewBooks />
            <UserBooks />
        </Page>
    )
};
