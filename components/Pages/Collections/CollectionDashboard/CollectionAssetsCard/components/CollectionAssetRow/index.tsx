import { useEffect } from "react";
import { Modal, ScrollArea } from "@mantine/core";
import Head from "next/head";
import { useDisclosure } from "@mantine/hooks";

import { palette } from "@/theme/palette";
import { IEntityExtended } from "@/types/entityCollections";
import { setSelectedEntity } from "@/redux/entityCollections/slice";
import { useAppDispatch } from "@/hooks/redux";
import CookstoveModal from "@/components/Modals/CookstoveModal";
import { IAssetFilter } from "../../types";
import TableCell from "../TableCell";

type Props = {
  selectAsset: Function;
  entity: IEntityExtended;
  activeFilters: IAssetFilter[];
  isAssetRowActive: Boolean;
};

export default function CollectionAssetRow({
  selectAsset: handleClickAssetRow,
  entity,
  activeFilters,
  isAssetRowActive,
}: Props) {
  const dispatch = useAppDispatch();

  const [opened, { open, close }] = useDisclosure(false);

  const unselectAsset = () => {
    dispatch(setSelectedEntity(undefined));
    close();
  };

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
      <TableCell isActive={activeFilters[0].isActive}>
        {entity.externalId}
      </TableCell>
      <TableCell isActive={activeFilters[1].isActive}>{0}</TableCell>
      <TableCell isActive={activeFilters[2].isActive}>{0}</TableCell>

      {isAssetRowActive && (
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
              <CookstoveModal entityId={entity.externalId} entity={entity} />
            </Modal.Body>
          </Modal.Content>
        </Modal.Root>
      )}
    </tr>
  );
}
