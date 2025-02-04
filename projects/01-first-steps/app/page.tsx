import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Efrain's HomePage",
  description: "Generated by create next app",
};

export default function Home() {
  return (
    <main className="flex flex-col items-center p-24">
      <span className="text-5xl">Hola Mundo!</span>

      <Link href={"/about"}>About Page</Link>
    </main>
  );
}
