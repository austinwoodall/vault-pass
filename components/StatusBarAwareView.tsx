import Constants from "expo-constants";
import { Box } from "./ui/box";

interface IStatusBarAwareView {
  children: React.ReactNode;
  classNames: string;
}

export default function StatusBarAwareView({
  children,
  classNames,
}: IStatusBarAwareView) {
  return (
    <Box
      className={classNames}
      style={{
        paddingTop: Constants.statusBarHeight,
      }}
    >
      {children}
    </Box>
  );
}
