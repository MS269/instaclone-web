import { useQuery, useReactiveVar } from "@apollo/client";
import gql from "graphql-tag";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { isLoggedInVar, logUserOut } from "../../apollo";
import { IState } from "../../types";

const ME_QUERY = gql`
  query MeQuery {
    me {
      username
      avatar
    }
  }
`;

function useUser() {
  const history = useHistory<IState>();
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery(ME_QUERY, { skip: !hasToken });
  console.log(data);

  useEffect(() => {
    if (data?.me === null) {
      logUserOut(history);
    }
  }, [data, history]);

  return;
}

export default useUser;
