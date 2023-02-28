import {
  Box,
  createStyles,
  Flex,
  Kbd,
  Select,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { memo, useRef } from "react";
import { IconAdjustmentsAlt, IconSearch } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import {
  useSearchData,
  useSearchValues,
  useSetSearchValues,
} from "../providers/Search";
import { useNavigate } from "react-router-dom";
import { Search, SearchTypes } from "../types/interfaces/Search";
import { Form } from "./Form";
import { useMediaQuery } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  container: {
    width: "100%",

    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: 460,
    },

    [`@media (min-width: 1900px)`]: {
      maxWidth: 540,
    },
  },
  form: {
    flex: 1,
  },
  kbd: {
    height: 22,
    lineHeight: "15px",
  },
}));

export const SearchBar = memo(() => {
  const setSearchValues = useSetSearchValues();
  const { search } = useSearchData();
  const searchValues = useSearchValues();
  const navigate = useNavigate();
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${theme.breakpoints.md}px)`);
  const inputRef = useRef<null | HTMLInputElement>(null);

  const form = useForm({
    initialValues: searchValues,
    validate: {
      query: (value) => value.length === 0,
    },
  });

  const handleSubmit = (values: Search) => {
    inputRef.current?.blur();
    setSearchValues(values);
    search(values);
    navigate(`/search?query=${values.query}&type=${values.type}`);
  };

  return (
    <Flex align="center" gap={16} className={classes.container}>
      <Form
        className={classes.form}
        onSubmit={form.onSubmit((values) => handleSubmit(values))}
      >
        <TextInput
          ref={inputRef}
          icon={<IconSearch size={15} />}
          placeholder="What do you want hear today ?"
          radius="md"
          {...form.getInputProps("query")}
          rightSectionWidth={matches ? 185 : 132}
          rightSection={
            <TextInputRight {...form.getInputProps("type")} matches={matches} />
          }
        />
        <button type="submit" style={{ display: "none" }} />
      </Form>
    </Flex>
  );
});

const TextInputRight = memo(
  ({
    value,
    onChange,
    matches,
  }: {
    value: SearchTypes;
    onChange: (searchType: SearchTypes) => void;
    matches: boolean;
  }) => {
    const { classes } = useStyles();

    return (
      <>
        {matches ? <Kbd className={classes.kbd}>⌘ + K</Kbd> : null}
        <Box w={125} ml={6}>
          <Select
            placeholder="Type"
            icon={<IconAdjustmentsAlt size={16} />}
            defaultValue="video"
            value={value}
            data={[
              { value: "video", label: "Videos" },
              { value: "channel", label: "Channels" },
              { value: "playlist", label: "Playlists" },
            ]}
            onChange={onChange}
            styles={() => ({
              input: {
                minHeight: 20,
                height: 20,
                border: 0,
                paddingRight: 10,
              },
            })}
          />
        </Box>
      </>
    );
  }
);
