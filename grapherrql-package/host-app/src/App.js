import './App.css';
import React, { useState } from 'react';


import styled from 'styled-components';
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: black;
  border: 2px solid black;
`;

const ResponseData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  min-height: 85vh;
`;

const BOOKS_QUERY = `
{
  books {
    name
    id
  }
}
`;
const AUTHORS_QUERY = `
{
  authors {
    name
  }
}
`;

const AUTHORS_BDAY_QUERY = `

{
  authors {
    birthday
  }
}`;

function App() {


  const [response, setResponse] = useState([]);
  const [birthday, setBirthday] = useState({});

  const queryBooks = () => {
    fetch('http://localhost:3001/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: BOOKS_QUERY }),
    })
      .then((response) => response.json())
      .then((data) => setResponse(data));
  };
  const queryAuthors = () => {
    fetch('http://localhost:3001/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: AUTHORS_QUERY }),
    })
      .then((response) => response.json())
      .then((data) => setResponse(data));
  };
  const queryAuthorsBday = () => {
    fetch('http://localhost:3001/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: AUTHORS_BDAY_QUERY }),
    })
      .then((response) => response.json())
      .then((data) => setResponse(data));
  };

  const queryAuthorsBday2 = () => {
    fetch('http://localhost:3001/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: AUTHORS_BDAY_QUERY }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('BIRTHDAY OBJ: ', data);
        setBirthday(data);
      });
  };

  const resetBirthdayState = () => {
    setBirthday({});
  };

  return (
    <div>
      <MainContainer>
        <ButtonContainer>
          <Button onClick={queryBooks}>Fetch Books</Button>
          <Button onClick={queryAuthors}>Fetch Authors</Button>
          <Button onClick={queryAuthorsBday}>Fetch an ERROR</Button>
          <Button onClick={queryAuthorsBday2}>
            Fetch an ERROR - Real World
          </Button>
          <Button onClick={resetBirthdayState}>Reset Birthday State</Button>
        </ButtonContainer>

        <ResponseData>
          {birthday.errors ? (
            <>
              <h2>The Author's birthday is: </h2>
              <p>{birthday.day}</p>
            </>
          ) : (
            JSON.stringify(response)
          )}
        </ResponseData>
      </MainContainer>
    </div>
  );
}

export default App;
