import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { tripService } from "../services/tripService";

interface SearchHistoryProps {}
interface Trip {
  query: string;
  response: string;
  iserror: boolean;
}
export const SearchHistory: React.FC<SearchHistoryProps> = () => {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await tripService.getLastSearches();
        if (response) {
          setTrips(response);
        }
      } catch (error) {
        console.error("Error fetching recent trips:", error);
      }
    };

    fetchTrips();
  }, []);

  return (
    <Container>
      <h2>Recent Trips</h2>
      <ol>
        {trips.map((item, index) => {
          return (
            <ChatItem key={`${index}`} iserror={item.iserror}>
              <strong>{item.query}</strong> : {item.response}
            </ChatItem>
          );
        })}
      </ol>
    </Container>
  );
};

const Container = styled.div`
  height: 85vh;
  line-height: 30px;
  width: 100vh;
  margin: 20px auto;
  text-align: start;
  overflow-x: auto;
`;

const ChatItem = styled.li<{ iserror: boolean }>`
  color: ${({ iserror }) => (iserror ? "red" : "green")};
  maxwidth: 60%;
  padding: 12px 16px;
  margin: 8px 0;
  wordwrap: break-word;
  whitespace: pre-wrap;
`;
