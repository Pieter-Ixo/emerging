import React from "react";
import { usePathname } from "next/navigation";
import Router from "next/router";
import Link from "next/link";
import { Flex, Image, Text } from "@mantine/core";

import { palette } from "@/theme/palette";

import {
  ICategoryModel,
  IPropertyModel,
} from "../../../types/certificates/certificatePageTypes";

type CategoryBoxProps = {
  category: ICategoryModel;
  properties: IPropertyModel[];
};

export default function CategoryBox({
  category,
  properties,
}: CategoryBoxProps) {
  const pathname = usePathname();
  const hashId = window.location.hash;

  const handleClick = (key: string) => {
    if (hashId === `#${key}`) {
      Router.push({ pathname });
    } else {
      Router.push({ pathname, hash: key });
    }
  };

  return (
    <Flex direction="column">
      <Flex
        sx={{
          borderBottom: `1px solid ${palette.Black}`,
          paddingBottom: "8px",
          marginBottom: "8px",
        }}
        gap={8}
        align="center"
      >
        <Image width={24} height={24} src={category.icon} alt="" />
        <Text
          fw={400}
          sx={{ fontSize: 13 }}
          color={palette.darkestBlue}
          transform="uppercase"
        >
          {category.category}
        </Text>
      </Flex>

      <Flex direction="column" gap={8}>
        {Object.values(properties).map((property, index) => {
          const { component, props, key, text, value, external } = property;
          return (
            <Flex key={index} justify="space-between" align="center">
              <Text fw={400} sx={{ fontSize: 13 }} color={palette.darkestBlue}>
                {text || key}
              </Text>
              {hashId === `#${key}` ? (
                <Text
                  fw={400}
                  sx={{
                    fontSize: 13,
                    backgroundColor: palette.fullBlue,
                    borderRadius: 9999,
                    padding: "0 0.5rem",
                  }}
                  color={palette.White}
                  onClick={() => handleClick(key)}
                >
                  {value}
                </Text>
              ) : component && props ? (
                <Text
                  fw={400}
                  sx={{
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                  color={palette.fullBlue}
                  onClick={() => handleClick(key)}
                >
                  {value}
                </Text>
              ) : external ? (
                <Link href={external} target="_blank">
                  <Text
                    fw={400}
                    sx={{ fontSize: 13, cursor: "pointer" }}
                    color={palette.fullBlue}
                  >
                    {value}
                  </Text>
                </Link>
              ) : (
                <Text
                  fw={400}
                  sx={{ fontSize: 13 }}
                  color={palette.darkestBlue}
                >
                  {value}
                </Text>
              )}
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}
