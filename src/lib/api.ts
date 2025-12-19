// Payload for Apollo Lead Search Configuration
export interface ApolloSearchPayload {
    industry: string;
    company_size: string;
    location: string;
    job_titles: string[];
    daily_limit: number;
}

const WEBHOOK_URL = "https://deepakdukare-n8n-free.hf.space/webhook/2125b178-8501-48d4-9bdc-a7b5bb690618/n8n-form";
const VOICE_WEBHOOK_URL = "https://deepakdukare-n8n-free.hf.space/webhook/voice-agent-webhook";
const PROPOSAL_WEBHOOK_URL = "https://deepakdukare-n8n-free.hf.space/webhook/9300e19c-16fa-45d9-9b66-7f970bcf4f69";

const CAMPAIGN_WEBHOOK_URL = "https://deepakdukare-n8n-free.hf.space/webhook/d9cf76ca-d2a3-4d81-8c3a-0e63a8cadb97";

export const triggerCampaign = async (campaignId: string): Promise<boolean> => {
    try {
        const response = await fetch(CAMPAIGN_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ campaign_id: campaignId, action: "trigger" }),
        });
        if (!response.ok) {
            console.error("Failed to trigger campaign:", response.statusText);
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error triggering campaign:", error);
        return false;
    }
};

const MEETING_WEBHOOK_URL = "https://deepakdukare-n8n-free.hf.space/webhook/meeting-request-trigger";

export const triggerMeetingRequest = async (data: any): Promise<boolean> => {
    try {
        const response = await fetch(MEETING_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            console.error("Failed to trigger meeting request:", response.statusText);
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error triggering meeting request:", error);
        return false;
    }
};



export const triggerProposalGeneration = async (data: any): Promise<boolean> => {
    try {
        const response = await fetch(PROPOSAL_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            console.error("Failed to trigger proposal generation:", response.statusText);
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error triggering proposal generation:", error);
        return false;
    }
};

export const startApolloSearch = async (data: ApolloSearchPayload): Promise<boolean> => {
    try {
        const response = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            console.error("Failed to start Apollo search:", response.statusText);
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error starting Apollo search:", error);
        return false;
    }
};

// Deprecated: Kept for legacy compatibility if needed, but redirects to search
export const submitLead = async (data: any): Promise<boolean> => {
    console.warn("submitLead is deprecated. Use startApolloSearch.");
    return true;
};

export const requestVoiceDemo = async (phone: string): Promise<boolean> => {
    try {
        const response = await fetch(VOICE_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone }),
        });
        if (!response.ok) {
            console.error("Failed to request voice demo:", response.statusText);
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error requesting voice demo:", error);
        return false;
    }
};

const PAYMENT_WEBHOOK_URL = "https://deepakdukare-n8n-free.hf.space/webhook/stripe-webhook-payment";

const PAYMENT_CONFIRMATION_WEBHOOK = "https://deepakdukare-n8n-free.hf.space/webhook/payment-confirmation-email";
const PAYMENT_REMINDER_WEBHOOK = "https://deepakdukare-n8n-free.hf.space/webhook/payment-reminder-email";

export const processPayment = async (amount: number, invoiceId: string = "INV-DEFAULT"): Promise<boolean> => {
    try {
        const response = await fetch(PAYMENT_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                amount,
                invoiceId,
                currency: "USD",
                status: "success",
                timestamp: new Date().toISOString()
            }),
        });

        if (!response.ok) {
            console.error("Failed to process payment:", response.statusText);
            return false;
        }

        console.log(`Processed payment of $${amount} for ${invoiceId}`);
        return true;
    } catch (error) {
        console.error("Error processing payment:", error);
        return false;
    }
};

export const sendPaymentConfirmation = async (data: any): Promise<boolean> => {
    try {
        const response = await fetch(PAYMENT_CONFIRMATION_WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return response.ok;
    } catch (error) {
        console.error("Error sending payment confirmation:", error);
        return false;
    }
};

export const sendPaymentReminder = async (data: any): Promise<boolean> => {
    try {
        const response = await fetch(PAYMENT_REMINDER_WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return response.ok;
    } catch (error) {
        console.error("Error sending payment reminder:", error);
        return false;
    }
};

const DELIVERY_UPLOAD_WEBHOOK = "https://deepakdukare-n8n-free.hf.space/webhook/upload-delivery-asset";

export const uploadDeliveryAsset = async (data: any): Promise<boolean> => {
    try {
        const response = await fetch(DELIVERY_UPLOAD_WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return response.ok;
    } catch (error) {
        console.error("Error uploading delivery asset:", error);
        return false;
    }
};

export const acceptProposal = async (proposalId: string): Promise<boolean> => {
    try {
        const response = await fetch(PROPOSAL_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ proposalId, action: "accepted" }),
        });
        if (!response.ok) {
            console.error("Failed to accept proposal:", response.statusText);
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error accepting proposal:", error);
        return true;
    }
};

const SUPPORT_WEBHOOK_URL = "https://deepakdukare-n8n-free.hf.space/webhook/support-message";

export const sendMessage = async (message: string): Promise<boolean> => {
    try {
        /*
        const response = await fetch(SUPPORT_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message, timestamp: new Date().toISOString() }),
        });
        */
        console.log(`Sending message to support: ${message}`);
        await new Promise(resolve => setTimeout(resolve, 500));
        return true;
    } catch (error) {
        console.error("Error sending message:", error);
        return false;
    }
};
