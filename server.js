const express = require('express');
const res = require('express/lib/response');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

//GET a random quote
app.get('/api/quotes/random', (req, res, next) => {
     
     const quote = getRandomElement(quotes);
     res.send({quote: quote});
    });

//GET all quotes 
app.get('/api/quotes', (req, res, next) => {

    if(!req.query.person){
        return res.send({quotes: quotes})

    } else {
        const filterQuotes = quotes.filter(elementQuotes => 
            elementQuotes.person === req.query.person
        )
        res.send({quotes:filterQuotes})

    }
})

//POST  a new quote 
app.post('/api/quotes', (req, res, next) => {
    
    if(req.query.quote && req.query.quote){
    const newQuote = {
        quote: req.query.quote,
        person: req.query.person
    };

    quotes.push(newQuote);
    res.send({quote: newQuote});

    } else {
        res.status(400).send();
    }  
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});