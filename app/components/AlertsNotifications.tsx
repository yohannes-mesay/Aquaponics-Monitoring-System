"use client";

import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useData } from "@/hooks/useData";

export default function AlertsNotifications() {
  const { t } = useTranslation();
  const [status, setStatus] = useState("optimal");
  const [temperature, setTempThreshold] = useState(25); // Default threshold

  const { data } = useData();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "text-green-500";
      case "moderate":
        return "text-yellow-500";
      case "critical":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  useEffect(() => {
    const tempData = Number(data?.temperature.replace(/[^0-9.-]+/g, "")); // Get temperature from API and remove non-number characters
    if (tempData && !isNaN(tempData)) {
      setTempThreshold(tempData);

      // Determine status based on temperature value
      if (tempData <= 25) {
        setStatus("optimal");
      } else if (tempData > 25 && tempData <= 35) {
        setStatus("moderate");
      } else if (tempData < 0 || tempData > 35) {
        setStatus("critical");
      }
    }
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("alertsNotifications")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`flex items-center p-4 rounded ${getStatusColor(
            status
          )} border`}
        >
          {status === "critical" ? (
            <AlertCircle className="h-6 w-6 mr-3" />
          ) : (
            <CheckCircle className="h-6 w-6 mr-3" />
          )}
          <span className="font-bold text-lg">{t(status)}</span>
        </div>
        <p className="mt-2">
          {t("currentTemperature")}: {temperature}°C
        </p>
      </CardContent>
    </Card>
  );
}
