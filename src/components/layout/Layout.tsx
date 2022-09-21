import { AppShell } from "@mantine/core";

import Footer from "./Footer";
import Nav from "./Nav";

const links = {
  links: [
    // {
    //   link: "/#features",
    //   label: "Features",
    // },
    // {
    //   link: "/",
    //   label: "Home",
    // },
    // {
    //   link: "/not-found",
    //   label: "Not Found",
    // },
  ],
};

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const Layout = ({ children }: Props) => (
  <AppShell header={<Nav links={links.links} />} padding="md" footer={<Footer />}>
    {children}
  </AppShell>
);

export default Layout;
