import { AppShell } from "@mantine/core";
import Nav from "./Nav";
import Footer from "./Footer";

const links = {
  links: [
    // {
    //   link: "/#features",
    //   label: "Features",
    // },
    {
      link: "/",
      label: "Home",
    },
    {
      link: "/not-found",
      label: "Not Found",
    },
  ],
};

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const Layout = ({ children }: Props) => (
  <AppShell header={<Nav links={links.links} />} footer={<Footer />} padding="md">
    {children}
  </AppShell>
);

export default Layout;
