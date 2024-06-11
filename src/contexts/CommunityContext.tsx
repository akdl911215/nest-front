// src/contexts/CommunityContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CommunityContextType {
  communityName: string;
  description: string;
  banner: string | null;
  icon: string | null;
  topics: string[];
  setCommunityName: (name: string) => void;
  setDescription: (description: string) => void;
  setBanner: (banner: string | null) => void;
  setIcon: (icon: string | null) => void;
  setTopics: (topics: string[]) => void;
}

const CommunityContext = createContext<CommunityContextType | undefined>(
  undefined,
);

export const useCommunity = () => {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error("useCommunity must be used within a CommunityProvider");
  }
  return context;
};

interface CommunityProviderProps {
  children: ReactNode;
}

export const CommunityProvider: React.FC<CommunityProviderProps> = ({
  children,
}) => {
  const [communityName, setCommunityName] = useState("");
  const [description, setDescription] = useState("");
  const [banner, setBanner] = useState<string | null>(null);
  const [icon, setIcon] = useState<string | null>(null);
  const [topics, setTopics] = useState<string[]>([""]);

  return (
    <CommunityContext.Provider
      value={{
        communityName,
        description,
        banner,
        icon,
        topics,
        setCommunityName,
        setDescription,
        setBanner,
        setIcon,
        setTopics,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};
