const db = require("../models");

const product = db.auto;

exports.products = (req, res) => {
    if(req.body.admin)
        res.redirect("/admin/autos");
    product.findAll({raw: true}).then(product =>{
    res.render("products", { products : product});
    }
    )};

exports.addProduct = (req, res) => {
    var image = req.files.file;
    var fileName= req.body.brand+"_"+req.body.model;
    image.mv('dist/image/' + fileName + '.jpg', function(err) {
        if (err) {
            console.log(err);
        }}
        );
    product.create({
        brand: req.body.brand,
        model: req.body.model,
        price: req.body.price,
        category: req.body.category,
        picture: '/dist/image/' + fileName + '.jpg',
        rest: req.body.rest
         }).then(res.redirect("/admin/autos")).catch(err=> res.send(err));
        };

exports.updateProduct = (req, res) => {
    product.update(
        {
            price: req.body.price,
            rest: req.body.rest
        },
        {
            where: 
            {
                id: req.body.autoId
            }
        }
    ).then(res.send({ success: "updated"})).catch(err => res.send);
}

exports.deleteProduct = (req, res) => {
    product.destroy(
        {
            where: 
            {
                id: req.body.autoId
            }
        }
    ).then(res.send({ success: "deleted"})).catch(err => res.send);
}