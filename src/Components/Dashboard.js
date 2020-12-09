import {Link} from 'react-router-dom';

const Dashboard = (props) => {


    return (
        <div className='dashboard-component'>
            <img className='dashboard-logo' alt='apple' src='https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/holiday-logo-202011?wid=142&hei=174&fmt=png-alpha&qlt=80&.v=1604421337000'/>
            <h1 className='dashboard-message'>Give something wonderful.</h1>

            <div className='dashboard-links'>
                <Link className='dashboard-iphone' to={`/iphone`}><img alt='apple' width='443' height='535'  src='https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/holiday-hero-iphone12-202011_GEO_US?wid=890&hei=895&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1604947380000'/></Link>
                <Link className='dashboard-ipad' to={`/ipad`}><img alt='apple' width='443' height='535'  src='https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/holiday-hero-ipadair-202011?wid=888&hei=897&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1604464614000'/></Link>
                <Link className='dashboard-watch' to={`/watch`}><img alt='apple' width='443' height='535'  src='https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/holiday-hero-watchse-202011?wid=886&hei=853&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1604947384000'/></Link>
            </div>

        </div>
    )




}

export default Dashboard










// const Dashboard = (props) => {


//     const [products ,setProducts] = useState ([]);
//     //axios request to our backend to get all the products
//     //componentDidMount not allowed in a Functional Component so we use useEffect
//     useEffect(() => {
//        axios
//         .get('/products')
//         .then((res) => {
//             setProducts(res.data)
//         })
//         .catch((err) => console.log(err));
//     }, []);

//     const mappedProducts = products.map((product) => {
//         return <DashProduct key={products.product_id} product={product}/>
//     })


//     return (
//         <div className='dashboard-component'>
//             <section className='dashboard-message'> 
//                 <p>Shop early online to get all your gifts in time for the holidays. And get Specialist help, free no-contact delivery, and more. Learn more ></p>
//             </section>
//             <ul style={{listStyle: 'none'}}>{mappedProducts}</ul> 
//         </div>
//     )
// }

// export default connect( (reduxState) => reduxState) (Dashboard)