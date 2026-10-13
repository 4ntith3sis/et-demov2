import { IKON } from "@/components/ikon";
import type { NamaIkon } from "@/types";

interface PropsIkon extends React.SVGProps<SVGSVGElement> {
  nama: NamaIkon;
}

/**
 * Wrapper untuk merender ikon berdasarkan nama string.
 *
 * Dipakai di komponen yang menerima ikon sebagai data (mis. dari `data/`),
 * sementara pemakaian langsung di dalam JSX boleh import ikonnya sendiri.
 */
export function Ikon({ nama, ...props }: PropsIkon) {
  const Komponen = IKON[nama];
  return <Komponen {...props} />;
}