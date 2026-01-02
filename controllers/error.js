// Visszadja a 404-es hibakódot,
// a 404-es view-ot renderelei, 
// a statikus cím miatt megadja az oldal címét
exports.get404 = (req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
}