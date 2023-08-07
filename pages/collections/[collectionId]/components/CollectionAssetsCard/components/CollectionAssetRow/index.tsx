import Head from "next/head";
import { useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";

import CookstoveModal from "@/components/Modals/CookstoveModal";
import { useAppDispatch } from "@/hooks/redux";
import { IEntityExtended } from "@/types/entityCollections";
import { Modal, ScrollArea } from "@mantine/core";
import { setSelectedEntity } from "@/redux/entityCollections/slice";
import { IActiveFilter } from "@/components/Pages/Collections/CollectionDashboard/CollectionAssetsCard";

type Props = {
  handleClickAssetRow: Function;
  entity: IEntityExtended;
  activeFilters: IActiveFilter[];
  selectedAssetExternalId?: string;
};

function CollectionAssetRow({
  handleClickAssetRow,
  entity,
  activeFilters,
  selectedAssetExternalId,
}: Props) {
  const dispatch = useAppDispatch();

  const isSelectedRow = selectedAssetExternalId === entity.externalId;

  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (selectedAssetExternalId) {
      open();
    } else {
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAssetExternalId]);

  return (
    <tr
      key={entity.id}
      onClick={handleClickAssetRow(entity)}
      style={{
        cursor: "pointer",
        backgroundColor: isSelectedRow ? "#F8F8F8" : "inherit",
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
      {isSelectedRow && (
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
              <CookstoveModal
                entityId={selectedAssetExternalId!}
                entity={entity}
              />
            </Modal.Body>
          </Modal.Content>
        </Modal.Root>
      )}
    </tr>
  );
}

export default CollectionAssetRow;
