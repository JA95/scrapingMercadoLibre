/**
  * Scraping Mercado Libre
  * @author Antonio Martínez @JA95
  * @version 1.0
  */

const request = require('request');
const cheerio = require('cheerio');
const fs	  = require('fs');

var url = 'https://computacion.mercadolibre.com.mx/redes/routers-wifi-y-access-points/';

request( url, function(error, response, html){
	if(!error && response.statusCode == 200){
		var $ = cheerio.load(html);
		var contador = 0;
		var nombreProducto, precioProducto, urlImagenProducto, file;

		$('li.results-item').each(function(){
		// Obteniendo datos
			nombreProducto = $(this).find('span.main-title').text();
			precioProducto = $(this).find('span.price-fraction').text();
			urlImagenProducto = $(this).find('.item__image .image-content a img').attr('title');

			console.log('');
			console.log(contador + ".-\n\t" + nombreProducto);
			console.log('\t $' + precioProducto);
			console.log('\t ' + urlImagenProducto);

		// Guardando imagen
			if( urlImagenProducto != null ){
				file = fs.createWriteStream('img/' + contador + '.jpg');
				request(urlImagenProducto).pipe(file);
			}
			contador++;
		});
	}
});