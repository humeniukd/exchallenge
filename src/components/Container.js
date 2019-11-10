import React, {Component} from 'react';
import {setCurrency, exchange, setAmount, swapCurrencies, getLatestRates, toggleReverse} from '../actions';
import ExchangeScreen from './ExchangeScreen';
import {connect} from 'react-redux';
import {RATE} from '../config';

class Container extends Component {
    tick = () => {
        this.props.fetchLatestRates();
    };

    render() {
        return <ExchangeScreen {...this.props} />;
    }

    componentDidMount() {
        this.props.fetchLatestRates();
        this.timer = setInterval(this.tick, RATE)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }
}

const mapStateToProps = state => ({...state});

const mapDispatchToProps = dispatch => ({
    onCurrencyChange: (e, second) => {
        dispatch(setCurrency(e.target.value, second));
    },
    onChangeAmount: val => {
        dispatch(setAmount(val));
    },
    swapCurrencies: () => {
        dispatch(swapCurrencies());
    },
    onExchange: () => {
        dispatch(exchange());
    },
    fetchLatestRates: () => {
        dispatch(getLatestRates());
    },
    toggleFocus: reverse => {
        dispatch(toggleReverse(reverse));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Container);