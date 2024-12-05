import React from 'react'
import './Todo.css'
import { useState, useRef, useEffect } from 'react'
import { IoIosDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function Todo() {
    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState([])
    const [editId, setEditId] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    // function for adding todos
    const addTodo = () => {
        // If todo is an empty string, and we're in edit mode
        if (editId && todo.trim() === '') {
            // Reset edit state without modifying the todos
            setEditId(0);
            setTodo('');
            return;
        }

        if (todo.trim() !== '') {
            if (editId) {
                // Editing an existing todo
                const updateTodo = todos.map((to) => 
                    to.id === editId 
                        ? { ...to, list: todo.trim() } 
                        : to
                );
                setTodos(updateTodo);
                setEditId(0);
                setTodo('');
            } else {
                // Adding a new todo - use unshift to add to the beginning of the array
                setTodos((prevTodos) => [{ id: Date.now(), list: todo.trim(), status: false }, ...prevTodos]);
                setTodo('');
            }
        }
    }

    // useref hook is used to focus a particular dom element
    const inputRef = useRef('null')

    // useeffect hook is used to focus on a particular dom element on every rendering
    useEffect(() => {
        inputRef.current.focus();
    });

    // function for the deleting icon for todos
    const onDelete = (id) => {
        setTodos(todos.filter((to) => to.id !== id))
    }

    // function for the completing icon for todos
    const onComplete = (id) => {
        let complete = todos.map((list) => {
            if (list.id === id) {
                return ({ ...list, status: !list.status })
            }
            return list
        })
        setTodos(complete)
    }

    // function for the Editing icon for todos
    const onEdit = (id) => {
        const editTodo = todos.find((to) => to.id === id)
        console.log('ediTOdo',editTodo.toString());
        setTodo(editTodo.list)
        setEditId(editTodo.id)
        console.log('editTodo: ' + editTodo);
    }

    return (
        <div className='container'>
            <h2>TODO APP</h2>
            <form className='form-group' onSubmit={handleSubmit}>
                <input type="text" value={todo} ref={inputRef} placeholder='Add your todo...' className='form-control' onChange={(e) => setTodo(e.target.value)} />
                <button onClick={addTodo} >{editId ? 'EDIT' : 'ADD'}</button>
            </form>
            <div className='list'>
                <ul>
                    {todos.map((to) => (
                        <li key={to.id} className='list-items'>
                            <div className='list-items-list' id={to.status ? 'list-item' : ''}>{to.list}</div>
                            <span>
                                <IoIosDoneAll className='list-items-icons' id='complete' title='Complete' onClick={() => onComplete(to.id)} />
                                <FiEdit className='list-items-icons' id='edit' title='Edit' onClick={() => onEdit(to.id)} />
                                <MdDelete className='list-items-icons' id='delete' title='Delete' onClick={() => onDelete(to.id)} />
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Todo