const apiUrl = "https://api.openai.com/v1/chat/completions"; // Example for GPT-4 chat API
const apiKey = "sk-svcacct-xe2vswLgpXY2gbqflyTunFIQMyBrYGVptNtiHy9yVHnGFd_1293Ki0H5_v7JNwCAtjeLT3BlbkFJcJfLvgAOMmkUxvaZbnrzExeD0HaUykTbSoY0DQlR2V6kMvkOVjbZwOQp-q-5ga2og2QA";


function escapeJsonString(jsonString) {
    return jsonString
      .replace(/\\/g, "\\\\") // Escape backslashes
      .replace(/"/g, '\\"');  // Escape double quotes
}
  


async function getResponse(setResponse, prompt, setLoading) {
    try {
        // Set up the API URL and the API key
        console.log(prompt)

        // Set the headers for the API request
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        };

        // Configure the request body
        const requestBody = {
            model: "gpt-4o-mini", // Replace with your desired model
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: prompt },
            ],
            temperature: 0.7,
            max_tokens: 5000,
        };

        // Fetch response from OpenAI API
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        // Handle the response
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        // Extract the response content
        const assistantMessage = data.choices[0].message.content;

        // Update the state with the response
        console.log(assistantMessage)
        setResponse(JSON.parse(assistantMessage));
        setLoading(false)
        return JSON.parse(assistantMessage)
        
    } catch (error) {
        console.error("Error fetching response from OpenAI:", error);
        setResponse("An error occurred. Please try again later.");
    }
}


function updateStyle(style) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "updateStyleAll",
                styles: style
            });
        }
    });
}


export {getResponse, updateStyle}