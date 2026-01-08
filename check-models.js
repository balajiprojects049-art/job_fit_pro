
const fs = require('fs');
const path = require('path');

async function listModels() {
    console.log("--------------- CHECKING AVAILABLE MODELS ---------------");

    let apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        try {
            const envPath = path.join(__dirname, ".env");
            if (fs.existsSync(envPath)) {
                const envContent = fs.readFileSync(envPath, "utf8");
                const match = envContent.match(/GEMINI_API_KEY=(.+)/);
                if (match) apiKey = match[1].trim().replace(/^["']|["']$/g, '');
            }
        } catch (e) { }
    }

    if (!apiKey) {
        // Try env.local
        try {
            const envPath = path.join(__dirname, ".env.local");
            if (fs.existsSync(envPath)) {
                const envContent = fs.readFileSync(envPath, "utf8");
                const match = envContent.match(/GEMINI_API_KEY=(.+)/);
                if (match) apiKey = match[1].trim().replace(/^["']|["']$/g, '');
            }
        } catch (e) { }
    }

    if (!apiKey) {
        console.error("❌ No API Key found.");
        return;
    }

    console.log(`🔑 Using Key ending in: ...${apiKey.slice(-4)}`);

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
        );
        const data = await response.json();

        if (data.error) {
            console.error("❌ API Error:", JSON.stringify(data.error, null, 2));
        } else if (data.models) {
            console.log("✅ AVAILABLE MODELS FOR THIS KEY:");
            data.models.forEach(m => {
                if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`   - ${m.name.replace('models/', '')}`);
                }
            });
        } else {
            console.log("⚠️ No models found in response:", data);
        }
    } catch (e) {
        console.error("❌ Network/Fetch Error:", e.message);
    }
}

listModels();
