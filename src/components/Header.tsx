import { useReactiveVar } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCompass, faUser } from "@fortawesome/free-regular-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import routes from "../routes";
import useUser from "./hooks/useUser";

const SHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.bgColor};
  width: 100%;
  padding: 18px 0px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 930px;
  width: 100%;
`;

const Column = styled.div``;

const Icon = styled.span`
  margin-left: 15px;
`;

const Button = styled.span`
  background-color: ${(props) => props.theme.accent};
  padding: 4px 15px;
  border-radius: 4px;
  color: white;
  font-weight: 600;
`;

function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  useUser();

  return (
    <SHeader>
      <Wrapper>
        <Column>
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </Column>
        <Column>
          {isLoggedIn ? (
            <>
              <Icon>
                <FontAwesomeIcon icon={faHome} size="lg" />
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faCompass} size="lg" />
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faUser} size="lg" />
              </Icon>
            </>
          ) : (
            <Link to={routes.home}>
              <Button>Login</Button>
            </Link>
          )}
        </Column>
      </Wrapper>
    </SHeader>
  );
}

export default Header;