import { useQuery, useReactiveVar } from "@apollo/client";
import gql from "graphql-tag";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { isLoggedInVar, logUserOut } from "../apollo";
import { IState } from "../types";
import { MeQuery } from "../__generated__/MeQuery";

const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      username
      avatar
    }
  }
`;

function useUser() {
  const history = useHistory<IState>();
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery<MeQuery>(ME_QUERY, { skip: !hasToken });

  useEffect(() => {
    if (data?.me === null) {
      logUserOut(history);
    }
  }, [data, history]);

  return { data };
}

export default useUser;
