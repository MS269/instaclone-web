import { useMutation } from "@apollo/client";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation } from "react-router";
import styled from "styled-components";
import { logUserIn } from "../apollo";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import Notification from "../components/auth/Notification";
import Separator from "../components/auth/Separator";
import PageTitle from "../components/PageTitle";
import routes from "../routes";
import { IState } from "../types";

interface ILoginFormInput {
  username: string;
  password: string;
  response?: null;
}

interface ILoginFormResponse {
  login: {
    ok: boolean;
    token?: string;
    error?: string;
  };
}

const LOGIN_MUTATION = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

function Login() {
  const location = useLocation<IState>();

  const { register, handleSubmit, setError, clearErrors, formState } =
    useForm<ILoginFormInput>({
      mode: "onChange",
      defaultValues: {
        username: location?.state?.username || "",
        password: location?.state?.password || "",
      },
    });

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: ({ login: { ok, error, token } }: ILoginFormResponse) => {
      if (!ok) {
        return setError("response", { message: error });
      }
      if (!token) {
        return setError("response", { message: "Token not received." });
      }
      logUserIn(token);
    },
  });

  const onSubmitValid: SubmitHandler<ILoginFormInput> = (data) => {
    if (loading) {
      return;
    }
    login({ variables: { ...data } });
  };

  const clearLoginError = () => clearErrors("response");

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <FontAwesomeIcon icon={faInstagram} size="3x" />
        <Notification message={location?.state?.message} />
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            type="text"
            placeholder="Username"
            hasError={Boolean(formState?.errors?.username)}
            {...register("username", {
              required: "Username is required.",
              minLength: {
                value: 5,
                message: "Username should be longer than 5 characters.",
              },
              onChange: clearLoginError,
            })}
          />
          <FormError message={formState?.errors?.username?.message} />
          <Input
            type="password"
            placeholder="Password"
            hasError={Boolean(formState?.errors?.password)}
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 5,
                message: "Password should be longer than 5 characters.",
              },
              onChange: clearLoginError,
            })}
          />
          <FormError message={formState?.errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Log in"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={formState?.errors?.response?.message} />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        linkText="Sign up"
        link={routes.signUp}
      />
    </AuthLayout>
  );
}

export default Login;
