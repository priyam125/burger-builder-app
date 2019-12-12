import React, {Component} from 'react';
import Aux1 from '../Auxi/Aux1';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});

    }

    sideDrawerToggleHandler = () => {
        this.setState ((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        })
    }

    render() {
        return (
         <Aux1>
            <Toolbar ToggleClicked = {this.sideDrawerToggleHandler}/>
            <SideDrawer open = {this.state.showSideDrawer}
             closed = {this.sideDrawerClosedHandler}/>
            <main className = { classes.Content }>
                {this.props.children}
            </main>
        </Aux1>
        )
    }
}
    
    


export default Layout;



/* import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';


class Layout extends Component {
    state = {
        showSideDrawer: true
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    render() {
        return (
         <Aux>
            <Toolbar />
            <SideDrawer open = {this.state.showSideDrawer}
             closed = {this.sideDrawerClosedHandler}/>
            <main className = { classes.Content }>
                {this.props.children}
            </main>
        </Aux>
        )
    }
}
    
    


export default Layout;*/