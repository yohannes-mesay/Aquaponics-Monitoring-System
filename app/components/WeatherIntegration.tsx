"use client"

import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Cloud, Sun, Droplets } from 'lucide-react'

export default function WeatherIntegration() {
  const { t } = useTranslation()

  // This would be fetched from a weather API
  const weatherData = {
    temperature: 28,
    condition: 'partlyCloudy',
    humidity: 65
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('localWeather')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {weatherData.condition === 'sunny' && <Sun className="h-10 w-10 text-yellow-500 mr-2" />}
            {weatherData.condition === 'partlyCloudy' && <Cloud className="h-10 w-10 text-gray-500 mr-2" />}
            <div>
              <div className="text-2xl font-bold">{weatherData.temperature}°C</div>
              <div>{t(weatherData.condition)}</div>
            </div>
          </div>
          <div className="flex items-center">
            <Droplets className="h-6 w-6 text-blue-500 mr-2" />
            <div>{weatherData.humidity}%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}






// ///////
// "use client";

// import { useTranslation } from "react-i18next";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Cloud, Sun, Droplets } from "lucide-react";
// import { useEffect, useState } from "react";

// export default function WeatherIntegration() {
//   const { t } = useTranslation();

//   const [weatherData, setWeatherData] = useState<{
//     temperature: number;
//     condition: string;
//     humidity: number;
//   } | null>(null);

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       try {
//         const apiKey = "ee2fd0871645133048b8e9f87312044b";
//         const city = "London"; // Replace with desired city
//         const response = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
//         );
//         const data = await response.json();
//         console.log("tempdata", data);
//         // Map API response to the desired format
//         const mappedData = {
//           temperature: Math.round(data.main.temp),
//           condition: data.weather[0].main.toLowerCase(), // E.g., "clear", "clouds", etc.
//           humidity: data.main.humidity,
//         };
//         setWeatherData(mappedData);
//       } catch (error) {
//         console.error("Failed to fetch weather data:", error);
//       }
//     };

//     fetchWeatherData();
//   }, []);

//   const renderConditionIcon = (condition: string) => {
//     if (condition.includes("sun"))
//       return <Sun className="h-10 w-10 text-yellow-500 mr-2" />;
//     if (condition.includes("cloud"))
//       return <Cloud className="h-10 w-10 text-gray-500 mr-2" />;
//     return <Cloud className="h-10 w-10 text-gray-500 mr-2" />; // Default icon
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>{t("localWeather")}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         {!weatherData ? (
//           <div className="text-center">Loading...</div>
//         ) : (
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               {renderConditionIcon(weatherData.condition)}
//               <div>
//                 <div className="text-2xl font-bold">
//                   {weatherData.temperature}°C
//                 </div>
//                 <div>{t(weatherData.condition)}</div>
//               </div>
//             </div>
//             <div className="flex items-center">
//               <Droplets className="h-6 w-6 text-blue-500 mr-2" />
//               <div>{weatherData.humidity}%</div>
//             </div>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }
