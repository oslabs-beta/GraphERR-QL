import { useContext } from 'react';

import { LiveContext } from '../LiveMode/LiveContext';
import {
  StyledSuccessNoResponse,
  DataContainer,
  IncomingDataContainer,
  TextContainer,
  ErrorTextContainer,
  CurrentQueryResponse,
} from './styles/LoggerResponse.styled';

function LoggerBox() {
  const { liveQuery, liveResponse, dataLog } = useContext(LiveContext);

  // TODO
  // const errorList = [];

  // if (liveResponse.errors) {
  //   let i = 0;
  //   liveResponse.errors.forEach((error) => {
  //     errorList.push(<ErrorItem key={i}>{JSON.stringify(error)}</ErrorItem>);
  //   });
  // }
  const groupQueryResponse = (arr) => {
    const result = [];
    let i = 0;
    while (i < arr.length) {
      const innerArray = [];
      innerArray.push(arr[i]);
      ++i;
      innerArray.push(arr[i]);
      result.push(innerArray);
      i++;
    }
    return result;
  };

  const groupedQueryResponses = groupQueryResponse(dataLog);

  const displayDataLog = groupedQueryResponses.map((qR) => {
    const queryResponse = qR.map((item) => {
      //for this return, if string is query give it a style component that is clickable
      //if string is success response (data) then give it style component with success border - this container appears if query is clicked
      // if the response string is an error (message) then give it the style component with error border
      //can we discern in the query if it is an error? or is there a way to check if query's child component is an error and give it a border based on that?
      return (
        <>
          {String(item).slice(2, 7) === 'query' ? (
            <TextContainer>
              <p>{item}</p>
            </TextContainer>
          ) : String(item).slice(2, 9) === 'message' ? (
            <ErrorTextContainer>
              <p>{item}</p>
            </ErrorTextContainer>
          ) : (
            <TextContainer>
              <p>{item}</p>
            </TextContainer>
          )}
          {/* <>{item}</>{' '} */}
          {/*should be a styled query container, onClick will trigger if response will show or hide */}
          {/* <div>
           ************** */}
          {/*should be a styled response container with state for show: true or false */}
          {/* </div> */}
        </>
      );
    });
    return (
      <>
        <div></div>
        <StyledSuccessNoResponse>{queryResponse}</StyledSuccessNoResponse>
      </>
    );
  });
  return (
    <>
      <DataContainer>
        <IncomingDataContainer>
          <CurrentQueryResponse>
            <TextContainer>
              <p>{liveQuery}</p>
            </TextContainer>
            {String(liveResponse).slice(2, 9) === 'message' ? (
              <ErrorTextContainer>{liveResponse}</ErrorTextContainer>
            ) : (
              <TextContainer>
                <p>{liveResponse}</p>
              </TextContainer>
            )}
          </CurrentQueryResponse>
          <h3>data log:</h3>
          <p>{displayDataLog}</p>
        </IncomingDataContainer>
        {/* <ErrorsDispay>
          <h3>THIS IS A TEST</h3>
        </ErrorsDispay> */}
      </DataContainer>
    </>
  );
}
export default LoggerBox;
