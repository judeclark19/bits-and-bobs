import { Metadata } from "next";
import SuggestionForm from "./common-components/SuggestionForm";
import TableOfContents from "./common-components/TableOfContents";

export const metadata: Metadata = {
  title: "Bits and Bobs",
  icons: {
    icon: ["/favicon.ico"],
    apple: ["/apple-touch-icon.png"],
    shortcut: ["/apple-touch-icon.png"]
  }
};

export default function Home() {
  return (
    <main>
      <div
        style={{
          padding: "20px"
        }}
      >
        <h1>Bits and Bobs</h1>
        <TableOfContents />
        <SuggestionForm />
      </div>
    </main>
  );
}
