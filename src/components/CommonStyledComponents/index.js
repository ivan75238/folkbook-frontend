import styled from "styled-components";

export const Page = styled.div`
    width: 100%;
    height: auto;
    padding: 16px;
`;

export const Table = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
`;

export const Row = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    border-bottom: 1px solid #cdcdcd;
    padding: 8px 0;
    cursor: ${props => props.isCursorPointer ? "pointer" : "default"};
`;

export const Column = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    font-weight: ${props => props.isHeader ? "bold" : ""};
`;

export const TableName = styled.p`
    margin-bottom: 4px;
`;