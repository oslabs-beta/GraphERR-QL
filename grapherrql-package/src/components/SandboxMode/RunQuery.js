import { useContext } from 'react';
import { GraphContext } from './Context';
import { BsPlayCircle } from 'react-icons/bs';

const RunQuery = () => {
  const [info, setInfo] = useContext(GraphContext);

  function handleClick(e) {
    e.preventDefault();

    let APIURI = window.location.origin + '/graphql/';

    const handleInput = () => {
      fetch(`${APIURI}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `${info.body}`,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setInfo(() => ({
            ...info,
            response: res.data
          }));
        })
        .catch((err) => {
          setInfo(() => ({
            ...info,
            response: 'Sorry, your request failed',
          }));
        });
    };

    const handleInvalidInput = () => {
      setInfo(() => ({
        ...info,
        response: 'Please start with query or mutation',
      }));
    };

    if (
      info.body.substring(0, 5).toLowerCase() === 'query' ||
      info.body.substring(0, 8).toLowerCase() === 'mutation' ||
      info.body[0] === '{'
    ) {
      handleInput();
    } else {
      handleInvalidInput();
    }
  }

  return (
    <div>
      <BsPlayCircle
        size='4em'
        color='white'
        id='submit'
        type='submit'
        onClick={handleClick}
      />
    </div>
  );
}

export default RunQuery;
