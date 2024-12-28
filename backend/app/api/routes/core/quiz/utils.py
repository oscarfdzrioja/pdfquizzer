import os
from openai import OpenAI
import json

client = OpenAI(
    api_key =  os.environ.get("OPENAI_API_KEY"),    
)

def generate_description(input):
    completion = client.chat.completions.create(
    model = "gpt-3.5-turbo",
    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": 'Hello, ' + input},
    ]
    )

    return completion.choices[0].message.content.strip()

