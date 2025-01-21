def detect_mood(model, user_text):
  """Detect the user's mood using Gemini API."""
  prompt = f"""Analyze the sentiment in this text. Provide a single-word label representing the user's mood, such as "happy", "sad", "angry", "anxious", "relaxed", "excited", "calm", or "neutral". Only return one of these labels:

    Text: "{user_text}"
    Mood: """

  try:
    response = model.generate_content(prompt)
    mood = response.text.strip().lower()
    return mood
  except Exception as e:
      print(f"[bold red]Error while detecting mood: {e}[/bold red]")
      return None