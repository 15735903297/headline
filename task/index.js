const request = require('request');

const cheerio = require('cheerio');
const wallpaper = require('wallpaper');
const iconv = require('iconv-lite');
const async = require('async');
const mysql = require('mysql');
const filter = require('bloom-filter-x')
const fs = require('fs');
const db=mysql.createPool({host:'127.0.0.1',user:'root',password:'',database:'db'});
// function fetch_urls() {
//     request({
//         url: 'http://news.zol.com.cn/',
//         encoding: null
//     }, (err, res, body) => {
//         body = iconv.decode(body, 'gb2312');
//         let $ = cheerio.load(body);
//         let urls = [];
//         $('.content-list li').each((k, v) => {
//             let url = $(v).find('.info-head a').attr('href');
//             if (filter.add(url)) {
//                 urls.push(url);
//             }
//         });
//         let d = new Date();
//         if (!urls.length){
//             console.log(d.toUTCString()+'捕获一次，本次未更新...')
//         }else {
//             console.log(d.toUTCString()+'捕获一次,更新'+urls.length+'次')
//         }
//         async.eachLimit(urls, 1, (v, next) => {
//             request({
//                 url: v,
//                 encoding:null
//             }, (err, res, body) => {
//                 console.log(v);
//                 next(null)
//             })
//         });
//
//
//     })
// };
// fetch_urls();
// setInterval(fetch_urls,20000);
function fetch_titles() {
    request({
        url: 'http://news.zol.com.cn/',
        encoding: null
    }, (err, res, body) => {
        body = iconv.decode(body, 'gb2312');
        let $ = cheerio.load(body);
        let arr = [];
        $('.content-list li').each((k, v) => {
            let title = $(v).find('.info-head a').text();
            let dsc = $(v).find('p').text();
            let url = $(v).find('a').attr('href');
            let time = $(v).find('.foot-data').text();
            let image = $(v).find('img').attr('.src')
            if (filter.add(url)){
               arr.push({
                   title:title,
                   dsc:dsc,
                   url:url,
                   create_time:time,
                   image:image
               })
            }
        });
        if (arr.length){
            async.eachLimit(arr,1,(v,next)=>{
                request({
                    title:v.title,
                    dsc:v.dsc,
                    url:v.url,
                    create_time:v.time,
                    image:v.image
                })
            })
        }
        let d = new Date();
        if (!arr.length){
            console.log(d.toUTCString()+'捕获一次，本次未更新...')
        }else {
            console.log(d.toUTCString()+'捕获一次,更新'+arr.length+'次')
        }
        async.eachLimit(arr, 1, (v, next) => {
            request({
                title: v,
                encoding:null
            }, (err, res, body) => {
                console.log(v);
                next(null);
               db.query("insert into news(cid,title,dsc,image,url,create_time,content)values(?,?,?,?,?,?,?)",[1,v.title,v.dsc,v.image,v.url,' ',' '],function (err,rows,fields) {
                    if (err){
                        console.log('添加失败',err.message );
                        return;
                    }
                    console.log('添加成功');
                })
            })
        })
    })
}
fetch_titles();
setInterval(fetch_titles,20000);

