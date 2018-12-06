const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/:id',(req, res) => {
    const { side } = req.query; 
    const { id } = req.params;
    
    if (!side){
       return res.redirect(`/cards/${id}?side=question`);
    }

    const name = req.cookies.username;
    const text = cards[id][side];
    const { hint } = cards[id];
    
    const templateData = { text, side, id, name };

    if (side === "question") {
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
        templateData.sideToShowDisplay = 'Answer';
    } else if (side === 'answer'){
        templateData.sideToShow = 'question';
        templateData.sideToShowDisplay = 'Question';
    }
    
    res.render('card', templateData);
});


router.get('/', (req, res) => {
    //get array length
    const numCards = cards.length;
    //select random value
    const randomId = (Math.floor(Math.random() * numCards));
    //console.log(randomId);
    //redirect to cardId route
    res.redirect(`/cards/${randomId}?side=question`);
});

module.exports = router;