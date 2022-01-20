import { selectOptions } from '@testing-library/user-event/dist/select-options';
import React from 'react';
import Blank from "./Blank";

class Stage extends React.Component {
    constructor(props) {
        super(props);

        const id = "Session:" + this.props.id

        const state = window.localStorage.getItem(id)
        this.state = JSON.parse(state) || {
            blanks: [],
            idCounter: 0.,
            seatsLeft: parseInt(props.seatCount),
            show: false
        };

        // save the state, otherwise it will be forgotten!
        if (!state) {
            window.localStorage.setItem(id, JSON.stringify(this.state))
        }

        this.onCreateBlank = this.onCreateBlank.bind(this);
        this.onShow = this.onShow.bind(this)
    }

    setSeatsLeft = (count) => {
        this.setState({
            seatsLeft: count
        });
    }

    onShow = (event) => {
        this.setState({
            show: !this.state.show
        })
    }

    onCreateBlank = (event) => {
        this.setState({
            blanks: [...this.state.blanks, {
                id: this.state.idCounter, 
            }],
            idCounter: this.state.idCounter + 1,
        })
    }

    // This looks awful, but we are in JS
    forceRerender = () => {
        this.setState({
            show: !this.state.show
        }, () => {
            this.setState({
                show: !this.state.show
            })
        })
    }

    render() {

        const id = "Session:" + this.props.id
        window.localStorage.setItem(id, JSON.stringify(this.state))

        if (!this.state.show) {
            return (
                <div class="sessionlist" id={this.props.id}>
                    <header class="add-client-header">
                        <span>Время: {this.props.time}</span>
                        <span>Фильм: {this.props.movie}</span>
                        <span>Осталось мест: {this.state.seatsLeft}</span>
                        <button type="button" class="left-arrow-button" onClick={this.onShow}></button>
                    </header>
                </div>
            );
        }

        let elems_head = null;
        let elems_blanks = null;

        if(this.state.blanks.length > 0) 
        {
            elems_head = (
                <div class="sessionlist-heads">
                    <span class="sessionlist-client-text">
                        Фамилия
                    </span>
                    <span class="session-ticket-count">
                        Количество Билетов
                    </span>
                    <div class="sessionlist-client-controls"></div>
                </div>
            )

            elems_blanks = (
                <ul class="sessionlist-supplies">
                    {
                        this.state.blanks.map(blank => (
                            <Blank
                                id={blank.id}
                                parent={this}
                                setSeatsLeft={this.setSeatsLeft}
                                forceRerender={this.forceRerender}
                            />
                        ))
                    }
                </ul>
            )
        }

        if (this.state.seatsLeft > 0) {
            return (
                <div class="sessionlist" id={this.props.id}>
                    <header class="add-client-header">
                        <span>Время: {this.props.time}</span>
                        <span>Фильм: {this.props.movie}</span>
                        <span>Осталось мест: {this.state.seatsLeft}</span>
                        <button type="button" class="down-arrow-button" onClick={this.onShow}></button>
                    </header>
                    {elems_head}
                    {elems_blanks}
                    <footer class="sessionlist-footer">
                        <button type="button" class="sessionlist-add-client" onClick={this.onCreateBlank}>
                            Добавить посетителя
                        </button>
                    </footer>
                </div>
            );
        }

        return (
            <div class="sessionlist" id={this.props.id}>
                <header class="add-client-header">
                    <span>Время: {this.props.time}</span>
                    <span>Фильм: {this.props.movie}</span>
                    <span>Осталось мест: {this.state.seatsLeft}</span>
                    <button type="button" class="down-arrow-button" onClick={this.onShow}></button>
                </header>
                {elems_head}
                {elems_blanks}
            </div>
        );
    }
}

export default Stage;