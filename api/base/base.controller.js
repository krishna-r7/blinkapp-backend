const axios = require("axios");
const PromptModel = require("../base/base.model");



class BaseController {


  askAi = async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) return res.status(400).json({ message: "Prompt is required" });


      const response = await axios.post(
        "https://api.mistral.ai/v1/chat/completions",
        {
          model: "mistral-medium-latest",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
            "Content-Type": "application/json",
            "X-Title": "AI Flow App",
          },
        }
      );

      const aiText = response.data.choices[0].message.content;


      res.status(200).json({
        status: 200,
        data: aiText,
        message: "Success",
      });


    } catch (error) {
      console.error(error);
        console.error("OpenRouter error:", error.response?.data);
      res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error.response?.data || error.message,
      });
    }
  };

  savePrompt = async (req, res) => {
    try {
      const { prompt, answer } = req.body;
      
      if (!prompt) return res.status(400).json({ message: "Prompt is required" });
      if (!answer) return res.status(400).json({ message: "Answer is required" });

      const promptModel = new PromptModel({
        prompt,
        response: answer,
      });

      await promptModel.save();
      res.status(200).json({
        status: 200,
        message: "Prompt saved successfully",
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
    }



  };

}

module.exports = {
  BaseController,
};    
