import { tabletBreakpoint } from "@/constants/breakpoints";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setImpactNavi } from "@/redux/userSlice";
import { palette } from "@/theme/palette";
import { Badge, Group, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import Generated from "./icons/generated";
import Offset from "./icons/offset";
import Saved from "./icons/saved";

function ImpactTabs() {
  const viewPortSize = useViewportSize();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  return (
    <>
      {viewPortSize.width >= tabletBreakpoint ? (
        <>
          <Group>
            <Badge
              style={{
                width: 150,
                height: 46,
                textTransform: "none",
                cursor: "pointer",
              }}
              sx={{ paddingLeft: 0 }}
              // size={16}
              radius={23}
              color={user.impactNavi === "Saved" ? palette.fullBlue : "Grey"}
              variant="filled"
              leftSection={
                <div style={{ paddingTop: 5, paddingRight: 5 }}>
                  <Saved
                    fill={
                      user.impactNavi === "Saved"
                        ? palette.White
                        : palette.Black
                    }
                  />
                </div>
              }
              onClick={() => {
                dispatch(setImpactNavi("Saved"));
              }}
            >
              <Text
                style={{
                  color:
                    user.impactNavi === "Saved" ? palette.White : palette.Black,
                  fontSize: 16,
                  lineHeight: "100%",
                  fontWeight: 500,
                }}
              >
                CO₂ saved
              </Text>
            </Badge>

            <Badge
              style={{
                width: 177,
                height: 46,
                textTransform: "none",
                cursor: "pointer",
              }}
              variant="filled"
              // size={16}
              radius={23}
              color={
                user.impactNavi === "Generated" ? palette.fullBlue : "Grey"
              }
              sx={{ paddingRight: 3 }}
              leftSection={
                <div style={{ paddingTop: 5 }}>
                  <Generated
                    fill={
                      user.impactNavi === "Generated"
                        ? palette.White
                        : palette.Black
                    }
                  />
                </div>
              }
              onClick={() => {
                dispatch(setImpactNavi("Generated"));
              }}
            >
              <Text
                style={{
                  color:
                    user.impactNavi === "Generated"
                      ? palette.White
                      : palette.Black,
                  fontSize: 16,
                  lineHeight: "100%",
                  fontWeight: 500,
                }}
              >
                CARBON issued
              </Text>
            </Badge>
            {user.selectedView !== "singleAsset" ? (
              <Badge
                style={{
                  width: 150,
                  height: 46,
                  textTransform: "none",
                  cursor: "pointer",
                }}
                variant="filled"
                // size={16}
                radius={23}
                color={user.impactNavi === "Offset" ? "lime.7" : "Grey"}
                sx={{ paddingLeft: 3 }}
                leftSection={
                  <Offset
                    fill={
                      user.impactNavi === "Offset"
                        ? palette.White
                        : palette.Black
                    }
                  />
                }
                onClick={() => {
                  dispatch(setImpactNavi("Offset"));
                }}
              >
                <Text
                  style={{
                    color:
                      user.impactNavi === "Offset"
                        ? palette.White
                        : palette.Black,
                    fontSize: 16,
                    lineHeight: "100%",
                    fontWeight: 500,
                  }}
                >
                  CO₂ offset
                </Text>
              </Badge>
            ) : (
              <></>
            )}
          </Group>
        </>
      ) : (
        <>
          {/* 
          This implements the animated tabs but it glitches
          <TabComponent tabs={tabs} getTabId={handleTabChange} /> 
          */}
          <Group>
            <Badge
              style={{ width: 150, height: 46, cursor: "pointer" }}
              sx={{ paddingLeft: 0 }}
              // size={16}
              radius={23}
              color={user.impactNavi === "Saved" ? palette.fullBlue : "Grey"}
              variant="filled"
              leftSection={
                <div style={{ paddingTop: 5, paddingRight: 5 }}>
                  <Saved
                    fill={
                      user.impactNavi === "Saved"
                        ? palette.White
                        : palette.Black
                    }
                  />
                </div>
              }
              onClick={() => {
                dispatch(setImpactNavi("Saved"));
              }}
            >
              <Text
                style={{
                  color:
                    user.impactNavi === "Saved" ? palette.White : palette.Black,
                  fontSize: 16,
                  lineHeight: "100%",
                  fontWeight: 500,
                }}
              >
                SAVED
              </Text>
            </Badge>
            <Badge
              style={{ width: 50, height: 46, cursor: "pointer" }}
              variant="filled"
              // size={16}
              radius={23}
              color={
                user.impactNavi === "Generated" ? palette.fullBlue : "Grey"
              }
              sx={{ paddingRight: 3 }}
              leftSection={
                <div style={{ paddingTop: 5 }}>
                  <Generated
                    fill={
                      user.impactNavi === "Generated"
                        ? palette.White
                        : palette.Black
                    }
                  />
                </div>
              }
              onClick={() => {
                dispatch(setImpactNavi("Generated"));
              }}
            ></Badge>
            <Badge
              style={{ width: 50, height: 46, cursor: "pointer" }}
              variant="filled"
              // size={16}
              radius={23}
              color={user.impactNavi === "Offset" ? palette.greenFull : "Grey"}
              sx={{ paddingLeft: 10 }}
              leftSection={
                <Offset
                  fill={
                    user.impactNavi === "Offset" ? palette.White : palette.Black
                  }
                />
              }
              onClick={() => {
                dispatch(setImpactNavi("Offset"));
              }}
            ></Badge>
          </Group>
        </>
      )}
    </>
  );
}

export default ImpactTabs;
