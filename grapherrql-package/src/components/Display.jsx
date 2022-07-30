
import ResponseBox from './ResponseBox';
import QueryBox from './QueryBox';
import { DisplaySandbox, QuerySandbox, ResponseSandbox } from './LiveMode/styles/Display.styled';

export default function Display() {
  return (
    <div>
      <DisplaySandbox>
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
