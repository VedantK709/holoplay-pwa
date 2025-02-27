import { QueryClientProvider } from "react-query";
import { Box, createStyles, Flex, ScrollArea } from "@mantine/core";
import { Header } from "./Header";
import { queryClient } from "../queryClient";
import { SettingsProvider } from "../providers/Settings";
import { SearchProvider } from "../providers/Search";
import { Main } from "./Main";
import i18n from "i18next";
import { ColorSchemeProvider } from "../providers/ColorScheme";
import { MantineProvider } from "../providers/Mantine";
import { FavoriteProvider } from "../providers/Favorite";
import { Notifications } from "@mantine/notifications";
import { PlaylistProvider } from "../providers/Playlist";
import { PlayerProvider } from "../providers/Player";
import { PlayerPlaylistProvider } from "../providers/PlayerPlaylist";
import { NavigationContainer } from "../containers/Navigation";
import { PlayerContainer } from "../containers/Player";
import { DrawerPlayerContainer } from "../containers/DrawerPlayer";
import { PreviousNextTrackProvider } from "../providers/PreviousNextTrack";
import { HistoryProvider } from "../providers/History";
import { SpotlightProvider } from "../providers/Spotlight";
import { AppUpdate } from "./AppUpdate";
import { I18nextProvider } from "react-i18next";
import { MobileNavigationContainer } from "../containers/MobileNavigation";
import { PlayerModeProvider } from "../providers/PlayerMode";
import { TrendingFiltersProvider } from "../providers/TrendingFilters";

const useStyles = createStyles(() => ({
  scrollArea: {
    flex: 1,
    height: "100vh",
  },
}));

interface AppProps {
  children: React.ReactNode;
}

export const App: React.FC<AppProps> = ({ children }) => {
  const { cx, classes } = useStyles();

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <SettingsProvider>
          <SearchProvider>
            <TrendingFiltersProvider>
              <FavoriteProvider>
                <PlaylistProvider>
                  <PlayerProvider>
                    <PreviousNextTrackProvider>
                      <PlayerPlaylistProvider>
                        <PlayerModeProvider>
                          <HistoryProvider>
                            <ColorSchemeProvider>
                              <MantineProvider>
                                <SpotlightProvider>
                                  <Notifications />
                                  <Flex>
                                    <NavigationContainer />
                                    <ScrollArea
                                      className={cx(classes.scrollArea)}
                                      style={{
                                        position: "static",
                                      }} // Stay in inline-styles for now
                                    >
                                      <Flex>
                                        <Box style={{ flex: 1 }}>
                                          <Header />
                                          <Main>{children}</Main>
                                          <MobileNavigationContainer />
                                        </Box>
                                        <DrawerPlayerContainer />
                                      </Flex>
                                      <PlayerContainer />
                                    </ScrollArea>
                                  </Flex>
                                </SpotlightProvider>
                              </MantineProvider>
                            </ColorSchemeProvider>
                          </HistoryProvider>
                        </PlayerModeProvider>
                      </PlayerPlaylistProvider>
                    </PreviousNextTrackProvider>
                  </PlayerProvider>
                </PlaylistProvider>
              </FavoriteProvider>
            </TrendingFiltersProvider>
          </SearchProvider>
        </SettingsProvider>
        <AppUpdate />
      </QueryClientProvider>
    </I18nextProvider>
  );
};
