import { React, useState, useContext } from 'react';
import styled from 'styled-components';
import { LiveContext } from '../LiveMode/liveContext';

const DataContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const IncomingDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ErrorsDispay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const QueryDisplay = styled.div`
  display: flex;
  font-weight: 900;
  
`;
const ResponseDisplay = styled.div`
  display: flex;
`;
// import LoggerResponse from './LoggerResponse';
// import { Button } from './styles/LoggerBox.styled.js';
//
// import { mockData } from './mockData';

function LoggerBox() {
  // const [arrayIndex, setArrayIndex] = useState(0);
  // const [responseArray, setResponseArray] = useState([]);
  const { liveQuery, liveResponse } = useContext(LiveContext);

  // const updateIndex = () => {
  //   if (arrayIndex < 5) {
  //     setArrayIndex((num) => num + 1);

  //     setResponseArray((resArray) => [
  //       ...resArray,
  //       <LoggerResponse
  //         key={arrayIndex}
  //         // successfail={mockData[arrayIndex].success}
  //         query={liveQuery}
  //         response={liveResponse}
  //       />,
  //     ]);
  //   }
  // };

  return (
    <>
      <DataContainer>
        <IncomingDataContainer>
          <QueryDisplay>{liveQuery}</QueryDisplay>
          <ResponseDisplay>{liveResponse}</ResponseDisplay>
        </IncomingDataContainer>
        <ErrorsDispay />
      </DataContainer>

      {/* <Button
        onClick={() => {
          updateIndex();
        }}
      >
        <strong>Simulate Query!</strong>
      </Button>
      <div>{responseArray}</div> */}
    </>
  );
}
export default LoggerBox;