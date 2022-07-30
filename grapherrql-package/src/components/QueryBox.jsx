import { useContext } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { GraphContext } from './Context';
// import CodeMirror from 'codemirror';
// import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material.css'
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/lint/lint';
import 'codemirror-graphql/hint';
import 'codemirror-graphql/lint';
import 'codemirror-graphql/mode';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/addon/edit/closebrackets';

const QueryEditor = () => {
  const [info, setInfo] = useContext(GraphContext);

  // const DEFAULT_JSX_OPTIONS = {
  //   theme: 'custom-0',
  //   autoCloseBrackets: true,
  //   cursorScrollMargin: 48,
  //   mode: 'graphql',
  //   lineNumbers: true,
  //   indentUnit: 2,
  //   tabSize: 2,
  //   styleActiveLine: true,
  //   viewportMargin: 99,
  //   placeholder: 'Enter query or mutation'
  // };

 const handleChange = (editor, data, value) => {
   setInfo(() => ({
     ...info,
     body: value,
   }));
 };

  return (
    <>
      <CodeMirror
        value={info.body}
        options={{
          mode: 'graphql',
          lineNumbers: true,
        }}
        onBeforeChange={handleChange}
        // onChange={(editor, metadata, value) => {
        //   // final value, no need to setState here
        // }}
      />
    </>
  );
};

export default QueryEditor;


// import LMInputBox from './LMInputBox';
// import LMResponseBox from './LMResponseBox';
// import { StyledLMInputBox } from './styles/LMInputBox.styled.js';
// import { StyledLMResponseBox } from './styles/LMOutputBox.styled.js';
// import { ValidationContext, SDLValidationContext } from 'graphql';
// import CodeMirror from 'codemirror';
// import React from 'react';
// import 'codemirror/addon/hint/show-hint';
// import 'codemirror/addon/lint/lint';
// import 'codemirror-graphql/hint';
// import 'codemirror-graphql/lint';
// import 'codemirror-graphql/mode';

// // import {schema} from './server.js'
// const {
//   GraphQLSchema,
//   GraphQLObjectType,
//   GraphQLString,
//   //   GraphQLList,
//   //   GraphQLInt,
//   //   GraphQLNonNull,
// } = require('graphql');

// const schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'HelloWorld',
//     fields: () => ({
//       message: {
//         type: GraphQLString,
//         resolve: () => 'Hello World from resolver',
//       },
//     }),
//   }),
// });

// class QueryBox extends React.Component {
//   constructor(props) {
//     super(props);
//     this.textInput = React.createRef();
//     this.state = { value: '' };
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   componentDidMount() {
//     CodeMirror.fromTextArea(this.textInput.current, {
//       mode: 'graphql',
//       lint: {
//         schema: schema,
//         validationRules: [ExampleRule],
//       },
//       hintOptions: {
//         schema: schema,
//       },
//     });
//   }

//   handleChange(event) {
//     this.setState({ value: event.target.value });
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     console.log('event submitted');
//   }

//   render() {
//     // const ref = this.textInput.current

//     return (
//       <form onSubmit={this.handleSubmit}>
//         <textarea
//           ref={this.textInput}
//           cols='50'
//           rows='20'
//           value={this.state.value}
//           onChange={this.handleChange}
//         />
//         <input type='submit' value='Run Query' />
//       </form>
//     );
//   }
// }

//didn't work:
// const root = document.getElementById('root');
// const textEl = document.createElement('textarea')
// root.appendChild(textEl)

//didn't work: (from video- https://medium.com/codex/failing-to-add-codemirror-6-and-then-succeeding-cb4d6d2dcfa2
//<HTMLELEMENT> (initialValue: null)

//use refs and component did mount? https://egghead.io/lessons/react-manipulate-the-dom-with-react-refs

//could need to use ShadowDOM? (don't know enough about it)

// function QueryBox() {
//   return (
//     CodeMirror.fromTextArea(textEl, {
//       mode: 'graphql',
//       lint: {
//         schema: schema,
//         // validationRules: [ExampleRule],
//       },
//       hintOptions: {
//         schema: schema,
//       },
//     })
//   );
// }

// <div>
//   <StyledLMInputBox>
//     <LMInputBox />
//   </StyledLMInputBox>
//   &nbsp; &nbsp; &nbsp;
//   <StyledLMResponseBox>
//     <LMResponseBox />
//   </StyledLMResponseBox>
// </div>

// export default QueryBox;
