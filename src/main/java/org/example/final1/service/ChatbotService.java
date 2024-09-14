package org.example.final1.service;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Date;

@Service
public class ChatbotService {

    private static final String SECRET_KEY = "Zk12d0RibGNtZFBXYm1jakdBVmh1VERsZFRDT0p0Zmk=";  // 시크릿 키 입력
    private static final String API_URL = "https://l16tgans57.apigw.ntruss.com/custom/v1/15746/a92350d3ecd9b8d354ec3180da119abcf90f01cf572674760f207074f2ff26e5";

    // 네이버 클로바 API에 메시지 전송 및 응답 처리
    public String processChatMessage(String chatMessage) throws IOException {
        URL url = new URL(API_URL);

        // 요청 메시지 생성 및 서명
        String message = createRequestMessage(chatMessage);
        String signature = generateSignature(message, SECRET_KEY);

        // API 서버에 POST 요청
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json;UTF-8");
        con.setRequestProperty("X-NCP-CHATBOT_SIGNATURE", signature);
        con.setDoOutput(true);

        // 요청 데이터 전송
        try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
            wr.write(message.getBytes("UTF-8"));
            wr.flush();
        }

        // 서버 응답 코드 확인
        int responseCode = con.getResponseCode();
        if (responseCode == 200) {  // 정상 응답
            return handleResponse(con);
        } else {  // 오류 발생
            return "Error: " + con.getResponseMessage();
        }
    }

    // 서버 응답 처리
    private String handleResponse(HttpURLConnection con) throws IOException {
        try (BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream(), "UTF-8"))) {
            String decodedString;
            StringBuilder responseContent = new StringBuilder();

            while ((decodedString = in.readLine()) != null) {
                responseContent.append(decodedString);
            }

            // JSON 응답 파싱
            JSONParser jsonParser = new JSONParser();
            JSONObject jsonResponse = (JSONObject) jsonParser.parse(responseContent.toString());
            JSONArray bubblesArray = (JSONArray) jsonResponse.get("bubbles");
            JSONObject bubbles = (JSONObject) bubblesArray.get(0);
            JSONObject data = (JSONObject) bubbles.get("data");

            // 챗봇 응답의 description 추출
            return (String) data.get("description");
        } catch (Exception e) {
            e.printStackTrace();
            return "Error parsing response";
        }
    }

    // 네이버 챗봇 API 요청 메시지 생성
    private String createRequestMessage(String voiceMessage) {
        try {
            JSONObject requestJson = new JSONObject();
            long timestamp = new Date().getTime();

            requestJson.put("version", "v2");
            requestJson.put("userId", "U47b00b58c90f8e47428af8b7bddc1231heo2");
            requestJson.put("timestamp", timestamp);

            JSONObject bubblesObj = new JSONObject();
            bubblesObj.put("type", "text");

            JSONObject dataObj = new JSONObject();
            dataObj.put("description", voiceMessage);

            bubblesObj.put("data", dataObj);
            JSONArray bubblesArray = new JSONArray();
            bubblesArray.add(bubblesObj);

            requestJson.put("bubbles", bubblesArray);
            requestJson.put("event", "send");

            return requestJson.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // 시그니처 생성
    private String generateSignature(String message, String secretKey) {
        try {
            byte[] secretKeyBytes = secretKey.getBytes("UTF-8");
            SecretKeySpec signingKey = new SecretKeySpec(secretKeyBytes, "HmacSHA256");
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(signingKey);

            byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
            return Base64.encodeBase64String(rawHmac);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
