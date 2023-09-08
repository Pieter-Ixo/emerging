import { palette } from "@/theme/palette";
import { ButtonProps, Button, Text } from "@mantine/core";

export function ImpactCreditsButtonBlue(
  props: ButtonProps & { onClick?: () => void }
) {
  const { children, onClick, ...otherProps } = props;
  return (
    <Button
      w="100%"
      h={46}
      radius={23}
      bg={palette.fullBlue}
      sx={{
        ":hover": { backgroundColor: palette.blueHover },
      }}
      onClick={onClick}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
    >
      <Text weight={500} size={16}>
        {children}
      </Text>
    </Button>
  );
}

export function ImpactCreditsButtonGrey(
  props: ButtonProps & { onClick?: () => void }
) {
  const { children, onClick, ...otherProps } = props;
  return (
    <Button
      variant="light"
      onClick={onClick}
      bg={palette.Neutral200}
      w={128}
      h={46}
      radius={23}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
    >
      <Text weight={500} size={16} color={palette.Black}>
        {children}
      </Text>
    </Button>
  );
}
