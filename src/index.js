import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import initData from './init-data.json';
import Column from './column';
import '@atlaskit/css-reset';

class App extends Component {
    constructor(){
        super();
        this.state = initData;
    }

    render() {
        return this.state.columnOrder.map(columnId => {
            const column = this.state.columns[columnId];
            const t = column.taskIds.map(taskId => this.state.tasks[taskId]);
            return (
                <Column key={column.id} column={column} tasks={t} />
            );
        })
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
