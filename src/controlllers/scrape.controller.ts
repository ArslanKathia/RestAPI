import * as cherrio from 'cheerio';
import axios from 'axios';
import { Request, Response } from 'express';

export class ScrapeController{

    static async getNewsData(req:Request,res:Response){
    //     const url = 'https://www.bbc.com/urdu';
    //     axios.get(url)
    //     .then(response =>{
    //         const html = response.data;
    //         console.log(html);
    //         const $ = cherrio.load(html);
    //         const newArticle = [];
    //         $('.gs-c-promo-headling__title',html).each((index,element)=>{
    //             const title = $(element).text();
    //             const link = $(element).find('a').attr('href');
    //             newArticle.push({title,link});
    //         });
    //         console.log(newArticle);
    //         res.status(200).json({
    //             news: newArticle
    //         })
    //     })
    //     .catch(error=>{
    //         console.log(error);
    const url = 'https://dunyanews.tv/';

     axios.get(url)
    .then(response => {
    const html = response.data;
    const $ = cherrio.load(html);
        console.log(html);
    const newsArticles = [];

    $('.news-list-item', html).each((index, element) => {
      const title = $(element).find('.news-list-item-title').text();
      const link = $(element).find('.news-list-item-title a').attr('href');
      const image = $(element).find('.news-list-item-image img').attr('src');
      const description = $(element).find('.news-list-item-description').text();
      newsArticles.push({ title, link, image, description });
    });

    console.log(newsArticles);
    res.status(200).json({
        news: newsArticles 
    });
        })
        .catch(error => {
            console.error(error);
        });     
    }

    static async getNewsCOMAUData(req:Request,res:Response){
   
        const url = 'https://www.news.com.au/world/breaking-news';
    
         axios.get(url)
        .then(response => {
        const html = response.data;
        const $ = cherrio.load(html);
            console.log(html);
        const newsArticles = [];
    
        $('article.storyblock', html).each((index, element) => {
          //const title = $(element).find('.storyblock_title').text();
          //const link = $(element).find('.storyblock_title storyblock_title_link a').attr('href');
          const image = $(element).find('.responsive-img img').attr('src');
          //const description = $(element).find('.storyblock_title').text();
          const title = $(element).find('h4.storyblock_title a').text().trim();
          const standfirst = $(element).find('p.storyblock_standfirst').text().trim();
          const section = $(element).find('a.storyblock_section').text().trim();
          const link = $(element).find('a.storyblock_title_link').attr('href');

    
          newsArticles.push({ title, standfirst, image, section,link });
        });
    
        console.log(newsArticles);
        res.status(200).json({
            news: newsArticles 
        });
            })
            .catch(error => {
                console.error(error);
            });     
        }
}