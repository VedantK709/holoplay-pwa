import { memo, useState } from "react";
import { IconCloudDownload } from "@tabler/icons-react";
import { ModalSyncData } from "./ModalSyncData";
import { ActionIcon, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  button: {
    height: 36,
    width: 36,
  },
}));

export const SyncActionIcon = memo(() => {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles();

  const handleClose = () => {
    setOpened((state) => !state);
  };

  return (
    <>
      <ActionIcon
        onClick={handleClose}
        className={classes.button}
        radius="md"
        variant="filled"
      >
        <IconCloudDownload size={20} />
      </ActionIcon>
      <ModalSyncData opened={opened} onClose={handleClose} />
    </>
  );
});
