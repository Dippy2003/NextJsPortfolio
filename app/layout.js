import { Outfit,Ovo} from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  
  subsets: ["latin"],weight: ['400','500','600','700'],
});
const ovo = Ovo({
  
  subsets: ["latin"],weight: ['400'],
});


export const metadata = {
  title: "Dipna Wijesinghe | Portfolio",
  description:
    "Dipna Wijesinghe, Data Science undergraduate specializing in AI/ML, computer vision, LLM agents & RAG systems, data engineering & BI, and full-stack development.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth ">
      <body
        className={`${outfit.className} ${ovo.className} antialiased leading-8 overflow-x-hidden dark:bg-darkTheme dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
