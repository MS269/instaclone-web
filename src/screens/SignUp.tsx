import { useMutation } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import { FatLink } from "../components/sharedStyles";
import routes from "../routes";
import { IState } from "../types";
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
} from "../__generated__/CreateAccountMutation";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccountMutation(
    $email: String!
    $firstName: String!
    $lastName: String
    $username: String!
    $password: String!
  ) {
    createAccount(
      email: $email
      firstName: $firstName
      lastName: $lastName
      username: $username
      password: $password
    ) {
      ok
      error
    }
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  text-align: center;
  margin-top: 10px;
  font-size: 16px;
`;

function SignUp() {
  const history = useHistory<IState>();
  const [signUpError, setSignUpError] = useState("");

  const { register, handleSubmit, getValues, formState } =
    useForm<CreateAccountMutationVariables>({
      mode: "onChange",
    });

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted: ({ createAccount: { ok, error } }: CreateAccountMutation) => {
      const { username, password } = getValues();
      if (!ok) {
        return setSignUpError(error || "");
      }
      history.push(routes.home, {
        message: "Account created. Please log in.",
        username,
        password,
      });
    },
  });

  const onSubmitValid: SubmitHandler<CreateAccountMutationVariables> = (
    data
  ) => {
    if (loading) {
      return;
    }
    createAccount({ variables: { ...data } });
  };

  const clearLoginError = () => setSignUpError("");

  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            type="text"
            placeholder="Email"
            hasError={Boolean(formState?.errors?.email)}
            {...register("email", { required: "Email is required." })}
          />
          <FormError message={formState?.errors?.email?.message} />
          <Input
            type="text"
            placeholder="First Name"
            hasError={Boolean(formState?.errors?.firstName)}
            {...register("firstName", { required: "First Name is required." })}
          />
          <FormError message={formState?.errors?.firstName?.message} />
          <Input
            type="text"
            placeholder="Last Name"
            {...register("lastName")}
          />
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
            value={loading ? "Loading..." : "Sign up"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={signUpError} />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />
    </AuthLayout>
  );
}

export default SignUp;
