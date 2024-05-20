import { Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { LoaderWithTitle } from "../ui/LoadingBotton";

interface ChatBoardProps {
  chat: chat[];
  isLoading: boolean;
}

interface chat {
  text: string;
  type: "user" | "model";
  iserror: boolean;
}

export const ChatBoard: React.FC<ChatBoardProps> = ({ chat, isLoading }) => {
  return (
    <Board>
      {!!chat.length &&
        chat.map((item: chat, index: number) => {
          if (item.iserror) {
            return (
              <ChatItem
                key={`${index}`}
                isuser={item.type}
                iserror={item.iserror}
              >
                <Typography variant="body1">
                  There was an error on trip validation
                </Typography>
              </ChatItem>
            );
          }
          return (
            <ChatItem
              key={`${item.text}-${index}`}
              isuser={item.type}
              iserror={item.iserror}
            >
              <Typography variant="body1">{item.text}</Typography>
            </ChatItem>
          );
        })}
      {isLoading && <LoaderWithTitle title="Loading..." />}
    </Board>
  );
};

const Board = styled.div`
  height: 550px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const ChatItem = styled.div<{ isuser: string; iserror: boolean }>`
  color: ${({ isuser, iserror }) =>
    isuser === "user" ? "blue" : iserror ? "red" : "green"};
  maxWidth: '60%',
  padding: '12px 16px',
  margin: '8px 0',
  alignSelf: ${({ isuser }) => (isuser === "user" ? "flex-end" : "flex-start")},
  backgroundColor: ${({ isuser }) =>
    isuser === "user" ? "#007bff" : "#e0e0e0"},
  wordWrap: 'break-word',
  whiteSpace: 'pre-wrap',
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
  border: 1px solid black;
  border-radios: 3px;
`;
