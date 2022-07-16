# Local

    pyenv virtualenv 3.10.0 mern-myflix

    pyenv activate mern-myflix

    pip install -r requirements.txt

# Data

This is a python Scrapy project that has a simple spider implementation to scrape a list of movies from websites dealing in movie data/posters. 

It is configured to crawl slow enough to be a good citizen and does not attempt to crawl the entire site, only a small list.

## Movie Poster DB Spider

This was the original spider but is no longer operating. The site returns a connection refused, my guess is that they have detection of unfamiliar bot user agents and have blocked my IP. This is par for the course with scraping, and is what cloud providers like https://www.zyte.com/ solve - distributed IP based scraping. 

## Cine Material Spider

Therefore I implemented a new spider against Cine Materials which is a better site to crawl due to its data structure and range of user uploaded posters. As I have progressed from the original spider to this new one, I have grown fonder of the XPath response selector vs. Scrapy's own, it's very powerful and a re-usable skill.

Like the previous spider, it was possible to obtain the basic movie data relatively straighforwardly. An interesting challenge came with the poster images. These are held on a separate page and I applied a map/reduce approach to selecting a single landscape poster. 

## The Movie DB (TMDB)

During testing following Cine Material scraping, I found not all movies on Cine Material have landscape images so the grid layout appeared worse due to inconsistent heights mixing.

Further searching, I managed to find another source of movie data and posters with an API! TMDB is excellent, with a rich API for searching movie and TV data. It is always preferable to extract data using an API than it is to scrape. For now though, to make progress on other features, I decided to leave the Cine Material data scrape and to create a separate script to use the TMDB API to extract a landscape oriented poster. 

# Running

There are two parts to producing a final set of data that can be used by the `api` part of this project.

## Cine Material 

    cd movies
    scrapy crawl movies_cine -O movies.json

## get_posters.py

The `get_posters` script using plain `requests` to make a search call to the API with the movie title and release year. Being able to supply a release year to the API search was inspired, and I was able to use these 2 pieces of information to, broadly, get 1 hit to obtain an accurate poster. Where there were a couple, I take the first result relying on TMDB's relevancy ranking design based on an exact title match. TMDB requires an API key. To avoid committing this in git, I've used a `data/.env`.

  get_posters.py ./movies/movies.json

This will output `movies_with_posters.json`

## Copy to api/server.js

At the moment I copy `movies_with_posters.json` to `api/server.js` to facilitate faster initial UI implementation. This will be moved to a database.
