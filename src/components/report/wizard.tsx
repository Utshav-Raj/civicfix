"use client";

import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { CATEGORIES } from "@/lib/categories";
import { createReport } from "@/lib/data-layer";
import { Category, Urgency } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  MapPin,
  Navigation,
  Upload,
  X,
} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

const WizardMap = dynamic(() => import("./wizard-map").then((m) => m.WizardMap), {
  ssr: false,
  loading: () => (
    <div className="h-[360px] rounded-xl bg-bg-surface animate-pulse" />
  ),
});

type Step = 1 | 2 | 3 | 4;

const STEP_META: Record<Step, { title: string; sub: string; accent: string }> = {
  1: {
    title: "What's the problem?",
    sub: "Pick the category that best describes your issue.",
    accent: "#3B82F6",
  },
  2: {
    title: "Describe it",
    sub: "Add a clear title and a short description. Be specific.",
    accent: "#8B5CF6",
  },
  3: {
    title: "Show us where",
    sub: "Pin the exact spot and add photos if you can.",
    accent: "#14B8A6",
  },
  4: {
    title: "Review & submit",
    sub: "Take a last look — authorities will be notified.",
    accent: "#22C55E",
  },
};

export function ReportWizard() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [category, setCategory] = useState<Category | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState<Urgency>("medium");
  const [position, setPosition] = useState<[number, number]>([
    12.9716, 77.5946,
  ]);
  const [address, setAddress] = useState("MG Road, Bengaluru");
  const [photos, setPhotos] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{ id: string } | null>(null);

  const canGoNext = useMemo(() => {
    if (step === 1) return !!category;
    if (step === 2) return title.trim().length >= 6 && description.trim().length >= 20;
    if (step === 3) return !!address && position[0] !== 0;
    return true;
  }, [step, category, title, description, address, position]);

  function next() {
    if (step < 4) setStep((step + 1) as Step);
  }
  function prev() {
    if (step > 1) setStep((step - 1) as Step);
  }

  async function submit() {
    if (!category) return;
    setSubmitting(true);
    const r = await createReport({
      title,
      description,
      category,
      urgency,
      latitude: position[0],
      longitude: position[1],
      address,
      area: address.split(",")[1]?.trim() || "Unknown area",
      city: address.split(",").slice(-1)[0]?.trim() || "Bengaluru",
      photos,
    });
    setSubmitting(false);
    // confetti
    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 160,
        spread: 90,
        origin: { y: 0.4 },
        colors: ["#3B82F6", "#8B5CF6", "#F97316", "#22C55E"],
      });
    } catch {}
    setDone({ id: r.id });
  }

  return (
    <div className="relative">
      {/* Animated background shift per step */}
      <div
        className="fixed inset-0 -z-10 transition-all duration-1000"
        style={{
          background: `radial-gradient(at 30% 20%, ${STEP_META[step].accent}22 0px, transparent 50%),
            radial-gradient(at 80% 80%, ${STEP_META[step].accent}18 0px, transparent 50%),
            #040812`,
        }}
      />

      <div className="max-w-3xl mx-auto px-6 pt-10 pb-24">
        {/* Progress */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            {[1, 2, 3, 4].map((i) => {
              const isDone = i < step;
              const isActive = i === step;
              return (
                <div key={i} className="flex-1 flex items-center gap-3">
                  <div
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all",
                      isDone && "bg-civic-blue text-white",
                      isActive &&
                        "bg-bg-surface border-2 border-civic-blue text-civic-blue-glow shadow-[0_0_0_6px_rgba(59,130,246,0.15)] animate-pulse",
                      !isDone && !isActive && "bg-bg-surface border border-white/10 text-text-muted"
                    )}
                  >
                    {isDone ? <Check className="h-4 w-4" /> : i}
                  </div>
                  {i < 4 && (
                    <div className="flex-1 h-1 rounded-full bg-bg-surface overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: i < step ? "100%" : "0%" }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-gradient-to-r from-civic-blue to-civic-purple"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="text-xs text-text-muted">
            Step {step} of 4
          </div>
        </div>

        {done ? (
          <SuccessView id={done.id} onReport={() => router.refresh()} />
        ) : (
          <div className="glass rounded-3xl p-6 md:p-10 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -40, filter: "blur(8px)" }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-8">
                  <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">
                    {STEP_META[step].title}
                  </h1>
                  <p className="text-text-secondary">{STEP_META[step].sub}</p>
                </div>

                {step === 1 && (
                  <Step1 category={category} setCategory={setCategory} />
                )}
                {step === 2 && (
                  <Step2
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    urgency={urgency}
                    setUrgency={setUrgency}
                  />
                )}
                {step === 3 && (
                  <Step3
                    position={position}
                    setPosition={setPosition}
                    address={address}
                    setAddress={setAddress}
                    photos={photos}
                    setPhotos={setPhotos}
                  />
                )}
                {step === 4 && (
                  <Step4
                    category={category!}
                    title={title}
                    description={description}
                    urgency={urgency}
                    position={position}
                    address={address}
                    photos={photos}
                    goTo={setStep}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex items-center justify-between pt-6 border-t border-white/5">
              <Button
                variant="ghost"
                onClick={prev}
                disabled={step === 1}
                className={step === 1 ? "invisible" : ""}
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              {step < 4 ? (
                <Button onClick={next} disabled={!canGoNext} variant="secondary">
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={submit} disabled={submitting} size="lg">
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      Submit Report
                      <Check className="h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Step1({
  category,
  setCategory,
}: {
  category: Category | null;
  setCategory: (c: Category) => void;
}) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{ animate: { transition: { staggerChildren: 0.04 } } }}
      className="grid sm:grid-cols-2 md:grid-cols-3 gap-3"
    >
      {CATEGORIES.map((c) => {
        const selected = category === c.id;
        return (
          <motion.button
            key={c.id}
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCategory(c.id)}
            className={cn(
              "relative rounded-2xl p-5 border text-left transition-all overflow-hidden",
              selected
                ? "border-civic-blue bg-civic-blue/10 shadow-[0_0_0_1px_rgba(59,130,246,0.4),0_20px_60px_rgba(59,130,246,0.15)]"
                : "border-white/5 bg-bg-surface/60 hover:border-white/20"
            )}
          >
            {selected && (
              <motion.div
                layoutId="cat-check"
                className="absolute top-3 right-3 h-6 w-6 rounded-full bg-civic-blue flex items-center justify-center"
              >
                <Check className="h-3.5 w-3.5 text-white" />
              </motion.div>
            )}
            <div
              className="h-12 w-12 rounded-xl flex items-center justify-center text-2xl mb-4"
              style={{
                background: c.accentBg,
                border: `1px solid ${c.accent}40`,
              }}
            >
              {c.emoji}
            </div>
            <div className="font-semibold text-sm">{c.label}</div>
            <div className="text-xs text-text-muted mt-1">{c.description}</div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}

const AI_HINTS = [
  "Is it blocking traffic?",
  "Since when has this been happening?",
  "How many people are affected?",
  "Any safety risks?",
];

function Step2({
  title,
  setTitle,
  description,
  setDescription,
  urgency,
  setUrgency,
}: {
  title: string;
  setTitle: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  urgency: Urgency;
  setUrgency: (u: Urgency) => void;
}) {
  const max = 120;
  const pct = Math.min((title.length / max) * 100, 100);
  const titleColor = title.length > 110 ? "text-status-open" : title.length > 90 ? "text-civic-orange" : "text-text-muted";

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs text-text-secondary mb-2 block font-medium">
          Title
        </label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value.slice(0, max))}
          placeholder="e.g. Pothole on MG Road causing accidents"
        />
        <div className="flex items-center justify-between mt-2">
          <div className="h-1 flex-1 mr-3 bg-bg-surface rounded-full overflow-hidden">
            <div
              className="h-full transition-all"
              style={{
                width: `${pct}%`,
                background:
                  title.length > 110
                    ? "var(--status-open)"
                    : title.length > 90
                    ? "var(--civic-orange)"
                    : "var(--civic-blue)",
              }}
            />
          </div>
          <span className={`text-xs tabular-nums ${titleColor}`}>
            {title.length}/{max}
          </span>
        </div>
      </div>

      <div>
        <label className="text-xs text-text-secondary mb-2 block font-medium">
          Description
        </label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Be specific — mention the exact location and impact."
          className="min-h-[140px]"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {AI_HINTS.map((h) => (
            <button
              key={h}
              type="button"
              onClick={() =>
                setDescription((description ? description + "\n" : "") + `— ${h}`)
              }
              className="text-[11px] glass rounded-full px-3 py-1 hover:border-civic-blue transition-colors"
            >
              + {h}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs text-text-secondary mb-3 block font-medium">
          Urgency
        </label>
        <div className="grid grid-cols-3 gap-3">
          {([
            { id: "low", label: "Low", desc: "Minor, can wait", color: "#22C55E" },
            { id: "medium", label: "Medium", desc: "Should be handled soon", color: "#F59E0B" },
            { id: "high", label: "High", desc: "Urgent safety concern", color: "#EF4444" },
          ] as { id: Urgency; label: string; desc: string; color: string }[]).map((u) => {
            const active = urgency === u.id;
            return (
              <motion.button
                key={u.id}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setUrgency(u.id)}
                className={cn(
                  "rounded-xl p-4 text-left border transition-all",
                  active
                    ? "bg-bg-surface"
                    : "border-white/5 bg-bg-surface/50 hover:border-white/15"
                )}
                style={{
                  borderColor: active ? u.color : undefined,
                  boxShadow: active ? `0 0 0 1px ${u.color}66, 0 10px 30px ${u.color}22` : undefined,
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: u.color, boxShadow: `0 0 8px ${u.color}` }}
                  />
                  <span className="text-sm font-semibold">{u.label}</span>
                </div>
                <div className="text-xs text-text-muted mt-1">{u.desc}</div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Step3({
  position,
  setPosition,
  address,
  setAddress,
  photos,
  setPhotos,
}: {
  position: [number, number];
  setPosition: (p: [number, number]) => void;
  address: string;
  setAddress: (s: string) => void;
  photos: string[];
  setPhotos: (ps: string[]) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const onFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      const arr = Array.from(files).slice(0, 3 - photos.length);
      arr.forEach((f) => {
        const url = URL.createObjectURL(f);
        setPhotos([...photos, url]);
      });
    },
    [photos, setPhotos]
  );

  function useGps() {
    if (!navigator.geolocation) {
      toast.error("Geolocation unavailable.");
      return;
    }
    toast.promise(
      new Promise<void>((res, rej) =>
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setPosition([pos.coords.latitude, pos.coords.longitude]);
            setAddress("Detected location, Bengaluru");
            res();
          },
          () => rej(),
          { timeout: 5000 }
        )
      ),
      {
        loading: "Locating…",
        success: "Pin dropped at your location.",
        error: "Couldn't detect your location.",
      }
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div>
          <label className="text-xs text-text-secondary mb-1 block font-medium">
            Click on the map to drop a pin
          </label>
          <div className="text-xs text-text-muted">
            Or use your device&apos;s GPS for instant accuracy.
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={useGps}>
          <Navigation className="h-4 w-4" />
          Use My Location
        </Button>
      </div>

      <div className="h-[360px] rounded-xl overflow-hidden border border-white/5">
        <WizardMap position={position} setPosition={setPosition} />
      </div>

      <div>
        <label className="text-xs text-text-secondary mb-2 block font-medium">
          Address
        </label>
        <Input
          icon={<MapPin className="h-4 w-4" />}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Area, Landmark, City"
        />
      </div>

      <div>
        <label className="text-xs text-text-secondary mb-2 block font-medium">
          Photos ({photos.length}/3)
        </label>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            onFiles(e.dataTransfer.files);
          }}
          onClick={() => fileRef.current?.click()}
          className={cn(
            "relative rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all",
            dragging
              ? "border-civic-blue bg-civic-blue/5 shadow-[0_0_0_4px_rgba(59,130,246,0.1)]"
              : "border-white/10 hover:border-civic-blue/60 hover:bg-civic-blue/5"
          )}
        >
          <input
            type="file"
            ref={fileRef}
            multiple
            accept="image/*"
            className="sr-only"
            onChange={(e) => onFiles(e.target.files)}
          />
          <Upload className="h-7 w-7 mx-auto text-civic-blue-glow" />
          <div className="mt-3 text-sm font-medium">Drag photos here or click to upload</div>
          <div className="text-xs text-text-muted mt-1">JPG or PNG • Up to 3 photos</div>
        </div>

        {photos.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mt-4">
            {photos.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPhotos(photos.filter((_, idx) => idx !== i));
                  }}
                  className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center text-white hover:bg-status-open transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Step4({
  category,
  title,
  description,
  urgency,
  position,
  address,
  photos,
  goTo,
}: {
  category: Category;
  title: string;
  description: string;
  urgency: Urgency;
  position: [number, number];
  address: string;
  photos: string[];
  goTo: (s: Step) => void;
}) {
  const cat = CATEGORIES.find((c) => c.id === category)!;
  return (
    <div className="space-y-4">
      <SummaryRow label="Category" onEdit={() => goTo(1)}>
        <span className="inline-flex items-center gap-2">
          <span>{cat.emoji}</span>
          <span className="font-medium">{cat.label}</span>
        </span>
      </SummaryRow>
      <SummaryRow label="Title" onEdit={() => goTo(2)}>
        <div className="font-medium">{title}</div>
      </SummaryRow>
      <SummaryRow label="Description" onEdit={() => goTo(2)}>
        <p className="text-sm text-text-secondary whitespace-pre-wrap">
          {description}
        </p>
      </SummaryRow>
      <SummaryRow label="Urgency" onEdit={() => goTo(2)}>
        <span className="inline-flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{
              background:
                urgency === "low"
                  ? "#22C55E"
                  : urgency === "medium"
                  ? "#F59E0B"
                  : urgency === "high"
                  ? "#F97316"
                  : "#EF4444",
            }}
          />
          <span className="capitalize font-medium">{urgency}</span>
        </span>
      </SummaryRow>
      <SummaryRow label="Location" onEdit={() => goTo(3)}>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-civic-blue-glow" />
          <span className="font-medium">{address}</span>
          <span className="text-xs text-text-muted ml-2 tabular-nums">
            {position[0].toFixed(4)}, {position[1].toFixed(4)}
          </span>
        </div>
      </SummaryRow>
      <SummaryRow label="Photos" onEdit={() => goTo(3)}>
        {photos.length === 0 ? (
          <span className="text-text-muted text-sm">None uploaded</span>
        ) : (
          <div className="flex gap-2">
            {photos.map((p, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={p}
                alt=""
                className="h-16 w-16 rounded-lg object-cover border border-white/10"
              />
            ))}
          </div>
        )}
      </SummaryRow>
    </div>
  );
}

function SummaryRow({
  label,
  onEdit,
  children,
}: {
  label: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-bg-surface/50 p-4 flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="text-[11px] uppercase tracking-wider text-text-muted mb-1.5">
          {label}
        </div>
        <div>{children}</div>
      </div>
      <button
        onClick={onEdit}
        className="text-xs text-civic-blue-glow hover:underline shrink-0"
      >
        Edit
      </button>
    </div>
  );
}

function SuccessView({ id }: { id: string; onReport: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-3xl p-12 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="h-24 w-24 mx-auto rounded-full bg-civic-teal/20 border-2 border-civic-teal flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(20,184,166,0.3)]"
      >
        <Check className="h-12 w-12 text-civic-teal" />
      </motion.div>
      <h2 className="font-display text-3xl font-bold mb-3">
        Issue #{id.slice(-6).toUpperCase()} submitted!
      </h2>
      <p className="text-text-secondary max-w-md mx-auto mb-8">
        Your report is now live. Citizens can upvote, and your assigned
        department will be notified within 24 hours.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href={`/report/${id}`}>
          <Button>
            Track Your Report
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link href="/report/new">
          <Button variant="outline">Report Another</Button>
        </Link>
      </div>
    </motion.div>
  );
}
