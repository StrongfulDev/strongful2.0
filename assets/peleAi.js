import PeleAI from "https://cdn.pele-ai.com/pele-ai.js";

const language = "he"; //can be "he" (Hebrew) or "en" (English), if not provided English will act as default
const customerId = "customer-id"; //Provided by Pele-AI, don't change!

PeleAI.initialize({
	customerId,
	language,
});
