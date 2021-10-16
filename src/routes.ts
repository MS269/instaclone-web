interface IRoutes {
  [key: string]: string;
}

const routes: IRoutes = {
  home: "/",
  signUp: "/signup",
  profile: "/users/:username",
};

export default routes;
