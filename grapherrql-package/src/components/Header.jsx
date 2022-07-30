import { useState } from 'react';
import LoggerBox from './LiveMode/LoggerBox';
import logo from '../images/GraphErrlogo.svg';
import { Logo, StyledHeader } from './LiveMode/styles/Header.styled';
import { StyledBody } from './LiveMode/styles/LoggerBox.styled';
import HeaderItemContainer from './HeaderItemContainer';
import Display from './SandboxMode/Display';

function Header() {
  const [liveMode, setLiveMode] = useState(false);

  const handleToggleClick = () => {
    setLiveMode((previousToggle) => {
      return !previousToggle;
    });
  };

  return (
    <div>
      <StyledHeader>
        <Logo src={logo} alt='Logo' />
        <HeaderItemContainer
          liveMode={liveMode}
          handleToggleClick={handleToggleClick}
        />
      </StyledHeader>
      <StyledBody>{liveMode ? <LoggerBox /> : <Display />}</StyledBody>
    </div>
  );
}

export default Header;
