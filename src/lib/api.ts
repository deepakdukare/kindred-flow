export interface LeadData {
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    jobTitle: string;
    companySize: string;
    industry: string;
    message?: string;
}

const WEBHOOK_URL = "https://deepakdukare-n8n-free.hf.space/webhook/2125b178-8501-48d4-9bdc-a7b5bb690618/n8n-form";
const VOICE_WEBHOOK_URL = "https://deepakdukare-n8n-free.hf.space/webhook/voice-agent-webhook";
const PROPOSAL_WEBHOOK_URL = "https://deepakdukare-n8n-free.hf.space/webhook/9300e19c-16fa-45d9-9b66-7f970bcf4f69";

export const submitLead = async (data: LeadData): Promise<boolean> => {
    try {
        const response = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            console.error("Failed to submit lead:", response.statusText);
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error submitting lead:", error);
        return false;
    }
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
