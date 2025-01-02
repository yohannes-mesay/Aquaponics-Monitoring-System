"use client";

import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function SystemData() {
  const { t } = useTranslation();

  // This data would be fetched from your data source
  const data = {
    ph: 7,
    // turbidity: 85,
    nutrientEfficiency: 92,
    energyUsage: 75,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("systemData")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span>{t("pH")}</span>
              <span>{data.ph}</span>
            </div>
            <Progress value={data.ph * 10} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>{t("nutrientEfficiency")}</span>
              <span>{data.nutrientEfficiency}%</span>
            </div>
            <Progress value={data.nutrientEfficiency} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span>{t("energyUsage")}</span>
              <span>{data.energyUsage}%</span>
            </div>
            <Progress value={data.energyUsage} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
