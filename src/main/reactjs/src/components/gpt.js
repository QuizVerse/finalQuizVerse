export const CallGpt = async ({ prompt }) => {
    const messages = [
        {
            role: "system",
            content: `You are an expert exam creator. Based on the provided prompt, generate an exam with multiple questions in JSON format. The JSON should follow this structure:`,
        },
        {
            role: "user",
            content: `
        1. [Exam]: The Exam object contains information for the entire exam. This object contains the exam [Title], [Summary], [Sections], and [Questions] for each [Section].
        2. [Title]: Based on the provided [prompt] separated by """ at the bottom, create a suitable title for the exam.
        3. [Summary]: Summarize the overall content of the exam in one sentence.
        4. [Sections]: Sections are arrays that contain multiple sections within an exam. Each section will contain an array of [Questions].
        5. [Questions]: An array of questions within each section. Each question should have the following fields:
            - [Number]: The question number.
            - [Type]: The type of question (e.g., "Multiple Choice", "Short Answer", etc.).
            - [Problem]: The question text.
            - [Options]: (Only include this field for multiple-choice questions) An array of possible answers.
            - [Answer]: The correct answer.
            - [Explanation]: A detailed explanation of the correct answer.
        
        Please output the following structure in Korean:

        {
          "시험 제목": "Title",
          "시험 요약": "Summary",
          "문제들": [
            {
              "번호": Number,
              "문제 유형": "Problem Type",
              "문제": "Problem",
              "선택지": ["Option1", "Option2", ...],  // Only include if multiple-choice
              "정답": "Answer",
              "해설": "Explanation"
            },
            ...
          ]
        }
        
        Repeat this structure for each question.`,
        },
        {
            role: "user",
            content: `Please note: If the question is not multiple-choice, do not include the "선택지" field in the JSON. Create an exam based on the following prompt: """ ${prompt} """`,
        },
    ];
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_GPT_API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages,
            temperature: 0.7,
            max_tokens: 1000,
        }),
    });

    const responseData = await response.json();

    // 응답에서 JSON 형식의 데이터를 추출
    let jsonData;
    try {
        // 불필요한 문자 제거 (백틱 및 코드 블록 제거)
        const cleanData = responseData.choices[0].message.content.replace(/```json/g, '').replace(/```/g, '');
        jsonData = JSON.parse(cleanData);
    } catch (error) {
        console.error("JSON 파싱 중 오류 발생:", error);
        throw new Error("Invalid JSON format received from GPT.");
    }

    return jsonData;
};
