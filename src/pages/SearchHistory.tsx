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
      <ul>
        {trips.map((item, index) => {
          console.log("itemitemitemitem ", item)
          if (item.iserror) {
            return (
              <ChatItem key={`${index}`} iserror={item.iserror}>
                <ChatItem>There was an error on trip validation</ChatItem>
              </ChatItem>
            );
          }
          return (
            <ChatItem key={index}>
              <strong>{item.query}</strong> : {item.response}
            </ChatItem>
          );
        })}
      </ul>
    </Container>
  );
};

const Container = styled.div`
  height: 550px;
  overflow-x: hidden;
  margin: 20px auto;
  text-align: flex-start;
  overflow: hidden;
`;

const ChatItem = styled.li<{ iserror?: boolean }>`
  color: ${({ iserror }) => (iserror ? "red" : "green")};
  maxWidth: '60%',
  padding: '12px 16px',
  margin: '8px 0',
  
  wordWrap: 'break-word',
  whiteSpace: 'pre-wrap',
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
  border: 1px solid black;
  border-radios: 3px;
`;
