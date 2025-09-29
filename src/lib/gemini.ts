import { initializeGeminiAI, withErrorHandling, logger } from './utils';
import type { MeetingSummary, TodoItem, MeetingData } from '@/types';

export class GeminiAIService {
  private ai: any;
  
  constructor(apiKey: string) {
    this.ai = initializeGeminiAI(apiKey);
  }

  /**
   * Generate meeting summary from transcript using Gemini AI
   */
  async generateMeetingSummary(meetingData: MeetingData): Promise<MeetingSummary | null> {
    return withErrorHandling(async () => {
      const model = this.ai.getGenerativeModel({ model: 'gemini-pro' });
      
      const prompt = `
        Please analyze the following meeting transcript and provide:
        1. A concise summary of the main discussion points
        2. A list of action items/to-do tasks with assigned participants if mentioned
        3. Key decisions made during the meeting
        
        Meeting Transcript:
        ${meetingData.transcript}
        
        Participants: ${meetingData.participants.join(', ')}
        
        Please format the response as JSON with the following structure:
        {
          "summary": "meeting summary here",
          "todoItems": [
            {
              "text": "task description",
              "assignee": "participant name if mentioned",
              "priority": "low|medium|high"
            }
          ]
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        const parsed = JSON.parse(text);
        
        const summary: MeetingSummary = {
          id: Date.now().toString(),
          title: meetingData.title || `Meeting ${new Date().toLocaleDateString()}`,
          summary: parsed.summary,
          todoItems: parsed.todoItems.map((item: any, index: number) => ({
            id: `todo-${Date.now()}-${index}`,
            text: item.text,
            assignee: item.assignee,
            priority: item.priority || 'medium',
            completed: false,
          })) as TodoItem[],
          participants: meetingData.participants,
          date: new Date(),
          duration: meetingData.duration,
        };

        logger.info('Meeting summary generated successfully', { summaryId: summary.id });
        return summary;
      } catch (parseError) {
        logger.error('Failed to parse AI response', parseError);
        throw new Error('Failed to parse AI response');
      }
    }).then(result => result.success ? result.data! : null);
  }

  /**
   * Extract action items from text using Gemini AI
   */
  async extractActionItems(text: string): Promise<TodoItem[]> {
    return withErrorHandling(async () => {
      const model = this.ai.getGenerativeModel({ model: 'gemini-pro' });
      
      const prompt = `
        Extract action items and to-do tasks from the following text.
        Return them as a JSON array with the following structure:
        [
          {
            "text": "task description",
            "assignee": "person responsible if mentioned",
            "priority": "low|medium|high"
          }
        ]
        
        Text: ${text}
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const responseText = response.text();
      
      try {
        const parsed = JSON.parse(responseText);
        return parsed.map((item: any, index: number) => ({
          id: `action-${Date.now()}-${index}`,
          text: item.text,
          assignee: item.assignee,
          priority: item.priority || 'medium',
          completed: false,
        })) as TodoItem[];
      } catch (parseError) {
        logger.error('Failed to parse action items response', parseError);
        return [];
      }
    }).then(result => result.success ? result.data! : []);
  }
}