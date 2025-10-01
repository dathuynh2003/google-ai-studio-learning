import { GoogleGenAI } from "@google/genai";

// Tạo client Gemini
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY, // nhớ để API key trong .env
});

// Helper: convert file → base64
const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

// Hàm gọi Gemini 2.5 Pro để tóm tắt video
export const summarizeVideo = async (file: File): Promise<string> => {
  const base64 = await fileToBase64(file);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-pro", // sử dụng model mới
    contents: [
      {
        role: "user",
        parts: [
          { text: "Tóm tắt video này bằng tiếng Việt thành một đoạn tối đa 10 câu. Chỉ liệt kê các ý chính quan trọng, ngắn gọn." },
          {
            inlineData: {
              mimeType: file.type, // ví dụ "video/mp4"
              data: base64.split(",")[1], // bỏ header data URL
            },
          },
        ],
      },
    ],
  });

  // Trả về text từ model
  return response.candidates?.[0]?.content?.parts?.[0]?.text ?? "Không có kết quả.";
};
