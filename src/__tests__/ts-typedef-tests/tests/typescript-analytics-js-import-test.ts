import { AnalyticsBrowser, AnalyticsSnippet } from "@segment/analytics-next";
import * as typewriter from "../build/typescript-analytics-js";

() => {
  typewriter.setTypewriterOptions({ analytics: {} as AnalyticsBrowser });
  typewriter.setTypewriterOptions({ analytics: {} as AnalyticsSnippet });
};
