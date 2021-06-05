import React from "react";
import styled from "styled-components";
import Button from "../Button/Button";

//region Types
type DotsProps = {
    isActive?: boolean
}

type Props = {
    countOnPage: number,
    currentPage: number,
    countItems: number,
    onChangeCurrentPage: (page: number) => void
}
//endregion

//region Styled
const PaginatorWrapper = styled.div`
    width: 100%;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Dots = styled.div<DotsProps>`
  height: 40px;
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  box-sizing: border-box;
  color: ${props => props.isActive ? "#fff" : "#fff"};
  background-color: ${props => props.isActive && '#00b700'};    
  box-sizing: border-box;
  color: #000;
  border: 1px solid #00b700;
  border-radius: 5px;
  margin-right: 8px;
  `;
//endregion

const Paginator = (props: Props) => {
    const {countOnPage, currentPage, onChangeCurrentPage, countItems} = props;
    const countPage = Math.ceil(countItems/countOnPage);
    return (
        <PaginatorWrapper>
            {
                countPage < 2 ? null :
                    <>
                        <Button title={"<<"}
                                height="40px"
                                onClick={() => currentPage === 1 ? null : onChangeCurrentPage(1)}
                                margin="0 8px 0 0"/>
                        <Button title={"<"}
                                height="40px"
                                onClick={() => currentPage === 1 ? null : onChangeCurrentPage(currentPage-1)}
                                margin="0 8px 0 0"/>
                        {
                            currentPage < 4 ? null :
                                <Dots>...</Dots>
                        }
                        {
                            new Array(countPage).fill(0).map((item, i) => {
                                if (currentPage > 3) {
                                    if ((i+1) < currentPage - 2) {
                                        return null;
                                    }
                                }
                                if (currentPage < countPage-3){
                                    if ((i+1) > currentPage + 2) {
                                        return null;
                                    }
                                }
                                return (
                                    <Button title={`${i+1}`}
                                            key={i}
                                            height="40px"
                                            background={currentPage === (i+1) ? "#51db51" : ""}
                                            onClick={() => currentPage === (i+1) ? null : onChangeCurrentPage(i+1)}
                                            margin="0 8px 0 0"/>
                                )
                            })
                        }
                        {
                            currentPage > countPage-3 ? null :
                                <Dots>...</Dots>
                        }
                        <Button title={">"}
                                height="40px"
                                onClick={() => currentPage === countPage ? null : onChangeCurrentPage(currentPage+1)}
                                margin="0 8px 0 0"/>
                        <Button title={">>"}
                                height="40px"
                                onClick={() => currentPage === countPage ? null : onChangeCurrentPage(countPage)}
                                margin="0 0 0 0"/>
                    </>
            }
        </PaginatorWrapper>
    )
};

export default Paginator;
