export const CallGpt = async ({prompt}) => {
    /*
    curl https://api.openai.com/v1/chat/completions \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
        "model": "gpt-4o-mini",
        "messages": [{"role": "user", "content": "Say this is a test!"}],
        "temperature": 0.7
    }'
    */
    const messages = [
        {
            role: "system",
            content: `You are the examiner responsible for creating exam questions on this topic. Please proceed in the following order.`,
        },
        {
            role: "user",
            content: `1. [Title]: After understanding [SUBJECT] separated by """ at the bottom, think about the title of TEST.
                  2. [Summary]: Summarize the test content in one sentence.
                  3. [Problem]: Questions are presented based on [subject].
                  4. [Number]: Write down the problem number.
                  5. [Problem Type]: Describe [Problem Type] based on [Problem].
                  6. [Question Paper]: A [Question Paper] will be presented based on the relevant problem.
                  7. [Answer]: The answer to the question is presented.
                  8. [Explanation]: Explains the answer to the question.
                  
                  Translate into Korean and Use the output in the following JSON format:
                  { 
                      test: here is [test],
                      summary: here is [summary],
                      question: here is [question],
                      number: here is [number],
                      question type: here is [question type],
                      options: here is [options],
                      answer: here is [answer],
                      explanation: here is [explanation]
                  }
                  [events]:`,
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
    //console.log(responseData);
    return responseData.choices[0].message.content;
};
