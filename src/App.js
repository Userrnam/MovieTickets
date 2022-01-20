
import React from 'react';
import SupList from "./SupList";

export default class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            sessions: [],
            sessionCount: 0.
        };
        this.cleanInput = this.cleanInput.bind(this);
        this.onInputKeyDown = this.onInputKeyDown.bind(this);
        this.onAddSession = this.onAddSession.bind(this);
    }

    cleanInput = () => {
        const st = document.getElementById("session-time");
        // st.style.display = "none";
        st.value = "";

        const sm = document.getElementById("session-movie");
        // sm.style.display = "none";
        sm.value = "";

        const sct = document.getElementById("session-seat-count");
        // sm.style.display = "none";
        sct.value = "";

        document.getElementById("add-session-prompt")
            .style.display = "inherit";
    }

    onAddSession = ({ key }) => {
        const time = document.getElementById("session-time").value
        const movie = document.getElementById("session-movie").value
        const seatCount = document.getElementById("session-seat-count").value

        // check all parameters are set
        if(time && movie && seatCount) {
            const reTime = /((0?[0-9])|(1[0-9])|(2[0-3])):([0-5][0-9])/;
            const reNum = /0|([1-9][0-9]*)/;

            const timeCorrect  = reTime.test(time)
            const countCorrect = reNum.test(seatCount)
 
            if (!timeCorrect) {
                alert("Неверно задано время")
            }

            if (!countCorrect) {
                alert("Количество мест должно быть числом")
            }

            if (countCorrect && timeCorrect) {
                this.setState({
                    sessions: [...this.state.sessions, {
                        id: this.state.sessionCount,
                        time,
                        movie,
                        seatCount,
                    }],
                    sessionCount: this.state.sessionCount + 1
                });
            }
        }
        else {
            alert("Невозможно добавить сеанс: не все поля заданы")
        }

        this.cleanInput();
    }

    onInputKeyDown = ({ key }) => {
        if (key === "Enter") {
            this.onAddSession({ key })
        }
        if (key === "Escape") {
            this.cleanInput();
        }
    }

    render() {
        console.log(this.pagecontent);
        console.log(this.state.sessions);
        const sortedSessions = this.state.sessions.sort(function(a, b) {
                        const ah = parseInt(a.time.substring(0, 2))
                        const am = parseInt(a.time.substring(3, 5))
                        const bh = parseInt(b.time.substring(0, 2))
                        const bm = parseInt(b.time.substring(3, 5))
                        return 100 * ah + am - (100 * bh + bm)
                    })
        return (
            <main>
                <div className="sessionlist">
                    <input className="new-session-input"
                        type="text"
                        placeholder="Время"
                        id="session-time"
                    />
                    <input className="new-session-input"
                        type="text"
                        placeholder="Фильм"
                        id="session-movie"
                    />
                    <input className="new-session-input"
                        type="text"
                        placeholder="Количество мест"
                        id="session-seat-count"
                    />
                    <button type="button" className="new-session-input" id="add-session" onClick={this.onAddSession}>
                        Добавить сеанс
                    </button>
                </div>
                {
                    sortedSessions
                    .map(session => (
                        <SupList
                            key={Math.random()}
                            id={session.id}
                            time={session.time}
                            movie={session.movie}
                            seatCount={session.seatCount}
                        />
                    ))
                }
            </main>
          );

    }
}