import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const todoCollection = collection(db, 'todos');

// Firebase Console에서 현재 앱이 연결된 프로젝트의 Firestore Database → Rules를 확인하세요. /todos/{todoId} 경로에 create 권한이 있어야 합니다. 규칙 파일은 저장소에서 확인되지 않아 실제 배포된 규칙은 확인할 수 없습니다. 로그인 기반 규칙을 사용한다면 앱에서도 먼저 로그인해야 합니다.
// Uncaught (in promise)는 거부된 Promise를 호출하는 쪽에서 처리하지 않았다는 뜻입니다. 호출부에서 try/catch로 오류를 표시할 수 있지만, 그것만으로 Firestore 권한 문제가 해결되지는 않습니다. allow read, write: if true는 누구나 접근할 수 있어 운영 환경에는 사용하지 마세요.

export function addTodo(title) {
  // Firebase에 새로운 할일을 추가하는 함수
  return addDoc(todoCollection, {
    title,
    completed: false,
    createdAt: Date.now(),
  });
}
