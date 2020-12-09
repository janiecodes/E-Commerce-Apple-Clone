import {Switch, Route} from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Auth from './Components/Auth'
import Registration from './Components/Register'
import Cart from './Components/Cart'
import Checkout from './Components/Checkout'
import Mac from './Components/Products/Mac'
import Ipad from './Components/Products/Ipad'
import Iphone from './Components/Products/Iphone'
import Watch from './Components/Products/Watch'
import OrderComplete from './Components/OrderComplete'
import SMS from './Components/SMS'
import Email from './Components/Email'

export default (
    <Switch>
        <Route exact path='/' component={Dashboard}/>
        <Route path='/auth' component={Auth}/> 
        <Route path='/register' component={Registration}/>
        <Route path='/mac' component={Mac}/> 
        <Route path='/ipad' component={Ipad}/> 
        <Route path='/iphone' component={Iphone}/> 
        <Route path='/watch' component={Watch}/> 
        <Route path='/cart' component={Cart}/>
        <Route path='/checkout' component={Checkout}/> 
        <Route path='/ordercomplete' component={OrderComplete}/>
        <Route path='/sms' component={SMS}/>
        <Route path='/email' component={Email}/>
    </Switch>
)
