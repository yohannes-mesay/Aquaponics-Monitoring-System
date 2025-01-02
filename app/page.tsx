import { Suspense } from "react";
import Header from "./components/Header";
import TemperaturePanel from "./components/TemperaturePanel";
import SystemData from "./components/SystemData";
import InteractiveGraph from "./components/InteractiveGraph";
import ControlPanel from "./components/ControlPanel";
import AlertsNotifications from "./components/AlertsNotifications";
import WeatherIntegration from "./components/WeatherIntegration";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Suspense
            fallback={
              <div className="h-64 bg-gray-200 animate-pulse rounded-lg"></div>
            }
          >
            <TemperaturePanel />
          </Suspense>
          <Suspense
            fallback={
              <div className="h-64 bg-gray-200 animate-pulse rounded-lg"></div>
            }
          >
            <SystemData />
          </Suspense>
          <Suspense
            fallback={
              <div className="h-64 bg-gray-200 animate-pulse rounded-lg"></div>
            }
          >
            <InteractiveGraph />
          </Suspense>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Suspense
            fallback={
              <div className="h-48 bg-gray-200 animate-pulse rounded-lg"></div>
            }
          >
            <ControlPanel />
          </Suspense>
          <Suspense
            fallback={
              <div className="h-48 bg-gray-200 animate-pulse rounded-lg"></div>
            }
          >
            <AlertsNotifications />
          </Suspense>
        </div>
        <div className="mt-8">
          <Suspense
            fallback={
              <div className="h-32 bg-gray-200 animate-pulse rounded-lg"></div>
            }
          >
            <WeatherIntegration />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
