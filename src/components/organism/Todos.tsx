import React from "react";
import { useState } from "react";
import { Todo } from "../atoms/Todo";
import type { todo } from "../../types/types";

export const Todos = () => {
    const [todos, setTodos] = useState<string>("");
    const [tasks, setTasks] = useState<todo[]>([]);
    const [dragIndex, setDragIndex] = useState<number>()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodos(e.target.value);
    };
    const handleClick = () => {
        if (todos === "") return;
        const newTodo: todo = {
            name: todos,
            checked: false,
            id: new Date().getTime(),
        };
        setTasks([...tasks, newTodo]);
        setTodos("");
    };
    const handleDelete = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };
    const handleTask = <K extends keyof todo, V extends todo[K]>(
        id: number,
        key: K,
        value: V,
    ) => {
        setTasks((tasks) => {
            const newTasks = tasks.map((task) => {
                if (task.id === id) {
                    return { ...task, [key]: value };
                }
                return task;
            });
            return newTasks;
        });
    };
    const dragStart = (idx: number) => {
        setDragIndex(idx)
    }
    const dragEnter = (idx: number) => {
        if (idx === dragIndex) return;
        setTasks((prevTasks) => {
            let editTasks = [...prevTasks]
            const deleteTask = editTasks.splice(dragIndex!, 1)[0]
            editTasks.splice(idx, 0, deleteTask)
            return editTasks
        })
        setDragIndex(idx)
    }
    return (
        <div>
            <input type="text" value={todos} onChange={handleChange} />
            <button onClick={handleClick}>追加</button>
            <ul
                style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}
            >
                {tasks.map((task: todo, i: number) => (
                    <div key={i} draggable={true} onDragOver={(e) => e.preventDefault()} onDragStart={() => dragStart(i)} onDragEnter={() => dragEnter(i)}>
                        <Todo handleTask={handleTask} handleDelete={handleDelete} {...task} />
                    </div>
                ))}
            </ul>
        </div>
    );
};