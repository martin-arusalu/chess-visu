/** @jsx h */
import { h } from "preact";
import { tw } from '@twind';
import ColorGuesserView from "../../islands/ColorGuesserView.tsx";

export default function Color() {
  return (
    <div class={tw`w-screen h-screen bg-gray-900 text(white)`}>
      <ColorGuesserView />
    </div>
  );
}
