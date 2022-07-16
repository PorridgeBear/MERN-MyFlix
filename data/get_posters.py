import datetime
import json
import os
from turtle import clear
import requests
import sys
import time
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('API_KEY')
API_BASE_URL = 'https://api.themoviedb.org/3'
IMG_BASE_URL = 'https://image.tmdb.org/t/p/original'

# Validate script invocation
if len(sys.argv) != 2:
    print('Please run using python get_posters.py path-to-file.json')
    exit()

# Load the input file
movies_json_file = sys.argv[1]
print(f'Loading movies file {movies_json_file}')
movies = json.load(open(movies_json_file, 'r'))

def get_poster(title: str, release_year: int) -> str:
    """ Use the TMDB API to search for a movie by title and release year, ideally finding a single result """

    print(title, release_year)

    response = requests.get(f'{API_BASE_URL}/search/movie', params={
        'api_key': API_KEY,
        'query': title,
        'primary_release_year': release_year,
        'include_adult': True
    })

    response = response.json()
    results = response['results']
    if len(results) > 0:
        return f"{IMG_BASE_URL}{response['results'][0]['backdrop_path']}"

# Output - start with an empty list
with open('movies_with_posters.json', 'w') as file:
        json.dump([], file)

# Append each movie and save output
for movie in movies:
    with open('movies_with_posters.json', 'r') as file:
        output = json.load(file)

    title = movie['title']
    released = datetime.date.fromisoformat(movie['released']).year

    movie['poster'] = get_poster(title, released)
    output.append(movie)

    with open('movies_with_posters.json', 'w') as file:
        json.dump(output, file)

    # Allow pause between requests so as not to spank TMDB API
    time.sleep(1)
