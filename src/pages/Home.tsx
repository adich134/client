import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ChatBoard } from "../components/ChatBoard";
import { useDebounce } from "../hooks/useDebounce";
import { tripService } from "../services/tripService";

interface HomeProps {}

interface chat {
  text: string;
  type: "user" | "model";
  iserror: boolean;
}

const wait = (amount = 0) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export const Home: React.FC<HomeProps> = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [chat, setChat] = useState<chat[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      setChat((prevState) => {
        return [
          ...prevState,
          { text: inputValue, type: "user", iserror: false },
        ];
      });
      setInputValue("");
      let response = await tripService.route(inputValue);
      // response = JSON.parse(response)
      console.log("response lll ", response)
      await wait(200);
      // if (!response.response) {
      setChat((prevState) => {
        return [
          ...prevState,
          {
            text: response.createdTrip.response,
            type: "model",
            iserror: !response.isValidResponse,
          },
        ];
      });
      // }
      setIsLoading(false)

    } catch (error) {
      console.error("Error sending data to server:", error);
    }
  };
  return (
    <ContainerGrid container style={{ height: "85vh", width: "100vh" }}>
      <Grid item xs={12} style={{ height: "75vh" }}>
        <ChatBoard chat={chat} isLoading={isLoading} />
      </Grid>
      <Grid item xs={12} style={{ height: "20vh" }}>
        <div className="fotter">
          <TextField
            autoFocus
            label="Search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            style={{ marginLeft: "10px" }}
            disabled={!inputValue}
          >
            Submit
          </Button>
        </div>
      </Grid>
    </ContainerGrid>
  );
};

const ContainerGrid = styled(Grid)`
  margin: 20px auto;
  text-align: center;
  overflow: hidden;
  font-size: 40px;

  .fotter {
    width: 100%;
  }
`;
