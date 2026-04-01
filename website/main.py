import requests
from bs4 import BeautifulSoup

class SpellChecker:
    def __init__(self):
        # Simple dictionary of correct words
        self.dictionary = set(['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog'])

    def unknown(self, words):
        return [word for word in words if word.lower() not in self.dictionary]

    def candidates(self, word):
        # Simple suggestion: just return the word itself
        return {word}

class Typo:
    def __init__(self, word, suggestion, url):
        self.word = word
        self.suggestion = suggestion
        self.url = url

class App:
    def __init__(self):
        self.url = ''
        self.typos = []
        self.is_loading = False
        self.spell = SpellChecker()

    def handle_submit(self, event):
        event.preventDefault()
        self.is_loading = True
        self.typos = []

        try:
            visited_urls = set()
            queue = [self.url]

            while queue:
                current_url = queue.pop(0)
                if current_url in visited_urls:
                    continue
                visited_urls.add(current_url)

                response = requests.get(current_url)
                soup = BeautifulSoup(response.text, 'html.parser')

                for element in soup.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
                    text = element.get_text()
                    words = text.split()

                    for word in words:
                        if self.spell.unknown([word]):
                            suggestions = self.spell.candidates(word)
                            if suggestions:
                                self.typos.append(Typo(word, next(iter(suggestions)), current_url))

                for link in soup.find_all('a', href=True):
                    href = link['href']
                    if href.startswith('http'):
                        queue.append(href)

        except Exception as error:
            print('Error:', str(error))

        self.is_loading = False

    def render(self):
        print("URL Scanner")
        self.url = input("Enter URL: ")
        print("Scanning..." if self.is_loading else "Scan for Typos")
        
        if self.is_loading:
            print("Scanning websites for typos...")
        elif self.typos:
            print("Typos found:")
            for typo in self.typos:
                print(f"{typo.word} -> {typo.suggestion} (Found on: {typo.url})")
        else:
            print("No typos found.")

if __name__ == "__main__":
    app = App()
    app.handle_submit(type('Event', (), {'preventDefault': lambda: None})())
    app.render()

