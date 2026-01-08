const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

async function testGemini() {
    console.log("--------------- GEMINI API TEST ---------------");

    // 1. Load API Key manually from .env
    let apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        try {
            const envFiles = [".env", ".env.local"];
            for (const file of envFiles) {
                const envPath = path.join(__dirname, file);
                if (fs.existsSync(envPath)) {
                    console.log(`Checking ${file}...`);
                    const envContent = fs.readFileSync(envPath, "utf8");
                    const match = envContent.match(/GEMINI_API_KEY=(.+)/);
                    if (match) {
                        apiKey = match[1].trim();
                        // Remove quotes if present
                        if ((apiKey.startsWith('"') && apiKey.endsWith('"')) || (apiKey.startsWith("'") && apiKey.endsWith("'"))) {
                            apiKey = apiKey.slice(1, -1);
                        }
                        console.log(`✅ Found GEMINI_API_KEY in ${file}`);
                        break;
                    }
                }
            }
        } catch (e) {
            console.error("⚠️ Error reading .env file:", e.message);
        }
    }

    if (!apiKey) {
        console.error("❌ ERROR: could not find GEMINI_API_KEY in environment or .env file.");
        return;
    }

    console.log(`🔑 API Key (masked): ${apiKey.substring(0, 4)}...${apiKey.slice(-4)}`);

    // 2. Initialize Client
    const genAI = new GoogleGenerativeAI(apiKey);

    // 3. Test Models
    const modelsToTest = ["gemini-1.5-flash"];

    for (const modelName of modelsToTest) {
        console.log(`\n🔄 Testing model: ${modelName}...`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello! Are you working?");
            const response = await result.response;
            const text = response.text();
            console.log(`✅ SUCCESS [${modelName}]:`);
            console.log(`   Response: "${text.trim()}"`);
            return; // Exit if one works
        } catch (error) {
            console.error(`❌ FAILURE [${modelName}]:`);
            console.error(`   Error Message: ${error.message}`);
            if (error.status) console.error(`   Status Code: ${error.status}`);
            if (error.statusText) console.error(`   Status Text: ${error.statusText}`);
            // if (error.errorDetails) console.error(`   Details:`, JSON.stringify(error.errorDetails, null, 2));
        }
    }

    console.log("\n------------------------------------------------");
    console.log("❌ All tested models failed. Please check your API Quota or Key permissions.");
}

testGemini();
