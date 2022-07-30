
import ResponseBox from './ResponseBox';
import QueryBox from './QueryBox';
import APIInput from './RunQuery'
import { DisplaySandbox, QuerySandbox, ResponseSandbox } from '../LiveMode/styles/Display.styled';

export default function Display() {
  return (
    <div>
      <DisplaySandbox>
        <APIInput/>
        <QuerySandbox>
          <QueryBox />
        </QuerySandbox>
        <ResponseSandbox>
          <ResponseBox />
        </ResponseSandbox>
      </DisplaySandbox>
    </div>
  );
}
