const { GoogleGenAI } = require('@google/genai');

exports.getInsights = async (req, res) => {
  try {
    const { city, temp, condition } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.json({
        summary: `Current weather in ${city}: ${temp}°C with ${condition}.`,
        recommendation:
          'Wear comfortable light clothing and keep water handy for outdoor visits.',
        fallback: true,
        note: 'Fallback mode active (No Gemini API key specified)'
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `Provide a short weather summary and personalized clothing/activity suggestions for ${city}. Current temperature: ${temp}°C, conditions: ${condition}. Keep it natural and concise.`;

    const response = await ai.interactions.create({
      model: 'gemini-3.8-flash',
      input: prompt
    });

    res.json({
      insights: response.output_text,
      fallback: false
    });
  } catch (error) {
    console.error('Gemini Error:', error.message);

    res.status(500).json({
      message: error.message
    });
  }
};