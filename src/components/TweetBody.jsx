import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import bargraph from '../images/bargraph.png'
import scatterplot from '../images/scatterplot.png'


function TweetBody({ data }) {

    const tweetsArray = Object.entries(data.tweets).map(([key, value]) => ({ id: key, tweet: value }));
    const subjectivitypArray = Object.entries(data.Subjectivity).map(([key, value]) => ({ id: key, subjectivity: value }));
    const subjectivitynArray = Object.entries(data.Subjectivity).map(([key, value]) => ({ id: key, subjectivity: value }));
    subjectivitypArray.sort((a, b) => b.subjectivity - a.subjectivity);
    subjectivitynArray.sort((a, b) => a.subjectivity - b.subjectivity);   

    const top5pTweets = subjectivitypArray.slice(0, 5).map(item => {
        const tweetId = item.id;
        const tweetText = tweetsArray.find(tweet => tweet.id === tweetId).tweet;
        return { id: tweetId, tweet: tweetText };
    });

    const top5nTweets = subjectivitynArray.slice(0, 5).map(item => {
        const tweetId = item.id;
        const tweetText = tweetsArray.find(tweet => tweet.id === tweetId).tweet;
        return { id: tweetId, tweet: tweetText };
    });

    console.log(data)

    const pos = data['perpos'][0]
    const neg = data['perneg'][0]
    const net = data['pernet'][0]

    const net_para = "The prevalence of neutral sentiment outweighs both positive and negative sentiment, suggesting that the stock may remain unaffected by the current tweets. The abundance of neutral tweets implies a lack of strong sentiment, potentially indicating limited impact on the stock's performance."
    const pos_para = "With positive sentiment surpassing both negative and neutral sentiment, the stock could potentially experience a positive response to the ongoing tweets. The prevalence of positive tweets indicates a favorable outlook, suggesting that the stock may be influenced by the overall optimistic sentiment expressed on social media."
    const neg_para = "Negative sentiment outweighs both positive and neutral sentiment, the stock may be susceptible to negative implications resulting from the ongoing tweets. The predominance of negative tweets suggests a pessimistic sentiment, which could potentially impact the stock's performance adversely. Investors should be cautious in such scenarios."
    const inconclusive = "Tweet data is inconclusive, Meaning it becomes difficult to predict the potential impact of current tweets on the stock. The absence of a clear majority in positive, negative, or neutral sentiment implies uncertainty in assessing the sentiment's influence. Investors may need to rely on additional factors or analysis to make informed decisions regarding the stock's response to the tweets."

    return (
        <div>
            <div className='grid grid-cols-2 gap-2 text-left text-white'>
                <div className='col-span-1 px-5'>
                    <h3  className='font-bold'>Most positive tweets:</h3>
                    {top5pTweets.map(tweet => (
                            <ul key={tweet.id} className='pt-5 text-sm hover:text-lg'>{tweet.tweet}</ul>
                    ))}
                </div>
                <div className='col-span-1 px-5'>
                    <h3 className='font-bold'>Most negative tweets:</h3>
                    {top5nTweets.map(tweet => (
                            <ul key={tweet.id} className='pt-5 text-sm hover:text-lg'>{tweet.tweet}</ul>
                    ))}
                </div>
            </div>
            <div className='grid grid-cols-1 mt-10 px-10'>
                <div className='col-span-1'>
                    <>
                        <Swiper
                            pagination={{
                            type: "progressbar",
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                        >
                        <SwiperSlide>
                            <img src={bargraph} alt='bargraph' width='500px' className='mx-auto my-auto pt-5'/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={scatterplot} alt='scatterplot' width='500px' className='mx-auto my-auto pt-5'/>
                        </SwiperSlide>
                        </Swiper>
                    </>
                </div>    
            </div>
            <div className='grid grid-cols-3 gap-5 text-white px-10 mt-12'>
                <div className='col-span-1 font-semibold text-center'>
                    <h3>Positive Tweets Percentage:</h3>
                    <p className='font-bold text-xl mt-2'>{pos}</p>
                </div>
                <div className='col-span-1 font-semibold text-center'>
                    <h3>Neutral Tweets Percentage:</h3>
                    <p className='font-bold text-xl mt-2'>{net}</p>
                </div>
                <div className='col-span-1 font-semibold text-center'>
                    <h3>Negative Tweets Percentage:</h3>
                    <p className='font-bold text-xl mt-2'>{neg}</p>
                </div>          
            </div>

            <div className='text-white mx-auto my-auto px-5 mt-10'>
                <h2 className='font-bold mb-3 text-xl'>Conclusion</h2>
                {net > pos && neg ? <p>{net_para}</p> : pos > net & neg ? <p>{pos_para}</p> : neg > pos && net ? <p>{neg_para}</p> : <p>{inconclusive}</p>}
            </div>
        </div>      
    )
}

export default TweetBody