/** @jsx h */
import { h } from "preact";
import { tw } from '@twind';
import ChessBoardView from "../islands/ChessBoardView.tsx";

export default function Home() {
  return (
    <div class={tw`w-screen h-screen bg-gray-900 text(white)`}>
      <ChessBoardView />
    </div>
  );
}
