declare global {
    interface Window {
        gtag: (
            command: "config" | "event" | "js",
            targetId: string,
            config?: Record<string, any>
        ) => void;
    }
}

export const trackEvent = (
    eventName: string,
    parameters?: Record<string, any>
) => {
    if (typeof window.gtag !== "undefined") {
        window.gtag("event", eventName, parameters || {});
    } else {
        console.log("Analytics event:", eventName, parameters);
    }
};
