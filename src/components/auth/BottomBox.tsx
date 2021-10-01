import { Link } from "react-router-dom";
import styled from "styled-components";
import { BaseBox } from "../sharedStyles";

interface IProps {
  cta: string;
  link: string;
  linkText: string;
}

const SBottomBox = styled(BaseBox)`
  text-align: center;
  padding: 20px 0px;
  a {
    margin-left: 5px;
    color: ${(props) => props.theme.accent};
    font-weight: 600;
  }
`;

function BottomBox({ cta, link, linkText }: IProps) {
  return (
    <SBottomBox>
      <span>{cta}</span>
      <Link to={link}>{linkText}</Link>
    </SBottomBox>
  );
}

export default BottomBox;
