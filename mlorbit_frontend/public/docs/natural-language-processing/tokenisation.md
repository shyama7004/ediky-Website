# TOKENISATION

Tokenisation splits raw text into smaller units (tokens).

```python
import spacy, en_core_web_sm
nlp = en_core_web_sm.load()
doc = nlp("Hello world!")
print([t.text for t in doc])   # ➜ ['Hello', 'world', '!']
