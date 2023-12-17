import Scene from "./components/Scene";
import { MainProvider } from "./context/mainContext";

import "./styles/global.scss";

export default function App() {
  return (
    <MainProvider>
      <Scene />
    </MainProvider>
  );
}
