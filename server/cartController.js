module.exports = {
    getCartByUser: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session.user

        try {
            const cart = await db.cart.get_cart_by_user([+user_id])
            res.status(200).send(cart)
        }catch(err){
            console.log(`You cannot get this cart`, err)
            res.sendStatus(500)
        }

    },

    editProductInCart: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        const {quantity} = req.body
        const {user_id} = req.session.user

        try {
            const cart = await db.cart.edit_product_in_cart([+user_id, +id, +quantity])
            res.status(200).send(cart)
        }catch(err){
            console.log(`You cannot edit this cart`, err)
            res.sendStatus(500)
        }
    },


    addProductToCart: async (req, res) => {
        const db = req.app.get('db')
        const {quantity} = req.body
        const {id} = req.params
        const {user_id} = req.session.user

        try {
            const cart = await db.cart.add_product_to_cart([+user_id, +id, +quantity])
            console.log('HIT')
            res.status(200).send(cart)
        }catch(err){
            console.log(`Error adding product to cart`, err)
            res.sendStatus(500)
        }
    },


    deleteProductInCart: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params

        try{
            const cart = await db.cart.delete_product_in_cart(+id)
            res.status(200).send(cart)
        }catch(err){
            console.log(`Could not delete item in cart`, err)
            res.sendStatus(500)
        }
    }



}