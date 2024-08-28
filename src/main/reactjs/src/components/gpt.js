export const CallGpt = async ({ prompt }) => {
    const messages = [
        {
            role: "system",
            content: `You are an expert exam creator. Based on the provided prompt, generate an exam with multiple questions. Each question should be formatted as follows:`,
        },
        {
            role: "user",
            content: `
            1. [Title]: After understanding [prompt] separated by """ at the bottom, think about the title of TEST.
            2. [Summary]: Summarize the test content in one sentence.
            3. [Problem]: Questions are presented based on [subject].
            4. [Number]: Write down the problem number.
            5. [Problem Type]: Describe [Problem Type] based on [Problem].
            6. [Question Paper]: A [Question Paper] will be presented based on the relevant problem.
            7. [Answer]: The answer to the question is presented.
            8. [Explanation]: Explains the answer to the question.
            
            Please output the following format in Korean:
        
            [Title]: Title
            [Summary]:Summary
            [Number]:Number
            [Problem]:Problem
            [Problem Type]:Problem Type
            [Questionnaire]:Questionnaire
            [Answer]:Answer
            [Explanation]:Explanation
            
            Repeat this structure for each question.`,
        },
        {
            role: "user",
            content: `
                """ ${prompt}"""
        `,
        },
    ];
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_GPT_API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages,
            temperature: 0.7,
            max_tokens: 1000,
        }),
    });

    const responseData = await response.json();
    return responseData.choices[0].message.content;
};
