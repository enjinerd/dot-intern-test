import {
  ActionIcon,
  Burger,
  Container,
  createStyles,
  Group,
  Header,
  Image,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMoonStars, IconSun } from "@tabler/icons";
import { useTheme } from "lib";
import { useState } from "react";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[8],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
    },
  },

  container: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    backdropFilter: "blur(9px)",
    alignItems: "center",
  },

  burgerLinks: {
    display: "flex",
    flexDirection: "row",
    alignItems: "space-between",
    padding: theme.spacing.xl,
  },

  burgerLink: {
    display: "block",
    lineHeight: 1,
    padding: "4px 8px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[8],
    fontSize: theme.fontSizes.sm,
    fontWeight: 800,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
  dark: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
}));

interface HeaderSimpleProps {
  links: { link: string; label: string }[];
}

const Nav = ({ links }: HeaderSimpleProps) => {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState("");
  const { classes, cx } = useStyles();
  const { colorscheme, setColorscheme } = useTheme();
  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={() => {
        setActive(link.link);
      }}>
      {link.label}
    </a>
  ));

  return (
    <Header height={60} mb={120} className={classes.container}>
      <Container className={classes.header}>
        <Link to="/">
          <Image
            height={40}
            width={80}
            radius="md"
            src={colorscheme === "dark" ? "logo-dark.png" : "logo-light.png"}
            alt="brand logo"
          />
        </Link>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        <ActionIcon
          variant="outline"
          color={colorscheme === "dark" ? "yellow" : "blue"}
          onClick={() => setColorscheme(colorscheme === "dark" ? "light" : "dark")}
          title="Toggle color scheme"
          className={classes.dark}>
          {colorscheme === "dark" ? <IconSun size={18} /> : <IconMoonStars size={18} />}
        </ActionIcon>
        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
      </Container>
      {opened && (
        <Group position="center" className={classes.burger}>
          {items.map((item) => (
            <Text key={item.key} className={classes.burgerLink}>
              {item}
            </Text>
          ))}
          <ActionIcon
            variant="outline"
            color={colorscheme === "dark" ? "yellow" : "blue"}
            onClick={() => setColorscheme(colorscheme === "dark" ? "light" : "dark")}
            title="Toggle color scheme">
            {colorscheme === "dark" ? <IconSun size={18} /> : <IconMoonStars size={18} />}
          </ActionIcon>
        </Group>
      )}
    </Header>
  );
};

export default Nav;
