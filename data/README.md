# Data

This is a python Scrapy project that has a simple spider implementation to scrape a list of movies from the Movies Posters DB website. It is configured to crawl slow enough to be a good citizen and does not attempt to crawl the entire site, only the movies on the home page.

These are yielded from the spider, so crawling is saved to JSON;

    scrapy crawl -O movies.json

This data is used at the moment by the API in-code to facilitate UI implementation. Later a movies database will be created.