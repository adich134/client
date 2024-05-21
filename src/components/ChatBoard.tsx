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
          return (
            <>
              <div className="chat-user">{item.type}</div>
              <ChatItem
                key={`${item.text}-${index}`}
                isuser={item.type}
                iserror={item.iserror}
              >
                {item.text}
              </ChatItem>
            </>
          );
        })}
      {isLoading && <LoaderWithTitle title="Loading..." />}
    </Board>
  );
};

const Board = styled.div`
  max-height: 620px;
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  width: 100%;

  .chat-user {
    position: relative;
    top: -5;
    left: 0;
    font-size: 13px;
  }
`;

const ChatItem = styled.div<{ isuser: string; iserror: boolean }>`
  color: ${({ isuser, iserror }) =>
    isuser === "user" ? "blue" : iserror ? "red" : "green"};
  padding: 12px 16px;
  font-size: 15px;
  margin: 8px 0;
  backgroundcolor: ${({ isuser }) =>
    isuser === "user" ? "#007bff" : "#e0e0e0"};
  wordwrap: break-word;
  whitespace: pre-wrap;
  boxshadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  border: 1px solid #e0e0e0;
  border-radius: 50px;
  // width: 100%;
`;
