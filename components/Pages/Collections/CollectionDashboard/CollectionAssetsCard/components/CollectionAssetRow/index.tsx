import { useEffect } from "react";
import { Modal, ScrollArea } from "@mantine/core";
import Head from "next/head";
import { useDisclosure } from "@mantine/hooks";

import { IEntityExtended } from "@/types/entityCollections";
import { setSelectedEntity } from "@/redux/entityCollections/slice";
import { useAppDispatch } from "@/hooks/redux";
import CookstoveModal from "@/components/Modals/CookstoveModal";

import type { IActiveFilter } from "../..";

type Props = {
  handleClickAssetRow: Function;
  entity: IEntityExtended;
  activeFilters: IActiveFilter[];
  isAssetRowActive: Boolean;
};

function CollectionAssetRow({
  handleClickAssetRow,
  entity,
  activeFilters,
  isAssetRowActive,
}: Props) {
  const dispatch = useAppDispatch();

  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (isAssetRowActive) {
      open();
    } else {
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAssetRowActive]);

  return (
    <tr
      key={entity.id}
      onClick={handleClickAssetRow(entity)}
      style={{
        cursor: "pointer",
        backgroundColor: isAssetRowActive ? "#F8F8F8" : "inherit",
      }}
    >
      <td
        style={{
          color: activeFilters[0].isActive ? "#5FA8EB" : "black",
        }}
      >
        {entity.externalId}
      </td>
      <td
        style={{
          color: activeFilters[1].isActive ? "#5FA8EB" : "black",
        }}
      >
        {0}
      </td>
      <td
        style={{
          color: activeFilters[2].isActive ? "#5FA8EB" : "black",
        }}
      >
        {0}
      </td>
      {isAssetRowActive && (
        <Modal.Root
          opened={opened}
          onClose={() => {
            dispatch(setSelectedEntity(undefined));
            close();
          }}
          radius={16}
          size="md"
          centered
          scrollAreaComponent={ScrollArea.Autosize}
        >
          <Head>
            <title>Supamoto Dashboard</title>
            <meta name="description" content="Supamoto Dashboard" />
          </Head>

          <Modal.Overlay />
          <Modal.Content>
            <Modal.Header style={{ height: 36 }}>
              <Modal.Title>Supamoto Dashboard</Modal.Title>
              <Modal.CloseButton />
            </Modal.Header>
            <Modal.Body style={{ padding: 0 }}>
              <CookstoveModal entityId={entity.externalId} entity={entity} />
            </Modal.Body>
          </Modal.Content>
        </Modal.Root>
      )}
    </tr>
  );
}

export default CollectionAssetRow;
