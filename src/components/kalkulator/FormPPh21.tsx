"use client";

import { useState } from "react";

import {
  calculatePph21Apbn,
  calculatePph21BulananLogic,
  calculatePph21Final,
  calculatePph21ManfaatFinal,
  calculatePph21TidakFinalByObj,
} from "@/lib/kalkulator/calculate";
import { formatPercent, formatRupiah, parseAmount } from "@/lib/kalkulator/format";
import { amountField } from "@/lib/kalkulator/validation";
import type { ResultRow } from "@/lib/kalkulator/result";
import { PTKP_OPTIONS } from "@/data/kalkulator";
import { JENIS_PPH_TAHUNAN, MASA_OPTIONS, PENGHITUNGAN_OPTIONS } from "./FormPPh21Tahunan";
import { AksiForm } from "./AksiForm";
import { KELAS_KONTROL, KolomForm } from "./KolomForm";
import { InputPajak } from "./InputPajak";
import { SelectPajak } from "./SelectPajak";
import { PilihAdaTidak, PilihSkema } from "./PilihAdaTidak";

const JENIS_PEMOTONGAN = [
  { value: "bulanan", label: "PPh 21 Bulanan" },
  { value: "final", label: "PPh 21 Final" },
  { value: "tidak-final", label: "PPh 21 Tidak Final" },
  { value: "tahunan", label: "PPh 21 Tahunan" },
];

const KODE_OBJEK_NONFINAL = [
  { value: "21-100-03", label: "21-100-03 — Pegawai Tidak Tetap" },
  { value: "21-100-04", label: "21-100-04 — Distributor Pemasaran Berjenjang / Agen Asuransi" },
  { value: "21-100-06", label: "21-100-06 — Penjaja Barang Dagangan" },
  { value: "21-100-07", label: "21-100-07 — Tenaga Ahli" },
  { value: "21-100-08", label: "21-100-08 — Seniman" },
  { value: "21-100-09", label: "21-100-09 — Bukan Pegawai Lainnya" },
  { value: "21-100-10", label: "21-100-10 — Anggota Dewan Komisaris atau Dewan Pengawas yang Menerima Imbalan Secara Tidak Teratur" },
  { value: "21-100-11", label: "21-100-11 — Mantan Pegawai yang Menerima Jasa Produksi, Tantiem, Bonus, atau Imbalan kepada Mantan Pegawai" },
  { value: "21-100-12", label: "21-100-12 — Pegawai yang Melakukan Penarikan Uang Pensiun" },
  { value: "21-100-13", label: "21-100-13 — Peserta Kegiatan" },
];

const JENIS_TIDAK_FINAL = [
  { value: "", label: "Pilih Jenis" },
  { value: "upah-pegawai-tidak-tetap-non-bulanan", label: "Upah Pegawai Tidak Tetap Non Bulanan" },
  { value: "upah-pegawai-tetap-non-bulanan", label: "Upah Pegawai Tetap Non Bulanan" },
];

const KODE_OBJEK_BULANAN = [
  { value: "21-100-01", label: "21-100-01 — Pegawai Tetap" },
  { value: "21-100-02", label: "21-100-02 — Penerima Pensiun Berkala" },
];

const KODE_OBJEK_FINAL: { value: string; label: string; showAkumulasi: boolean }[] = [
  { value: "21-401-01", label: "21-401-01 — Uang Pesangon yang Dibayarkan Sekaligus", showAkumulasi: true },
  { value: "21-401-02", label: "21-401-02 — Uang Manfaat Pensiun, THT, atau JHT yang Dibayarkan Sekaligus", showAkumulasi: true },
  { value: "21-402-01", label: "21-402-01 — Honor dan Imbalan Lain yang Dibebankan kepada APBN atau APBD yang Diterima oleh PNS, Anggota TNI/POLRI, Pejabat negara dan Pensiunannya", showAkumulasi: false },
];

const JENIS_PENERIMA = [
  { value: "pns", label: "PNS" },
  { value: "tni-polri", label: "Anggota TNI/POLRI" },
  { value: "pejabat-negara", label: "Pejabat Negara" },
  { value: "pensiunan", label: "Pensiunan" },
];

