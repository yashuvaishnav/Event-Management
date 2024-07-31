import React from "react";
import { RotatingLines } from "react-loader-spinner";
import styled from "styled-components";

export const Loader = () => {
  return (
    <LoadingDiv>
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </LoadingDiv>
  );
};

const LoadingDiv = styled.div`
margin: 50px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
