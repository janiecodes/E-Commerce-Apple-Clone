module.exports = {

    getAllProducts: async (req, res) => {
        const db = req.app.get('db')
        const products = await db.products.get_all_products();
        res.status(200).send(products)
    },

    getOneProduct: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        const [product] = await db.products.get_one_product(+id)
        if(product){
            res.status(200).send(product)
        }else{
            res.status(404).send(`I couldn't find the pun you're looking for`)
        }
    }







}