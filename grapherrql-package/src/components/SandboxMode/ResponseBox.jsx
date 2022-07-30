import { useContext } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { GraphContext } from './Context';
import 'codemirror/mode/javascript/javascript'
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/lint/lint';
import 'codemirror-graphql/hint';
import 'codemirror-graphql/lint';
import 'codemirror-graphql/mode';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/addon/edit/closebrackets';

import ('codemirror/mode/xml/xml');



function ResponseBox() {
    const [info, setInfo] = useContext(GraphContext);

  return (
    <>
      <CodeMirror
        className='response-display'
        value={info.response ? JSON.stringify(info.response, null, 2) : null}
        options={{
          mode: 'javascript',
          lineNumbers: true,
        }}
        onBeforeChange={(editor, metadata, value) => {
          value = info.response;
        }}
        onChange={(editor, metadata, value) => {
          value = info.response;
        }}
      />
    </>
  );
}

export default ResponseBox
