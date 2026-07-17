import Link from "next/link";
import Image from "next/image";
import logo from "../assets/notesathilogo.png";

export default function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2" aria-label="Notesathi">
      <Image src={logo} alt="" priority className="h-8 w-8 object-contain" />
      <span className="text-lg font-bold tracking-tight text-slate-900">
        Note<span className="text-violet-600">sathi</span>
      </span>
    </Link>
  );
}
