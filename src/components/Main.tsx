import { createStyles, rem } from "@mantine/core";
import { PlayerSpace } from "./Player";

const useStyles = createStyles((theme) => ({
  main: {
    flex: 1,
    padding: `${rem(16)} ${rem(20)} ${rem(24)}`,

    [`@media screen and (max-width: ${theme.breakpoints.md})`]: {
      minHeight: "calc(100vh - 128px)",
    },

    [`@media screen and (min-width: ${theme.breakpoints.md})`]: {
      paddingRight: rem(28),
      paddingLeft: rem(28),
    },
  },
}));

interface MainProps {
  children: React.ReactNode;
}

export const Main: React.FC<MainProps> = ({ children }) => {
  const { classes } = useStyles();

  return (
    <main className={classes.main}>
      {children}
      <PlayerSpace />
    </main>
  );
};
