import styled from 'react-emotion';

export const SideBarWrapper = styled.div`
  background-color: #3a405a;
  height: 100vh;
  color: #FFFFFF;
  position: fixed;
  
  ul li {
    padding: 0.5em 2em;
  }
  
  ul li:first-child { text-align: center; }
  ul li:first-child a { display: block; font-size: 70%; }

  a { color: #FFFFFF; }
  
  img {
    max-width: 100px;
    border-radius: 50%;
    padding-top: 1em;
  }
`;