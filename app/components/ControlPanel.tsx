"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useData } from "@/hooks/useData";

export default function ControlPanel() {
  const { t } = useTranslation();
  const [fanOn, setFanOn] = useState(false);
  const [pumpOn, setPumpOn] = useState(false);
  const [tempThreshold, setTempThreshold] = useState([25]);
  const { data, isLoading } = useData();
  useEffect(() => {
    if (data?.temperature?.startsWith("Fan Status:")) {
      const fanStatus = data.temperature.split(": ")[1];
      setFanOn(fanStatus == "ON");
    } else {
      const temperature = Number(data?.temperature.replace(/[^0-9.-]+/g, "")); // Get temperature from API and remove non-number characters
      if (!isNaN(temperature)) {
        setTempThreshold([temperature]);
      }
    }
  }, [data]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("controlPanel")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="fan-switch">{t("fan")}</Label>
            <Switch
              id="fan-switch"
              checked={fanOn}
              onCheckedChange={setFanOn}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="pump-switch">{t("waterPump")}</Label>
            <Switch
              id="pump-switch"
              checked={pumpOn}
              onCheckedChange={setPumpOn}
            />
          </div>
          <div>
            <Label htmlFor="temp-threshold">{t("temperatureThreshold")}</Label>
            <Slider
              id="temp-threshold"
              max={40}
              min={10}
              step={1}
              value={tempThreshold}
              onValueChange={setTempThreshold}
              className="mt-2"
            />
            <div className="text-center mt-1">{tempThreshold}°C</div>
          </div>
          {/* <Button className="w-full">{t("applySettings")}</Button> */}
        </div>
      </CardContent>
    </Card>
  );
}
