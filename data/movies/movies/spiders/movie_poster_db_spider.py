from hashlib import md5
import scrapy 


class MoviePosterDBSpider(scrapy.Spider):
	"""Use the Movie Poster DB front page to extract some sample movie data """

	base_url = 'https://www.movieposterdb.com'

	name = 'movies_posterdb'
	start_urls = [base_url]

	def parse(self, response):
		""" Identify poster pages in order to access movie pages """
		poster_links = response.css('.dynwidthslider a::attr(href)').getall()
		for poster_link in poster_links:
			# poster links end with a hash segment that when removed provides the movie page
			movie_page = poster_link[:poster_link.rindex('/')]
			movie_page = f"{self.base_url}{movie_page}"
			print(movie_page)
			yield scrapy.Request(url=movie_page, callback=self.parse_movie_page)
	
	def parse_movie_page(self, response):
			""" Parse a movie page """
			movie_data = {
				"title": response.css('h1::text').get().strip(), 
				"tags": response.css('.badge-primary::text').getall(),
				"released": response.css('h1 small::text').get().strip(),
				"director": response.xpath("//td[text()='Director']/following-sibling::td//span/text()").get(),
				"synopsis": (response.css('.card-body p::text').get() or '').strip(),
				"poster": response.css("img[itemprop='thumbnail']::attr(src)").get()
			}

			movie_data["id"] = md5(movie_data['title'].encode('utf-8')).hexdigest()

			print(movie_data)

			yield movie_data
