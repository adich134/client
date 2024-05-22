import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { ChatBoard } from "../components/ChatBoard";
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
      setIsLoading(true);
      setChat((prevState) => {
        return [
          ...prevState,
          { text: inputValue, type: "user", iserror: false },
        ];
      });
      setInputValue("");
      let response = await tripService.route(inputValue);
      await wait(800);
      setChat((prevState) => {
        return [
          ...prevState,
          {
            text: response?.createdTrip?.response,
            type: "model",
            iserror: response?.createdTrip?.iserror,
          },
        ];
      });
      // }
      setIsLoading(false);
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
            label="Search for trip..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            fullWidth={true}
            multiline
            maxRows="2"
          />
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
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
  text-align: start;
  overflow: hidden;
  font-size: 40px;
  width: 100%;

  .fotter {
    display: flex;
    > button {
      margin-left: 15px;
    }
  }
`;
