import { CSSProperties, forwardRef } from "react";
import * as Flags from "country-flag-icons/react/3x2";
import {
  Text,
  SelectItemProps,
  Flex,
  Autocomplete,
  Styles,
  TextInputStylesNames,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

import countryPickerData from "@/constants/countryPickerData";

interface Props extends SelectItemProps {
  code: string;
}

const CountryPickerItem = forwardRef<HTMLDivElement, Props>(
  ({ code, value, ...others }: Props, ref) => {
    const FlagIcon: Flags.FlagComponent = Flags[code];
    return (
      <Flex gap={7} ref={ref} {...others}>
        <FlagIcon width={20} />
        <Text size="xs">{value}</Text>
      </Flex>
    );
  }
);

CountryPickerItem.displayName = "CountryPickerItem";

interface CountryPickerProps<T> {
  form: UseFormReturnType<T>;
  countryPickerStyles: Styles<TextInputStylesNames, CSSProperties>;
  formField: string;
}

const autocompleteCountryPickerData = countryPickerData.map((country) => ({
  code: country.code,
  value: country.name,
}));

function CountryPicker<T>({
  form,
  formField,
  countryPickerStyles,
}: CountryPickerProps<T>) {
  return (
    <Autocomplete
      radius="lg"
      size="md"
      styles={{
        dropdown: {
          maxHeight: 125,
          overflow: "hidden",
        },
        ...countryPickerStyles,
      }}
      label="Country"
      itemComponent={CountryPickerItem}
      dropdownPosition="bottom"
      placeholder="Select country"
      data={autocompleteCountryPickerData}
      {...form.getInputProps(formField)}
    />
  );
}

export default CountryPicker;
