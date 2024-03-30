import { useState } from "react";

import { useTranslation } from "react-i18next";
import i18next from "./src/services/i18next";
import { AuthProvider } from "./src/context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const changeLng = lng => {
    i18next.changeLanguage(lng);
    setCurrentLanguage(lng);
  }

  const { t } = useTranslation();

  return (
    <AuthProvider>
      <NavigationContainer>
        
      </NavigationContainer>
    </AuthProvider>
  );
}
