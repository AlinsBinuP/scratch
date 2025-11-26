import torch
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration, AutoTokenizer, AutoModelForSeq2SeqLM

class ImageCaptioner:
    def __init__(self):
        print("Loading BLIP model...")
        self.processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
        self.model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")
        print("BLIP model loaded.")

    def generate_caption(self, image: Image.Image) -> str:
        inputs = self.processor(image, return_tensors="pt")
        out = self.model.generate(**inputs)
        caption = self.processor.decode(out[0], skip_special_tokens=True)
        return caption

class CaptionStyler:
    def __init__(self):
        print("Loading Flan-T5 model...")
        self.tokenizer = AutoTokenizer.from_pretrained("google/flan-t5-base")
        self.model = AutoModelForSeq2SeqLM.from_pretrained("google/flan-t5-base")
        print("Flan-T5 model loaded.")

    def style_caption(self, base_caption: str, style: str) -> list[str]:
        prompts = []
        if style == "Funny":
            prompts = [
                f"Make this caption funny for Instagram: {base_caption}",
                f"Write a hilarious Instagram caption about: {base_caption}",
                f"Turn this into a witty joke for social media: {base_caption}"
            ]
        elif style == "Inspirational":
            prompts = [
                f"Write an inspiring Instagram caption about: {base_caption}",
                f"Create a motivational quote based on this image description: {base_caption}",
                f"Write a deep and meaningful caption for: {base_caption}"
            ]
        elif style == "Short & Punchy":
            prompts = [
                f"Write a very short and cool Instagram caption for: {base_caption}",
                f"Summarize this in 3 words for Instagram: {base_caption}",
                f"One word caption for: {base_caption}"
            ]
        else:
            prompts = [f"Write a good Instagram caption for: {base_caption}"] * 3

        captions = []
        for prompt in prompts:
            input_ids = self.tokenizer(prompt, return_tensors="pt").input_ids
            outputs = self.model.generate(input_ids, max_length=60, do_sample=True, temperature=0.9)
            captions.append(self.tokenizer.decode(outputs[0], skip_special_tokens=True))
        
        return captions

    def generate_hashtags(self, base_caption: str) -> list[str]:
        prompt = f"Generate 10 relevant Instagram hashtags for this image description, separated by spaces: {base_caption}"
        input_ids = self.tokenizer(prompt, return_tensors="pt").input_ids
        outputs = self.model.generate(input_ids, max_length=100, do_sample=True, temperature=0.7)
        hashtags_str = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        # Basic cleaning
        hashtags = [tag.strip() for tag in hashtags_str.split() if tag.startswith('#')]
        # Fallback if model doesn't output #
        if not hashtags:
             hashtags = [f"#{word}" for word in base_caption.split() if len(word) > 3][:10]
        return hashtags

# Singleton instances
_captioner = None
_styler = None

def get_captioner():
    global _captioner
    if _captioner is None:
        _captioner = ImageCaptioner()
    return _captioner

def get_styler():
    global _styler
    if _styler is None:
        _styler = CaptionStyler()
    return _styler
