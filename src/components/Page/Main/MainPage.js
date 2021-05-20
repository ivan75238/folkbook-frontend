import React from "react";
import {Page} from "components/CommonStyledComponents";
import NewBooks from "components/Page/Main/NewBooks";
import UserBooks from "components/Page/Main/UserBooks";

export const MainPage = () => {
    return (
        <Page>
            <NewBooks />
            <UserBooks />
        </Page>
    )
};
