import React, {PureComponent} from "react";
import styled from "styled-components";

const NoItems = styled.div`
  min-height: 40px;
  height: auto;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px;
  justify-content: center;
  color: #cdcdcd;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 22px;
`;

class AccessRights extends PureComponent {

    render() {
        return (
            <NoItems>Доступ запрещен</NoItems>
        )
    }
}

export default AccessRights;
