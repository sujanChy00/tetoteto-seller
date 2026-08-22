"use dom";
import "../global.css";

export default function DOMComponent({ name }: { name: string }) {
  return (
    <div>
      <h1 className="text-red-700">Hello, {name}</h1>
    </div>
  );
}
