import {
  Button,
  Modal,
  ScrollArea,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import BaseIcon from "@/components/Presentational/BaseIcon";
import { palette } from "@/theme/palette";
import VectorRightIcon from "@/assets/icons/vector-right.svg";

type Props = {
  isModalOpened: boolean;
  closeModal: () => void;
};

export default function CollectorDistributorModal({
  isModalOpened,
  closeModal,
}: Props) {
  const distributorForm = useForm({
    initialValues: {
      organisationName: "",
      email: "",
      message: "",
    },
    validate: {
      organisationName: (value) =>
        !value || value.trim().length === 0
          ? "Organisation name is required"
          : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      message: (value) =>
        !value || value.trim().length === 0 ? "Message is required" : null,
    },
  });

  return (
    <Modal
      opened={isModalOpened}
      onClose={closeModal}
      title="Distributor panel"
      radius="lg"
      centered
      styles={{ header: { color: palette.accentActive } }}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Text pt="md" mb="md">
        Are you an organisation managing metered devices?
        <Text>
          The automated onboarding process is still in production. If you wish
          to create Impact Assets to track the performance of your real-world
          devices, and tokenise your impact, please contact us.
        </Text>
      </Text>
      <form
        onSubmit={distributorForm.onSubmit((values) => console.log(values))}
      >
        <TextInput
          label="Organisation Name"
          mb="sm"
          size="md"
          placeholder="Address"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...distributorForm.getInputProps("organisationName")}
        />
        <TextInput
          label="Email"
          mb="sm"
          size="md"
          placeholder="Email"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...distributorForm.getInputProps("email")}
        />
        <Textarea
          mb="xl"
          label="Message"
          size="md"
          placeholder="Hello"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...distributorForm.getInputProps("message")}
        />
        <Button
          leftIcon={
            <BaseIcon
              width={24}
              height={25}
              status="disabled"
              Icon={VectorRightIcon}
            />
          }
          disabled
          w="100%"
          radius="lg"
          size="md"
          fw={400}
          h={46}
        >
          Get in touch
        </Button>
      </form>
    </Modal>
  );
}
