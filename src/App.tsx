import { useState } from "react";
import { MantineProvider, ColorSchemeProvider, ColorScheme } from "@mantine/core";
import Router from "routes";
import { useTheme } from "lib";

function App() {
  const { colorscheme } = useTheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(colorscheme);

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
