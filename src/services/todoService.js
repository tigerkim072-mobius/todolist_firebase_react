import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const todoCollection = collection(db, 'todos');

export function addTodo(title) : {
  // Firebase에 새로운 할일을 추가하는 함수
  return addDoc(todoCollection, {
    title,
    completed: false,
    createdAt: Date.now(),
  });

}
