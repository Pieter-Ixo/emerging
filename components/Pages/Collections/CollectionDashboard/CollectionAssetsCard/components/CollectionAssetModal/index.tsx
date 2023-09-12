import { useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import Head from "next/head";

import CookstoveModal from "@/components/Modals/CookstoveModal";
import { useAppSelector } from "@/hooks/redux";
import { selectSelectedEntity } from "@/redux/entityCollections/selectors";

export default function CollectionAssetModal() {
  const [opened, { open, close }] = useDisclosure(false);

  const selectedEntity = useAppSelector(selectSelectedEntity);

  useEffect(() => {
    if (selectedEntity) {
      open();
    } else {
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEntity]);

  const unselectAsset = () => {
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
    >
      <Head>
        <title>Impacts</title>
        <meta name="description" content="Supamoto Dashboard" />
      </Head>

      <Modal.Overlay />
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
