import styled from "styled-components";

const SSeparator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 20px 0px 30px 0px;
  text-transform: uppercase;
  div {
    background-color: ${(props) => props.theme.borderColor};
    width: 100%;
    height: 1px;
  }
  span {
    margin: 0px 10px;
    color: #8e8e8e;
    font-size: 12px;
    font-weight: 600;
  }
`;

function Separator() {
  return (
    <SSeparator>
      <div></div>
      <span>Or</span>
      <div></div>
    </SSeparator>
  );
}

export default Separator;
