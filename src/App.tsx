import { MantineProvider } from "@mantine/core";
import { useTheme } from "lib";
import Router from "routes";

function App() {
  const { colorscheme } = useTheme();

  return (
    <MantineProvider
      theme={{ colorScheme: colorscheme }}
      withGlobalStyles
      withNormalizeCSS>
      <Router />
    </MantineProvider>
  );
}

export default App;
