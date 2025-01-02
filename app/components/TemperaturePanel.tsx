"use client";

import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ThermometerIcon } from "lucide-react";
import { useData } from "@/hooks/useData";
import { useEffect, useState } from "react";

export default function TemperaturePanel() {
  const { t } = useTranslation();
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
      } else if (tempData < 0 || tempData > 20) {
        setStatus("critical");
      }
    }
  }, [data]);

  useEffect(() => {
    if (status == "critical") {
      console.log("logginging");
      const alertSound = new Audio("/alertsound.wav"); // Replace with your alert sound file in the public folder
      alertSound
        .play()
        .catch((error) => console.error("Error playing sound:", error));
    }
  }, [status]);

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "optimal":
        return <ThermometerIcon className="h-6 w-6 text-green-500" />;
      case "moderate":
        return <ThermometerIcon className="h-6 w-6 text-yellow-500" />;
      case "critical":
        return <AlertTriangle className="h-6 w-6 text-red-500" />;
      default:
        return <ThermometerIcon className="h-6 w-6 text-gray-500" />;
    }
  };
  // console.log("status", status);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("temperature")}</CardTitle>
      </CardHeader>
      <CardContent>
        {status == "critical" && (
          <audio id="alert-sound" src="/alertsound.wav" loop autoPlay></audio>
        )}

        <div className="flex items-center justify-center">
          <div className="text-5xl font-bold">{temperature}°C</div>
          <div className="ml-4 text-2xl text-gray-500">
            ({((temperature * 9) / 5 + 32).toFixed(1)}°F)
          </div>
        </div>
        <div
          className={`mt-4 flex items-center justify-center ${getStatusColor(
            status
          )}`}
        >
          {getStatusIcon(status)}
          <span className="ml-2">{t(status)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
