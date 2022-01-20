import React from 'react';
import Blank from "./Blank";

class Stage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            blanks: [],
            blankCount: 0.,
            seatsLeft: parseInt(props.seatCount)
        };

        this.onCreateBlank = this.onCreateBlank.bind(this);
    }

    // Looks like junk aka JS
    setSeatsLeft = (count) => {
        this.setState({
            seatsLeft: count
        });
    }

    onCreateBlank = (event) => {
        this.setState({
            blanks: [...this.state.blanks, {
                id: this.state.blankCount, 
                parent: this,
            }],
            blankCount: this.state.blankCount + 1,
        });
    }

    render() {

        let elems_head = null;
        let elems_blanks = null;

        if(this.state.blankCount > 0) 
        {
            elems_head = (
                <div class="sb-supplylist-heads">
                    <span class="sb-supplylist-supply-text">
                        Фамилия
                    </span>
                    <span class="session-ticket-count">
                        Количество Билетов
                    </span>
                    <div class="sb-supplylist-supply-controls"></div>
                </div>
            )

            elems_blanks = (
                <ul class="sb-supplylist-supplies">
                    {
                        this.state.blanks.map(blank => (
                            <Blank
                                id={blank.id}
                                parent={blank.parent}
                                setSeatsLeft={this.setSeatsLeft}
                            />
                        ))
                    }
                </ul>
            )
        }

        if (this.state.seatsLeft > 0) {
            return (
                <div class="sb-supplylist" id={this.props.id}>
                    <header class="add-client-header">
                        <span>Время: {this.props.time}</span>
                        <span>Фильм: {this.props.movie}</span>
                        <span>Осталось мест: {this.state.seatsLeft}</span>
                    </header>
                    {elems_head}
                    {elems_blanks}
                    <footer class="sb-supplylist-footer">
                        <button type="button" class="sb-supplylist-add-supply" onClick={this.onCreateBlank}>
                            Добавить посетителя
                        </button>
                    </footer>
                </div>
            );
        }

        return (
            <div class="sb-supplylist" id={this.props.id}>
                <header class="add-client-header">
                    <span class="session-time">{this.props.time}, {this.props.movie}, осталось мест: {this.state.seatsLeft}</span>
                </header>
                {elems_head}
                {elems_blanks}
            </div>
        );
    }
}

export default Stage;