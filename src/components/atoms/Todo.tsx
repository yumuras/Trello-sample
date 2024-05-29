import { todo } from "../../types/types";

interface Props {
  // index: number
  name: string;
  checked: boolean;
  readonly id: number;
  // setTasks: Dispatch<SetStateAction<todo[]>>;
  handleTask: <K extends keyof todo, V extends todo[K]>(id: number, key: K, value: V) => void
  handleDelete: (id: number) => void
}
export const Todo = ({ name, checked, id, handleDelete, handleTask }: Props) => {
  return (
    <>
      <li className="bg-green-500">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => handleTask(id, "checked", !checked)}
        />
        <input
          type="text"
          disabled={checked}
          value={name}
          onChange={(e) => handleTask(id, "name", e.target.value)}
        />
        <button onClick={() => handleDelete(id)}>削除</button>
      </li>
    </>
  );
};