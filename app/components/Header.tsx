"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useData } from "@/hooks/useData";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("en");
  const { theme, setTheme } = useTheme();
  const [status, setStatus] = useState("optimal");
  const [temperature, setTempThreshold] = useState(25); // Default threshold
  const { data } = useData();
  useEffect(() => {
    const tempData = Number(data?.temperature.replace(/[^0-9.-]+/g, "")); // Get temperature from API
    if (tempData && !isNaN(tempData)) {
      setTempThreshold(tempData);

      // Determine status based on temperature value
      if (tempData <= 25) {
        // if (tempData > 15 && tempData <= 25) {
        setStatus("optimal");
      } else if (tempData > 25 && tempData <= 35) {
        setStatus("moderate");
      } else if (tempData < 0 || tempData > 35) {
        setStatus("critical");
      }
    }
  }, [data]);
  const toggleLanguage = () => {
    const newLang = language === "en" ? "am" : "en";
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  console.log("data", data);
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-600 dark:text-green-400">
          {t("title")}
        </h1>
        <div className="flex items-center space-x-4">
          <Button onClick={toggleLanguage} variant="outline" size="sm">
            {language === "en" ? "አማርኛ" : "English"}
          </Button>
          <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            variant="outline"
            size="icon"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      <div
        className={`py-2 ${
          status === "optimal"
            ? "bg-green-100 dark:bg-green-800"
            : status === "moderate"
            ? "bg-yellow-100 dark:bg-yellow-800"
            : "bg-red-100 dark:bg-red-800"
        }`}
      >
        <div className="container mx-auto px-4">
          <p
            className={`text-sm ${
              status === "optimal"
                ? "text-green-800 dark:text-green-200"
                : status === "moderate"
                ? "text-yellow-800 dark:text-yellow-200"
                : "text-red-800 dark:text-red-200"
            }`}
          >
            {t("systemHealth")}: {status}
          </p>
        </div>
      </div>
    </header>
  );
}
