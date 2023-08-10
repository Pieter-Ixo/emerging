import { useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, ScrollArea } from "@mantine/core";
import Head from "next/head";

import CookstoveModal from "@/components/Modals/CookstoveModal";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setSelectedEntity } from "@/redux/entityCollections/slice";
import { selectSelectedEntity } from "@/redux/entityCollections/selectors";

export default function CollectionAssetModal() {
  const [opened, { open, close }] = useDisclosure(false);

  const selectedEntity = useAppSelector(selectSelectedEntity);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedEntity) {
      open();
    } else {
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEntity]);

  const unselectAsset = () => {
    dispatch(setSelectedEntity(undefined));
    close();
  };

  if (!selectedEntity) {
    return null;
  }

  return (
    <Modal.Root
      opened={opened}
      onClose={unselectAsset}
      radius={16}
      size="md"
      centered
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Head>
        <title>Supamoto Dashboard</title>
        <meta name="description" content="Supamoto Dashboard" />
      </Head>

      <Modal.Overlay zIndex={2} />
      <Modal.Content>
        <Modal.Header style={{ height: 36 }}>
          <Modal.Title>Supamoto Dashboard</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body style={{ padding: 0 }}>
          <CookstoveModal
            entityId={selectedEntity.externalId}
            entity={selectedEntity}
          />
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
