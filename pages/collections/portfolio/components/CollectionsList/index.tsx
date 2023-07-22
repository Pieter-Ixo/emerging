import { useState } from "react";
import { Flex, ScrollArea } from "@mantine/core";
import { ICollectionEntities } from "@/types/entityCollections";
import CollectionsItem from "../CollectionsItem";

type CollectionsListProps = {
  userEntityCollections: ICollectionEntities[];
};

export default function CollectionsList({
  userEntityCollections,
}: CollectionsListProps) {
  const [isCardActive, setIsCardActive] = useState(false);

  // TODO: handle which category is active, if one active,
  // make it inactive, and toggle another one
  
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleCard = (cardId: string) => {
    setIsCardActive((prevCard) => !prevCard);
    setActiveCardId(cardId);
  };


  return (
    <ScrollArea py={16} sx={{ width: "100%" }}>
      <Flex align="center" gap={24} px="xl" p={16}>
        {userEntityCollections.map(({ collection, entities }) => (
          <CollectionsItem
            key={collection.alsoKnownAs}
            id={collection.alsoKnownAs}
            collection={collection}
            isCardActive={isCardActive}
            entitiesLength={entities.length}
            toggleCard={handleCard}
          />
        ))}
      </Flex>
    </ScrollArea>
  );
}
