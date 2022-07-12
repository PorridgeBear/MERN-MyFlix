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

As it turns out, given the user uploads required, not all movies have landscape images, so I have ended up with a mix of landscape and portrait images. More work needs doing here. 

# Running

These are yielded from the spider, so crawling is saved to JSON;

    cd movies
    scrapy crawl movies_cine -O movies.json

This data is used at the moment by the API in-code to facilitate UI implementation. Later a movies database will be created.