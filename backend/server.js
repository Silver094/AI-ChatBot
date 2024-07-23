
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/ask', async (req, res) => {
    const userQuery = req.body.query;
    try {
        const aiResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: userQuery }],
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.PRIVATE_KEY}`
            }
        });
        res.json({ response: aiResponse.data.choices[0].text.trim() });
    } catch (error) {
        console.error('Error from OpenAI API:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