const GOLONGAN_APBN: Record<string, { value: string; label: string; rate: number }[]> = {
  pns: [
    { value: "pns-1-2", label: "Golongan I dan II", rate: 0 },
    { value: "pns-3", label: "Golongan III", rate: 5 },
    { value: "pns-4", label: "Golongan IV", rate: 15 },
  ],
  "tni-polri": [
    { value: "tni-tamtama-bintara", label: "Tamtama dan Bintara", rate: 0 },
    { value: "tni-perwira-pertama", label: "Perwira Pertama", rate: 5 },
    { value: "tni-perwira-menengah-tinggi", label: "Perwira Menengah, Perwira Tinggi", rate: 15 },
  ],
  "pejabat-negara": [{ value: "pejabat-negara", label: "Pejabat Negara", rate: 15 }],
  pensiunan: [{ value: "pensiunan", label: "Pensiunan", rate: 0 }],
};

/** Form utama PPh 21 — port dari `Pph21Form` v1 (logika & alur 1:1). */
export function FormPPh21({
  onResult,
  jenis,
  onJenisChange,
  tahunanPtkpIndex,
  onTahunanPtkpIndexChange,
}: {
  onResult: (rows: ResultRow[] | null) => void;
  jenis: string;
  onJenisChange: (value: string) => void;
  tahunanPtkpIndex: number;
  onTahunanPtkpIndexChange: (value: number) => void;
}) {
  const [jenisP3K, setJenisP3K] = useState("p3k-a1a2");
  const [penghitungan, setPenghitungan] = useState("setahun");
  const [masaAwal, setMasaAwal] = useState("januari");
  const [masaAkhir, setMasaAkhir] = useState("desember");
  const [kodeObjek, setKodeObjek] = useState(KODE_OBJEK_BULANAN[0].value);
  const [jenisTidakFinal, setJenisTidakFinal] = useState("");
  const [skema, setSkema] = useState<"gross" | "grossup">("gross");
  const [sudahDipotongAda, setSudahDipotongAda] = useState<"ada" | "tidak">("tidak");
  const [pphTelahDipotong, setPphTelahDipotong] = useState("");
  const [brutoSebelumnya, setBrutoSebelumnya] = useState("");
  const [bruto, setBruto] = useState("");
  const [akumulasi, setAkumulasi] = useState("");
  const [akumulasiAda, setAkumulasiAda] = useState<"ada" | "tidak">("tidak");
  const [jenisPenerima, setJenisPenerima] = useState(JENIS_PENERIMA[0].value);
  const [golonganApbn, setGolonganApbn] = useState(GOLONGAN_APBN[JENIS_PENERIMA[0].value][0].value);
  const [ptkpIndex, setPtkpIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const isFinal = jenis === "final";
  const isTahunan = jenis === "tahunan";
  const showAkumulasiField = isFinal && (KODE_OBJEK_FINAL.find((c) => c.value === kodeObjek)?.showAkumulasi ?? false);
  const showAkumulasi = showAkumulasiField && akumulasiAda === "ada";
  const showGolongan = isFinal && kodeObjek === "21-402-01";

  function resetShared() {
    setBruto("");
    setError(null);
    onResult(null);
  }

  function handleJenisChange(value: string) {
    onJenisChange(value);
    setKodeObjek(
      value === "final"
        ? KODE_OBJEK_FINAL[0].value
        : value === "bulanan"
          ? KODE_OBJEK_BULANAN[0].value
          : KODE_OBJEK_NONFINAL[0].value,
    );
    resetShared();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const brutoValue = parseAmount(bruto);
    const errorBruto = amountField(brutoValue, "Penghasilan Bruto");
    if (errorBruto) {
      setError(errorBruto);
      onResult(null);
      return;
    }
    if (isFinal) {
      if (showGolongan) {
        const selected =
          GOLONGAN_APBN[jenisPenerima].find((g) => g.value === golonganApbn) ??
          GOLONGAN_APBN[jenisPenerima][0];
        const computed = calculatePph21Apbn(brutoValue ?? 0, selected.rate);
        setError(null);
        onResult([
          { label: "DPP", value: formatRupiah(computed.bruto) },
          { label: "Tarif", value: formatPercent(selected.rate) },
          { label: "PPh 21", value: formatRupiah(computed.pph), emphasis: true },
        ]);
        return;
      }
      let akumulasiValue = 0;
      if (showAkumulasi) {
        const parsed = akumulasi.trim() === "" ? 0 : parseAmount(akumulasi);
        const errorAkumulasi = amountField(parsed, "Akumulasi Penghasilan Bruto Sebelumnya");
        if (errorAkumulasi) {
          setError(errorAkumulasi);
          onResult(null);
          return;
        }
        akumulasiValue = parsed ?? 0;
      }
      const computed =
        kodeObjek === "21-401-02"
          ? calculatePph21ManfaatFinal({
              akumulasiSebelumnya: akumulasiValue,
              penghasilanBruto: brutoValue ?? 0,
              dalam2Tahun: showAkumulasi,
            })
          : calculatePph21Final({
              akumulasiSebelumnya: akumulasiValue,
              penghasilanBruto: brutoValue ?? 0,
              dalam2Tahun: showAkumulasi,
            });
      setError(null);
      const pphValue = "pph21Final" in computed ? computed.pph21Final : computed.pph;
      onResult([
        { label: "DPP", value: formatRupiah(computed.kumulatif) },
        { label: "Tarif", value: computed.kumulatif > 0 ? formatPercent((pphValue / computed.kumulatif) * 100) : "0%" },
        { label: "PPh 21", value: formatRupiah(pphValue), emphasis: true },
      ]);
      return;
    }
    if (jenis === "tidak-final" && kodeObjek === "21-100-03" && jenisTidakFinal === "") {
      setError("Pilih Jenis terlebih dahulu.");
      onResult(null);
      return;
    }
    let dipotongValue = 0;
    if (sudahDipotongAda === "ada") {
      const parsed = parseAmount(pphTelahDipotong);
      const errorDipotong = amountField(parsed, "PPh yang Telah Dipotong");
      if (errorDipotong) {
        setError(errorDipotong);
        onResult(null);
        return;
      }
      dipotongValue = parsed ?? 0;
    }
    const ptkpValue = PTKP_OPTIONS[ptkpIndex].value;
    if (jenis === "bulanan") {
      const computed = calculatePph21BulananLogic({
        ptkpValue,
        bruto: brutoValue ?? 0,
        skema,
        brutoSebelumnya:
          sudahDipotongAda === "ada" && brutoSebelumnya.trim() !== "" ? parseAmount(brutoSebelumnya) : null,
        pphSebelumnya:
          sudahDipotongAda === "ada" && pphTelahDipotong.trim() !== "" ? parseAmount(pphTelahDipotong) : null,
      });
      setError(null);
      onResult([
        { label: "DPP", value: formatRupiah(computed.dpp) },
        { label: "Tarif", value: formatPercent(computed.rate) },
        { label: "PPh 21", value: formatRupiah(computed.taxAmount), emphasis: true },
      ]);
      return;
    }
    const computed = calculatePph21TidakFinalByObj({
      kode: kodeObjek,
      jenis: jenisTidakFinal,
      bruto: brutoValue ?? 0,
      ptkpValue,
    });
    setError(null);
    onResult([
      { label: "DPP", value: formatRupiah(computed.dpp) },
      { label: "Tarif", value: computed.dpp > 0 ? formatPercent((computed.taxAmount / computed.dpp) * 100) : "0%" },
      { label: "PPh 21", value: formatRupiah(computed.taxAmount), emphasis: true },
    ]);
  }

  function handleReset() {
    onJenisChange("bulanan");
    setKodeObjek(KODE_OBJEK_BULANAN[0].value);
    setJenisTidakFinal("");
    setSkema("gross");
    setSudahDipotongAda("tidak");
    setPphTelahDipotong("");
    setBruto("");
    setAkumulasi("");
    setAkumulasiAda("tidak");
    setJenisPenerima(JENIS_PENERIMA[0].value);
    setGolonganApbn(GOLONGAN_APBN[JENIS_PENERIMA[0].value][0].value);
    setPtkpIndex(0);
    setError(null);
    onResult(null);
  }

  if (isTahunan) {
    return (
      <div className="flex flex-col gap-5">
        <SelectPajak id="jenis-pemotongan" label="Jenis Pemotongan" value={jenis} onChange={handleJenisChange} options={JENIS_PEMOTONGAN} />
        <SelectPajak id="jenis-pph-tahunan" label="Jenis PPh Tahunan" value={jenisP3K} onChange={setJenisP3K} options={JENIS_PPH_TAHUNAN} />
        <p className="!mt-8 border-b border-garis pb-2.5 text-xs font-extrabold tracking-[0.16em] text-yellow-600 uppercase">
          Informasi Pegawai
        </p>
        <SelectPajak
          id="ptkp-tahunan"
          label="PTKP"
          value={String(tahunanPtkpIndex)}
          onChange={(v) => onTahunanPtkpIndexChange(Number(v))}
          options={PTKP_OPTIONS.map((p, i) => ({ value: String(i), label: p.label }))}
        />
        <SelectPajak id="penghitungan" label="Penghitungan" value={penghitungan} onChange={setPenghitungan} options={PENGHITUNGAN_OPTIONS} />
        <KolomForm id="masa-penghasilan" label="Masa Penghasilan">
          <div className="grid gap-3 sm:grid-cols-2">
            <select id="masa-awal" aria-label="Masa Awal" value={masaAwal} onChange={(e) => setMasaAwal(e.target.value)} className={KELAS_KONTROL}>
              {MASA_OPTIONS.map((o) => (
                <option key={`awal-${o.value}`} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <select id="masa-akhir" aria-label="Masa Akhir" value={masaAkhir} onChange={(e) => setMasaAkhir(e.target.value)} className={KELAS_KONTROL}>
              {MASA_OPTIONS.map((o) => (
                <option key={`akhir-${o.value}`} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </KolomForm>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
      <SelectPajak id="jenis-pemotongan" label="Jenis Pemotongan" value={jenis} onChange={handleJenisChange} options={JENIS_PEMOTONGAN} />
      {isFinal || jenis === "bulanan" || jenis === "tidak-final" ? (
        <SelectPajak
          id="kode-objek-pph21"
          label="Kode Objek Pajak"
          value={kodeObjek}
          onChange={(v) => {
            setKodeObjek(v);
            setAkumulasiAda("tidak");
            setAkumulasi("");
            setJenisPenerima(JENIS_PENERIMA[0].value);
            setGolonganApbn(GOLONGAN_APBN[JENIS_PENERIMA[0].value][0].value);
            setJenisTidakFinal("");
          }}
          options={isFinal ? KODE_OBJEK_FINAL : jenis === "bulanan" ? KODE_OBJEK_BULANAN : KODE_OBJEK_NONFINAL}
        />
      ) : null}

      {isFinal ? (
        <>
          {showAkumulasiField ? (
            <KolomForm id="akumulasi-ada" label="Akumulasi Penghasilan Bruto Sebelumnya" center>
              <PilihAdaTidak id="akumulasi-ada" value={akumulasiAda} onChange={setAkumulasiAda} />
            </KolomForm>
          ) : null}
          {showAkumulasi ? (
            <InputPajak id="akumulasi" label="Jumlah Akumulasi Penghasilan Bruto Sebelumnya (Rp)" value={akumulasi} onChange={setAkumulasi} />
          ) : null}
          <InputPajak id="bruto-final" label="Penghasilan Bruto (Rp)" value={bruto} onChange={setBruto} error={error} />
          {showGolongan ? (
            <>
              <SelectPajak
                id="jenis-penerima"
                label="Jenis Penerima"
                value={jenisPenerima}
                onChange={(v) => {
                  setJenisPenerima(v);
                  setGolonganApbn(GOLONGAN_APBN[v][0].value);
                }}
                options={JENIS_PENERIMA}
              />
              <SelectPajak id="golongan" label="Golongan/Pangkat" value={golonganApbn} onChange={setGolonganApbn} options={GOLONGAN_APBN[jenisPenerima]} />
            </>
          ) : null}
        </>
      ) : (
        <>
          {jenis === "tidak-final" && kodeObjek === "21-100-03" ? (
            <SelectPajak id="jenis-tidak-final" label="Jenis" value={jenisTidakFinal} onChange={setJenisTidakFinal} options={JENIS_TIDAK_FINAL} />
          ) : null}
          <KolomForm id="skema" label="Skema Penghitungan" center>
            <PilihSkema value={skema} onChange={setSkema} />
          </KolomForm>
          <KolomForm id="sudah-dipotong" label="Penghasilan yang telah dipotong PPh Pasal 21 pada masa pajak yang sama" center>
            <PilihAdaTidak id="sudah-dipotong" value={sudahDipotongAda} onChange={setSudahDipotongAda} />
          </KolomForm>
          {sudahDipotongAda === "ada" ? (
            <>
              <InputPajak id="bruto-sebelumnya" label="Penghasilan Bruto Sebelumnya dalam Masa Pajak yang Sama (Rp)" value={brutoSebelumnya} onChange={setBrutoSebelumnya} />
              <InputPajak id="pph-dipotong" label="PPh yang Telah Dipotong (Rp)" value={pphTelahDipotong} onChange={setPphTelahDipotong} />
            </>
          ) : null}
          <InputPajak id="bruto-pph21" label="Penghasilan Bruto (Rp)" value={bruto} onChange={setBruto} error={error} />
          <SelectPajak
            id="ptkp-pph21"
            label="PTKP"
            value={String(ptkpIndex)}
            onChange={(v) => setPtkpIndex(Number(v))}
            options={PTKP_OPTIONS.map((p, i) => ({ value: String(i), label: p.label }))}
          />
        </>
      )}

      <AksiForm onReset={handleReset} />
    </form>
  );
}
