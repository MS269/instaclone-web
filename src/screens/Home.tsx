import { useHistory } from "react-router";
import { logUserOut } from "../apollo";
import { IState } from "../types";

function Home() {
  const history = useHistory<IState>();

  return (
    <div>
      <h1>Welcome!</h1>
      <button onClick={() => logUserOut(history)}>Log out Now!</button>
    </div>
  );
}

export default Home;
