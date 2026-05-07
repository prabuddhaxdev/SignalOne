import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { 
  sendDailyNewsSummary, 
  sendSignUpEmail, 
  handleStockAlert 
} from "@/lib/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    sendSignUpEmail, 
    sendDailyNewsSummary,
    handleStockAlert
  ],
});
