export const getRandomHeaders = () => {
	const variants = [
		{
			'User-Agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
			'Sec-Ch-Ua':
				'"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
			'Sec-Ch-Ua-Platform': '"Windows"',
			'Sec-Ch-Ua-Mobile': '?0'
		},
		{
			'User-Agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0'
			// Firefox не отправляет Sec-Ch-Ua заголовки
		},
		{
			'User-Agent':
				'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15'
			// Safari не отправляет Sec-Ch-Ua заголовки
		},
		{
			'User-Agent':
				'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
			'Sec-Ch-Ua':
				'"Google Chrome";v="124", "Chromium";v="124", "Not:A-Brand";v="99"',
			'Sec-Ch-Ua-Platform': '"Android"',
			'Sec-Ch-Ua-Mobile': '?1'
		},
		{
			'User-Agent':
				'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
			// Safari не отправляет Sec-Ch-Ua заголовки
		}
	]

	const random = variants[Math.floor(Math.random() * variants.length)]

	return {
		Accept: 'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding': 'gzip, deflate, br, zstd',
		'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
		Origin: 'http://www.encar.com',
		Referer: 'http://www.encar.com/',
		'Sec-Fetch-Dest': 'empty',
		'Sec-Fetch-Mode': 'cors',
		'Sec-Fetch-Site': 'cross-site',
		Priority: 'u=1, i',
		...random
	}
}
