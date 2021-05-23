import React from "react";
import styled from "styled-components";
import {LoaderSvg} from "./LoaderSvg";

//region Styled
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;    
    background: rgba(0,0,0, 0.5);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
`;

const Label = styled.p`
    font-family: Roboto,sans-serif;
    font-size: 18px;
    text-transform: uppercase;
    font-weight: 600; 
    color: #fff;
`;

const LoaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
`;
//endregion

const Loader = () => {
    return (
        <Wrapper>
            <Label>Загрузка</Label>
            <LoaderWrapper>
                <LoaderSvg />
            </LoaderWrapper>
        </Wrapper>
    )
};

export default Loader;
