import { Avatar, UnstyledButton } from "@mantine/core";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  toggleDashboard
} from "@/redux/userSlice";
import { palette } from "@/theme/palette";
import { useViewportSize } from "@mantine/hooks";
import { tabletBreakpoint } from "../../constants/breakpoints";
import Assistant from "./icons/assistant";
import Chat from "./icons/chat";
import Cross from "./icons/cross";
import Notifications from "./icons/notifications";
import Stove from "./icons/stove";

interface Props {
  selectView: any;
  currentView: String;
}

function BottomButtons({ selectView, currentView }: Props) {
  const dispatch = useAppDispatch();
  const viewPortSize = useViewportSize();
  let NavStyle;

  if (viewPortSize.width <= tabletBreakpoint) {
    NavStyle = { bottom: 24 };
  } else {
    NavStyle = {};
  }

  return (
    <div style={NavStyle}>
      {viewPortSize.width <= tabletBreakpoint ? (
        <>
          <UnstyledButton
            style={{ padding: 5 }}
            onClick={() => {
              dispatch(toggleDashboard());
            }}
          >
            <Avatar
              size={40}
              color="Grey.2"
              radius={20}
              style={{ color: palette.Neutral800 }}
              variant="filled"
            >
              <Stove />
            </Avatar>
          </UnstyledButton>
        </>
      ) : (
        <></>
      )}

      <UnstyledButton
        style={{ padding: 5 }}
        onClick={() => selectView("wallet")}
      >
        <Avatar
          variant="filled"
          size={40}
          color={currentView === "wallet" ? palette.fullBlue : "Grey.2"}
          style={{}}
          radius={20}
        >
          <Cross />
        </Avatar>
      </UnstyledButton>

      <UnstyledButton
        style={{ padding: 5 }}
        onClick={() => selectView("assistant")}
      >
        <Avatar
          variant="filled"
          color={currentView === "assistant" ? palette.fullBlue : "Grey.2"}
          size={40}
          style={{ color: palette.Neutral800 }}
          radius={20}
        >
          <Assistant />
        </Avatar>
      </UnstyledButton>

      <UnstyledButton
        style={{ padding: 5 }}
        onClick={() => {
          selectView("messaging");
        }}
      >
        <Avatar
          variant="filled"
          color={currentView === "messaging" ? palette.fullBlue : "Grey.2"}
          size={40}
          style={{ color: palette.brightBlue }}
          radius={20}
        >
          <Chat />
        </Avatar>
      </UnstyledButton>

      <UnstyledButton
        style={{ padding: 5 }}
        onClick={() => selectView("notifications")}
      >
        <Avatar
          variant="filled"
          color={currentView === "notifications" ? palette.fullBlue : "Grey.2"}
          size={40}
          style={{ color: palette.Neutral800 }}
          radius={20}
        >
          <Notifications />
        </Avatar>
      </UnstyledButton>
    </div>
  );
}

export default BottomButtons;
