from curses import meta
import functools
import random
import uuid
import scrapy


def get_rating() -> str:
    """ Return a random rating as a stop-gap until we find a bonafide data source """
    bbfc_ratings = ['U', 'PG', '12', '12A', '15', '18']
    return random.choice(bbfc_ratings)


class CineMaterialSpider(scrapy.Spider):
    """Use the Cine Material 2022 page to extract some sample movie data """

    base_url = 'https://www.cinematerial.com'

    name = 'movies_cine'
    start_urls = [f'{base_url}/titles/movies/2022']

    def parse(self, response):
        """ Identify movie pages """
        movie_links = response.xpath("//a[starts-with(@href, '/movies/')]/@href").getall()
        for movie_link in movie_links:
            movie_posters_page = f'{self.base_url}{movie_link}'
            movie_page = f'{movie_posters_page}/info'

            print(movie_posters_page, movie_page)
            yield scrapy.Request(
                url=movie_page,
                callback=self.parse_movie_page,
                meta={'movie_posters_page': movie_posters_page}
            )

    def parse_movie_page(self, response):
            """ Parse a movie page """

            movie_data = {
                "title": response.css('h1.page-title a::text').get(),
                "rating": get_rating(),
                "genres": response.xpath("//a[contains(@href, '?genre')]//text()").getall(),
                "released": response.xpath("//th[text()='Release date:']/following-sibling::td//text()").get(),
                "synopsis": ''.join(response.xpath("//p[@id = 'overview']//text()").getall()).strip(),
                "directors": response.xpath("//th[text()='Directed by:']/following-sibling::td//a//text()").getall(),
                "cast": response.xpath("//strong[text()='Cast:']/following-sibling::div//a//text()").getall(),
                "run_time": response.xpath("//th[text()='Runtime:']/following-sibling::td//text()").get(),
            }

            yield scrapy.Request(
                url=response.meta['movie_posters_page'],
                callback=self.parse_movie_poster_url,
                meta={'movie_data': movie_data}
            )

    def parse_movie_poster_url(self, response):
        """ Fetch all possible poster resolutions and use python map/reduce to chose the largest landscape poster """

        movie_data = response.meta['movie_data']

        # Prior to the map/reduce I had used a filter for finding landscape, then a custom sort for largest width:
        # landscape_posters = filter(lambda dims: dims[0] > dims[1], poster_resolutions)
        # landscape_posters_by_most_width = sorted(landscape_posters, key=lambda x: x[0], reverse=True)
        # landscape_pick = landscape_posters_by_most_width[0]

        poster_resolutions = response.xpath("//span[contains(text(), ' px')]/text()").getall()

        # Map: process the scraped resolutions into a reduceable format
        def get_resolution_dimensions(res) -> tuple:
            """ Split a resolution string e.g. 2025*3000 px into (w: int, h: int) """
            parts = res.split(' ')
            if len(parts) != 2:
                return
            dims = parts[0].split('*')
            if len(dims) != 2:
                return
            return tuple(map(int, dims))

        poster_resolutions = list(map(get_resolution_dimensions, poster_resolutions))

        # Reduce: keep the largest width dimension
        def dims_reducer(dim0: tuple, dim1: tuple) -> tuple:
            return dim0 if dim0[0] > dim1[0] else dim1

        landscape_pick = functools.reduce(dims_reducer, poster_resolutions)
        landscape_pick_search_text = f'{landscape_pick[0]}*{landscape_pick[1]} px'

        # Finish by locating a single image URL, note the search may find multiple, so only use get to use first
        poster_url = response.xpath(f"//span[contains(text(), '{landscape_pick_search_text}')]/parent::span/preceding-sibling::img/@data-src").get()

        # The thumbnail URL is returned but replacing with 500x we get a large enough version - full size is not
        # available without payment
        poster_url = poster_url.replace('/136x/', '/500x/') if poster_url else ''

        movie_data['poster'] = poster_url

        # Give the movie an ID
        movie_data["id"] = str(uuid.uuid4())

        print(movie_data)
        yield movie_data
