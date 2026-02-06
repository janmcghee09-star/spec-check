export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { apiKey, prdContent } = req.body;

  // Validate inputs
  if (!apiKey || !apiKey.startsWith('sk-ant-')) {
    return res.status(400).json({ error: 'Invalid API key format' });
  }

  if (!prdContent || !prdContent.trim()) {
    return res.status(400).json({ error: 'PRD content is required' });
  }

  try {
    // Call Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: `You are a senior product manager conducting a premortem analysis of a PRD. Your job is to identify potential risks, gaps, and issues before launch.

Analyze this PRD and provide insights in the following categories:

1. **Mental Model Issues** (🔵) - Missing user context, unclear value props, assumptions about user behavior
2. **Stakeholder Gaps** (🟡) - Missing cross-functional alignment, teams that should be looped in
3. **Edge Cases** (🔴) - Error states, failure modes, boundary conditions
4. **Metric Concerns** (🟢) - Unclear success criteria, missing metrics, unactionable KPIs

For each insight:
- Be specific and actionable
- Rate severity (1=low, 2=medium, 3=high)
- Focus on what's missing or unclear in the PRD

PRD:
${prdContent}

Return your analysis as a JSON array with this structure:
[
  {
    "type": "mental-model" | "stakeholder" | "edge-case" | "metric",
    "category": "Mental Model" | "Stakeholder Alert" | "Edge Case" | "Metric Concern",
    "icon": "🔵" | "🟡" | "🔴" | "🟢",
    "title": "Brief question or concern",
    "severity": 1-3,
    "dimension": "technical" | "stakeholder" | "edgeCase" | "metric"
  }
]

Provide 5-10 insights. Return ONLY the JSON array, no other text.`
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Anthropic API error:', errorData);
      
      let errorMessage = 'API request failed';
      if (response.status === 401) {
        errorMessage = 'Invalid API key';
      } else if (response.status === 429) {
        errorMessage = 'Rate limit exceeded. Please try again later.';
      } else if (errorData.error?.message) {
        errorMessage = errorData.error.message;
      }
      
      return res.status(response.status).json({ error: errorMessage });
    }

    const data = await response.json();
    const content = data.content[0].text;
    
    // Extract JSON from response (handle markdown code blocks)
    let jsonStr = content.trim();
    if (jsonStr.startsWith('```json')) {
      jsonStr = jsonStr.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    
    const insights = JSON.parse(jsonStr);
    
    // Return the insights
    return res.status(200).json({ insights });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      error: error.message || 'Internal server error' 
    });
  }
}
