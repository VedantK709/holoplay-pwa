import { createContext, useContext, useMemo, useState } from "react";

const VideoIframeVisibilityContext = createContext<boolean>(true);
const SetVideoIframeVisibilityContext = createContext<(value: boolean) => void>(
  () => {}
);

interface VideoIframeVisibilityProviderProps {
  children: React.ReactNode;
}

export const VideoIframeVisibilityProvider: React.FC<
  VideoIframeVisibilityProviderProps
> = ({ children }) => {
  const [visible, setVisible] = useState(true);

  const value = useMemo(() => ({ visible, setVisible }), [visible, setVisible]);

  return (
    <VideoIframeVisibilityContext.Provider value={value.visible}>
      <SetVideoIframeVisibilityContext.Provider value={value.setVisible}>
        {children}
      </SetVideoIframeVisibilityContext.Provider>
    </VideoIframeVisibilityContext.Provider>
  );
};

export const useVideoIframeVisibility = () =>
  useContext(VideoIframeVisibilityContext);
export const useSetVideoIframeVisibility = () =>
  useContext(SetVideoIframeVisibilityContext);
