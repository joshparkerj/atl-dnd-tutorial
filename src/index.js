import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import initData from './init-data.json';
import Column from './column';
import '@atlaskit/css-reset';

class App extends Component {
    constructor() {
        super();
        this.state = initData;
    }

    onDragEnd = result => {
        const { destination, source, draggableId } = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return;
        }
        const column = this.state.columns[source.droppableId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(source.index,1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...column,
            taskIds: newTaskIds
        };
        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newColumn.id]: newColumn
            }
        };
        this.setState(newState);
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                {this.state.columnOrder.map(columnId => {
                    const column = this.state.columns[columnId];
                    const t = column.taskIds.map(taskId => {
                        return this.state.tasks[taskId];
                    });
                    return (
                        <Column key={column.id} column={column} tasks={t} />
                    );
                })}
            </DragDropContext>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
