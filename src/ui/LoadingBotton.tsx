import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";

interface ChatBoardProps {
  title: string;
  size?: number;
}

export const LoaderWithTitle: React.FC<ChatBoardProps> = ({
  title,
  size = 15,
}) => {
  return (
    <Container>
      <CircularProgress size={size} />
      <div className="title">{title}</div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  > .title {
    font-size: 16px;
    color: white;
    padding: 25px;
  }
`;
